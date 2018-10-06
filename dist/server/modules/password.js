"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encString = encString;
exports.decString = decString;
exports.hashPassword = hashPassword;

var _cryptoJs = require("crypto-js");

var KEY = 'oopsreview-web';

/**
 * @description function to encrypt password
 * @param {string} string
 */
function encString() {
  var plaintext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var enc = _cryptoJs.AES.encrypt(plaintext, KEY).toString();
  // console.log("enc plain", plaintext)
  // console.log("enc result", enc)
  return enc;
}

/**
 * @description function to decrypt script
 * @param {string} ciphertext 
 */
function decString() {
  var ciphertext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var dec = _cryptoJs.AES.decrypt(ciphertext, KEY).toString(_cryptoJs.enc.Utf8);
  // console.log("dec", dec)
  return dec;
}

/**
 * @description function to hash password with md5
 * @param {string} password as plain text
 */
function hashPassword() {
  var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var hash = (0, _cryptoJs.MD5)(password).toString();
  // console.log("hash", hash)
  return hash;
}