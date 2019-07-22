"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detail = detail;
exports.list = list;
exports.create = create;
exports.update = update;
exports.deletePost = deletePost;
exports.testUploadCloudinary = testUploadCloudinary;

var _mongodb = require("mongodb");

var _mongo = require("../../modules/mongo");

var _mongo2 = _interopRequireDefault(_mongo);

var _response = require("../../modules/response");

var _response2 = _interopRequireDefault(_response);

var _const = require("../../const");

var _stringManager = require("string-manager");

var _dateTime = require("../../modules/dateTime");

var _post = require("../../modules/post");

var post = _interopRequireWildcard(_post);

var _cookies = require("../../modules/cookies");

var cookies = _interopRequireWildcard(_cookies);

var _file = require("../../modules/file");

var file = _interopRequireWildcard(_file);

var _cloudinary = require("../../modules/cloudinary");

var cloudinary = _interopRequireWildcard(_cloudinary);

var _post2 = require("../../transformers/post");

var _post3 = _interopRequireDefault(_post2);

var _user = require("../../transformers/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description function to select post by _id
 * @param {number} req.params.id id of post
 */
function detail(req, res) {
  post.detailPost(req, res, {
    id: req.params.id,
    callback: function callback(json) {
      return res.send(200, (0, _response2.default)(200, "success", json));
    }
  });
}

/**
 * @description function to select post list by parameters
 * @param {limit} req.getQuery().limit total data to show
 */
function list(req, res) {
  var _ref = req.getQuery() ? (0, _stringManager.queryToObj)(req.getQuery()) : {},
      page = _ref.page,
      limit = _ref.limit,
      username = _ref.username,
      featured = _ref.featured,
      lastid = _ref.lastid,
      notid = _ref.notid,
      lastcreatedon = _ref.lastcreatedon,
      tag = _ref.tag,
      keyword = _ref.keyword,
      draft = _ref.draft;

  var aggregate = [{
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "author"
    }
  }];

  // don't get post by id
  // ref: https://stackoverflow.com/a/26118110/2780875
  if (notid) {
    aggregate.push({
      $match: { _id: { $nin: [(0, _mongodb.ObjectId)(notid)] } }
    });
  }

  // filter post by author username
  if (username) {
    aggregate.push({
      $match: { "author.username": username }
    });
  }

  // if tag: filter post by tagname
  if (tag) {
    aggregate.push({
      $match: { tags: { $regex: ".*" + tag + ".*" } }
    });
  }

  // filter post by draft
  if (typeof draft != "undefined") {
    aggregate.push({
      $match: { draft: draft == "true" }
    });
  }

  // if sort by featured post most viewed
  var sort = {};
  if (featured === "true") {
    sort = {
      $sort: {
        views: -1
      }
    };
  } else {
    sort = {
      $sort: {
        created_on: -1
      }
    };
  }
  aggregate.push(sort);

  // get loadmore data
  if (lastcreatedon) {
    aggregate.push({
      $match: { created_on: { $lt: parseInt(lastcreatedon) } }
    });
  }

  // filter / search by keyword
  if (keyword) {
    // ref: https://stackoverflow.com/a/2712896/2780875
    var re = new RegExp(keyword, "i");
    aggregate.push({
      $match: { title: re }
    });
  }

  (0, _mongo2.default)().then(function (db) {
    db.collection("posts").aggregate(aggregate).skip(parseInt(page) || 0).limit(parseInt(limit) || _const.DB_DEFAULT_LIMIT).toArray(function (err, result) {
      // error from database
      if (err) {
        console.log(err);
        return res.send(500, (0, _response2.default)(500, "something wrong with mongo"));
      }

      if (result.length > 0) {
        // transform data
        result.map(function (n, key) {
          var author = (0, _user2.default)(n.author[0]);
          result[key] = (0, _post3.default)(n);
          result[key].author = author;
        });

        // success
        return res.send(200, (0, _response2.default)(200, "success", { result: result }));
      } else {
        return res.send(204, (0, _response2.default)(204, "no post available"));
      }
    });
  });
}

