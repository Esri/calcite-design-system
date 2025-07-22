#!/usr/bin/env node
import build from "./build.js";
console.log("🗜  optimizing icons... \n");
build(true)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
