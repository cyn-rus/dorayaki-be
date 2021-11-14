function register(connection, username, password, email) {
    connection.query('INSERT INTO users VALUES (?,?,?,?)', [response.username,response.password,response.email,0], function(error, results) {
        if (error) {
            success = 0; 
        }
        else success = 1;
    })

    return success;
}

module.exports = { register };