import { readFileSync } from "fs";
import { getThemes } from "../tools/dist/getThemes.js";
import { run } from "../tools/dist/sd-run.js";

/**
 * Get all themes defined int the tokens/$themes.json and generate a Style Dictionary output for each theme
 */
const rawData = readFileSync("tokens/$themes.json", { encoding: "utf-8" });
const data = JSON.parse(rawData);

getThemes(data).then((themes) =>
  Promise.all(themes.map((theme) => run("tokens", "dist", theme)))
);
