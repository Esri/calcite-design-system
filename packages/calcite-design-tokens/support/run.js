const { readFileSync } = require("fs");
const { getThemes } = require("./dist/getThemes.js");
const { run } = require("./dist/sd-run.js");

/**
 * Get all themes defined int the src/$themes.json and generate a Style Dictionary output for each theme
 */
const rawData = readFileSync("src/$themes.json", { encoding: "utf-8" });
const data = JSON.parse(rawData);

getThemes(data).then((themes) => Promise.all(themes.map((theme) => run("src", "dist", theme))));
