"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _post = require("../handlers/api/post");

var apiPost = _interopRequireWildcard(_post);

var _seal = require("../middlewares/seal");

var _seal2 = _interopRequireDefault(_seal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (route) {
  route.get("/api/posts/:seal", _seal2.default, apiPost.list);
  route.post("/api/post/create/:seal", _seal2.default, apiPost.create);
  route.get("/api/post/:id/:seal", _seal2.default, apiPost.detail);
  route.put("/api/post/:id/update/:seal", _seal2.default, apiPost.update);
  route.post("/api/post/:id/delete/:seal", _seal2.default, apiPost.deletePost);

  // test routes
  route.post("/api/post/test/upload-cloudinary", apiPost.testUploadCloudinary);
};