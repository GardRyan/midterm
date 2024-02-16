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
      return data.rows;
    })
    .catch((error) => {
      console.log(error);
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
    .query(query, [story_id, content, contributer_id,])
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
  const { id, content } = contribution;
  const query =
    "UPDATE contributions SET content = $1 WHERE id = $2 RETURNING *";

  return db
    .query(query, [contribution])
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
  const query = "DELETE FROM contributions WHERE id = $1";
  console.log(`contribution`, contribution);
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
  getContributions,
  saveContributions,
  editContributions,
  deleteContributions,
  pickContribution,
};
