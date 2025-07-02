import camelCase from "lodash-es/camelCase.js";
import fsExtra from "fs-extra";
import { glob } from "glob";
import { parse } from "svgson";
import path from "node:path";
import package$0 from "../package.json" with { type: "json" };
const { writeFile, readFile, readFileSync } = fsExtra;
const version = package$0.version;
/**
 * Gets all important information about an icon.
 * @param {string} svg - Path to icon file.
 * @return {object} - Formatted object with all icon metadata
 */
function formatSVG(svg) {
    let file = path.basename(svg.file);
    let filled = file.indexOf("-f.svg") > -1;
    return {
        file,
        filled,
        paths: getPaths(svg.contents),
        size: getSize(file),
        variant: getVariant(file, filled),
    };
}
/**
 * Find the path(s) from an icon's svgson data
 * @param {object} svg - Object as returned from svgson.
 * @return {array} - Array of paths
 */
function getPaths(svg) {
    const bbPaths = ["M0 0h16v16H0z", "M0 0h24v24H0z", "M0 0h32v32H0z"];
    return svg.children
        .filter((child) => child.name === "path" && bbPaths.indexOf(child.attributes.d) === -1) // filter out bounding box paths
        .map((child) => ({
        opacity: child.attributes.opacity,
        d: child.attributes.d,
    }));
}
/**
 * Find the base icon name
 * @param {string} name - Icon filename
 * @param {boolean} filled - Icon filename
 * @return {array} - Icon filename without size, fill, or file extension
 */
function getVariant(name, filled) {
    var noF = name.replace("-f.svg", ".svg");
    return noF.substring(0, noF.length - 7) + (filled ? "-f" : "");
}
/**
 * Find an icon's size
 * @param {string} name - Icon filename
 * @return {integer} - 16, 24, 36
 */
function getSize(name) {
    var noF = name.replace("-f.svg", ".svg");
    return parseInt(noF.substring(noF.length - 4, noF.length - 6), 10);
}
/**
 * Read an icon from disc and get data as json
 * @param {string} fileName - Icon filename (full path)
 * @return {Promise} - Promise resolving to object which includes name and svgson data
 */
function readSVG(fileName) {
    return new Promise((resolve, reject) => readFile(fileName, "utf-8").then((svg) => parse(svg).then((contents) => resolve({ file: fileName, contents }))));
}
export default (function generatePathFile() {
    let banner = "// File generated automatically by path-data.js, do not edit directly\n";
    let jsFile = `${banner}`;
    let tsFile = `
${banner}
interface CalciteMultiPathEntry {
  d: string;
  opacity?: string;
}
export type CalciteIconPath = string | CalciteMultiPathEntry[];
`;
    return glob("icons/*.svg")
        .then((filePaths) => Promise.all(filePaths.map(readSVG)))
        .then((files) => files.map(formatSVG))
        .then((files) => {
        let icons = {};
        let promises = [];
        let keywords = JSON.parse(readFileSync("docs/keywords.json", "utf-8"));
        files.forEach((file) => {
            // add to json file
            icons[file.variant] = icons[file.variant] || keywords[file.variant] || { alias: [], category: "", release: "" };
            var icon = icons[file.variant];
            const firstPath = file.paths[0] || { d: "" }; // back up for "blank" icon
            const paths = file.paths.length > 1 ? file.paths : firstPath.d;
            icon[file.size] = paths;
            var base = file.variant.substring(0, file.variant.length - 2);
            // make sure filled variants get the keywords from their standard counterpart
            if (file.filled && !icon.release) {
                const variantKeywords = keywords[base];
                if (variantKeywords) {
                    icon.alias = variantKeywords.alias;
                    icon.category = variantKeywords.category;
                    icon.release = variantKeywords.release;
                }
            }
            // add to ts and js files
            const variant = file.variant.match(/^\d/) ? `i${file.variant}` : file.variant;
            const camelCaseName = camelCase(`${file.filled ? base : variant}-${file.size}${file.filled ? "-f" : ""}`);
            jsFile += `export {${camelCaseName}} from "./js/${camelCaseName}.js";\n`;
            let contents, tsContents;
            if (typeof paths === "string") {
                tsFile += `export const ${camelCaseName}: string;\n`;
                contents = `export const ${camelCaseName} = "${paths}";\n`;
                tsContents = `export const ${camelCaseName}: string;\n`;
            }
            else {
                icon.multiPath = true;
                tsFile += `export const ${camelCaseName}: CalciteMultiPathEntry[];\n`;
                contents = `export const ${camelCaseName} = ${JSON.stringify(paths)};\n`;
                tsContents = `export const ${camelCaseName}: CalciteMultiPathEntry[];\n`;
            }
            promises.push(writeFile(`js/${camelCaseName}.js`, contents, "utf8"));
            promises.push(writeFile(`js/${camelCaseName}.d.ts`, tsContents, "utf8"));
            promises.push(writeFile(`js/${camelCaseName}.json`, JSON.stringify(paths), "utf8"));
        });
        promises.push(writeFile("docs/icons.json", JSON.stringify({ version, icons }), "utf8"));
        promises.push(writeFile("index.d.ts", tsFile, "utf8"));
        promises.push(writeFile("index.js", jsFile, "utf8"));
        return Promise.all(promises);
    });
});
