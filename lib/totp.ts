import { generateHOTP, verifyHOTP } from './hotp';

/**
 * TOTP = HOTP(K, T)
 *
 * https://tools.ietf.org/html/rfc6238
 * Page 4 (4.2)
 *
 * @param  {Object} options
 * @param  {String} options.key
 * @param  {Number?} [options.time=30]
 * @return {String}
 */
export const generateTOTP = ({ key, time = 30 }: {
  key: String,
  time?: number,
}): String => {
  const result = generateHOTP({
    key,
    counter: Math.floor(Date.now() / 1000 / time),
  });

  return result;
}

/**
 * https://tools.ietf.org/html/rfc6238
 * Page 6 (5.2)
 *
 * @param {Object} options
 * @param  {String} options.token user's code
 * @param  {String} options.key
 * @param  {String} [options.window=1] counter values window
 * @param  {String} [options.time=30] time-step size in seconds RECOMENDED
 * @return {Number|null}
 */
export const verifyTOTP = ({token, key, window = 1, time = 30}: {
  token: String,
  key: String,
  window?: number,
  time?: number
}): Number|null => {
  const result = verifyHOTP({
    token,
    key,
    window,
    counter: Math.floor(Date.now() / 1000 / time),
  });

  return result;
}
