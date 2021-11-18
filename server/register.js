var CryptoJS = require("crypto-js");

function register(connection, response) {
    var encrypted = CryptoJS.AES.encrypt(response.password, "mahi-mahi").toString();
    connection.query('INSERT INTO users VALUES (?,?,?,?)', [response.username,encrypted,response.email,0], function(error, results) {
        if (error) {
            success = 0; 
        }
        else success = 1;
    });

    return success;
}

module.exports = { register };