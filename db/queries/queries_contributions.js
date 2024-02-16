//require('dotenv').config();
const db = require("../connection");

//returns all contributions for specified storyId
//returns current story step
//
const getContributions = (storyId) => {
  let queryParams = [storyId];
  let queryString = `
  SELECT contributions.*, users.username,
  (SELECT COUNT(*)
   FROM contribution_votes AS upvotes
   WHERE contributions.id = upvotes.contribution_id AND upvotes.vote = TRUE) AS upvotes,
  (SELECT COUNT(*)
   FROM contribution_votes AS downvotes
   WHERE contributions.id = downvotes.contribution_id AND downvotes.vote = FALSE) AS downvotes
FROM contributions
JOIN users ON users.id = contributions.contributer_id
WHERE contributions.story_id = $1
  AND contributions.story_step = (
    SELECT COALESCE( MAX(c2.story_step), 0) + 1
    FROM contributions AS c2
    WHERE c2.story_id = $1
      AND c2.picked = TRUE
  )
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

const editThisContribution = (contributionId) => {
  const [id] = contributionId;
  const query = `
  SELECT * FROM contributions WHERE id = $1`;
  return db
    .query(query, [contributionId])
    .then((result) => {
      return result.rows[0].id;
    })
    .catch((error) => {
      console.error("Error saving contribution:", error);
      throw error; // Propagate the error
    });
};

//saves a new story contribution
const saveContributions = (newContribution) => {
  const { story_id, content, contributer_id } = newContribution;
  const query = `
    INSERT INTO contributions (
      story_id,
      story_step,
      content,
      picked,
      contributer_id,
      created_date,
      picked_date
    )
    VALUES (
      $1,
      (
        SELECT COALESCE(MAX(story_step), 0) + 1
        FROM contributions
        WHERE story_id = $1 AND picked = TRUE
      ),
      $2,
      false,
      $3,
      NOW(),
      NOW()
    )
    RETURNING id
  `;

  return db
    .query(query, Object.values(newContribution))
    .then((result) => {
      return result.rows[0].id;
    })
    .catch((error) => {
      console.error("Error saving contribution:", error);
      throw error; // Propagate the error
    });
};

//edit contributions
const editContributions = (contribution) => {
  const { content, id } = contribution;
  const query =
    "UPDATE contributions SET content = $1 WHERE contributions.id = $2 RETURNING *";

  return db
    .query(query, Object.values(contribution))
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error("Error saving contribution:", error);
    });
};

//delete contributions
const deleteContributions = (contribution) => {
  const [ id ] = contribution;
  const query = "DELETE FROM contributions WHERE id = $1";

  return db
    .query(query, [contribution])
    .then((result) => {
      return true;
    })
    .catch((error) => {
      console.error("Error deleting contribution:", error);
    });
};

//picks contribution -> only to be used by story_creator -> updates to come
const pickContribution = (contributionId) => {
  const updateContributionQuery = `
    UPDATE contributions
    SET picked = true
    WHERE id = $1
    RETURNING story_id, content
  `;

  return db
    .query(updateContributionQuery, [contributionId])
    .then((result) => {
      const { story_id, content } = result.rows[0];
      const updateStoryQuery = `
        UPDATE stories
        SET content = content || $1
        WHERE id = $2
      `;
      return db.query(updateStoryQuery, [content, story_id]);
    })
    .catch((error) => {
      console.error("Error picking contribution:", error);
      throw error; // Propagate the error to the caller
    });
};

module.exports = {
  getContributions,
  editThisContribution,
  saveContributions,
  editContributions,
  deleteContributions,
  pickContribution,
};
