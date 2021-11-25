var mysql = require("mysql");
var express = require("express");
var login = require("./server/login.js")
var register = require("./server/register.js");
var resep = require("./server/resep.js");
var getbahanbaku = require("./server/getBahanBaku.js");
var request = require("./server/request.js");
const cors = require('cors')
const { getBahanBaku } = require("./server/getBahanBaku.js");

var app = express();
var port = process.env.PORT || 8005;

app.use(cors())
app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

app.post('/login', async function(req,res) {
    var responseStr = await login.login(req.body);

    res.json(responseStr);
});

app.post('/register', async function(req,res) {
    var responseStr = await register.register(req.body);

    res.json(JSON.parse(responseStr));
});

app.get('/getResep', async function(req,res) {
    var responseStr = await resep.getResep(req.body);

    res.json(JSON.parse(responseStr));
});

app.post('/addResep', async function(req,res) {
    var responseStr = await resep.addResep(req.body);

    res.json(JSON.parse(responseStr));
});

app.get('/getAllResep', async function(req,res) {
    var responseStr = await resep.getAllResep(req.body);

    res.json(JSON.parse(responseStr));
})

app.get('/getBahanBaku', async function(req,res) {
    var responseStr = await getbahanbaku.getBahanBaku(req.body);

    res.json(JSON.parse(responseStr));
});

app.post('/addRequest', async function(req,res) {
    var responseStr = await request.addRequest(req.body);

    res.json(JSON.parse(responseStr));
});

app.post('/acceptRequest', async function(req,res) {
    var responseStr = await request.acceptRequest(req.body);

    res.json(JSON.parse(responseStr));
});

app.listen(port, function(){
    console.log('Listening on port ' + port);
});
