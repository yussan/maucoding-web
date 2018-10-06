'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seal = require('../middlewares/seal');

exports.default = function (req, res) {
  var seal = (0, _seal.generateSeal)();
  return res.send(200, seal);
};