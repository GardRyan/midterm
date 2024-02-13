const db = require('../../db/queries/users'); 

//take the id of the logged in user and return the logged in user
const runWithLoginUser = function(loggedInId, callback) {
  if (loggedInId) {
    db.getUser(loggedInId) 
    .then((result) => {
      console.log('result',result);
      callback({ loggedInUser: result, loggedInMessage: undefined });
    })
    .catch((error) => {
      console.log(error);
      callback({ loggedInUser: undefined, loggedInMessage: 'No logged in user available.' });
    });
  } else {
    callback({ loggedInUser: undefined, loggedInMessage: 'No logged in user available.' });
  }
};

module.exports = { runWithLoginUser }
