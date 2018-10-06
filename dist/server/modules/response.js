'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'something wrong';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var response = {};

  if (Object.keys(data).length > 0) response = data;

  switch (status) {
    case 200:
      response.status = status;
      response.message = message;
      break;

    default:
      response.status = status;
      response.message = message;
      break;
  }

  return response;
};