import { generateHOTP, verifyHOTP } from './hotp';

/**
 * TOTP = HOTP(K, T)
 *
 * https://tools.ietf.org/html/rfc6238
 * Page 4 (4.2)
 *
 * @param  options
 * @param  options.key       unique secret key for user
 * @param  [options.time=30] time-step in seconds (default recomended)
 * @return 6 digit code as a string
 */
export const generateTOTP = ({ key, time = 30 }: {
  key: string,
  time?: number,
}) => {
  const result = generateHOTP({
    key,
    counter: Math.floor(Date.now() / 1000 / time),
  });

  return result;
};

/**
 * https://tools.ietf.org/html/rfc6238
 * Page 6 (5.2)
 *
 * @param  options
 * @param  options.token      code, provided by user
 * @param  options.key        unique secret key for user
 * @param  [options.window=1] counter values window
 * @param  [options.time=30]  time-step in seconds (default recomended)
 * @return number or null
 */
export const verifyTOTP = ({
  token, key, window = 1, time = 30,
}: {
  token: string,
  key: string,
  window?: number,
  time?: number
}): number | null => {
  const result = verifyHOTP({
    token,
    key,
    window,
    counter: Math.floor(Date.now() / 1000 / time),
  });

  return result;
};
