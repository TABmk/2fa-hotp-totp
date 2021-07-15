import { createHmac, timingSafeEqual } from 'crypto';

/**
 * https://datatracker.ietf.org/doc/html/rfc4226#section-5.1
 *
 * @param  8-byte counter value, the moving factor
 * @return buffer
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
 * https://datatracker.ietf.org/doc/html/rfc4226#section-5.2
 *
 * @param key     unique secret key for user
 * @param counter moving factor. Default: 0
 * @return 6 digit code as a string
 */
export const generate = ({ key, counter = 0 }: {
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
 * https://datatracker.ietf.org/doc/html/rfc4226#section-7.2
 *
 * @param token   code, provided by user
 * @param key     unique secret key for user
 * @param window  counter values window. Default: 1
 * @param counter moving factor. Default: 0
 * @return null if nothing found or number between -window to +window if same code in steps found
 */
export const validate = ({
  token,
  key,
  window = 1,
  counter = 0,
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

    const generateToken = generate({ key, counter: redefCounter });

    if (timingSafeEqual(Buffer.from(token), Buffer.from(generateToken))) {
      return i - counter;
    }
  }

  return null;
};
