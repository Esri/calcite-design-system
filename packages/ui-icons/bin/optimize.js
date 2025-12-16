import fsExtra from "fs-extra";
import { globby } from "globby";
import { optimize } from "svgo";
import progress from "cli-progress";
const { readFile, writeFile } = fsExtra;
const options = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          convertPathData: { noSpaceAfterFlags: false },
          convertShapeToPath: { convertArcs: true },
          mergePaths: false,
          removeUselessStrokeAndFill: false,
        },
      }
    },
    {
      name: "cleanupIds",
      params: { remove: false },
    },
    {
      name: "removeAttrs",
      params: { attrs: ["class", "(stroke)"] },
    },
    "removeDimensions",
    "removeStyleElement",
    "removeTitle",
  ],
  multipass: true,
};
/**
 * Reads an icon file off disk and optimizes it, saving to same location
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
  options.plugins.find(({ name }) => name === "cleanupIds").remove = remove;
  return globby(files).then((iconPaths) => {
    const format = "  \x1b[32m {bar} {percentage}% | {value}/{total} \x1b[0m";
    const bar = new progress.SingleBar({ format }, progress.Presets.shades_classic);
    bar.start(iconPaths.length, 0);
    return optimizeIcons(iconPaths, bar).then(() => {
      bar.stop();
      console.log("");
    });
  });
});
