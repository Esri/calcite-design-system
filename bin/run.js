import { readFileSync } from "fs";
<<<<<<< HEAD
import { getThemes } from "../tools/dist/token-transformer/getThemes.js";
import { run } from "../tools/dist/token-transformer/sd-run.js";
=======
import { getThemes } from "../support/dist/getThemes.js";
import { run } from "../support/dist/sd-run.js";
>>>>>>> 8f25901 (refactor: rename design-token dirs for monorepo)

/**
 * Get all themes defined int the tokens/$themes.json and generate a Style Dictionary output for each theme
 */
const rawData = readFileSync("tokens/$themes.json", { encoding: "utf-8" });
const data = JSON.parse(rawData);

getThemes(data).then((themes) =>
  Promise.all(themes.map((theme) => run("tokens", "dist", theme)))
);
