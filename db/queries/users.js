
require('dotenv').config();
const db = require('../connection');

//get list of all users query
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    })
    .catch((error) => {
      console.log(error);
      throw (error);
    });
};

//get one user by id query
const getUser = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [id])
    .then(data => {
      return data.rows[0];
    })
    .catch((error) => {
      console.log(error);
      throw (error);
    });
};

//get one user by id query
const getUserByUsername = (username) => {
  const _username = `${username}`;
  return db.query('SELECT * FROM users WHERE username = $1;', [_username])
    .then(data => {
      return data.rows[0];
    })
    .catch((error) => {
      console.log(error);
      throw (error);
    });
};

//get query parameters for update/insert
const getQueryParams = function(user) {
  let queryParams = [];
  queryParams.push(`${user.username}`);
  queryParams.push(`${user.email}`);
  queryParams.push(`${user.first_name}`);
  queryParams.push(`${user.last_name}`);
  queryParams.push(`${user.password}`);
  if (user.id) {
    queryParams.push(user.id);
  }
  return queryParams;
};

//update user query
const updateUser = (user) => {
  return db
    .query(`
      UPDATE users 
      SET username = $1, email = $2, first_name = $3, last_name = $4, password = $5 
      WHERE id = $6
      RETURNING *;
      `, getQueryParams(user))
    .then(data => {
      return data.rows[0];
    })
    .catch((error) => {
      console.log(error);
      throw (error);
    });
};

//insert user query
const insertUser = (user) => {
  return db.query(`
      INSERT INTO users (username, email, first_name, last_name, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `,getQueryParams(user))
    .then(data => {
      return data.rows[0];
    })
    .catch((error) => {
      console.log(error);
      throw (error);
    });
};

module.exports = { getUsers, getUser, getUserByUsername, updateUser, insertUser};