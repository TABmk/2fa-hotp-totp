import { createHmac, timingSafeEqual } from 'crypto';

/**
 * https://datatracker.ietf.org/doc/html/rfc4226#section-5.1
 *
 * @param value 8-byte counter value, the moving factor
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
 * @param key       unique secret key for user
 * @param algorithm custom algorithm for crypto.createHmac. Default: sha1
 * @param counter   moving factor. Default: 0
 * @return 6 digit code as a string
 */
export const generate = ({ key, algorithm = 'sha1', counter = 0 }: {
  key: string | Buffer,
  algorithm?: string,
  counter?: number,
}) => {
  const hmac = createHmac(algorithm, Buffer.isBuffer(key) ? key : Buffer.from(key));

  const hmacUpdated = hmac.update(calcCounter(counter)).digest('hex');

  const hmacResult = Buffer.from(hmacUpdated, 'hex');

  // https://datatracker.ietf.org/doc/html/rfc4226#section-5.4
  // RFC 6238 allow to use SHA256/512, that's why offset is not hmacResult[19]
  // https://datatracker.ietf.org/doc/html/rfc6238#section-1.2
  const offset = hmacResult[hmacResult.length - 1] & 0xf;
  const binCode = (hmacResult[offset] & 0x7f) << 24
    | (hmacResult[offset + 1] & 0xff) << 16
    | (hmacResult[offset + 2] & 0xff) << 8
    | (hmacResult[offset + 3] & 0xff);

  const code = String(binCode % 1e6);

  // length+1
  const codeLength = 7;

  return new Array(codeLength - code.length).join('0') + code;
};

/**
 * https://datatracker.ietf.org/doc/html/rfc4226#section-7.2
 *
 * @param token     code, provided by user
 * @param key       unique secret key for user
 * @param algorithm custom algorithm for crypto.createHmac. Default: sha1
 * @param window    counter values window. Default: 1
 * @param counter   moving factor. Default: 0
 * @return null if nothing found or number between -window to +window if same code in steps found
 */
export const validate = ({
  token,
  key,
  algorithm = 'sha1',
  window = 1,
  counter = 0,
}: {
  token: string,
  key: string | Buffer,
  algorithm?: string,
  window?: number,
  counter?: number,
}): number | null => {
  let redefCounter = counter;
  // eslint-disable-next-line
  for (let i = counter - window; i <= counter + window; ++i) {
    redefCounter = i;

    const generateToken = generate({ key, algorithm, counter: redefCounter });

    if (
      Buffer.byteLength(token) === Buffer.byteLength(generateToken)
      && timingSafeEqual(Buffer.from(token), Buffer.from(generateToken))
    ) {
      return i - counter;
    }
  }

  return null;
};
