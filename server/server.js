const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const port = process.env.PORT || 3000;
const myPath = path.join(__dirname, "..", "public");
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log('has a new connection!');

  socket.on('disconnect', ()=>{
    console.log('disconnect to the client.');
  })
});

app.use(express.static(myPath));

server.listen(port, ()=>{
  console.log('The system start on port', port);
})
