[<img src="https://img.shields.io/npm/v/2fa-hotp-totp">](https://www.npmjs.com/package/2fa-hotp-totp) [<img src="https://img.shields.io/npm/l/2fa-hotp-totp">](https://github.com/TABmk/2fa-hotp-totp/blob/master/LICENSE) <img src="https://badgen.net/npm/types/2fa-hotp-totp">

<img src="https://badgen.net/npm/dt/2fa-hotp-totp">
<img src="https://badgen.net/npm/dm/2fa-hotp-totp">

__Help__ [<img src="https://img.shields.io/github/issues/tabmk/2fa-hotp-totp">](https://github.com/TABmk/2fa-hotp-totp/issues?q=is%3Aopen+is%3Aissue) [<img src="https://img.shields.io/github/issues-pr/tabmk/2fa-hotp-totp">](https://github.com/TABmk/2fa-hotp-totp/pulls?q=is%3Aopen+is%3Apr)

<p align="center">
  <img src="img/1.png" />
</p>

---

#### __Rate me__ [<img src="https://img.shields.io/github/stars/tabmk/2fa-hotp-totp?style=social">](https://github.com/TABmk/2fa-hotp-totp)

# __2FA-HOTP-TOTP__

Zero-dependency <img src="https://badgen.net/bundlephobia/dependency-count/2fa-hotp-totp">

**<1kB gzipped** <img src="https://badgen.net/bundlephobia/minzip/2fa-hotp-totp">

My implementation of 2FA HOTP/TOTP algorithms in TypeScript + base32 encoder for creating links for authenticator programs like [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)

[Read more](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) about `otpauth://` links
###### Specifications:
- HOTP - [RFC 4226](https://datatracker.ietf.org/doc/html/rfc4226)
- TOTP - [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238)
- Base32 - [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648) (without paddings, thanks to [@LinusU](https://github.com/LinusU))

---

You can compile .js files by command `yarn build` or `npm run build`

And test code with `yarn test` or `npm test`

Algorithm and length can be changed in example by passing args (both optional): `yarn test sha256 16`

---
### Last changes
##### Minor v2.1
- New option for choosing algorithm (sha1/sha256/sha512)
- Key now can be passed as Buffer
- `generateKey` function

Thanks [@intech](https://github.com/intech)

---

## __Install__

```
npm i 2fa-hotp-totp

    or

yarn add 2fa-hotp-totp
```

## __Usage__

#### Import
```
import { HOTP, TOTP, base32, generateKey } from '2fa-hotp-totp';
      OR
const { HOTP, TOTP, base32, generateKey } = require('2fa-hotp-totp');
```
#### HOTP
###### Generate
```
HOTP.generate({
  key: 'test',
  algorithm: 'sha512', // optional
  counter: 0,          // optional
});

// => 941117
```
###### Validate
```
HOTP.validate({
  token: '123123',     // length must be 6
  key: 'test',
  algorithm: 'sha512', // optional
  window: 1,           // optional
  counter: 0,          // optional
});

// => time-step (number) or null
```

#### TOTP
###### Generate
```
TOTP.generate({
  key: 'test',
  algorithm: 'sha512', // optional
  time: 30,            // optional
});

// => 432486
```
###### Validate
```
TOTP.validate({
  token: '123123',     // length must be 6
  key: 'test',
  algorithm: 'sha512', // optional
  window: 1,           // optional
  time: 30,            // optional
});

// => time-step (number) or null
```

#### Base32
```
base32('test');

// => ORSXG5A
```
#### generateKey
```
generateKey(64);

// => <Buffer 51 84 24 8d 9a d7 2c 47>
```

## __Description__

*All code also covered with JSDoc with links to specifications and its pages*

#### HOTP
Implementation of [RFC 4226](https://datatracker.ietf.org/doc/html/rfc4226)

*HOTP(K,C) = Truncate(HMAC-SHA-1(K,C))*

*Since [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238), SHA256/SHA512 can be used for generating token

###### HOTP.generate
Arguments (object):

|obj.*|Required|Description|Default|
|---|---|---|---|
|`key`|✅|unique secret key for user||
|`algorithm`|❌|custom algorithm for [crypto.createHmac](https://nodejs.org/api/crypto.html#crypto_crypto_createhmac_algorithm_key_options) (sha1/sha256/sha512)|sha1|
|`counter`|❌|moving factor ([read page 6](https://datatracker.ietf.org/doc/html/rfc4226))|0|


Returns **string** of 6 digit, because it must be always 6 digit length and first can be zero

###### HOTP.validate
Arguments (object):

|obj.*|Required|Description|Default|
|---|---|---|---|
|`token`|✅|code, provided by user||
|`key`|✅|unique secret key for user||
|`algorithm`|❌|custom algorithm for [crypto.createHmac](https://nodejs.org/api/crypto.html#crypto_crypto_createhmac_algorithm_key_options) (sha1/sha256/sha512)|sha1|
|`window`|❌|counter values window|1|
|`counter`|❌|moving factor ([read page 6](https://datatracker.ietf.org/doc/html/rfc4226))|0|

Returns **null** if nothing found or number between `-window to +window` if same code in steps found

###### What is `window`:

For example, if you using TOTP (HOTP with time) with 0 window, only current XX (30 by default) second code will be checked for verification. If you set 1, neighboring seconds code (+30 and -30) also checked.

One more example with time-step 30 sec:

- window 0 = only `04:20:00 - 04:20:30` will be checked
- window 1 = `04:19:30 - 04:20:00`, `04:20:00 - 04:20:30` and `04:20:30 - 04:21:00` all steps codes (-1, 0, 1) checked

#### TOTP
Implementation of [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238)

*TOTP = HOTP(K, T)*

###### TOTP.generate
Arguments (object):

|obj.*|Required|Description|Default|
|---|---|---|---|
|`key`|✅|unique secret key for user||
|`algorithm`|❌|custom algorithm for [crypto.createHmac](https://nodejs.org/api/crypto.html#crypto_crypto_createhmac_algorithm_key_options) (sha1/sha256/sha512)|sha1|
|`time`|❌|time-step in seconds (default recomended)|30|

Returns **string** of 6 digit, because it must be always 6 digit length and first can be zero

###### TOTP.validate
Arguments (object):

|obj.*|Required|Description|Default|
|---|---|---|---|
|`token`|✅|code, provided by user||
|`key`|✅|unique secret key for user||
|`algorithm`|❌|custom algorithm for [crypto.createHmac](https://nodejs.org/api/crypto.html#crypto_crypto_createhmac_algorithm_key_options) (sha1/sha256/sha512)|sha1|
|`window`|❌|counter values window|1|
|`time`|❌|time-step in seconds (default recomended)|30|

Returns **null** if nothing found or number between `-window to +window` if same code in steps found

[👆 What is `window`](#what-is-window)

#### base32
Implementation of [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648) without paddings (thanks to [@LinusU](https://github.com/LinusU))

Can take secret as `string` or `Buffer`

Returns base32 encoded secret as `string`

#### generateKey
Generate random key with length

Optional param `length` (`number`)

Returns hmac as `Buffer` from `generateKeySync`

## Special thanks
To all contributors
 - [@intech](https://github.com/intech)
