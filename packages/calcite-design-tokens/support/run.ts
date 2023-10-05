import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { getThemes } from "./token-transformer/getThemes.js";
import { run } from "./token-transformer/sd-run.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get all themes defined int the tokens/$themes.json and generate a Style Dictionary output for each theme
 */
const rawData = readFileSync(resolve(__dirname, "../src/$themes.json"), { encoding: "utf-8" });
const data = JSON.parse(rawData);

getThemes(data).then((themes) => Promise.all(themes.map((theme) => run("src", "dist", theme))));
