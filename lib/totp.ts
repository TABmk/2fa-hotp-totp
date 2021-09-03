import * as HOTP from './hotp';

/**
 * Generate random key with length
 * @param {Number} length key. Default: 64
 * @return {Buffer} key
 */
export const generateKey = ({ length }) => HOTP.generateKey(length);

/**
 * TOTP = HOTP(K, T)
 *
 * https://datatracker.ietf.org/doc/html/rfc6238#section-4.2
 *
 * @param key  unique secret key for user
 * @param algorithm hmac sha1, sha256, sha512. Default: sha1
 * @param time time-step in seconds (default recomended). Default: 30
 * @return 6 digit code as a string
 */
export const generate = ({ key, algorithm = 'sha1', time = 30 }: {
  key: string | Buffer,
  algorithm?: string,
  time?: number,
}) => HOTP.generate({
  key,
  algorithm,
  counter: Math.floor(Date.now() / 1000 / time),
});

/**
 * https://datatracker.ietf.org/doc/html/rfc6238#section-5.2
 *
 * @param  token  code, provided by user
 * @param  key    unique secret key for user
 * @param  window counter values window. Default: 1
 * @param  time   time-step in seconds (default is recomended). Default: 30
 * @return null if nothing found or number between -window to +window if same code in steps found
 */
export const validate = ({
  token, key, window = 1, time = 30,
}: {
  token: string,
  key: string | Buffer,
  window?: number,
  time?: number,
}): number | null => HOTP.validate({
  token,
  key,
  window,
  counter: Math.floor(Date.now() / 1000 / time),
});
