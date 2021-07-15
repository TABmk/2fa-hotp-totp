/**
 * TOTP = HOTP(K, T)
 *
 * https://datatracker.ietf.org/doc/html/rfc6238#section-4.2
 *
 * @param key  unique secret key for user
 * @param time time-step in seconds (default recomended). Default: 30
 * @return 6 digit code as a string
 */
export declare const generate: ({ key, time }: {
    key: string;
    time?: number;
}) => string;
/**
 * https://datatracker.ietf.org/doc/html/rfc6238#section-5.2
 *
 * @param  token  code, provided by user
 * @param  key    unique secret key for user
 * @param  window counter values window. Default: 1
 * @param  time   time-step in seconds (default is recomended). Default: 30
 * @return null if nothing found or number between -window to +window if same code in steps found
 */
export declare const validate: ({ token, key, window, time, }: {
    token: string;
    key: string;
    window?: number;
    time?: number;
}) => number | null;
