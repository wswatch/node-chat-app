const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


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

  socket.on('createMessage', function(data) {
    io.emit('newMessage', {
      from: data.from,
      text: data.text,
      createAt: new Date().getTime()
    })
  })
});

app.use(express.static(myPath));

server.listen(port, function() {
  console.log('The system start on port', port);
})
