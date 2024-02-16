# StoryWeave
=========

## Description

  StoryWeave is a mutlipage app for creating stories in collaboration with other users. Users who are logged in can create new stories and propose new contributions to stories, they can also vote on stories and contributions. The creator of the stories can then pick which of the contributions append to their story. 

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- bcrypt 5.1.1
- chalk 2.4.2
- cookie-session 2.1.0
- dotenv 2.0.0
- ejs 2.6.2
- express 4.17.1
- morgan 1.9.1
- pg 8.5.0
- sass 1.35.1

## Screenshots


## Created By

Mike Dragert
Ryan Gardner
Jonas Kunz
