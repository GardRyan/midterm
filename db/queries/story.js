//require('dotenv').config();
const db = require("../connection");

//returns story for storyId
const getStoryById = (storyId) => {
  let queryParams = [storyId];
  let queryString = `
      SELECT *
      FROM stories
      JOIN users ON users.id = stories.creator_id
      WHERE stories.id = $1
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
    "INSERT INTO stories (title, content, creator_id, completed, created_date, completed_date, public, deleted) VALUES ($1, $2, $3, $4, NOW(), null, $5, $6) RETURNING *";

  return db
    .query(query, [
      Object.values(newStory),
    ])
    .then((result) => {
      return result.rows[0].id;
    })
    .catch((error) => {
      console.error("Error saving contribution:", error);
    });
};

const editStory = (story) => {
  const { title, content, id} = story;
  const query =
    "UPDATE stories SET title = $1 AND content = $2  WHERE id = $3 RETURNING *";

  return db
    .query(query, Object.values(story))
    .then((result) => {

      return result.rows[0];
    })
    .catch((error) => {
      console.error("Error saving contribution:", error);
    });
};

const deleteStory = (story) => {
  const { id } = story;
  const query = "UPDATE stories SET deleted = true WHERE id = $1 RETURNING *";

  return db
    .query(query, Object.values(story))
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error("Error deleting story:", error);
    });
};

module.exports = {
  getStoryById,
  saveStory,
  editStory,
  deleteStory,
};
