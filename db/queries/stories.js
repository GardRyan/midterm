// require('dotenv').config();
const db = require("../connection");

const getOrderBy = (options) => {
  let orderString = "";
  
  if (options.orderUpvotes && options.orderUpvotes.length > 0) {
    if (orderString.length === 0) {
      orderString += `ORDER BY upvotes ${options.orderUpvotes}`;
    } else {
      orderString += `, upvotes ${options.orderUpvotes}`;
    }
  }

  if (options.orderDate && options.orderDate.length > 0) {
    if (orderString.length === 0) {
      orderString += `ORDER BY created_date ${options.orderDate}`;
    } else {
      orderString += `, created_date ${options.orderDate}`;
    }
  }

  return orderString;
};

const getStories = (options) => {
  let queryParams = [];
  console.log("******************************\n options in query \n", options, "\n", "******************************");
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
        WHERE stories.id = upvotes.story_id AND upvotes.vote = TRUE) AS upvotes,
      (SELECT COUNT(*)
        FROM story_votes AS downvotes
        WHERE stories.id = downvotes.story_id AND downvotes.vote = FALSE) AS downvotes
    FROM stories
    JOIN users ON users.id = stories.creator_id
    WHERE TRUE
    `;

  if (options.title && options.title.length > 0) {
    queryParams.push(`%${options.title}%`);
    queryString += ` AND LOWER(title) LIKE LOWER($${queryParams.length})`;
  };

  if (options.username && options.username.length > 0) {
    queryParams.push(`%${options.username}%`)
    queryString += ` AND LOWER(username) LIKE LOWER($${queryParams.length})`;
  };

  if (options.completed && options.completed.length > 0) {
    queryString += ` AND completed = '${options.completed}'`;
  };

  if (options.showMyStories && options.showMyStories.length > 0) {
    queryString += ` AND creator_id = '${options.showMyStories}'`;
  };

  queryString += `
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
      users.username
    ${getOrderBy(options)};
    `;

  return db
    .query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = { getStories };
