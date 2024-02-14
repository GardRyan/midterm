const db = require('../../db/queries/users'); 

const getStyleSheetsFromSessionCookie = function(sessionCookie) {
  let styleSheets = { colour: "colour-light.css" };
  if ((sessionCookie) && (sessionCookie.styleSheets) && (sessionCookie.styleSheets.colour)) {
    styleSheets.colour = sessionCookie.styleSheets.colour;
  }
  
  return styleSheets;
};

//take the id of the logged in user and return the logged in user
const runWithLoginUser = function(sessionCookie, loggedInId, callback) {
  styleSheets = getStyleSheetsFromSessionCookie(sessionCookie);
  if (loggedInId) {
    db.getUser(loggedInId) 
    .then((result) => {
      callback({ loggedInUser: result, styleSheets, loggedInMessage: undefined });
    })
    .catch((error) => {
      console.log(error);
      callback({ loggedInUser: undefined, styleSheets, loggedInMessage: 'No logged in user available.' });
    });
  } else {
    callback({ loggedInUser: undefined, styleSheets, loggedInMessage: 'No logged in user available.' });
  }
};

module.exports = { runWithLoginUser }
