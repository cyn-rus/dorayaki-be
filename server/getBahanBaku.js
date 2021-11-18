function getBahanBaku(connection, response) {
    connection.query('SELECT * FROM bahan_baku WHERE nama_bahan = ?', [response.nama_bahan], function(error, results) {
        if (error) throw error;

        responseStr = '';

        results.forEach(function(data) {
            respnseStr += data.ITEM_NAME + ' : ';
            console.log(data);
        });

        if (resopnseStr.length == 0)
            responseStr = 'No records found';

        console.log(responseStr);
        results.status(200).send(responseStr);
    });

    return responseStr;
}

module.exports = { getBahanBaku };