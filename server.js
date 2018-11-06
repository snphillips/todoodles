//require the just installed express app
const express = require('express');

//invoke express. Henseforth, app = express
const app = express();

// to get the day of the week
const moment = require('moment');

// ==================================
// body-parser middleware allows us to make use of the
// key-value pairs stored on the req-body object.
// ==================================
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));


// ==================================
// For now, let's use ejs for views
// ==================================
app.set('view engine', 'ejs');


//the task array with initial placeholders for added task
var task = ["buy socks", "practise with nodejs", "laundry", "fix bike"];


// **********************************
// index route
// **********************************
app.get('/', function (req, res) {
  res.render('index');
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
