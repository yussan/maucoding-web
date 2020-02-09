const path = require("path")
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base.config")
const nodeExternals = require("webpack-node-externals")
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin")
const outputPath = path.resolve(__dirname, "../public/server-build")

module.exports = merge(baseConfig, {
  entry: "./src/server/entry-server.js",
  target: "node",
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    libraryTarget: "commonjs2",
    path: outputPath,
    publicPath: "/server-build/"
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),

  plugins: [new VueSSRServerPlugin()]
})
