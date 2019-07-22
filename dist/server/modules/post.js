"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detailPost = exports.updatePost = undefined;

var _mongo = require("./mongo");

var _mongo2 = _interopRequireDefault(_mongo);

var _mongodb = require("mongodb");

var _response = require("../modules/response");

var _response2 = _interopRequireDefault(_response);

var _user = require("../transformers/user");

var _user2 = _interopRequireDefault(_user);

var _post = require("../transformers/post");

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description function to update post on mongo db by post_id
 *
 */
var updatePost = exports.updatePost = function updatePost(req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      content = _req$body.content,
      tags = _req$body.tags,
      _req$body$draft = _req$body.draft,
      draft = _req$body$draft === undefined ? false : _req$body$draft,
      image = _req$body.image,
      _req$body$video = _req$body.video,
      video = _req$body$video === undefined ? "" : _req$body$video;

  var currentTime = Math.round(new Date().getTime() / 1000);
  var _id = (0, _mongodb.ObjectId)(req.params.id);
  var postdata = {
    title: title,
    content: content,
    tags: tags,
    draft: Boolean(draft == "true" || draft == true),
    updated_on: currentTime,
    video: video
  };

  if (image) postdata.image = image;

  (0, _mongo2.default)().then(function (_ref) {
    var db = _ref.db,
        client = _ref.client;

    // is post available
    db.collection("posts").aggregate([{
      $match: { _id: _id }
    }, {
      // select from specific key: https://stackoverflow.com/a/45738049/2780875
      $project: {
        _id: 1
      }
    }]).toArray(function (err, result) {
      if (err) {
        console.log(err);
        return res.send(500, (0, _response2.default)(500, "something wrong with mongo"));
      }

      if (result.length > 0) {
        // update data on mongo
        db.collection("posts").update({ _id: _id }, { $set: postdata });

        client.close();

        res.send(201, (0, _response2.default)(201, "Post Updated"));
      } else {
        client.close();

        // post not available
        res.send(204, (0, _response2.default)(204, "Post not found"));
      }
    });
  });
};

var detailPost = exports.detailPost = function detailPost(req, res, _ref2) {
  var id = _ref2.id,
      callback = _ref2.callback;

  if (id.length != 24) {
    if (req.no_count) return callback();
    return res.send(200, (0, _response2.default)(204, "post not found"));
  }

  (0, _mongo2.default)().then(function (_ref3) {
    var db = _ref3.db,
        client = _ref3.client;

    db.collection("posts").aggregate([{
      $match: { _id: (0, _mongodb.ObjectId)(id) }
    }, {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "author"
      }
    }, {
      $lookup: {
        from: "apps",
        localField: "app_id",
        foreignField: "_id",
        as: "app"
      }
    }]).toArray(function (err, result) {
      // error from database
      if (err) {
        console.log(err);
        return res.send(500, (0, _response2.default)(500, "something wrong with mongo"));
      }

      if (result.length < 1) {
        if (req.no_count) return callback();
        return res.send(200, (0, _response2.default)(204, "post not found"));
      }

      // transform result
      var author = (0, _user2.default)(result[0].author[0]);
      result = (0, _post2.default)(result[0]);
      result.author = author;

      // update: increment views
      if (!req.no_count) {
        db.collection("posts").update({ _id: (0, _mongodb.ObjectId)(result._id) }, { $set: { views: result.views + 1 } });

        client.close();
      } else {
        client.close();
      }

      return callback(result);
    });
  });
};