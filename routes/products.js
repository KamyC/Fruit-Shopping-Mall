
//jshint esversion:8

const express = require("express");
var session = require('express-session');
const mysql = require("mysql");
var db = require("../database");
var path = require("path");



//var router = express.Router();
var app = express();

app.use(express.static(path.join(__dirname, 'public')));


var cart_data, cart = {};


app.get("/fruits", function(req, res) {
res.sendFile(__dirname + "/fruits.html");

});

app.get("/beverages", function(err, res) {

  res.sendFile(__dirname + "/beverages.html");

});

app.get("/poultry", function(err, res) {
  res.sendFile(__dirname + "/poultry.html");

});

app.get("/seafood", function(err, res) {
  res.sendFile(__dirname + "/seafoods.html");

});

app.get("/vegetables", function(err, res) {
  res.sendFile(__dirname + "/vegetables.html");

});




app.post("/fruits", function(req, res) {
  cart = req.session.cart;
  if (!cart) {
    cart = req.session.cart = {};
  }

  var id = req.body.id;
  var count = parseInt(req.body.count, 10);
  cart[id] = (cart[id] || 0) + count;
  var ids = Object.keys(cart);


  console.log( ids);

  if (ids.length > 0) {
    db.query('SELECT * FROM productDetails WHERE productID IN (' + ids + ') ', function(err, rows) {
      if (err) throw err;
      cart_data = rows;
      res.render('index.jade', {
        title: 'Ecommerce',
        data: data,
        cart_data: rows,
        cart: cart
      });
      //console.log(cart);
    });
  } else {
    res.render('index.jade', {
      title: 'Ecommerce',
      data: data,
      cart_data: cart_data
    });
  }
});

app.post("/vegetables", function(req, res) {
  cart = req.session.cart;
  if (!cart) {
    cart = req.session.cart = {};
  }

  var id = req.body.id;

  var count = parseInt(req.body.count, 10);
  cart[id] = (cart[id] || 0) + count;

  var ids = Object.keys(cart);

  if (ids.length > 0) {
    db.query('SELECT * FROM productDetails WHERE productID IN (' + ids + ') ', function(err, rows) {
      if (err) throw err;
      cart_data = rows;
      res.render('index.jade', {
        title: 'Ecommerce',
        data: data,
        cart_data: rows,
        cart: cart
      });
    });
  } else {
    res.render('index.jade', {
      title: 'Ecommerce',
      data: data,
      cart_data: cart_data
    });
  }
});




module.exports = app;
