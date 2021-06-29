import base32 from './lib/base32';
import { generateHOTP, verifyHOTP } from './lib/hotp';
import { generateTOTP, verifyTOTP } from './lib/totp';

export const HOTP = {
  generate: generateHOTP,
  validate: verifyHOTP,
};

export const TOTP = {
  generate: generateTOTP,
  validate: verifyTOTP,
};

export { base32 };
