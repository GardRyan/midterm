//require('dotenv').config();
const db = require("../connection");

//returns story for storyId
const getStoryById = (storyId) => {
  let queryParams = [storyId];
  let queryString = `
      SELECT *
      FROM stories
      WHERE stories.id = $1
      GROUP BY
        stories.id,
        stories.title,
        stories.content,
        stories.creator_id,
        stories.completed,
        stories.created_date,
        stories.completed_date,
        stories.public,
        stories.deleted
    `;
  return db
    .query(queryString, queryParams)
    .then((data) => {
      if (data.rows.length === 0) {
        throw new Error("story not found");
      }
      return data.rows[0];
    })
    .catch((error) => {
      console.log(error);
    });
};

//returns all contributions for specified storyId
//returns current story step
//
const getContributions = (storyId) => {
  let queryParams = [storyId];
  let queryString = `
  SELECT *,
  (SELECT COUNT(*)
   FROM contribution_votes AS upvotes
   WHERE contributions.id = upvotes.contribution_id AND upvotes.vote = TRUE) AS upvotes,
  (SELECT COUNT(*)
   FROM contribution_votes AS downvotes
   WHERE contributions.id = downvotes.contribution_id AND downvotes.vote = FALSE) AS downvotes
FROM contributions
WHERE contributions.story_id = $1
AND contributions.story_step = COALESCE(
  (SELECT MAX(contributions.story_step)
  FROM contributions
  WHERE contributions.story_id = $1
  AND contributions.picked = TRUE
), 1)
ORDER BY contributions.created_date DESC
`;
  return db
    .query(queryString, queryParams)
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((error) => {
      console.log(error);
    });
};

//saves a new story contribution
const saveContributions = (newContribution) => {
  const {
    story_id,
    story_step,
    content,
    picked,
    contributer_id,
    created_date,
    picked_date,
  } = newContribution;
  console.log(newContribution);
  const query =
    "INSERT INTO contributions (story_id, story_step, content, picked, contributer_id, created_date, picked_date) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *";

  return db
    .query(query, [
      story_id,
      story_step,
      content,
      false,
      contributer_id,
    ])
    .then((result) => {
      return result.rows[0].id;
    })
    .catch((error) => {
      console.error("Error saving contribution:", error);
    });
};

//edit contributions
const editContributions = (contribution) => {
  const { id, content } = contribution;
  const query =
    "UPDATE contributions SET content = $1 WHERE id = $2 RETURNING *";

  return db
    .query(query, [id, content])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error("Error saving contribution:", error);
    });
};

//delete contributions
const deleteContributions = (contribution) => {
  const { id } = contribution;
  const query = "DELETE FROM contributions WHERE id = $1 RETURNING *";

  return db
    .query(query, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error("Error deleting contribution:", error);
    });
};

//picks contribution -> only to be used by story_creator -> updates to come
const pickContribution = (contributionId, storyId) => {
  return db
    .query(
      `
    UPDATE stories
    SET story_step = story_step + 1
    WHERE id = $1
  `,
      [storyId]
    )
    .then(() => {
      return db.query(
        `
      UPDATE contributions
      SET picked = TRUE
      WHERE id = $1
    `,
        [contributionId]
      );
    })
    .catch((error) => {
      console.error("Error picking contribution:", error);
    });
};

module.exports = {
  getStoryById,
  getContributions,
  saveContributions,
  editContributions,
  deleteContributions,
  pickContribution,
};
