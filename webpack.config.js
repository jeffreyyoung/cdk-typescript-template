const path = require("path");
const glob = require("glob");

module.exports = {
  entry: glob.sync("./src/functions/*.ts").reduce((prev, filePath) => {
    const fileName = path.basename(filePath, path.extname(filePath));
    return {
      ...prev,
      [path.join(fileName, "handler")]: filePath,
    };
  }, {}),
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".mjs"],
  },
  mode: "production",
  target: "node",
  optimization: {
    minimize: false,
  },
  output: {
    filename: "[name].js",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
  },
};
