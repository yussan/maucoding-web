'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('../handlers/api/auth');

var authApi = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (route) {
  route.post('/api/login', authApi.login);
  route.post('/api/checklogin', authApi.checkLogin);
  route.post('/api/logout', authApi.logout);
};