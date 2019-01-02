var socket = io();
socket.on('connect', function(){
  console.log('connect to server');
});
socket.on('disconnect', function() {
  console.log('disconnect the server!');
});
socket.on('newMessage', function(data) {
  console.log('new Message', data);
  var li = $("<li></li>");
  li.text(`${data.from}: ${data.text}`);
  $("#messages").append(li);
});
// socket.emit('createMessage', {
//   from: 'Tom',
//   text: 'Message from client'
// }, function(data){
//   console.log("The information mark", data);
// })

$("#message-form").on("submit", function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $("[name=message]").val()
  }, function() {

  });
});
