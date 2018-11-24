// so we can use environment variables from a .env file
require('dotenv').config()

//require the just installed express app
const express = require('express');

//invoke express. Henceforth, app = express
const app = express();

const db = require('./queries')

const { DATABASE_URL } = process.env;


    // for Heroku
    // const { Pool } = require('pg');

    // const pool = new Pool({
    //   connectionString: process.env.DATABASE_URL,
    //   ssl: true,
    // });

    // pool.connect();
    // pool.connect() results in Error: The server does not support SSL connections


    // Heroku
    // results in Error: The server does not support SSL connections
    const { Client } = require('pg');

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });

    client.connect();

    client.query('SELECT * FROM todos;', (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      client.end();
    });

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
  response.json({ appInfo: 'Todoodles API' });
  console.log("Hello World todoodles from app.get /")
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
  console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
  console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`)
  console.log(`process.env.USER: ${process.env.USER}`)
  console.log(`process.env.DATABASE: ${process.env.DATABASE}`)
  console.log(`process.env.PW: ${process.env.PW}`)
  console.log(`process.env.DB_PORT: ${process.env.DB_PORT}`)
  console.log(`process.env.PORT: ${process.env.PORT}`)
});


module.exports = app;
