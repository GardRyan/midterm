//require('dotenv').config();
const db = require('../connection');

const getContributions = () => {
  return db.query('SELECT * FROM contributions;')
    .then(data => {
      return data.rows;
    })
    .catch ((error) => {
      console.log(error)
    });
};

const saveContributions = (newContribution) => {
  const { story_id, story_step, content, picked, contributer_id, created_date, picked_date } = newContribution;
  const query = 'INSERT INTO contributions (story_id, story_step, content, picked, contributer_id, created_date, picked_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';

  return db.query(query, [story_id, story_step, content, picked, contributer_id, created_date, picked_date])
    .then((result) => {
      return result.rows[0].id;
    })
    .catch(error => {
      console.error('Error saving contribution:', error);
    });
};

module.exports = { getContributions, saveContributions };
