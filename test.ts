import {
  HOTP,
  TOTP,
  base32,
  generateKey,
} from './index';

const algorithm = process.argv[2] || 'sha512';
const length = Number(process.argv[3]) || 64;
const key = generateKey(length);

console.log(`Constants:
  - algorithm: ${algorithm}
  - length: ${length}
  `);

console.log('###################');

console.log(
  'HOTP code generate test:',
  HOTP.generate({ key: 'test' }),
);

console.log(
  'HOTP code generate with random key and algorithm:',
  HOTP.generate({ key, algorithm }),
);

console.log(
  'HOTP code validator test (current code passed, null = fail):',
  HOTP.validate({
    token: HOTP.generate({ key: 'test' }),
    key: 'test',
  }),
);

console.log(
  'HOTP code validator test (fake code passed, null = fail):',
  HOTP.validate({
    token: 'fakeee',
    key: 'test',
  }),
);

console.log(
  `HOTP code validator test (custom algorithm: ${algorithm}):`,
  HOTP.validate({
    token: HOTP.generate({ key, algorithm }),
    key,
    algorithm,
  }),
);

console.log('###################');

console.log(
  'TOTP code generate test:',
  TOTP.generate({ key: 'test' }),
);

console.log(
  'TOTP code validator test (current code passed, null = fail):',
  TOTP.validate({
    token: TOTP.generate({ key: 'test' }),
    key: 'test',
  }),
);

console.log(
  'TOTP code validator test (fake code passed, null = fail):',
  TOTP.validate({
    token: 'fakeee',
    key: 'test',
  }),
);

console.log('###################');

console.log(`generateKey (${length} length)`, key);

console.log('base32 from generateKey', base32(key));

console.log('base32 converter (no padding)', base32('test'));
