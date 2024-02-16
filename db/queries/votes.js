require('dotenv').config();
const db = require('../connection');

class VotesDb {
  constructor(){
    this._type = ''; //eg story or contribution
  }
  
  //select all votes for the element id
  getVotes = function(id) {
    return db.query(`
      SELECT * 
      FROM ${this._type}_votes 
      WHERE ${this._type}_id = $1;`,
      [id])
      .then(data => {
        return data.rows;
      })
      .catch((error) => {
        console.log(error);
        throw(error);
      });
  };
  
  //select all votes that the user Id has made for this element id
  getVotesByUser = function(id, voterId) {
    return db.query(`
      SELECT * 
      FROM ${this._type}_votes 
      WHERE ${this._type}_id = $1 AND voter_id = $2;`,
      [id, voterId])
      .then(data => {
        return data.rows;
      })
      .catch((error) => {
        console.log(error);
        throw(error);
      });
  };
     
//todo:  we really want to check that we are not allowing multipe upvotes/downvotes for a user
//       rather than trusting the client

  //select one story vote data
  getVote = function(id) {
    return db.query(`
      SELECT * 
      FROM ${this._type}_votes 
      WHERE id = $1;`,
      [id])
      .then(data => {
        return data.rows[0];
      })
      .catch((error) => {
        console.log(error);
        throw(error);
      });
  }
  
  //insert one vote
  insertVote = function(vote) {
    return db.query(`
      INSERT 
      INTO ${this._type}_votes (${this._type}_id, voter_id, vote, deleted)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`,
      [vote[`${this._type}_id`], vote.voter_id, vote.vote, vote.deleted])
      .then(data => {
        return data.rows[0];
      })
      .catch((error) => {
        console.log(error);
        throw(error);
      });
  }
  
  //update one vote
  updateVote = function(vote) {
    return db.query(`
      UPDATE ${this._type}_votes
      SET ${this._type}_id = $1, voter_id=$2, vote=$3, deleted=$4
      WHERE id = $5
      returning *;`,
      [vote[`${this._type}_id`], vote.voter_id, vote.vote, vote.deleted, vote.id])
      .then(data => {
        return data.rows[0];
      })
      .catch((error) => {
        console.log(error);
        throw(error);
      });
  }
  
  //delete one vote
  deleteVote = function(vote) {
    return db.query(`
      UPDATE ${this._type}_votes
      SET deleted = true
      WHERE id = $1
      returning *;`,
      [vote.id])
      .then(data => {
        return data.rows[0];
      })
      .catch((error) => {
        console.log(error);
        throw(error);
      });
  }
}

module.exports = { VotesDb }