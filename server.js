// so we can use environment variables from a .env file
require('dotenv').config()

//require the just installed express app
const express = require('express');

//invoke express. Henceforth, app = express
const app = express();

// All routes are in /routes - not using
// const routes = require('./routes');

const db = require('./queries')

const { DATABASE_URL } = process.env;

const bodyParser = require('body-parser');
const cors = require('cors')

// ==================================
// Axios - npm package promise based HTTP client
// Do I need to be requireing axios here, or only in Client?
// ==================================
const axios = require('axios');





// ==================================
// body-parser middleware allows us to make use of the
// key-value pairs stored on the req-body object.
// ==================================
app.use(bodyParser.json({extended: true}));

// ==================================
// CORS
// npm package to allow cross origin resource sharing
// ==================================
app.use(cors())


// **********************************
// index route
// **********************************
app.get('/', (request, response) => {
  response.json({ appInfo: 'Todoodles API. What are you going todo?' });
  console.log("Hello World")
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


        // Heroku ****************************************

        const { Client } = require('pg');

        const client = new Client({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });

        // client.connect results in local error "Error: The server does not support SSL connections"
        client.connect();

        client.query('SELECT * FROM todos;', (err, res) => {
          if (err) throw err;
          for (let row of res.rows) {
            console.log(JSON.stringify(row));
            console.log("hello from client.query");
          }
          client.end();
        });

        // Heroku ****************************************

// ==================================
// Set the port from an environmental variable or manually
// Use it below in app.listen
// ==================================
const PORT = process.env.PORT || 8888;

// ==================================
// Listening Port
// ==================================
app.listen(PORT, function () {
  console.log(`Hello todoodles! Listening on port: ${PORT}!`)
  console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
  console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`)
  console.log(`process.env.USER: ${process.env.USER}`)
  console.log(`process.env.DATABASE: ${process.env.DATABASE}`)
  console.log(`process.env.PW: ${process.env.PW}`)
  console.log(`process.env.DB_PORT: ${process.env.DB_PORT}`)
  console.log(`process.env.PORT: ${process.env.PORT}`)
});


module.exports = app;
