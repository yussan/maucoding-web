"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFeed = getFeed;

var _mongo = require("../../modules/mongo");

var _mongo2 = _interopRequireDefault(_mongo);

var _slug = require("../../../../node_modules/string-manager/dist/modules/slug");

var _html = require("../../../../node_modules/string-manager/dist/modules/html");

var _truncate = require("../../../../node_modules/string-manager/dist/modules/truncate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description function to get feed / rss (xml)
 */
function getFeed(req, res) {
  res.setHeader("Content-Type", "application/xml");
  var items = "";

  var aggregate = [{
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "author"
    }
  }];

  aggregate.push({
    $sort: {
      created_on: -1
    }
  });

  // draft post not available in feed
  aggregate.push({
    $match: { draft: false }
  });

  (0, _mongo2.default)().then(function (db) {
    // ref guid : https://www.w3schools.com/xml/rss_tag_guid.asp
    db.collection("posts").aggregate(aggregate).skip(0).limit(10).toArray(function (err, result) {
      if (err) {
        res.end("error get feed");
      } else {
        result.map(function (n) {
          items += "\n            <item>\n              <title>" + n.title + "</title>\n              <description>" + (0, _truncate.truncate)((0, _html.stripTags)(n.content), 500, "[READ MORE...]") + "</description>\n              <link>https://oopsreview.com/post/" + (0, _slug.toSlug)(n.title) + "-" + n._id + "</link>\n              <guid>https://oopsreview.com/post/" + (0, _slug.toSlug)(n.title) + "-" + n._id + "</guid>\n              <category domain=\"https://oopsreview.com\">" + n.tags.split(",").join("/") + "</category>\n              <pubDate>" + new Date(n.created_on * 1000).toUTCString() + "</pubDate>\n            </item>\n            ";
        });
        res.end(xmlFeedWrapper(items, result[0].created_on));
      }
    });
  });
}

// ref: http://www.feedforall.com/sample.xml
function xmlFeedWrapper() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var update_date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
  return "\n  <rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n    <channel>\n      <title>Oopsreview Feed</title>\n      <description>Oopsreview is software review specialist</description>\n      <link>https://oopsreview.com</link>\n      <category domain=\"https://oopsreview.com\">computers/software/internet</category>\n      <copyright>Copyright 2017-2018 Id More Team.</copyright>\n      <lastBuildDate>" + new Date(update_date * 1000).toUTCString() + "</lastBuildDate>\n      <language>en-us</language>\n      <image>\n        <url>https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,h_60/v1532272510/oopsreview/2018/oopsreview.png</url>\n        <title>Oopsreview Feed</title>\n        <link>https://oopsreview.com</link>\n        <description>Oopsreview is software review specialist</description>\n        <width>60</width>\n        <height>60</height>\n      </image>\n      <atom:link href=\"https://oopsreview.com/feed\" rel=\"self\" type=\"application/rss+xml\" />\n      " + items + "\n    </channel>\n  </rss>\n  ";
}