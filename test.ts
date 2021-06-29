import { HOTP, TOTP, base32 } from './index';

console.log('HOTP code generate test:', HOTP.generate({ key: 'test' }));

console.log('HOTP code validator test (current code passed, null = fail):', HOTP.validate({
  token: HOTP.generate({ key: 'test' }),
  key: 'test',
}));

console.log('HOTP code validator test (fake code passed, null = fail):', HOTP.validate({
  token: 'fakeee',
  key: 'test',
}));

console.log('TOTP code generate test:', TOTP.generate({ key: 'test' }));

console.log('TOTP code validator test (current code passed, null = fail):', TOTP.validate({
  token: TOTP.generate({ key: 'test' }),
  key: 'test',
}));

console.log('TOTP code validator test (fake code passed, null = fail):', TOTP.validate({
  token: 'fakeee',
  key: 'test',
}));

console.log('base32 converter (no padding)', base32('test'));
