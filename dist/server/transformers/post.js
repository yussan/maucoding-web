"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringManager = require("string-manager");

var _cloudinary = require("../modules/cloudinary");

/**
 * created by yussan
 * created at 17/03/18 23.33
 * created using WebStorm
 */

var DEFAULT_THUMB = 'https://res.cloudinary.com/dhjkktmal/image/upload/v1529931141/oopsreview/2018/default-thumb.png';

exports.default = function (n) {
  delete n.user_id;

  return {
    _id: n._id,
    title: n.title,
    nospace_title: (0, _stringManager.toSlug)(n.title),
    created_on: n.created_on,
    updated_on: n.updated_on,
    content: n.content,
    views: n.views || 0,
    comments: n.comments || 0,
    tags: n.tags ? n.tags.split(',') : [],
    app: n.app && n.app.length > 0 ? n.app[0] : {},
    draft: n.draft == 'true' || n.draft == true,
    video: n.video || '',
    lang: n.lang,
    image: {
      original: n.image || DEFAULT_THUMB,
      600: n.image ? (0, _cloudinary.generateCustomUrl)(n.image, 'w_600,c_scale') : (0, _cloudinary.generateCustomUrl)(DEFAULT_THUMB, 'w_600,c_scale'),
      small: n.image ? (0, _cloudinary.generateCustomUrl)(n.image, 'w_200,c_scale') : (0, _cloudinary.generateCustomUrl)(DEFAULT_THUMB, 'w_200,c_scale')
    }
  };
};