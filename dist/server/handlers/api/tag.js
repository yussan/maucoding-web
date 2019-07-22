"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detail = detail;

var _mongo = require("../../modules/mongo");

var _mongo2 = _interopRequireDefault(_mongo);

var _response = require("../../modules/response");

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function detail(req, res) {
  (0, _mongo2.default)().then(function (_ref) {
    var db = _ref.db,
        client = _ref.client;

    db.collection('tags').find({ tag: req.params.name }).toArray(function (err, result) {

      client.close();

      if (result.length > 0) {
        return res.send(200, (0, _response2.default)(200, 'OK', result[0]));
      } else {
        return res.send((0, _response2.default)(204, 'tag not found'));
      }
    });
  });
}