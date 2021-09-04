// @ts-ignore TODO update @types/node to v15
import { generateKeySync } from 'crypto';

/**
 * Generate random key with length
 * @param length key. Default: 64
 * @return key
 */
// eslint-disable-next-line
export const generateKey = (length = 64): Buffer => (
  generateKeySync('hmac', {
    length,
  }).export()
);
