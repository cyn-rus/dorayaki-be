var mysql = require("mysql");
var express = require("express");
const login = require("./server/login");
const register = require("./server/register");
const { response } = require("express");

var app = express();
var port = process.env.PORT || 8005;
var responseStr = "MySQL Data:";

var mysqlHost = process.env.MYSQL_HOST || 'localhost';
var mysqlPort = process.env.MYSQL_PORT || '3307';
var mysqlUser = process.env.MYSQL_USER || 'root';
var mysqlPass = process.env.MYSQL_PASS || 'password';
var mysqlDB = process.env.MYSQL_DB     || 'pabrik_dorayaki';

var connectionOptions = {
    host: mysqlHost,
    port: mysqlPort,
    user: mysqlUser,
    password: mysqlPass,
    database: mysqlDB
};

var connection = mysql.createConnection(connectionOptions);

connection.connect();

app.get('/login', function(req,res) {
    console.log("test");
    console.log(res);
    // login.login(connection, response);
});

app.get('/register', function(req,res) {
    console.log('register');
    // register.register(connection, response);
});

connection.end();

app.listen(port, function(){
    console.log('Listening on port ' + port);
});
