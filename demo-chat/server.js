// https://www.lynda.com/Node-js-tutorials/Connect-Socket-io-from-browser-app/612195/677560-4.html

var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)


app.use(express.static(__dirname)) // pass in the entire directory to server

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
]

app.get('/messages', (req, res) => {
  res.send(messages)
})

app.post('/messages', (req, res) => {
  messages.push(req.body)
  io.emit('message', req.body) //message is the name of event
  res.sendStatus(200)
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

// With socket.io we can't directly serve our backend with just Express any longer. We will use the Node HTTP server to that way both Express and Socket.io will be running
//i.e. instead of:  var server = app.listen(3000, () => {
var server = http.listen(3000, () => {
  console.log('server is listening on port', server.address().port) // callback
})