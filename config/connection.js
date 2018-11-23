// Are you using this file for Heroku?



// Connect pg-promise to your database here
// Require and invoke pg-promise
const pgp = require('pg-promise')();

// Require the plain object from './dbConfig.js'.
// We will pass this to pgp to connect to the database
// Log this to make sure it has all the properties we expect / that we exported correctly
const config = require('./dbConfig');

// Connect to the database
const db = pgp(process.env.DATABASE_URL || config);


// *************

const { Pool } = require('pg');
let pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


// *****************

module.exports = db;
module.exports = pool;
