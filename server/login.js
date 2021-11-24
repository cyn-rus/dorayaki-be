var CryptoJS = require("crypto-js");
var mysql = require("mysql");

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
    let responseStr = "";
    
    await(new Promise((resolve, _reject) => {
        connection.query('SELECT username FROM users WHERE username = ? AND password = ?', [response.username, encrypted], function(error, results) {
            if (error) throw error;

            responseStr = results

            resolve();
        });
    }));

    return responseStr;
}

module.exports = { login };