[<img src="https://img.shields.io/npm/v/2fa-hotp-totp">](https://www.npmjs.com/package/2fa-hotp-totp) [<img src="https://img.shields.io/npm/l/2fa-hotp-totp">](https://github.com/TABmk/2fa-hotp-totp/blob/master/LICENSE) [<img src="https://img.shields.io/npm/dm/2fa-hotp-totp">](https://www.npmjs.com/package/2fa-hotp-totp) [<img src="https://img.shields.io/bundlephobia/minzip/2fa-hotp-totp">](https://www.npmjs.com/package/2fa-hotp-totp)

__Help__ [<img src="https://img.shields.io/github/issues/tabmk/2fa-hotp-totp">](https://github.com/TABmk/2fa-hotp-totp/issues?q=is%3Aopen+is%3Aissue) [<img src="https://img.shields.io/github/issues-pr/tabmk/2fa-hotp-totp">](https://github.com/TABmk/2fa-hotp-totp/pulls?q=is%3Aopen+is%3Apr)

<p align="center">
  <img src="img/1.png" />
</p>

---

#### __Rate me__ [<img src="https://img.shields.io/github/stars/tabmk/2fa-hotp-totp?style=social">](https://github.com/TABmk/2fa-hotp-totp)

# __2FA-HOTP-TOTP__

Zero-dependency, **<1kB gzipped** [<img src="https://img.shields.io/bundlephobia/minzip/2fa-hotp-totp">](https://www.npmjs.com/package/2fa-hotp-totp)

My implementation of 2FA H/TOTP algorithms in TypeScript + base32 encoder for creating links for authenticator programs like [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)

[Read more](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) about `otpauth://` links
###### Specifications:
- HOTP - [RFC 4226](https://tools.ietf.org/html/rfc4226)
- TOTP - [RFC 6238](https://tools.ietf.org/html/rfc6238)
- Base32 - [RFC 4648](https://tools.ietf.org/html/rfc4648) (without paddings, thanks to [@LinusU](https://github.com/LinusU))

---
You can find compiled .js files on [Releases page](https://github.com/TABmk/2FA-HOTP-TOTP/releases)

---

## __Install__

```
npm i 2FA-HOTP-TOTP

    or

yarn add 2FA-HOTP-TOTP
```

## __Usage__

#### Import
```
import { TFA } from '2FA-HOTP-TOTP';
   OR
const { TFA } = require('2FA-HOTP-TOTP');
```
#### HOTP
###### Generate
```
TFA.HOTP.generate({
  key: 'test',
  counter: 0, // optional
});

// => 941117
```
###### Validate
```
TFA.HOTP.validate({
  token: '123123', // length must be 6
  key: 'test',
  window: 1,       // optional
  counter: 0,      // optional
});

// => time-step (number) or null
```

#### TOTP
###### Generate
```
TFA.TOTP.generate({
  key: 'test',
  time: 30, // optional
});

// => 432486
```
###### Validate
```
TFA.TOTP.validate({
  token: '123123', // length must be 6
  key: 'test',
  window: 1,       // optional
  time: 30,        // optional
});

// => time-step (number) or null
```

#### Base32
```
TFA.base32('test');

// => ORSXG5A
```

## __Description__

*All code also covered with JSDoc with links to specifications and its pages*

#### HOTP
Implementation of [RFC 4226](https://tools.ietf.org/html/rfc4226)

*HOTP(K,C) = Truncate(HMAC-SHA-1(K,C))*

###### HOTP.generate
Arguments (object):

|obj.*|Required|Description|Default|
|---|---|---|---|
|`key`|✅|unique secret key for user||
|`counter`|❌|moving factor ([read page 6](https://tools.ietf.org/html/rfc4226))|0|


Returns **string** of 6 int, because it must be always 6 ing length and first can be zero

###### HOTP.validate
Arguments (object):

|obj.*|Required|Description|Default|
|---|---|---|---|
|`token`|✅|code, provided by user||
|`key`|✅|unique secret key for user||
|`window`|❌|counter values window|1|
|`counter`|❌|moving factor ([read page 6](https://tools.ietf.org/html/rfc4226))|0|

Returns **null** if nothing found or number between `-window to +window` if same code in steps found

###### What is `window`:

For example, if you using TOTP (HOTP with time) with 0 window, only current XX (30 by default) second code will be checked for verification. If you set 1, neighboring seconds code (+30 and -30) also checked.

One more example with time-step 30 sec:

- window 0 = only `04:20:00 - 04:20:30` will be checked
- window 1 = `04:19:30 - 04:20:00`, `04:20:00 - 04:20:30` and `04:20:30 - 04:21:00` all steps codes (-1, 0, 1) checked

#### TOTP
Implementation of [RFC 6238](https://tools.ietf.org/html/rfc6238)

*TOTP = HOTP(K, T)*

###### TOTP.generate
Arguments (object):

|obj.*|Required|Description|Default|
|---|---|---|---|
|`key`|✅|unique secret key for user||
|`time`|❌|time-step in seconds (default recomended)|30|

Returns **string** of 6 int, because it must be always 6 ing length and first can be zero

###### HOTP.validate
Arguments (object):

|obj.*|Required|Description|Default|
|---|---|---|---|
|`token`|✅|code, provided by user||
|`key`|✅|unique secret key for user||
|`window`|❌|counter values window|1|
|`time`|❌|time-step in seconds (default recomended)|30|

Returns **null** if nothing found or number between `-window to +window` if same code in steps found

[👆 What is `window`](#what-is-window)
