"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.get = get;
exports.destroy = destroy;

var _password = require("./password");

var NODE_ENV = process.env.NODE_ENV;
function set(req, res, key, val) {
  var options = {
    path: "/",
    domain: NODE_ENV === "development" ? "academy.byidmore.local" : "academy.byidmore.com",
    secure: false,
    httpOnly: true
  };
  res.setCookie(key, val, options);
}

function get(req, res, key) {
  var cookies = req.cookies[key];
  if (cookies) {
    var sessiondata = (0, _password.decString)(cookies);
    return JSON.parse(sessiondata);
  } else {
    return {};
  }
}

function destroy(req, res, key, val) {
  if (req.cookies[key]) res.clearCookie(key);
}