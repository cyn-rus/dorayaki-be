function getResep(connection, response) {
    connection.query('SELECT * FROM resep WHERE nama_resep= ?', [response.nama_resep], function(error, results) {
        if (error) throw error;

        responseStr = '';

        results.forEach(function(data) {
            responseStr += data.ITEM_NAME + ' : ';
            console.log(data);
        });

        if (responseStr.length == 0)
            responseStr = 'No records found';

        console.log(responseStr);
        results.status(200).send(responseStr);
    });

    return responseStr;
}

module.exports = { getResep };