"use strict";
exports.__esModule = true;
var index_1 = require("./index");
console.log('HOTP code generate test:', index_1.TFA.HOTP.generate({ key: 'test' }));
console.log('HOTP code validator test (current code passed, null = fail):', index_1.TFA.HOTP.validate({
    token: index_1.TFA.HOTP.generate({ key: 'test' }),
    key: 'test'
}));
console.log('HOTP code validator test (fake code passed, null = fail):', index_1.TFA.HOTP.validate({
    token: 'fakeee',
    key: 'test'
}));
console.log('TOTP code generate test:', index_1.TFA.TOTP.generate({ key: 'test' }));
console.log('TOTP code validator test (current code passed, null = fail):', index_1.TFA.TOTP.validate({
    token: index_1.TFA.TOTP.generate({ key: 'test' }),
    key: 'test'
}));
console.log('TOTP code validator test (fake code passed, null = fail):', index_1.TFA.TOTP.validate({
    token: 'fakeee',
    key: 'test'
}));
console.log('base32 converter (no padding)', index_1.TFA.base32('test'));
