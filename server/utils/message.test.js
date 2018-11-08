const expect = require ('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var res = generateMessage('Author', 'Hey there');

            expect(res.from).toBe('Author');
            expect(res.text).toBe('Hey there');
            expect(typeof res.createdAt).toBe('number');
        
    });
});

describe('generateLocationMessage', () => {
    it('should generate a correct url and name', () => {
        var res = generateLocationMessage('Joe', 123, 1234);
        expect(res.from).toBe('Joe');
        expect(res.url).toBe('https://www.google.com/maps?q=123,1234');
        expect(typeof res.createdAt).toBe('number');
    })
})

