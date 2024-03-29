// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cookieSession(
  {
    name: 'session',
    keys: ['keyfjkdla', 'keyklenxc','keymflewo']
  }
));

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const contributionVotesApiRoutes = require('./routes/contributionVotes-api');
const storiesApi = require('./routes/stories-api');
const storyVotesApiRoutes = require('./routes/storyVotes-api');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const homeRoutes = require('./routes/home');
const storiesRoutes = require('./routes/stories');
const storyRoutes = require('./routes/story');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/users', usersRoutes);
app.use('/api/contributionVotes', contributionVotesApiRoutes);
app.use('/api/stories', storiesApi);
app.use('/api/storyVotes', storyVotesApiRoutes);

// Note: mount other resources here, using the same pattern above

app.use('/login', loginRoutes);
app.use('/stories', storiesRoutes);
app.use('/story', storyRoutes);
app.use('/', homeRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`StoryWeave app composing stories on port ${PORT}`);
});
