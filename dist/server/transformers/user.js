"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloudinary = require("../modules/cloudinary");

/**
 * created by yussan
 * created at 17/03/18 23.33
 */

exports.default = function (n) {
  delete n.password;
  return {
    fullname: n.fullname,
    username: n.username,
    avatar: {
      original: n.avatar,
      small: (0, _cloudinary.generateCustomUrl)(n.avatar, 'w_200,c_scale')
    }
  };
};