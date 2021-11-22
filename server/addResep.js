var mysql = require("mysql");

async function addResep(response) {
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

    var success;

    await(new Promise((resolve, _reject) => {
        connection.query('INSERT INTO resep VALUES (?,?,?)', [response.nama_resep, response.nama_bahan, response.jumlah], function(error, results) {
            if (error) {
                success = 0;
                console.log(error);
            }
            else success = 1;

            resolve();
        });
    }));

    return success;
}

module.exports = { addResep };