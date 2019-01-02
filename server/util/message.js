const moment = require('moment');

var generateMessage = function(from, text) {
  return {
    from,
    text,
    createAt: moment().valueOf()
  };
}
var generateLocationMessage = function(from, latitude, longitude) {
  return {
    from,
    url: `http://google.com/maps?q=${latitude},${longitude}`,
    createAt: moment().valueOf()
  }
}
module.exports = {generateMessage, generateLocationMessage};
