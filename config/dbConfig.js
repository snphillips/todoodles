


// This file contains the connection strings to connect
// to the database server


const { Client } = require('pg');

let config;


// IF process.env.DATABASE_URL is present, meaning, if Heroku
// is using it, then use these config variables.
// ELSE, use the local config variables, such as localhost, port 5432 etc.
if (process.env.DATABASE_URL) {

  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }

} else {

    // This is the same as saying: postgres://localhost:5432/...blah blah blah
    config = {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PW,
  }
}

  const client = new Client(
    config);

module.exports = client;
