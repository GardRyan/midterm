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

//saves a new story
const saveStory = (newStory) => {
  const {
    title,
    content,
    creator_id,
    completed,
    created_date,
    completed_date,
    public,
    deleted,
  } = newStory;
  const query =
    "INSERT INTO stories (title, content, creator_id, completed, created_date, completed_date, public, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

  return db
    .query(query, [
      title,
      content,
      creator_id,
      completed,
      created_date,
      completed_date,
      public,
      deleted,
    ])
    .then((result) => {
      return result.rows[0].id;
    })
    .catch((error) => {
      console.error("Error saving contribution:", error);
    });
};

const editStory = (story) => {
  const { id, content } = story;
  const query =
    "UPDATE stories SET content = $1 WHERE id = $2 RETURNING *";

  return db
    .query(query, [id, content])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error("Error saving contribution:", error);
    });
};

const deleteStory = (story) => {
  const { id } = story;
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

module.exports = {
  getStoryById,
  saveStory,
  editStory,
  deleteStory,
};
