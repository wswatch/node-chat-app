var generateMessage = function(from, text) {
  return {
    from,
    text,
    createAt: new Date().getTime()
  };
}

module.exports = {generateMessage};
