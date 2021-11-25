var mysql = require("mysql");

async function addRequest(response) {
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

    var success;

    await(new Promise((resolve, _reject) => {
        connection.query('INSERT INTO request VALUES (?,?,?,?,?,?,?)', [response.request_name,response.nama_dorayaki,response.jumlah,response.status,response.ip,response.endpoint,response.timestamp], function(error, results) {
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

async function getAllRequest() {
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
        connection.query('SELECT * FROM request', function(error, results) {
            if (error) throw error;

            responseStr = JSON.stringify(results);

            if (responseStr.length == 0) {
                responseStr = 'No records found';
            }

            resolve();
        });
    }));

    return responseStr;
}

async function acceptRequest(response) {
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

    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const threshold = 2;
    var success;

    await(new Promise((resolve, _reject) => {
        connection.query('SELECT COUNT(*) AS logCount FROM request_log WHERE ip=? AND endpoint=? AND timestamp>(?-?)', [response.ip,response.endpoint,timestamp-(timestamp-response.timestamp)], function(error, results) {
            if (error) throw error
            else {
                if(results[0].logCount < threshold) {
                    await(new Promise((resolve, _reject) => {
                        connection.query('INSERT INTO request_log VALUES (?,?,?)', [response.ip,response.endpoint,response.timestamp], function(error2, results2) {
                            if (error2) throw error2
                            else {
                                console.log("request added to log");
                            }
                            resolve();
                        });
                        connection.query("UPDATE request SET status=420 WHERE nama_request = ?", [response.nama_request], function(error2, results2){
                            if (error2) throw error2
                            else {
                                console.log("status changed to 420");
                            }
                        })
                        success = 1;
                    }));
                    resolve();
                } else {
                    console.log("request log is full");
                    success = 0;
                    resolve();
                }
            }
        });
    }));

    return success;
}

module.exports = { addRequest, acceptRequest, getAllRequest };