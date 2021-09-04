/**
 * Base32 encoder without padding, thanks @LinusU
 * @param   secret text to be encoded
 * @return base32 encoded secret
 */
// eslint-disable-next-line
export const base32 = (secret: string | Buffer) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  const buf = Buffer.isBuffer(secret) ? secret : Buffer.from(secret);

  const arr = new Uint8Array(buf);

  let bits = 0;
  let value = 0;
  let str = '';

  for (let i = 0; i < arr.length; i += 1) {
    value = (value << 8) | arr[i];
    bits += 8;

    while (bits >= 5) {
      str += alphabet[(value >>> bits - 5) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    str += alphabet[(value << 5 - bits) & 31];
  }

  return str;
};
