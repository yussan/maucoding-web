'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoclient = _mongodb2.default.MongoClient;
var debugMongo = (0, _debug2.default)('app:mongo');
var url = 'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + '/' + process.env.MONGO_DB;

exports.default = function () {
  return new Promise(function (resolve, reject) {
    _mongodb2.default.MongoClient.connect(url, function (err, client) {
      if (err) {
        debugMongo('[error] to connect mongo');
        debugMongo(err, 'mongo');
      } else {
        debugMongo('[success] connected mongo server');
        var db = client.db(process.env.MONGO_DB);
        resolve(db);
      }
    });
  }).catch(function (e) {
    debugMongo(e);
  });
};