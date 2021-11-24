var CryptoJS = require("crypto-js");
var mysql = require("mysql");

async function register(response) {
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

    var encrypted = CryptoJS.SHA1(response.password).toString();
    
    var success;

    await(new Promise((resolve, _reject) => {
        connection.query("SELECT * FROM users WHERE username=?", [response.username], function(error, results) { 
            if(results.length == 0) {
                connection.query('INSERT INTO users VALUES (?,?,?,?)', [response.username,encrypted,response.email,0], function(error, results) {
                    if (error) {
                        success = 0; 
                        console.log(error);
                    }
                    else success = 1;
        
                    resolve();
                });
            } else {
                success = 0;

                resolve();
            }
        });
    }));

    return success;
}

module.exports = { register };