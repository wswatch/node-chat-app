const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./util/message');

const port = process.env.PORT || 3000;
const myPath = path.join(__dirname, "..", "public");
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',function(socket){
  console.log('has a new connection!');

  socket.on('disconnect', function(){
    console.log('disconnect to the client.');
  });
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin','New user join'));

  socket.on('createMessage', function(data, callback) {
    io.emit('newMessage', generateMessage(data.from, data.text));
    callback();
  })
  socket.on('createLocation', function(coords) {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  })
});

app.use(express.static(myPath));

server.listen(port, function() {
  console.log('The system start on port', port);
})
