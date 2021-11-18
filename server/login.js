var CryptoJS = require("crypto-js");

function login(connection, response) {
    var encrypted = CryptoJS.AES.encrypt(response.password, "mahi-mahi").toString();
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [response.username, encrypted], function(error, results) {
        if (error) throw error;

        responseStr = '';

        results.forEach(function(data) {
            responseStr += data.ITEM_NAME + ' : ';
            console.log(data);
        });

        if (responseStr.length == 0)
            responstStr = 'No records found';
        
        console.log(responseStr);
        results.status(200).send(responseStr);
    });

    return responseStr;
}

module.exports = { login };