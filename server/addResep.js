function addResep(connection, response) {
    connection.query('INSERT INTO resep VALUES (?,?,?)', [response.nama_resep, response.nama_bahan, response.jumlah], function(error, results) {
        if (error) {
            success = 0;
        }
        else success = 1;
    });

    return success;
}

module.exports = { addResep };