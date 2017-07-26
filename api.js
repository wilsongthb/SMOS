var express = require('express');
var mysql = require('mysql');
var mysqltorest  = require('mysql-to-rest');
var app = express();

// MYSQL
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'SMOS'
});

connection.connect();
// MYSQL

var api = mysqltorest(app,connection);
//Dont forget to start the server
app.listen(8000);