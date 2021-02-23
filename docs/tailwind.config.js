var config = require("../tailwind.config");
module.exports = {
  purge: ["./docs/index.html"],
  ...config
}
