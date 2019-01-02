var validString = function(str) {
  //console.log(str, typeof str, str.trim());
  if (typeof str === 'string') {
    if (str.trim().length > 0) {
      return str.trim();
    }
  }
  return undefined;
}

module.exports = {validString};
