
//jshint esversion:8

const express = require("express");
var session = require('express-session');
const mysql = require("mysql");
var db = require("../database");


var app = express();

 app.get("/", function(req, res) {
  if (!req.session.loggedin) {
    res.sendFile(__dirname + "/login.html");
  } else {
    res.redirect("/dashboard");
  }
});

app.post('/', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    db.query('SELECT * FROM usersTable WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect("/dashboard");
      } else {
        response.send('Incorrect Username and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

module.exports = app;
