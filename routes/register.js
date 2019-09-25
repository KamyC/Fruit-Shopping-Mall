//jshint esversion:8

const express = require("express");
var session = require('express-session');
const mysql = require("mysql");
var db = require("../database");

var app = express();


app.get("/", function(req, res) {
res.sendFile(__dirname + "/register.html");
});

app.post("/", function(req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if (password == password2) {

    res.sendFile(__dirname + "/login.html");
    var sql = "INSERT INTO usersTable (fname,lname,password,username) VALUES ('" + fname + "','" + lname + "','" + password + "','" + username + "')";
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      console.log(fname + " " + lname + " " + password);

    });
  } else {
    res.send("Passwords don't match. Please try again!");
    res.end();
  }
});

module.exports = app;
