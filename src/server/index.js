import restify from "restify"
import cookies from "restify-cookies"
import render from "./render"
import debug from "debug"
import routes from "./routes"

// handlers
import handlerSeal from "./handlers/seal"

// middlewares
import authMiddleware from "./middlewares/authMiddleware"
import * as frontMiddleware from "./middlewares/frontMiddleware"

const { NODE_ENV } = process.env

// load .env configuration
if (NODE_ENV == "development") {
  require("dotenv").config()
}

const debugServer = debug("app:server")

const server = restify.createServer()
const port = process.env.PORT || 19090

// global handler initial
// server.use(prerenderNode)
server.use(cookies.parse)
server.use(restify.plugins.gzipResponse())
server.use(
  restify.plugins.bodyParser({
    mapParams: false,
    mapFiles: false,
    maxFieldsSize: 2 * 1024 * 1024
  })
)

// routes
routes(server)

if (NODE_ENV == "development") {
  server.get("/api/generate-seal", handlerSeal)
}

// render vuejs
server.get(
  /\/super\/*/,
  authMiddleware,
  frontMiddleware.generateMetaSuper,
  render
)

// tricky SSR
server.get(
  "/posts",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaPostList,
  render
)
server.get(
  "/search",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaPostSearch,
  render
)
server.get(
  "/tag/:tag",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaPostList,
  render
)
server.get(
  "/post/:title",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaPost,
  render
)
server.get(
  "/author/:username",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaUser,
  render
)
server.get(
  "/a/:username",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaUser,
  render
)
server.get(
  "/:lang/posts",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaPostList,
  render
)
server.get(
  "/:lang/search",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaPostSearch,
  render
)
server.get(
  "/:lang/tag/:tag",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaPostList,
  render
)
server.get(
  "/:lang/post/:title",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaPost,
  render
)
server.get(
  "/:lang/author/:username",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaUser,
  render
)
server.get(
  "/:lang/a/:username",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaUser,
  render
)

server.get(
  /\/build\/*/,
  restify.plugins.serveStatic({
    directory: `${__dirname}/../../public`,
    maxAge: 0
  })
)

server.get(
  "/manifest.json",
  restify.plugins.serveStatic({
    directory: `${__dirname}/../../public`,
    maxAge: 0
  })
)
server.get(
  "/favicon.ico",
  restify.plugins.serveStatic({
    directory: `${__dirname}/../../public`,
    maxAge: 0
  })
)
server.get(
  "/robots.txt",
  restify.plugins.serveStatic({
    directory: `${__dirname}/../../public`,
    maxAge: 0
  })
)

server.get(
  "/:lang",
  frontMiddleware.checkLanguage,
  frontMiddleware.generateMetaHomepage,
  render
)
server.get(/\/:lang\/*/, frontMiddleware.checkLanguage, render)

server.get(
  /\/?.*\//,
  restify.plugins.serveStatic({
    directory: `${__dirname}/../../public`,
    maxAge: 0
  })
)

// server.get("/:lang/*", render)
server.on("NotFound", render)
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

server.listen(port, () => {
  debugServer(`App SUCCESS run on port  ${port}`)
})
