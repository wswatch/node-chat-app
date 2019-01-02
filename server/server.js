const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./util/message');
const {validString} = require('./util/validation');
const {User} = require('./util/users');

const port = process.env.PORT || 3000;
const myPath = path.join(__dirname, "..", "public");
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new User();

io.on('connection',function(socket){
  console.log('has a new connection!');

  socket.on('Join', function(param, callback) {
    var name = validString(param.name);
    var room = validString(param.room);
    if (name === undefined || room === undefined) {
      callback("The input format is wrong!");
    } else {

      users.removeUser(socket.id);
      users.addUser(socket.id, name, room);

      socket.join(param.room);
      io.to(param.room).emit('updateUserList', users.getUserList(param.room));

      socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
      socket.broadcast.to(param.room).emit('newMessage', generateMessage('Admin',`${param.name} has joined ${param.room}`));
    }
  })

  socket.on('disconnect', function(){

    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} leave the ${user.room}`));
    }
  });


  socket.on('createMessage', function(data, callback) {
    var user = users.getUser(socket.id);
    var txt = validString(data.text);
    console.log(user, txt)
    if (!user || txt === undefined) {
      return;
    }
    io.to(user.room).emit('newMessage', generateMessage(user.name, txt));
    callback();
  })
  socket.on('createLocation', function(coords) {
    var user = users.getUser(socket.id);
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
  })
});

app.use(express.static(myPath));

server.listen(port, function() {
  console.log('The system start on port', port);
})
