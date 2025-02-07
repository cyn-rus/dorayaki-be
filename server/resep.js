var mysql = require("mysql");

async function addResep(response) {
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
                responseStr = '[]';

            resolve();
        });
    }));

    return responseStr;
}

function parseResep(jsonResponse) {
    var jsonResult = JSON.parse("[]");
    parsedResep = [];

    for (var i = 0; i < jsonResponse.length; i++) {
        var obj = jsonResponse[i];
        namaResep = obj["nama_resep"];
        namaBahan = obj["nama_bahan"];
        jumlah = obj["jumlah"];

        if (!parsedResep.includes(namaResep)) {
            parsedResep.push(namaResep);

            let tmp = `
            {
                "nama_resep":"${namaResep}",
                "data_bahan": [
                    {
                        "nama_bahan":"${namaBahan}",
                        "jumlah":${jumlah}
                    }
                ]
            }
            `
            jsonResult.push(JSON.parse(tmp));

        } else {
            for (var j = 0; j < jsonResult.length; j++) {
                var tmpObj = jsonResult[j];
                console.log(jsonResult);
                
                let tmp2 = `
                {
                    "nama_bahan":"${namaBahan}",
                    "jumlah":${jumlah}
                }
                `

                if (tmpObj["nama_resep"] == namaResep) {
                    console.log(JSON.parse(tmp2));
                    tmpObj["data_bahan"].push(JSON.parse(tmp2));
                }
            }
        }
    }

    return jsonResult;
}

async function getAllResep() {
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
        connection.query('SELECT * FROM resep', function(error, results) {
            if (error) throw error;

            responseStr = JSON.stringify(parseResep(results));

            if (responseStr.length == 0)
                responseStr = '[]';

            resolve();
        });
    }));

    return responseStr;
}

async function getResepNames() {
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
    var listNames = [];

    await (new Promise((resolve, _reject) => {
        connection.query('SELECT DISTINCT nama_resep FROM resep', function(error, results) {
            if (error) throw error;

            for (let i = 0; i < results.length; i++) {
                var obj = results[i];

                listNames.push(obj["nama_resep"]);
            }

            responseStr = JSON.stringify(results);

            if (responseStr.length == 0)
                responseStr = '[]';

            resolve();
        });
    }));
    return listNames;
}

module.exports = { addResep, getResep, getAllResep, getResepNames };