// so we can use environment variables from a .env file
require('dotenv').config()

//require the just installed express app
const express = require('express');

//invoke express. Henceforth, app = express
const app = express();

const db = require('./queries')

const { DATABASE_URL } = process.env;

//  From Heroku instructions
// https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
// *****************
// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

// client.connect();

// client.query('SELECT * FROM todos;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

// ==================================
// CORS
// npm package to allow cross origin resource sharing
// ==================================
const cors = require('cors')
app.use(cors())

// ==================================
// Axios - npm package promise based HTTP client
// ==================================
const axios = require('axios');

// ==================================
// body-parser middleware allows us to make use of the
// key-value pairs stored on the req-body object.
// ==================================
const bodyParser = require("body-parser");
app.use(bodyParser.json({extended: true}));

// **********************************
// index route
// **********************************
app.get('/', (request, response) => {
  console.log("Hello World todoodles")
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// **********************************
// other routes
// **********************************
app.get('/todos', db.getToDos)
app.get('/todos/:id', db.getToDoById)
app.post('/todos', db.createToDo)
app.put('/todos/:id', db.updateToDo)
app.delete('/todos/:id', db.deleteToDo)


app.use((err, req, res, next) => {
  res.json(err);
});


// ==================================
// Error Handlers
// ==================================
app.use((err, req, res, next) => {
  res.json(err);
  res.status(500).send('Oh no a 500 error.')
});

app.use((req, res, next) => {
  res.status(404).send(`Oh no a 404 error. I can't find that.`)
})


// ==================================
// Set the port from an environmental variable or manually
// Use it below in app.listen
// ==================================
const port = process.env.PORT || 8888;

// ==================================
// Listening Port
// ==================================
app.listen(port, function () {
  console.log(`Hello todoodles! Listening on port: ${port}!`)
  console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`)
});


module.exports = app;