function create(req, res) {
  // get all post data

  var _req$body = req.body,
      title = _req$body.title,
      content = _req$body.content,
      _req$body$tags = _req$body.tags,
      tags = _req$body$tags === undefined ? "" : _req$body$tags,
      _req$body$draft = _req$body.draft,
      draft = _req$body$draft === undefined ? false : _req$body$draft,
      _req$body$video = _req$body.video,
      video = _req$body$video === undefined ? "" : _req$body$video;

  var _ref2 = req.files || {},
      image = _ref2.image;

  var currentTime = Math.round(new Date().getTime() / 1000);
  var user_id = cookies.get(req, res, "idmoreacademy_session")._id;

  // not upload main image
  if (!image) return res.send(200, (0, _response2.default)(400, "Failed to post, image is required"));

  // upload image
  var filename = file.encName(image);
  var upload_path = "idmore-academy/" + new Date().getFullYear() + "/" + filename;

  cloudinary.upload(image.path, upload_path, function (err, result) {
    if (err) {
      console.log("cloudinary error", err);
      res.send(201, (0, _response2.default)(201, "Terjadi Masalah Ketika Upload di Cloudinary"));
    } else {
      // normalize tags
      var postdata = {
        title: title,
        content: content,
        image: result.secure_url,
        // ref: https://stackoverflow.com/a/39704153/2780875
        tags: tags.replace(/\s*,\s*/g, ","),
        comments: 0,
        views: 0,
        created_on: currentTime,
        updated_on: currentTime,
        draft: Boolean(draft == "true" || draft == true),
        user_id: (0, _mongodb.ObjectId)(user_id),
        video: video
      };

      (0, _mongo2.default)().then(function (db) {
        // check is same title available
        db.collection("posts").aggregate([{
          $match: { title: title }
        }, {
          // select from specific key: https://stackoverflow.com/a/45738049/2780875
          $project: {
            _id: 1
          }
        }]).toArray(function (err, results) {
          if (err) {
            console.log(err);
            return res.send(500, (0, _response2.default)(500, "something wrong with mongo"));
          }

          if (results.length > 0) {
            // post available
            res.send(400, (0, _response2.default)(400, "Failed to post, duplicated title"));
          } else {
            // insert to mongodb
            db.collection("posts").insert(postdata);
            res.send(201, (0, _response2.default)(201, "Post Created"));
          }
        });
      });
    }
  });
}

/**
 * @description function to update post
 * @param {object} req.body
 * @param {object} req.files
 */
function update(req, res) {
  var _ref3 = req.files || {},
      image = _ref3.image;

  if (image) {
    // upload image
    var filename = file.encName(image);
    var upload_path = "oopsreview/" + new Date().getFullYear() + "/" + filename;
    cloudinary.upload(image.path, upload_path, function (err, result) {
      if (err) {
        console.log("cloudinary error", err);
        res.send(201, (0, _response2.default)(201, "Terjadi Masalah Ketika Upload di Cloudinary"));
      } else {
        req.body.image = result.secure_url;
        return post.updatePost(req, res);
      }
    });
  } else {
    return post.updatePost(req, res);
  }
}

/**
 * @description function to delete post
 * @param {object} req.params
 * @param {number} req.params.id
 */
function deletePost(req, res) {
  var id = req.params.id;

  // mongodb query execution

  (0, _mongo2.default)().then(function (db) {
    db.collection("post").remove({ _id: id });
    // api response
    res.send(200, (0, _response2.default)(200, "Post deleted"));
  });
}

/**
 * @description function to test upload to cloudinary
 * @see https://cloudinary.com/documentation/node_image_upload
 */
function testUploadCloudinary(req, res) {
  var image = req.files.image;


  if (!image) {
    res.send(400, { message: "bad request" });
  } else {
    // create new name
    var filename = file.encName(image);

    var sample_image = "https://res.cloudinary.com/demo/image/upload/v1371282172/sample.jpg";

    cloudinary.upload(image.path, "oopsreview/test/" + filename);
    res.send(201, { message: "file uploaded" });
  }
}