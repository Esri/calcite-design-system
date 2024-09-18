#!/usr/bin/env node
const build = require("./build");
console.log("🗜  optimizing icons... \n");
build(true)
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
