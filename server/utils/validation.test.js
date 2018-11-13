const expect = require('expect');

const {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should check if a passed-in string is an actual string', () => {
        var string = isRealString('Joe');
        expect(string).toBe(true);
    })

    it('should reject non-string values', () => {
        var string = isRealString(123);
        expect(string).toBe(false);
    })

    it('should reject strings with only spaces', () => {
        var string = isRealString(' ');
        expect(string).toBe(false);
    })
})