function addRequest(connection, response) {
    connection.query('INSERT INTO request VALUES (?,?,?,?)', [response.nama_dorayaki,response.jumlah,response.status,response.timestamp], function(error, results) {
        if (error) {
            success = 0;
        }
        else success = 1;
    });

    return success;
}

function acceptRequest(connection, response) {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const threshold = 10;
    responseStr = '';
    connection.query('SELECT COUNT(*) AS logCount FROM request_log WHERE ip=? AND endpoint=? AND timestamp>(?-?)', [response.ip,response.endpoint,timestamp-(timestamp-response.timestamp)], function(error, results) {
        if (error) throw error
        else {
            if(results[0].logCount < threshold) {
                connection.query('INSERT INTO request_log VALUES (?,?,?)', [response.ip,response.endpoint,response.timestamp], function(error2, results2) {
                    if (error2) throw error2
                    else {
                        responseStr = "success adding to request";
                    }
                });
            } else {
                responseStr = "request for this minute has reached threshold value";
            }
        }
    });

    return responseStr;
}

module.exports = { addRequest, acceptRequest };