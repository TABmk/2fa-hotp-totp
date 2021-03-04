import { createHmac, timingSafeEqual } from 'crypto';

/**
 * https://tools.ietf.org/html/rfc4226 page 5
 *
 * @param {Number} 8-byte counter value, the moving factor
 * @returns {Buffer}
 */
const calcCounter = (value: Number): Buffer => {
  // <Buffer 00 00 00 00 00 00 00 00>
  const buf = Buffer.alloc(8);

  buf.writeBigInt64BE(BigInt(value), 0);

  return buf;
}

/**
 * HOTP(K,C) = Truncate(HMAC-SHA-1(K,C))
 *
 * https://tools.ietf.org/html/rfc4226
 * Page 6
 *
 * @param {Object} options
 * @param {String} options.key
 * @param {Number?} [options.counter=0]
 * @returns {String}
 */
export const generateHOTP = ({ key, counter = 0 }: {
  key: String,
  counter?: Number,
}): String => {
  const hmac = createHmac('sha1', Buffer.from(key));

  const hmacUpdated = hmac.update(calcCounter(counter)).digest('hex');

  const hmacResult = Buffer.from(hmacUpdated, 'hex');

  // https://tools.ietf.org/html/rfc4226 page 7 (5.4)
  const offset  = hmacResult[19] & 0xf;
  const binCode = (hmacResult[offset] & 0x7f) << 24
    | (hmacResult[offset + 1] & 0xff) << 16
    | (hmacResult[offset + 2] & 0xff) << 8
    | (hmacResult[offset + 3] & 0xff);

  const code = String(binCode % 1e6);

  // length+1
  let codeLength = 7;

  const result = new Array(codeLength - code.length).join('0') + code;

  return result;
}

/**
 * @param {Object} options
 * @param {String} options.token user's code
 * @param {String} options.key
 * @param {Number?} [options.window=1] counter values window
 * @param {Number?} [options.counter=0]
 * @returns {Number|null}
 */
export const verifyHOTP = ({ token, key, window = 1, counter = 0}: {
  token: String,
  key: String,
  window?: number,
  counter?: number,
}): Number|null => {
  let _counter = counter;
  for(let i = counter - window; i <= counter + window; ++i) {
    _counter = i;
    const generateToken = generateHOTP({key, counter: _counter});
    if (timingSafeEqual(Buffer.from(token), Buffer.from(generateToken))) {
      return i - counter;
    }
  }

  return null;
}
