"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkLanguage = exports.generateMetaUser = exports.generateMetaPost = exports.generateMetaPostList = undefined;

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
    desc: title + " on Id More Academy",
    url: "https://oopsreview.com/" + req.originalUrl,
    image: "https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_500/v1538876985/idmore-academy/Patreon_Cover.png"
  };

  req.html = "\n    <div class=\"post-list\">\n      <h1>" + title + "</h1>\n      <h2>" + title + " on Id More Academy</h2>\n    </div>\n  ";

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
        var description = (0, _truncate.truncate)((0, _html.stripTags)(json.content), 500, "...");
        var keywords = json.tags.toString();

        req.meta = {
          title: json.title,
          desc: description,
          url: "https://academy.byidmore.com/post/" + req.params.title,
          image: json.image.original,
          keywords: keywords,
          jsonld: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            description: description,
            headline: json.title,
            alternativeHeadline: json.title,
            image: json.image.original,
            genre: "id more academy,software engineer,tutorial,development",
            keywords: keywords,
            wordcount: json.content.length,
            publisher: {
              "@type": "Organization",
              name: "Id More Academy",
              logo: {
                "@type": "ImageObject",
                url: "https://academy.byidmore.com/images/logo-wide-2.png",
                height: "500",
                width: "500"
              }
            },
            url: "https://academy.byidmore.com/post/" + req.params.title,
            datePublished: new Date(json.created_on * 1000).toISOString(),
            dateCreated: new Date(json.created_on * 1000).toISOString(),
            dateModified: new Date(json.updated_on * 1000).toISOString(),
            author: {
              "@type": "Person",
              name: json.author.fullname || json.author.username
            }
          }
        };

        req.html = "\n          <div class=\"post-detail\">\n            <h1>" + json.title + "</h1>\n            <figure>\n              <img src=\"" + json.image.original + "\" alt=\"" + json.title + "\" />\n            </figure>\n            <article>\n              " + json.content + "\n            </article>\n          </div>        \n        ";
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

        req.html = "\n        <div class=\"author\">\n          <h1>" + json.username + "</h1>\n          <h2>" + json.fullname + "</h2>\n          <img src=\"" + json.avatar.original + "\" alt=\"" + json.username + "\" />\n        </div>\n      ";
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

var checkLanguage = exports.checkLanguage = function checkLanguage(req, res, next) {
  var LANG = req.params.lang;
  if (!["en", "id"].includes(LANG)) {
    return res.redirect("/id" + req.path().replace("/" + LANG, ""), next);
  }

  return next();
};