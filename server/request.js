var mysql = require("mysql");
var nodemailer = require('nodemailer');

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

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'mahimahitubes@gmail.com',
                    pass: 'mahimahimahi'
                }
            });

            var mailOptions = {
                from: 'mahimahitubes@gmail.com',
                to: 'kevinryanwijaya@gmail.com',
                subject: 'New Dorayaki Request To Factory',
                text: `A new request for ${response.jumlah} ${response.nama_dorayaki} was by someone with ip address ${response.ip} on ${response.timestamp}`
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

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
    var current_timestamp = new Date(timestamp + (420*60000));
    var condition_timestamp = new Date(timestamp + (420*60000) - (1*60000));
    console.log(condition_timestamp);
    const threshold = 1;
    var success;

    await(new Promise((resolve, _reject) => {
        connection.query('SELECT COUNT(*) AS logCount FROM request_log WHERE ip=? AND endpoint=? AND timestamp > ?', [response.ip,response.endpoint,condition_timestamp], function(error, results) {
            if (error) throw error
            else {
                if(results[0].logCount < threshold) {
                        connection.query('INSERT INTO request_log VALUES (?,?,?)', [response.ip,response.endpoint,current_timestamp], function(error2, results2) {
                            if (error2) throw error2
                            else {
                                console.log("request successfully added to log");
                                connection.query("UPDATE request SET status=420 WHERE request_name = ?", [response.request_name], function(error3, results3){
                                    if (error3) throw error3
                                    else {
                                        console.log("status changed to 420");
                                    }
                                });
                            }
                        });
                    success = 1;
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