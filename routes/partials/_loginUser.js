const db = require('../../db/queries/users');
const _400ErrorMessage = "Invalid request";
const _401ErrorMessage = "Please log in to access this page";
const _402ErrorMessage = "Payment required";
const _403ErrorMessage = "Access not allowed";
const _404ErrorMessage = "Does not exist";
const _500ErrorMessage = "An error has occurred on the server ";

const getStyleSheetsFromSessionCookie = function(sessionCookie) {
  let styleSheets = { colour: "colour-light.css" };
  if ((sessionCookie) && (sessionCookie.styleSheets) && (sessionCookie.styleSheets.colour)) {
    styleSheets.colour = sessionCookie.styleSheets.colour;
  }
  return styleSheets;
};

//take the id of the logged in user and return the logged in user
const runWithLoginUser = function(sessionCookie, loggedInId, callback) {
  let styleSheets = getStyleSheetsFromSessionCookie(sessionCookie);
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

//render an error message to a BLANK PAGE, after making sure we have a valid status code
// only starting with the error codes we are most likely to use
const renderErrorMessage = function(res, loginInfo, statusCode, message) {
  switch (statusCode) {
  case 400:
    res.status(statusCode).render('blank', { loginInfo, message: message === undefined ? _400ErrorMessage : message });
    break;
  case 401:
    res.status(statusCode).render('blank', { loginInfo,  message: message === undefined ? _401ErrorMessage : message });
    break;
  case 402:
    res.status(statusCode).render('blank', { loginInfo,  message: message === undefined ? _402ErrorMessage : message });
    break;
  case 403:
    res.status(statusCode).render('blank', { loginInfo,  message: message === undefined ? _403ErrorMessage : message });
    break;
  case 404:
    res.status(statusCode).render('blank', { loginInfo,  message: message === undefined ? _404ErrorMessage : message });
    break;
  default:
    res.status(500).render('blank', { loginInfo,  message: message === undefined ? _500ErrorMessage : message });
    break;
  }
};

const sendJsonErrorMessage = function(res, statusCode, message) {
  switch (statusCode) {
  case 400:
    res.status(400).json({ error: message === undefined ? _400ErrorMessage : message });
    break;
  case 401:
    res.status(401).json({ error: message === undefined ? _401ErrorMessage : message });
    break;
  case 402:
    res.status(402).json({ error: message === undefined ? _402ErrorMessage : message });
    break;
  case 403:
    res.status(431).json({ error: message === undefined ? _403ErrorMessage : message });
    break;
  case 404:
    res.status(404).json({ error: message === undefined ? _404ErrorMessage : message });
    break;
  default:
    res.status(500).json({ error: message === undefined ? _500ErrorMessage : message });
    break;
  }
};

// a function to validate that the user from the route matches the user logged in
// and display an appropriate message if no
const validRequestForUser = function(res, loginInfo, userId) {
  const userIdNum = Number(userId);
  if (loginInfo.loggedInUser === undefined) {
    renderErrorMessage(res, loginInfo, 401);
    return false;
  }
  if (Number.isNaN(userIdNum)) {
    renderErrorMessage(res, loginInfo, 400);
    return false;
  }
  if (Number(loginInfo.loggedInUser.id) !== userIdNum) {
    renderErrorMessage(res, loginInfo, 403);
    return false;
  }
  return true;
};

module.exports = { runWithLoginUser, renderErrorMessage, validRequestForUser, sendJsonErrorMessage };
