var mysql = require("mysql");
var express = require("express");
var login = require("./server/login.js")
const register = require("./server/login");
const { response } = require("express");

var app = express();
var port = process.env.PORT || 8005;
var responseStr = "MySQL Data:";

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

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

app.post('/login', async function(req,res) {
    var responseStr = await login.login(req.body);

    res.json(JSON.parse(responseStr));
});

app.get('/register', function(req,res) {
    console.log('register');
    // register.register(connection, response);
});

connection.end();

app.listen(port, function(){
    console.log('Listening on port ' + port);
});
