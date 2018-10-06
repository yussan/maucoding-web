'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateSeal = generateSeal;
exports.getTimestampSeal = getTimestampSeal;
exports.validateSeal = validateSeal;

var _response = require('../modules/response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    APP_KEY = _process$env.APP_KEY,
    NODE_ENV = _process$env.NODE_ENV;


/**
 * function to generate url seal
 * formula : base64(APP_KEY + timestamp).replace all '='
 * @return {string} seal ready to use
 */
function generateSeal() {
    if (typeof window == 'undefined') return Buffer.from(APP_KEY + String(Date.now())).toString('base64').replace(/=/g, '');else return btoa(APP_KEY + String(Date.now())).replace(/=/g, '');
}

/**
 * function to decrypted url seal
 * @param {string} seal 
 */
function getTimestampSeal(seal) {
    // server mode
    if (typeof window == 'undefined') return Buffer.from(seal, 'base64').toString().replace(APP_KEY, '');
    // client mode
    else return atob(seal + '==').replace(APP_KEY, '');
}

/**
 * function to validate seal : only for production
 * @param {string} seal 
 */
function validateSeal(seal) {
    var diff = Date.now() - getTimestampSeal(seal);
    if ((isNaN(diff) || diff >= 60000) && NODE_ENV != 'development') //seal only active 1 minutes = 60000 miliseconds
        return { valid: true };else return { valid: true };
}

exports.default = function (req, res, next) {
    var seal = req.params.seal;

    if (validateSeal(seal).valid) {
        return next();
    } else {
        return res.send(403, (0, _response2.default)(403, 'seal not valid'));
    }
};