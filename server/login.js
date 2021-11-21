var CryptoJS = require("crypto-js");
var mysql = require("mysql");

async function login(response) {
    var encrypted = CryptoJS.SHA1(response.password).toString();

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
    var responseStr;
    
    await(new Promise((resolve, _reject) => {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [response.username, encrypted], function(error, results) {
            if (error) throw error;

            responseStr = JSON.stringify(results[0]);

            if (responseStr.length == 0)
                responseStr = 'No records found';
            
            resolve();
        });
    }));

    return responseStr;
}

module.exports = { login };