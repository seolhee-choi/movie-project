const express = require('express')
const app = express()
const path = require('path')
const port = 8080

app.listen(port, function() {
    console.log(`listening on ${port}`)
})

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})



//React Router를 쓰기 위한 선언
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

