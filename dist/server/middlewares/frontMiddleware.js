"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateMetaUser = exports.generateMetaPost = undefined;

var _post = require("../modules/post");

var postModule = _interopRequireWildcard(_post);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var generateMetaPost = exports.generateMetaPost = function generateMetaPost(req, res, next) {
  var title_arr = req.params.title.split("-");
  var id = title_arr[title_arr.length - 1];
  req.no_count = true;
  postModule.detailPost(req, res, {
    id: id,
    callback: function callback(json) {
      if (json && json._id) {
        req.meta = {
          title: json.title,
          desc: json.title,
          url: "https://oopsreview.com/post/" + req.params.title,
          image: json.image.original
        };
      }
      return next();
    }
  });
};

var generateMetaUser = exports.generateMetaUser = function generateMetaUser(req, res, next) {
  return next();
};