import { readFileSync } from "fs";
import { getThemes } from "../support/dist/getThemes.js";
import { run } from "../support/dist/sd-run.js";

/**
 * Get all themes defined int the src/$themes.json and generate a Style Dictionary output for each theme
 */
const rawData = readFileSync("src/$themes.json", { encoding: "utf-8" });
const data = JSON.parse(rawData);

getThemes(data).then((themes) => Promise.all(themes.map((theme) => run("src", "dist", theme))));
