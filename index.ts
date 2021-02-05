import { encodeBase32 } from './lib/base32';
import { generateHOTP, verifyHOTP } from './lib/hotp'
import { generateTOTP, verifyTOTP } from './lib/totp'

export const TFA = {
  HOTP: {
    generate: generateHOTP,
    validate: verifyHOTP,
  },
  TOTP: {
    generate: generateTOTP,
    validate: verifyTOTP,
  },
  base32: encodeBase32
};
