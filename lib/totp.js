"use strict";
exports.__esModule = true;
exports.verifyTOTP = exports.generateTOTP = void 0;
var hotp_1 = require("./hotp");
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
var generateTOTP = function (_a) {
    var key = _a.key, _b = _a.time, time = _b === void 0 ? 30 : _b;
    var result = hotp_1.generateHOTP({
        key: key,
        counter: Math.floor(Date.now() / 1000 / time)
    });
    return result;
};
exports.generateTOTP = generateTOTP;
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
var verifyTOTP = function (_a) {
    var token = _a.token, key = _a.key, _b = _a.window, window = _b === void 0 ? 1 : _b, _c = _a.time, time = _c === void 0 ? 30 : _c;
    var result = hotp_1.verifyHOTP({
        token: token,
        key: key,
        window: window,
        counter: Math.floor(Date.now() / 1000 / time)
    });
    return result;
};
exports.verifyTOTP = verifyTOTP;
