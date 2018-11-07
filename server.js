// so we can use environment variables from a .env file
require('dotenv').config()

//require the just installed express app
const express = require('express');

//invoke express. Henseforth, app = express
const app = express();

// to get the day of the week
const moment = require('moment');

const todo = require("./routes/todo")


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
// What's this mean?
app.use(bodyParser.urlencoded({ extended: true }));




// **********************************
// index route
// 1) render the ejs
// 2) display added task, task(index.ejs) = task(array)
// **********************************
// app.get('/', function (req, res) {
//   res.send(`Hello World. Let's make a todo app`);
// });



app.use("/todo", todo);

app.use((err, req, res, next) => {
  res.json(err);
});


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
});







module.exports = app;
