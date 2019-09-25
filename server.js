const http = require('http');
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
var session = require('express-session');
const path = require("path");
const path2 = require("path");
const path3 = require("path");
var db = require("./database");
var data;
var login = require("./routes/login");
var register = require("./routes/register");
var logout = require("./routes/logout");
var products = require("./routes/products");
var app = express();

app.set("view-engine", "ejs");

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//reference main html path
app.get("/",function(req,res){
  res.sendFile(path.join(__dirname,'routes/homepage.html'));
})

app.use('/login',login);
app.use('/register',register);
app.use('/logout',logout);
app.use('/auth',login);
app.use('/products',products);

//Handle get requests
app.use(express.static(path2.join(__dirname,"routes")));
app.use(express.static(path3.join(__dirname,"payment")));

app.get("/dashboard", function(req, res) {
  if (req.session.loggedin) {
    res.sendFile(__dirname + "/userdashboard/userdashboard.html");
  } else {
    //res.send('Please login to view this page!');
    res.redirect("/login");
  }
});


app.listen(8082);
