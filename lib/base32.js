"use strict";
exports.__esModule = true;
exports.encodeBase32 = void 0;
/**
 * Base32 encoder without padding, thanks @LinusU
 * @param   {String} secret
 * @returns {String} base32 encoded secret
 */
var encodeBase32 = function (secret) {
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    var buf = Buffer.from(secret);
    var arr = new Uint8Array(buf);
    var bits = 0;
    var value = 0;
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
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
exports.encodeBase32 = encodeBase32;
