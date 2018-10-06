'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../handlers/sitemap/index');

var sitemapHandler = _interopRequireWildcard(_index);

var _seal = require('../middlewares/seal');

var _seal2 = _interopRequireDefault(_seal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (route) {
  route.get('/sitemap/tags', sitemapHandler.getSitemapTags);
  route.get('/sitemap/users', sitemapHandler.getSitemapUsers);
  route.get('/sitemap/posts', sitemapHandler.getSitemapPosts);
};