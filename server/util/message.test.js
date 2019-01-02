var expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should generate a correct message', () => {
    var from = 'John';
    var text = 'This is a test';
    var message = generateMessage(from, text);

    expect(typeof message.createAt).toBe('number');
    expect(message).toMatchObject({from, text});

  });
})

describe('generateLocationMessage', ()=>{
  it('should generate a correct location message', ()=>{
    var from = 'Bob';
    var latitude = 10;
    var longitude = 20;
    var url = "http://google.com/maps?q="+`${latitude},${longitude}`;
    var mes = generateLocationMessage(from, latitude, longitude);
    expect(mes).toMatchObject({from, url});
    expect(typeof mes.createAt).toBe('number');
  })
})
