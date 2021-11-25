const { response } = require("express");
var mysql = require("mysql");

async function getBahanBaku(response) {
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

    await(new Promise((resolve, _reject) => {
        connection.query('SELECT * FROM bahan_baku WHERE nama_bahan = ?', [response.nama_bahan], function(error, results) {
            if (error) throw error;

            responseStr = JSON.stringify(results[0]);

            if (responseStr.length == 0)
                responseStr = 'No records found';

            resolve();
        });
    }));

    return responseStr;
}

async function getAllBahanBaku() {
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

    await(new Promise((resolve,_reject) => {
        connection.query('SELECT * FROM bahan_baku', function(error, results) {
            if (error) throw error;

            responseStr = JSON.stringify(results);

            if (responseStr.length == 0)
                responseStr = 'No records found';
            
            resolve();
        });
    }));

    return responseStr;
}

module.exports = { getBahanBaku, getAllBahanBaku };