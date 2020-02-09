require("dotenv").config()

const webpack = require("webpack")
const path = require("path")
const merge = require("webpack-merge")
const outputPath = path.resolve(__dirname, "../public/client-build")
const baseConfig = require("./webpack.base.config")
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")
const AssetsPlugin = require("assets-webpack-plugin")

let plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename:
      process.env.NODE_ENV === "production" ? "vendor.[hash].js" : "vendor.js",
    minChunks: Infinity
  }),
  new AssetsPlugin({
    prettyPrint: false,
    path: path.join(__dirname, "../internals")
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new VueSSRClientPlugin()
]

// production config
if (process.env.NODE_ENV === "production") {
  // minify appjs
  const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
  plugins.push(new UglifyJSPlugin())
}

module.exports = merge(baseConfig, {
  entry: {
    app: "./src/client/index.ts",
    vendor: ["vue", "vuex", "vue-router", "string-manager"]
  },
  output: {
    filename:
      process.env.NODE_ENV === "production" ? "[name].[hash].js" : "[name].js",
    chunkFilename:
      process.env.NODE_ENV === "production" ? "[name].[hash].js" : "[name].js",
    path: outputPath,
    publicPath: "/client-build/"
  },
  plugins
})
