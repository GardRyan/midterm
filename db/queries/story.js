//require('dotenv').config();
const db = require("../connection");

//returns story for storyId
const getStoryById = (storyId) => {
  let queryParams = [storyId];
  let queryString = `
      SELECT
        stories.id,
        stories.title,
        stories.content,
        stories.creator_id,
        stories.completed,
        stories.created_date,
        stories.completed_date,
        stories.public,
        stories.deleted,
        users.username,
        (SELECT COUNT(*)
          FROM story_votes AS upvotes
          WHERE stories.id = upvotes.story_id AND upvotes.vote = TRUE AND upvotes.deleted = FALSE) AS upvotes,
        (SELECT COUNT(*)
          FROM story_votes AS downvotes
          WHERE stories.id = downvotes.story_id AND downvotes.vote = FALSE AND downvotes.deleted = FALSE) AS downvotes
      FROM stories
      JOIN users ON users.id = stories.creator_id
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
        stories.deleted,
        users.username,
        users.id
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

const getNewStoryById = (storyId) => {
  let queryParams = [storyId];
  let queryString = `
      SELECT * FROM stories WHERE stories.id = $1
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
  const { title, content, creator_id } = newStory;

  const query = `INSERT INTO stories (
      title,
      content,
      creator_id,
      completed,
      created_date,
      completed_date,
      public,
      deleted)
      VALUES ($1, $2, $3, false, NOW(), NULL, true, false) RETURNING id`;

  return db
    .query(query, Object.values(newStory))
    .then((result) => {
      console.log(`result`, result);
      return result.rows[0].id;
    })
    .catch((error) => {
      console.error("Error saving Story:", error);
    });
};

const editStory = (story) => {
  const { title, content, id } = story;
  const query =
    "UPDATE stories SET title = $1, content = $2  WHERE id = $3 RETURNING *";

  return db
    .query(query, Object.values(story))
    .then((result) => {
      console.log(`returning`, result.rows[0]);
      return result.rows[0];
    })
    .catch((error) => {
      console.error("Error saving contribution:", error);
    });
};

const deleteStory = (story) => {
  const [id] = story;
  const query = "UPDATE stories SET deleted = true WHERE id = $1";

  return db
    .query(query, [story])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error("Error deleting story:", error);
    });
};

const completeStory = (story) => {
  const [id] = story;
  const query = "UPDATE stories SET completed = true WHERE id = $1";

  return db
    .query(query, [story])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error("Error deleting story:", error);
    });
};

module.exports = {
  getStoryById,
  getNewStoryById,
  saveStory,
  editStory,
  deleteStory,
  completeStory,
};
