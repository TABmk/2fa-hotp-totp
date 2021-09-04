/// <reference types="node" />
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
export declare const generate: ({ key, algorithm, counter }: {
    key: string | Buffer;
    algorithm?: string;
    counter?: number;
}) => string;
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
export declare const validate: ({ token, key, algorithm, window, counter, }: {
    token: string;
    key: string | Buffer;
    algorithm?: string;
    window?: number;
    counter?: number;
}) => number | null;
