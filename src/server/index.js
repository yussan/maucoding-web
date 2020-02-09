import restify from "restify"
import cookies from "restify-cookies"
import render from "./render"
import debug from "debug"
import routes from "./routes"
import * as cookiesMod from "./modules/cookies"

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

server.get(
  /\/client-build\/*/,
  restify.plugins.serveStatic({
    directory: `${__dirname}/../../public`,
    maxAge: 0
  })
)

server.get(
  /\/images\/*/,
  restify.plugins.serveStatic({
    directory: `${__dirname}/../../public`,
    maxAge: 0
  })
)

server.get(
  /\/vendors\/*/,
  restify.plugins.serveStatic({
    directory: `${__dirname}/../../public`,
    maxAge: 0
  })
)

server.get(
  /\/opensearch\/*/,
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

server.get("/:lang", frontMiddleware.checkLanguage, render)
// tricky
server.get(
  /\/id\/*/,
  (req, res, next) => {
    req.params.lang = "id"
    cookiesMod.set(req, res, "idmoreacademy_lang_session", "id")
    return next()
  },
  render
)
server.get(
  /\/en\/*/,
  (req, res, next) => {
    req.params.lang = "en"
    cookiesMod.set(req, res, "idmoreacademy_lang_session", "en")
    return next()
  },
  render
)
// end of tricky
server.get(/\/*/, frontMiddleware.checkLanguage, render)

server.listen(port, () => {
  debugServer(`App SUCCESS run on port  ${port}`)
})
