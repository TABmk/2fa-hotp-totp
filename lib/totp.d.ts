/// <reference types="node" />
/**
 * TOTP = HOTP(K, T)
 *
 * https://datatracker.ietf.org/doc/html/rfc6238#section-4.2
 *
 * @param key  unique secret key for user
 * @param algorithm custom algorithm for crypto.createHmac. Default: sha1
 * @param time time-step in seconds (default recomended). Default: 30
 * @return 6 digit code as a string
 */
export declare const generate: ({ key, algorithm, time }: {
    key: string | Buffer;
    algorithm?: string;
    time?: number;
}) => string;
/**
 * https://datatracker.ietf.org/doc/html/rfc6238#section-5.2
 *
 * @param token  code, provided by user
 * @param key    unique secret key for user
 * @param algorithm custom algorithm for crypto.createHmac. Default: sha1
 * @param window counter values window. Default: 1
 * @param time   time-step in seconds (default is recomended). Default: 30
 * @return null if nothing found or number between -window to +window if same code in steps found
 */
export declare const validate: ({ token, key, algorithm, window, time, }: {
    token: string;
    key: string | Buffer;
    algorithm?: string;
    window?: number;
    time?: number;
}) => number | null;
