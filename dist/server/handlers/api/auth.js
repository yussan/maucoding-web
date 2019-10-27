"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.logout = logout;
exports.checkLogin = checkLogin;

var _mongodb = require("mongodb");

var _mongo = require("../../modules/mongo");

var _mongo2 = _interopRequireDefault(_mongo);

var _response = require("../../modules/response");

var _response2 = _interopRequireDefault(_response);

var _password = require("../../modules/password");

var _cookies = require("../../modules/cookies");

var cookies = _interopRequireWildcard(_cookies);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function login(req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  var passHash = (0, _password.hashPassword)(password);
  (0, _mongo2.default)().then(function (_ref) {
    var db = _ref.db,
        client = _ref.client;

    db.collection("users").find({ email: email, password: passHash }).toArray(function (err, result) {
      // error from database
      if (err) {
        console.log(err);
        return res.send(500, (0, _response2.default)(500, "something wrong with mongo"));
      }

      client.close();

      if (result.length < 1) {
        return res.send(204, "email dan password tidak valid");
      } else {
        // login success and save userdata to session
        console.log("logged in success, save userdata to session");
        var encCookies = (0, _password.encString)(JSON.stringify(result[0]));
        cookies.set(req, res, "idmoreacademy_session", encCookies);
        return res.send(201, (0, _response2.default)(201, "login success", result[0]));
      }
    });
  });
}

function logout(req, res) {
  cookies.set(req, res, "idmoreacademy_session", "");
  return res.send(200, { message: "logout success" });
}

/**
 * function to to check is user logged in
 */
function checkLogin(req, res, next) {
  var cookies = req.cookies.idmoreacademy_session;
  var sessiondata = {};
  if (cookies) {
    sessiondata = (0, _password.decString)(cookies);
    sessiondata = JSON.parse(sessiondata);
  }

  res.json(sessiondata || {});
}