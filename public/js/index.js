var socket = io();
socket.on('connect', function(){
  console.log('connect to server');
});
socket.on('disconnect', function() {
  console.log('disconnect the server!');
});
socket.on('newMessage', function(data) {
  var li = $("<li></li>");
  li.text(`${data.from}: ${data.text}`);
  $("#messages").append(li);
});

$("#message-form").on("submit", function(e){
  e.preventDefault();
  var box = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: box.val()
  }, function() {
    box.val('')
  });
});

socket.on("newLocationMessage", function(mes){
  var li = $("<li></li>");
  li.text(mes.from+": ");
  var a = $('<a target="_blank">My current Position</a>');
  a.attr("href", mes.url);
  li.append(a);
  $("#messages").append(li);
});

var locationButton = $("#send-location");
locationButton.click(function(){
  //console.log("click the button");
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by the browser!");
  }

  locationButton.attr('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    locationButton.removeAttr('disabled');
  }, function(){
    alert("Fail to get your location!");
    locationButton.removeAttr('disabled');
  })
});
