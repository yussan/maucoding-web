"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _posts = require("./posts");

var _posts2 = _interopRequireDefault(_posts);

var _users = require("./users");

var _users2 = _interopRequireDefault(_users);

var _auth = require("./auth");

var _auth2 = _interopRequireDefault(_auth);

var _tag = require("./tag");

var _tag2 = _interopRequireDefault(_tag);

var _feed = require("./feed");

var _feed2 = _interopRequireDefault(_feed);

var _sitemap = require("./sitemap");

var _sitemap2 = _interopRequireDefault(_sitemap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (route) {
  (0, _posts2.default)(route);
  (0, _feed2.default)(route);
  (0, _auth2.default)(route);
  (0, _tag2.default)(route);
  (0, _sitemap2.default)(route);
  (0, _users2.default)(route);
};