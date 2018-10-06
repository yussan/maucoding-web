'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encName = undefined;

var _password = require('./password');

/**
 * @description function to generate encrypt name 
 * @param {object} file file object
 * @return {string} name.ext
 */
var encName = exports.encName = function encName(file) {
  var file_arr = file.name.split('.');
  var ext = file_arr[file_arr.length - 1];
  var name = (0, _password.hashPassword)(file.name.replace('.' + ext, ''));
  var filename = (name + '.' + ext).toLowerCase();

  return filename;
};