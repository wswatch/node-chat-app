var generateMessage = function(from, text) {
  return {
    from,
    text,
    createAt: new Date().getTime()
  };
}
var generateLocationMessage = function(from, latitude, longitude) {
  return {
    from,
    url: `http://google.com/maps?q=${latitude},${longitude}`,
    createAt: new Date().getTime()
  }
}
module.exports = {generateMessage, generateLocationMessage};
