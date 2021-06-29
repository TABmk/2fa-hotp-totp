import { createHmac, timingSafeEqual } from 'crypto';

/**
 * https://tools.ietf.org/html/rfc4226 page 5
 *
 * @param   8-byte counter value, the moving factor
 * @returns buffer
 */
const calcCounter = (value: number) => {
  // <Buffer 00 00 00 00 00 00 00 00>
  const buf = Buffer.alloc(8);

  buf.writeBigInt64BE(BigInt(value), 0);

  return buf;
};

/**
 * HOTP(K,C) = Truncate(HMAC-SHA-1(K,C))
 *
 * https://tools.ietf.org/html/rfc4226
 * Page 6
 *
 * @param options
 * @param options.key unique secret key for user
 * @param [options.counter=0] moving factor
 * @returns 6 digit code as a string
 */
export const generateHOTP = ({ key, counter = 0 }: {
  key: string,
  counter?: number,
}) => {
  const hmac = createHmac('sha1', Buffer.from(key));

  const hmacUpdated = hmac.update(calcCounter(counter)).digest('hex');

  const hmacResult = Buffer.from(hmacUpdated, 'hex');

  // https://tools.ietf.org/html/rfc4226 page 7 (5.4)
  const offset = hmacResult[19] & 0xf;
  const binCode = (hmacResult[offset] & 0x7f) << 24
    | (hmacResult[offset + 1] & 0xff) << 16
    | (hmacResult[offset + 2] & 0xff) << 8
    | (hmacResult[offset + 3] & 0xff);

  const code = String(binCode % 1e6);

  // length+1
  const codeLength = 7;

  const result = new Array(codeLength - code.length).join('0') + code;

  return result;
};

/**
 * @param options
 * @param options.token       code, provided by user
 * @param options.key         unique secret key for user
 * @param [options.window=1]  counter values window
 * @param [options.counter=0] moving factor
 * @returns number or null
 */
export const verifyHOTP = ({
  token, key, window = 1, counter = 0,
}: {
  token: string,
  key: string,
  window?: number,
  counter?: number,
}): number | null => {
  let redefCounter = counter;
  // eslint-disable-next-line
  for (let i = counter - window; i <= counter + window; ++i) {
    redefCounter = i;

    const generateToken = generateHOTP({ key, counter: redefCounter });

    if (timingSafeEqual(Buffer.from(token), Buffer.from(generateToken))) {
      return i - counter;
    }
  }

  return null;
};
