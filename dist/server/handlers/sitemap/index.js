"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSitemapTags = getSitemapTags;
exports.getSitemapUsers = getSitemapUsers;
exports.getSitemapPosts = getSitemapPosts;

var _mongo = require("../../modules/mongo");

var _mongo2 = _interopRequireDefault(_mongo);

var _dateTime = require("../../modules/dateTime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description function to genereate sitemap of tags
 */
function getSitemapTags(req, res) {
  res.setHeader("Content-Type", "application/xml");
  var items = "";

  var aggregate = [];

  // order by desc
  aggregate.push({
    $sort: {
      created_on: -1
    }
  });

  (0, _mongo2.default)().then(function (_ref) {
    var db = _ref.db,
        client = _ref.client;

    db.collection("tags").aggregate(aggregate).toArray(function (err, result) {
      if (err) {
        res.end("error get sitemap");
      } else {

        client.close();

        // generate xml
        result.map(function (n) {
          items += "\n            <url>\n              <loc>https://academy.byidmore.com/tag/" + n.tag.toLowerCase() + "</loc>\n              <lastmod>2018-08-09</lastmod>\n              <changefreq>daily</changefreq>\n              <priority>0.8</priority>\n          </url>\n            ";
        });
        res.end(xmlSitemapWrapper(items, 0));
      }
    });
  });
}

/**
 * @description function to generate sitemap of author
 */
function getSitemapUsers(req, res) {
  res.setHeader("Content-Type", "application/xml");
  var items = "";

  var aggregate = [];

  // order by desc
  aggregate.push({
    $sort: {
      created_on: -1
    }
  });

  (0, _mongo2.default)().then(function (_ref2) {
    var db = _ref2.db,
        client = _ref2.client;

    db.collection("users").aggregate(aggregate).toArray(function (err, result) {
      if (err) {
        res.end("error get sitemap");
      } else {

        client.close();

        // generate xml
        result.map(function (n) {
          items += "\n            <url>\n              <loc>https://academy.byidmore.com/author/" + n.username.toLowerCase() + "</loc>\n              <lastmod>" + (0, _dateTime.epochToFormat)(n.created_on, "Y-M-D") + "</lastmod>\n              <changefreq>daily</changefreq>\n              <priority>0.8</priority>\n          </url>\n            ";
        });
        res.end(xmlSitemapWrapper(items, 0));
      }
    });
  });
}

/**
 * @description function to generate sitemap of posts
 */
function getSitemapPosts(req, res) {
  res.setHeader("Content-Type", "application/xml");
  var items = "";

  var aggregate = [];

  // order by desc
  aggregate.push({
    $sort: {
      created_on: -1
    }
  });

  (0, _mongo2.default)().then(function (_ref3) {
    var db = _ref3.db,
        client = _ref3.client;

    db.collection("posts").aggregate(aggregate).toArray(function (err, result) {
      if (err) {
        res.end("error get sitemap");
      } else {

        client.close();

        // generate xml
        result.map(function (n) {
          items += "\n            <url>\n              <loc>https://academy.byidmore.com/post/" + n.title.replace(/ /g, '-').toLowerCase() + "-" + n._id + "</loc>\n              <lastmod>" + (0, _dateTime.epochToFormat)(n.created_on, "Y-M-D") + "</lastmod>\n              <changefreq>daily</changefreq>\n              <priority>0.8</priority>\n          </url>\n            ";
        });
        res.end(xmlSitemapWrapper(items, 0));
      }
    });
  });
}

function xmlSitemapWrapper() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var update_date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return "\n    <urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n      " + items + "\n    </urlset> \n  ";
}