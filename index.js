"use strict";
exports.__esModule = true;
exports.TFA = void 0;
var base32_1 = require("./lib/base32");
var hotp_1 = require("./lib/hotp");
var totp_1 = require("./lib/totp");
exports.TFA = {
    HOTP: {
        generate: hotp_1.generateHOTP,
        validate: hotp_1.verifyHOTP
    },
    TOTP: {
        generate: totp_1.generateTOTP,
        validate: totp_1.verifyTOTP
    },
    base32: base32_1.encodeBase32
};
