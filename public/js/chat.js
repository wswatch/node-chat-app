var socket = io();

var scrollBottom = function() {
  var message = $("#messages");

  var newMessage = message.children("li:last-child");

  var clientHeight = message.prop('clientHeight');
  var scrollTop = message.prop('scrollTop');
  var scrollHeight = message.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
    //console.log(clientHeight, scrollTop, scrollHeight);
    message.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  //console.log('connect to server');
  var param = $.deparam(window.location.search);
  socket.emit('Join', param, function(err){
    if (err) {
      window.location.href = "/";
      alert(err);
    } else {
      console.log('success!');
    }
  })
});
socket.on('disconnect', function() {
  //console.log('disconnect the server!');
});
socket.on('updateUserList', function(names) {
  var ol = $('<ol></ol>');

  names.forEach(function (name) {
    ol.append(jQuery('<li></li>').text(name));
  });

  $('#users').html(ol);
})

socket.on('newMessage', function(data) {

  var time = moment(data.createdAt).format('h:mm a');

  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    from: data.from,
    text: data.text,
    createdAt: time
  });
  $("#messages").append(html);
  scrollBottom();
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

  var time = moment(mes.createdAt).format('h:mm a');

  var template = $("#locationMessage-template").html();
  var html = Mustache.render(template, {
    from: mes.from,
    url: mes.url,
    createdAt: time
  });
  $("#messages").append(html);
  scrollBottom();
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
