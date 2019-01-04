"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateMetaUser = exports.generateMetaPost = exports.generateMetaPostList = undefined;

var _post = require("../modules/post");

var postModule = _interopRequireWildcard(_post);

var _user = require("../modules/user");

var userModule = _interopRequireWildcard(_user);

var _html = require("string-manager/dist/modules/html");

var _truncate = require("string-manager/dist/modules/truncate");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var generateMetaPostList = exports.generateMetaPostList = function generateMetaPostList(req, res, next) {
  var title = "Post";

  if (req.params.tag) title = title + " by tag " + req.params.tag;

  req.meta = {
    title: title,
    desc: title + " on IdMore Academy",
    url: "https://oopsreview.com/" + req.originalUrl,
    image: "https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_500/v1538876985/idmore-academy/Patreon_Cover.png"
  };

  return next();
};

var generateMetaPost = exports.generateMetaPost = function generateMetaPost(req, res, next) {
  var title_arr = req.params.title.split("-");
  var id = title_arr[title_arr.length - 1];
  req.no_count = true;
  return postModule.detailPost(req, res, {
    id: id,
    callback: function callback(json) {
      if (json && json._id) {
        req.meta = {
          title: json.title,
          desc: (0, _truncate.truncate)((0, _html.stripTags)(json.content), 500, "..."),
          url: "https://academy.byidmore.com/post/" + req.params.title,
          image: json.image.original
        };
      }

      return next();
    }
  });
};

var generateMetaUser = exports.generateMetaUser = function generateMetaUser(req, res, next) {
  var username = req.params.username;


  return userModule.profileUser(req, res, {
    username: username,
    callback: function callback(json) {
      if (json.username) {
        req.meta = {
          title: username,
          desc: "Post created by " + (json.fullname || username),
          url: "https://academy.byidmore.com/author/" + username,
          image: json.avatar.original
        };
      } else {
        req.meta = {
          title: "User Not Found",
          desc: "User Not Found",
          url: "https://academy.byidmore.com/author/" + username
        };
      }

      return next();
    }
  });
};