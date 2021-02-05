import { TFA } from "./index";

console.log('HOTP code generate test:', TFA.HOTP.generate({key: 'test'}));

console.log('HOTP code validator test (current code passed, null = fail):', TFA.HOTP.validate({
  token: TFA.HOTP.generate({key: 'test'}),
  key: 'test',
}));

console.log('HOTP code validator test (fake code passed, null = fail):', TFA.HOTP.validate({
  token: 'fakeee',
  key: 'test',
}));

console.log('TOTP code generate test:', TFA.TOTP.generate({key: 'test'}));

console.log('TOTP code validator test (current code passed, null = fail):', TFA.TOTP.validate({
  token: TFA.TOTP.generate({key: 'test'}),
  key: 'test',
}));

console.log('TOTP code validator test (fake code passed, null = fail):', TFA.TOTP.validate({
  token: 'fakeee',
  key: 'test',
}));

console.log('base32 converter (no padding)', TFA.base32('test'));
