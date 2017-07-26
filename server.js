const fs = require('fs')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res) {
    // res.send('Hello World!')
    res.sendFile(__dirname + '/index.html')
})

app.use(express.static('.'));

app.get('/db', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(fs.readFileSync(__dirname + '/js/db.json'))
    // res.send(require(__dirname + '/js/db.json'));
})
app.post('/db', function (req, res, data) {
    // res.send('Got a PUT request at /user')
    // res.send(JSON.stringify(req))
    // console.log(req.body)
    // res.send(req.body)
    fs.writeFileSync(__dirname + '/js/db.json', JSON.stringify(req.body))
    res.send("ok")
})

// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!')
// })

io.on('connection', function(socket) {
    socket.on('update_map', function(msg){
        io.emit('update_map', msg)
    })
})

http.listen(3000, function(){
    console.log('listen on 3000')
})