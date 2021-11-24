var mysql = require("mysql");

async function getResep(response) {
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
    var responseStr;

    await(new Promise((resolve, _reject) => { 
        connection.query('SELECT nama_bahan, jumlah FROM resep WHERE nama_resep=?', [response.nama_resep], function(error, results) {
            if (error) throw error;

            responseStr = JSON.stringify(results);

            if (responseStr.length == 0)
                responseStr = 'No records found';

            resolve();
        });
    }));

    return responseStr;
}

module.exports = { getResep };