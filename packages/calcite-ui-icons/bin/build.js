import fsExtra from "fs-extra";
import optimize from "./optimize.js";
import generatePathFile from "./path-data.js";
const { existsSync, mkdirSync } = fsExtra;
export default (function () {
    if (!existsSync("js")) {
        mkdirSync("js");
    }
    return optimize("*.svg")
        .then(() => optimize("icons/*.svg", true))
        .catch((error) => {
        console.error("🚨  Error while optimizing icons");
        throw error;
    })
        .then(() => {
        console.log("✨ icons optimized successfully");
        return generatePathFile();
    })
        .catch((error) => {
        console.error("🚨  Error while generating icons.json");
        console.error(error);
        throw error;
    })
        .then((files) => {
        console.log("✨ path file generated at ./docs/icons.json");
        return files;
    });
});
