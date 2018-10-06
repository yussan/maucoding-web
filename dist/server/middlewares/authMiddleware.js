"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _password = require("../modules/password");

exports.default = function (req, res, next) {
  // console.log('auth session', req.cookies.oopsreview_session)
  if (req.path() !== '/super') {
    var cookies = req.cookies.oopsreview_session;
    if (cookies) {
      var sessiondata = (0, _password.decString)(cookies);
      sessiondata = JSON.parse(sessiondata);
      if (sessiondata.username) {
        // go ahead
        next();
      } else {
        // redirect to login
        res.redirect("/super", next);
      }
    } else {
      // redirect to login
      res.redirect("/super", next);
    }
  } else {
    next();
  }
};