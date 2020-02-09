"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _metainfo = require("../config/metainfo.js");

var _metainfo2 = _interopRequireDefault(_metainfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NODE_ENV = process.env.NODE_ENV;


var generateHtml = function generateHtml(_ref) {
  var lang = _ref.lang,
      _ref$meta = _ref.meta,
      meta = _ref$meta === undefined ? {} : _ref$meta,
      initialHTML = _ref.initialHTML;

  return "<!DOCTYPE html>   \n<html lang=\"en\">\n  <head>\n      <meta charset=\"utf-8\">\n      <title>" + (meta.title ? meta.title + " - Yussan Academy" : _metainfo2.default.title) + "</title>\n      <link href=\"https://fonts.googleapis.com/css?family=Ubuntu&display=swap\" rel=\"stylesheet\" />\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1\" />\n      <meta data-vmid=\"description\" data-vue-meta=\"true\" name=\"description\" content=\"" + (meta.desc || _metainfo2.default.description) + "\" />\n      <meta data-vmid=\"keywords\" data-vue-meta=\"true\" name=\"keywords\" content=\"" + (meta.keywords || "Yussan Academy,software engineer,tutorial") + "\" />\n      " + (meta.title ? "\n        <meta name=\"twitter:card\" content=\"summary\"/>\n        <meta name=\"twitter:image\" content=\"" + (meta.image || "https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_800/v1538301459/github/Screen_Shot_2018-09-30_at_16.52.32.png") + "\"/>\n        <meta name=\"twitter:title\" content=\"" + meta.title + " - Yussan Academy\"/>\n        <meta name=\"twitter:description\" content=\"" + meta.desc + "\" />\n\n        <meta property=\"og:title\" content=\"" + meta.title + " - Yussan Academy\" />\n        <meta property=\"og:type\" content=\"" + (meta.type || "blog") + "\" />\n        <meta property=\"og:url\" content=\"" + (meta.url || "https://yussanacademy.com") + "\" />\n        <meta property=\"og:image\" content=\"" + (meta.image || "https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_800/v1538301459/github/Screen_Shot_2018-09-30_at_16.52.32.png") + "\" />\n        <meta property=\"og:description\" content=\"" + meta.desc + "\" />\n        " : "") + "\n      " + (meta.jsonld ? "\n          <script type=\"application/ld+json\">" + JSON.stringify(meta.jsonld) + "</script>\n        " : "") + "\n      <link rel=\"manifest\" href=\"/manifest.json\" />\n      <link rel=\"icon\" href=\"/images/icons/icon-72x72.png\" />\n      <link href=\"" + (NODE_ENV === "production" ? "/opensearch/production.xml" : "/opensearch/development.xml") + "\" rel=\"search\" title=\"oopsreview\" type=\"application/opensearchdescription+xml\">\n      <link rel=\"alternate\" href=\"https://yussanacademy.com\" lang=\"en-US\"/> \n      <script>\n        window.SELECTED_LANG = \"" + (lang || "id") + "\"    \n      </script>    \n  </head>\n  <body>\n      <div id=\"app\">" + (initialHTML || "") + "</div>\n      <script>\n        //global inline script\n        // document.addEventListener('click', function(e){\n        //   // if(e.target.className === 'icono-caretDown') {}\n        //   const dropdownEl = document.getElementsByClassName('dropdown');\n        //   for(let n=0;n<dropdownEl.length;n++){\n        //     dropdownEl[n].classList.remove('show')\n        //   }\n        // })\n      </script>\n      " + getScript() + "\n  </body>\n</html>";
};

function getScript() {
  var webpackAssets = require("../../internals/webpack-assets.json");
  return "\n    <script src=\"" + (NODE_ENV == "production" ? webpackAssets.vendor.js : "/build/vendor.js") + "\"></script>\n    \n    <script src=\"" + (NODE_ENV == "production" ? webpackAssets.app.js : "/build/app.js") + "\"></script>\n    \n    " + (NODE_ENV === "production" ? "\n        <!-- Global site tag (gtag.js) - Google Analytics -->\n        <script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-156429570-1\"></script>\n        <script>\n          window.dataLayer = window.dataLayer || [];\n          function gtag(){dataLayer.push(arguments);}\n          gtag('js', new Date());\n\n          gtag('config', 'UA-156429570-1');\n        </script>\n\n        <script async src=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>\n        <script>\n            (adsbygoogle = window.adsbygoogle || []).push({\n                  google_ad_client: \"ca-pub-4468477322781117\",\n                  enable_page_level_ads: true\n            });\n        </script>\n\n        " : "") + "\n    ";
}

exports.default = function (req, res, next) {
  res.writeHead(200, {
    "Content-Type": "text/html"
  });

  // default req meta and initial html
  if (!req.meta && !req.html) {
    var title = "Page Not Found - Yussan Academy";
    var desc = "The page you are looking for was not found, please visit the others. Yussan Academy powered by Yussan Media Group, here we discuss all kinds of technology from the perspective of engineers";

    req.meta = {
      title: title,
      desc: desc,
      url: "https://yussanacademy.com/" + req.originalUrl,
      image: "https://yussanacademy.com/images/logo-wide-2.1.png"
    };

    req.html = "\n      <div class=\"home\">\n        <img src=\"" + req.meta.image + "\" alt=\"Yussan Academy Logo\" />\n        <h1>" + title + "</h1>\n        <h2>" + desc + "</h2>\n      </div>\n    ";
  }

  var html = generateHtml({
    lang: req.params.lang,
    meta: req.meta,
    initialHTML: req.html
  });
  res.write(html);
  return res.end();
};