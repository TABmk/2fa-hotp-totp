/**
 * Base32 encoder without padding, thanks @LinusU
 * @param   secret
 * @returns base32 encoded secret
 */
export default (secret: string) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  const buf = Buffer.from(secret);

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
