var path = require('path');
module.exports = {
  entry: path.join(__dirname, "/src/page/snk/index.js"),
  output: {
    path: path.join(__dirname, "dist/snk"),
    filename: "[name].js"
  }
};