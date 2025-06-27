import fsExtra from "fs-extra";
import { glob } from "glob";
import SVGO from "svgo";
import progress from "cli-progress";
const { readFile, writeFile } = fsExtra;
let options = {
    plugins: [
        { cleanupIDs: { remove: false } },
        { removeStyleElement: true },
        { removeUselessDefs: true },
        { removeUselessStrokeAndFill: false },
        { removeHiddenElems: true },
        { removeEmptyText: true },
        { convertShapeToPath: { convertArcs: true } },
        { convertPathData: { noSpaceAfterFlags: false } },
        { removeEmptyAttrs: true },
        { removeEmptyContainers: true },
        { mergePaths: false },
        { removeTitle: true },
        { removeDesc: true },
        { removeDimensions: true },
        { removeAttrs: { attrs: ["class", "(stroke)"] } },
    ],
    multipass: true,
};
/**
 * Reads an icon file off disk and optimizes it, saving to same location
 * @param {string[]}           filePaths  array of relative file paths
 * @param {SVGO}               svgo       SVGO instance with correct options
 * @param {SingleBar}          bar        progress bar instance
 * @return {Promise}
 */
function optimizeIcons(filePaths, svgo, bar) {
    let num = 0;
    return Promise.all(filePaths.map((path) => readFile(path, "utf-8")
        .then((svg) => svgo.optimize(svg, { path }))
        .then((result) => {
        num++;
        bar.update(num);
        return writeFile(path, result.data, "utf-8");
    })));
}
export default (function (files, remove) {
    if (!files) {
        return Promise.resolve(true);
    }
    options.plugins[0] = { cleanupIDs: { remove } };
    let svgo = new SVGO(options);
    return glob(files).then((iconPaths) => {
        const format = "  \x1b[32m {bar} {percentage}% | {value}/{total} \x1b[0m";
        const bar = new progress.SingleBar({ format }, progress.Presets.shades_classic);
        bar.start(iconPaths.length, 0);
        return optimizeIcons(iconPaths, svgo, bar).then(() => {
            bar.stop();
            console.log("");
        });
    });
});
