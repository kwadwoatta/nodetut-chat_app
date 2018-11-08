const expect = require ('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var res = generateMessage('Author', 'Hey there');

            expect(res.from).toBe('Author');
            expect(res.text).toBe('Hey there');
            expect(typeof res.createdAt).toBe('number');
        
    });
});

