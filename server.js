// so we can use environment variables from a .env file
require('dotenv').config()

//require the just installed express app
const express = require('express');

//invoke express. Henceforth, app = express
const app = express();

// ==================================
// CORS
// npm package to allow cross origin resource sharing
// ==================================
const cors = require('cors')

// ==================================
// body-parser middleware allows us to make use of the
// key-value pairs stored on the req-body object.
// TLDR: makes forms work
// ==================================
const bodyParser = require('body-parser');

const db = require('./queries')

const { DATABASE_URL } = process.env;


        // ****** Heroku or local database connection ************

        const client = require('./config/dbConfig');

        // client.connect() is connecting to the local OR Heroku database,
        // depending on which environment we're in.
        client.connect();

        client.query('SELECT * FROM todos;', (err, res) => {
          if (err) throw err;
          for (let row of res.rows) {
            console.log(JSON.stringify(row));
            // console.log("hello from Heroku client.query");
          }
        });

        // ******* Heroku or local database connection ************


app.use(bodyParser.json({extended: true}));

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


// what's this? get rid of it
// app.use((err, req, res, next) => {
//   res.json(err);
// });


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
const PORT = process.env.PORT || 8888;

// ==================================
// Listening Port
// ==================================
app.listen(PORT, function () {
  console.log(`Hello todoodles! Listening on port: ${PORT}!`)
  console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
  console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`)
  console.log(`process.env.DATABASE: ${process.env.DATABASE}`)
});


module.exports = app;
