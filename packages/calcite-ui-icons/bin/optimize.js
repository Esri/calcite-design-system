import fsExtra from "fs-extra";
import { glob } from "glob";
import { optimize } from "svgo";
import progress from "cli-progress";
const { readFile, writeFile } = fsExtra;
const options = {
  plugins: [
    {
      name: "preset-default",
      overrides: {
        cleanupIDs: { remove: false },
        removeUselessStrokeAndFill: false,
        convertShapeToPath: { convertArcs: true },
        convertPathData: { noSpaceAfterFlags: false },
        mergePaths: false,
        removeAttrs: { attrs: ["class", "(stroke)"] },
      },
    },
    "removeStyleElement",
    "removeTitle",
    "removeDimensions",
  ],
  multipass: true,
};
/**
 * Reads an icon file off disk and optimizes it, saving to same location
 *
 * @param {string[]}           filePaths  array of relative file paths
 * @param {SingleBar}          bar        progress bar instance
 * @return {Promise}
 */
function optimizeIcons(filePaths, bar) {
  let num = 0;
  return Promise.all(
    filePaths.map((path) =>
      readFile(path, "utf-8")
        .then((svg) => optimize(svg, { path, ...options }))
        .then((result) => {
          num++;
          bar.update(num);
          return writeFile(path, result.data, "utf-8");
        }),
    ),
  );
}
export default (function (files, remove = false) {
  if (!files) {
    return Promise.resolve(true);
  }
  options.plugins.find(({ name }) => name === "preset-default").overrides.cleanupIDs.remove = remove;
  return glob(files).then((iconPaths) => {
    const format = "  \x1b[32m {bar} {percentage}% | {value}/{total} \x1b[0m";
    const bar = new progress.SingleBar({ format }, progress.Presets.shades_classic);
    bar.start(iconPaths.length, 0);
    return optimizeIcons(iconPaths, bar).then(() => {
      bar.stop();
      console.log("");
    });
  });
});
