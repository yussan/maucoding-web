"use strict";

var _restify = require("restify");

var _restify2 = _interopRequireDefault(_restify);

var _restifyCookies = require("restify-cookies");

var _restifyCookies2 = _interopRequireDefault(_restifyCookies);

var _render = require("./render");

var _render2 = _interopRequireDefault(_render);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _seal = require("./handlers/seal");

var _seal2 = _interopRequireDefault(_seal);

var _authMiddleware = require("./middlewares/authMiddleware");

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

var _frontMiddleware = require("./middlewares/frontMiddleware");

var frontMiddleware = _interopRequireWildcard(_frontMiddleware);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// middlewares
var NODE_ENV = process.env.NODE_ENV;

// load .env configuration


// handlers

if (NODE_ENV == "development") {
  require("dotenv").config();
}

var debugServer = (0, _debug2.default)("app:server");

var server = _restify2.default.createServer();
var port = process.env.PORT || 19090;

// global handler initial
// server.use(prerenderNode)
server.use(_restifyCookies2.default.parse);
server.use(_restify2.default.plugins.gzipResponse());
server.use(_restify2.default.plugins.bodyParser({
  mapParams: false,
  mapFiles: false,
  maxFieldsSize: 2 * 1024 * 1024
}));

// routes
(0, _routes2.default)(server);

if (NODE_ENV == "development") {
  server.get("/api/generate-seal", _seal2.default);
}

// render vuejs
server.get(/\/super\/*/, _authMiddleware2.default, _render2.default);

server.get("/posts", frontMiddleware.checkLanguage, frontMiddleware.generateMetaPostList, _render2.default);
server.get("/tag/:tag", frontMiddleware.checkLanguage, frontMiddleware.generateMetaPostList, _render2.default);
server.get("/post/:title", frontMiddleware.checkLanguage, frontMiddleware.generateMetaPost, _render2.default);
server.get("/author/:username", frontMiddleware.checkLanguage, frontMiddleware.generateMetaUser, _render2.default);

server.get("/:lang/posts", frontMiddleware.checkLanguage, frontMiddleware.generateMetaPostList, _render2.default);
server.get("/:lang/tag/:tag", frontMiddleware.checkLanguage, frontMiddleware.generateMetaPostList, _render2.default);
server.get("/:lang/post/:title", frontMiddleware.checkLanguage, frontMiddleware.generateMetaPost, _render2.default);
server.get("/:lang/author/:username", frontMiddleware.checkLanguage, frontMiddleware.generateMetaUser, _render2.default);

server.get(/\/build\/*/, _restify2.default.plugins.serveStatic({
  directory: __dirname + "/../../public",
  maxAge: 0
}));

server.get("/manifest.json", _restify2.default.plugins.serveStatic({
  directory: __dirname + "/../../public",
  maxAge: 0
}));
server.get("/favicon.ico", _restify2.default.plugins.serveStatic({
  directory: __dirname + "/../../public",
  maxAge: 0
}));
server.get("/robots.txt", _restify2.default.plugins.serveStatic({
  directory: __dirname + "/../../public",
  maxAge: 0
}));

server.get("/:lang", frontMiddleware.checkLanguage, _render2.default);
server.get(/\/:lang\/*/, frontMiddleware.checkLanguage, _render2.default);

server.get(/\/?.*\//, _restify2.default.plugins.serveStatic({
  directory: __dirname + "/../../public",
  maxAge: 0
}));

// server.get("/:lang/*", render)
server.on("NotFound", _render2.default);
// server.on("NotFound", (req, res) => {
//   renderVue({ url: req.url }).then(app => {
//     //context to use as data source
//     //in the template for interpolation
//     const context = {
//       title: "Vue JS - Server Render",
//       meta: `
//         <meta description="vuejs server side render">
//       `
//     }

//     renderer.renderToString(
//       app,
//       context,
//       function(err, html) {
//         if (err) {
//           if (err.code === 404) {
//             res.status(404).end("Page not found")
//           } else {
//             res.status(500).end("Internal Server Error")
//           }
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "text/html"
//           })
//           res.write(html)
//           res.end()
//         }
//       },
//       err => {
//         console.log(err)
//       }
//     )
//   })
// })

server.listen(port, function () {
  debugServer("App SUCCESS run on port  " + port);
});