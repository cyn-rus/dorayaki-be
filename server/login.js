function login(connection, response) {
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [response.username, response.password], function(error, results) {
        if (error) throw error;

        responseStr = '';

        results.forEach(function(data) {
            responseStr += data.ITEM_NAME + ' : ';
            console.log(data);
        });

        if (responseStr.length == 0)
            responstStr = 'No records found';
        
        console.log(responseStr);
        res.status(200).send(responseStr);
    });

    return responseStr
}

module.exports = { login };