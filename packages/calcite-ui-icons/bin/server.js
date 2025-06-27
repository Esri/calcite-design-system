#!/usr/bin/env node
import { execSync } from "node:child_process";
import debounce from "lodash-es/debounce.js";
import { create } from "browser-sync";
import build from "./build.js";
import pathData from "./path-data.js";
import optimize from "./optimize.js";
const bs = { create }.create();
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
