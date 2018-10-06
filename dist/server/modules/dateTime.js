'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.epochToFormat = epochToFormat;
/**
 * @description function to convert epoch to custom format date time
 * @param {number} epoch 
 * @param {string} format date time 
 */
function epochToFormat() {
  var epoch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var date = new Date(epoch * 1000);

  switch (format) {
    case 'Y-M-D':
    default:
      return date.getFullYear() + '-' + String('0' + date.getMonth()).slice(-2) + '-' + String('0' + date.getDate()).slice(-2);
  }
}