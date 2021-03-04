"use strict";
exports.__esModule = true;
exports.verifyHOTP = exports.generateHOTP = void 0;
var crypto_1 = require("crypto");
/**
 * https://tools.ietf.org/html/rfc4226 page 5
 *
 * @param {Number} 8-byte counter value, the moving factor
 * @returns {Buffer}
 */
var calcCounter = function (value) {
    // <Buffer 00 00 00 00 00 00 00 00>
    var buf = Buffer.alloc(8);
    buf.writeBigInt64BE(BigInt(value), 0);
    return buf;
};
/**
 * HOTP(K,C) = Truncate(HMAC-SHA-1(K,C))
 *
 * https://tools.ietf.org/html/rfc4226
 * Page 6
 *
 * @param {Object} options
 * @param {String} options.key
 * @param {Number?} [options.counter=0]
 * @returns {String}
 */
var generateHOTP = function (_a) {
    var key = _a.key, _b = _a.counter, counter = _b === void 0 ? 0 : _b;
    var hmac = crypto_1.createHmac('sha1', Buffer.from(key));
    var hmacUpdated = hmac.update(calcCounter(counter)).digest('hex');
    var hmacResult = Buffer.from(hmacUpdated, 'hex');
    // https://tools.ietf.org/html/rfc4226 page 7 (5.4)
    var offset = hmacResult[19] & 0xf;
    var binCode = (hmacResult[offset] & 0x7f) << 24
        | (hmacResult[offset + 1] & 0xff) << 16
        | (hmacResult[offset + 2] & 0xff) << 8
        | (hmacResult[offset + 3] & 0xff);
    var code = String(binCode % 1e6);
    // length+1
    var codeLength = 7;
    var result = new Array(codeLength - code.length).join('0') + code;
    return result;
};
exports.generateHOTP = generateHOTP;
/**
 * @param {Object} options
 * @param {String} options.token user's code
 * @param {String} options.key
 * @param {Number?} [options.window=1] counter values window
 * @param {Number?} [options.counter=0]
 * @returns {Number|null}
 */
var verifyHOTP = function (_a) {
    var token = _a.token, key = _a.key, _b = _a.window, window = _b === void 0 ? 1 : _b, _c = _a.counter, counter = _c === void 0 ? 0 : _c;
    var _counter = counter;
    for (var i = counter - window; i <= counter + window; ++i) {
        _counter = i;
        var generateToken = exports.generateHOTP({ key: key, counter: _counter });
        if (crypto_1.timingSafeEqual(Buffer.from(token), Buffer.from(generateToken))) {
            return i - counter;
        }
    }
    return null;
};
exports.verifyHOTP = verifyHOTP;
