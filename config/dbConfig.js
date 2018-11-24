

// This file contains all the connection strings to connect
// to the database server


// old version. delete when sucessfully deployed
// const Pool = require('pg').Pool

// module.exports = process.env.DATABASE_URL || new Pool ({
//   user: process.env.USER,
//   host: process.env.DB_HOST || 'localhost',
//   database: process.env.DATABASE,
//   password: process.env.PW,
//   port: process.env.DB_PORT || 5432,
// })



const Pool = require('pg').Pool

const config = process.env.DATABASE_URL || new Pool ({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PW,
})

module.exports = config;




