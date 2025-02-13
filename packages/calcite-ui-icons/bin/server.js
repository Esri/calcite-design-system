#!/usr/bin/env node
const build = require("./build");
const pathData = require("./path-data");
const optimize = require("./optimize");
const debounce = require("debounce");
const { execSync } = require("child_process");
const bs = require("browser-sync").create();
const options = {
  awaitWriteFinish: true,
  ignoreInitial: true,
};

console.log("🗜  optimizing icons... \n");

build().then(() => {
  bs.init({
    server: "./docs",
    notify: false,
    ui: false,
    port: 8080,
  });
  execSync("npm run build:fonts");
  bs.watch("./icons/*.svg", options, onChange);
  bs.watch("./docs/keywords.json", options, onChange);

  function onChange(event, file) {
    if (event === "add") {
      console.log("🗜  new icon detected, optimizing... \n");
      optimize(file, true).then(() => {});
    } else {
      update();
    }
  }

  const update = debounce(function () {
    pathData().then(() => {
      console.log("✨  path file updated");
      bs.reload();
    });
  }, 300);
});
