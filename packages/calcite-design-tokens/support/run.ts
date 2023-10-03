import { readFileSync } from "fs";
import { getThemes } from "./token-transformer/getThemes.js";
import { run } from "./token-transformer/sd-run.js";
import { resolve, join } from "path";
import { URL } from "url";

const __dirname = new URL(".", import.meta.url).pathname;

/**
 * Get all themes defined int the src/$themes.json and generate a Style Dictionary output for each theme
 */
const tokensDir = resolve(__dirname, "../src");
const rawData = readFileSync(join(tokensDir, "$themes.json"), { encoding: "utf-8" });
const data = JSON.parse(rawData);
const files = await getThemes(data);
Promise.all(files.map((theme) => run("src", "dist", theme)));