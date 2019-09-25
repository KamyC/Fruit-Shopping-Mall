//jshint esversion:8

const express = require("express");
var session = require('express-session');

var app = express();

app.get("/", function(req, res) {
  req.session.destroy();
  res.redirect("/");
});


module.exports = app;
