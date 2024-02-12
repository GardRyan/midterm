//require('dotenv').config();
const db = require('../connection');

const getContributions = (storyId) => {
let queryParams = [storyId];
let queryString = `
  SELECT * FROM contributions WHERE contributions.id = $1`
  //   (SELECT COUNT(*)
  //     FROM contribution_votes as upvotes
  //     WHERE contributions.id = upvotes.contributions_id AND upvotes.vote = TRUE) AS upvotes
  //   (SELECT COUNT(*)
  //     FROM contribution_votes as downvotes
  //     WHERE contributions.id = downvotes.contributions_id AND downvotes.vote = FALSE) AS downvotes
  // FROM contributions
  // GROUP BY
  //   contributions.id,
  //   contributions.story_id,
  //   contributions.story_step,
  //   contributions.content,
  //   contributions.picked,
  //   contributions.contributer_id,
  //   contributions.created_date,
  //   contributions.picked_date
;

  return db.query(queryString,queryParams)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch ((error) => {
      console.log(error)
    });
};

const saveContributions = (newContribution) => {
  const { story_id, story_step, content, picked, contributer_id, created_date, picked_date } = newContribution;
  const query = 'INSERT INTO contributions (story_id, story_step, content, picked, contributer_id, created_date, picked_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

  return db.query(query, [story_id, story_step, content, picked, contributer_id, created_date, picked_date])
    .then((result) => {
      return result.rows[0].id;
    })
    .catch(error => {
      console.error('Error saving contribution:', error);
    });
};

//to-do list
//update contributions
//pick contributions by picked attribute
  //pick by story_id, picked = true
  //order by story_step
//get all contributions from unfinished step
  //what is story_step
  //select by story + story_Step
  const getStoryById = () => {
    let queryParams = [];
    let queryString = `
      SELECT *
      FROM stories
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
      return db.query(queryString,queryParams)
        .then(data => {
          if (data.rows.length === 0) {
           throw new Error('story not found');
          }
          return data.rows;
        })
        .catch ((error) => {
          console.log(error)
        });
    };

module.exports = { getContributions, saveContributions, getStoryById};
