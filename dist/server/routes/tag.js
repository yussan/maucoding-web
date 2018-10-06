'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tag = require('../handlers/api/tag');

var apiTag = _interopRequireWildcard(_tag);

var _seal = require('../middlewares/seal');

var _seal2 = _interopRequireDefault(_seal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (route) {
  route.get('/api/tag/:name/:seal', _seal2.default, apiTag.detail);
};