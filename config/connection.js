
// using this?

// Connect pg-promise to the database
// Require pg-promise (invoke here)
const pgp = require('pg-promise')();

// Require the plain object from './dbConfig.js'.
// We will pass this to pgp to connect to the database
// Log this to make sure it has all the properties we expect / that we exported correctly
const config = require('./dbConfig');

// Connect to the database
const db = pgp(process.env.DATABASE_URL || config);

const { Pool } = require('pg');
let pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

module.exports = pool;
module.exports = db;
