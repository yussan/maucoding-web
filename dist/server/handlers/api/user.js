"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = getUsers;
exports.getUser = getUser;

var _user = require("../../modules/user");

var user = _interopRequireWildcard(_user);

var _response = require("../../modules/response");

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// get list users
/**
 * created by yussan
 * created at 17/03/18 23.41
 * created using WebStorm
 */

function getUsers(req, res) {}

// get detail user by id
function getUser(req, res) {
  user.profileUser(req, res, {
    username: req.params.username,
    callback: function callback(json) {
      return res.send(200, (0, _response2.default)(200, "success get user profile", json));
    }
  });
}