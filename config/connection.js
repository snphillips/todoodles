// // Connect pg-promise to your database here
// // Require and invoke pg-promise
// const pgp = require('pg-promise')();

// // Require the plain object from './dbConfig.js'.
// // You pass this to pgp to connect to the database
// const config = require('./dbConfig');

// // Connect to the database
// const db = pgp(process.env.DATABASE_URL || config);


// // *************

// const { Pool } = require('pg');
// let pool = new Pool({
//   // this is causing error The server does not support SSL connections
//   // connctionString is receiving undefined
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });


// // *****************

// module.exports = db;
// module.exports = pool;







// Connect pg-promise to your database here
// Require pg-promise (remember to invoke here)
// See http://vitaly-t.github.io/pg-promise/ for more details
const pgp = require('pg-promise')();



// Require the plain object from './dbConfig.js'.
// We will pass this to pgp to connect to the database
const config = require('./dbConfig');



// Connect to the database
const db = pgp(config);



// Export the db
module.exports = db;
