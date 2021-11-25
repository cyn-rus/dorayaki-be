var CryptoJS = require("crypto-js");
var mysql = require("mysql");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

process.env.TOKEN_SECRET;

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, {expiresIn:'1800s'});
}

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, username) => {
        console.log(err)

        if (err) return res.sendStatus (403);

        req.user = username;

        next()
    });
}

async function login(response) {
    var encrypted = CryptoJS.SHA1(response.password).toString();

    var mysqlHost = process.env.MYSQL_HOST || 'mysqldb';
    var mysqlPort = process.env.MYSQL_PORT || '3306';
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
    const res = []
    
    await(new Promise((resolve, _reject) => {
        connection.query('SELECT username FROM users WHERE username = ? AND password = ?', [response.username, encrypted], function(error, results) {
            if (error) throw error;

            if (results.length !== 0) {
                const resJSON = results[0]
                const token = generateAccessToken({ username: resJSON.username })
                resJSON['token'] = token
                res.push(resJSON)
            }

            resolve();
        });
    }));

    return res;
}

module.exports = { login };