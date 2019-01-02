var expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should generate a correct message', () => {
    var from = 'John';
    var text = 'This is a test';
    var message = generateMessage(from, text);
    
    expect(typeof message.createAt).toBe('number');
    expect(message).toMatchObject({from, text});

  });
})
