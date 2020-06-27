const path = require("path");
const glob = require("glob");

module.exports = {
  // here we compile each file in the lambda directory: src/lambdas/[fileName].ts
  // and output dist/[fileName]/handler.js
  // the handler.js code can be referenced by the cdk to upload lambdas

  entry: glob.sync("./src/lambdas/*.ts").reduce((prev, filePath) => {
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
    globalObject: 'this'
  },
};
