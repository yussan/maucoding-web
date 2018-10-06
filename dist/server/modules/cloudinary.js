"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCustomUrl = generateCustomUrl;
exports.upload = upload;

var _cloudinary = require("cloudinary");

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// cloudinary config
_cloudinary2.default.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * @description function to generate custom url param
 * @param {string} url
 * @param {string} arg based on cloudinary docs
 * @see  https://cloudinary.com/cookbook/resize_an_image
 */
function generateCustomUrl(url, arg) {
  return url.replace(/upload.*oopsreview/, "upload/" + arg + "/oopsreview");
}

/**
 * @description function to upload image to cloudinary directory
 * @param {object} file file object from input type file
 * @param {string} dir directory target
 */
function upload(file, target, callback) {
  _cloudinary2.default.v2.uploader.upload(file, { use_filename: true, public_id: target }, function (err, result) {
    if (err) console.log("Cloudinary error", e);
    console.log("Cloudinary success", result);
    callback(err, result);
  });
}