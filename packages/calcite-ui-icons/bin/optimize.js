const { readFile, writeFile } = require("fs/promises");
const { glob } = require("glob");
const { optimize } = require("svgo");
const progress = require("cli-progress");

let options = {
  multipass: true,
  plugins: [
    { name: "cleanupIds", params: { remove: false } },
    { name: "removeAttrs", params: { attrs: ["class", "(stroke)"] } },
    "removeDimensions",
    "removeStyleElement",
    {
      name: "preset-default",
      params: {
        overrides: {
          removeUselessDefs: true,
          removeUselessStrokeAndFill: false,
          removeHiddenElems: true,
          removeEmptyText: true,
          convertShapeToPath: { convertArcs: true },
          convertPathData: { noSpaceAfterFlags: false },
          removeEmptyAttrs: true,
          removeEmptyContainers: true,
          mergePaths: false,
          removeTitle: true,
          removeDesc: true,
        },
      },
    },
  ],
};

/**
 * Reads an icon file off disk and optimizes it, saving to same location
 * @param {string[]}           filePaths  array of relative file paths
 * @param {boolean}            remove     remove id attributes from output
 * @param {SingleBar}          bar        progress bar instance
 * @return {Promise}
 */
function optimizeIcons(filePaths, remove, bar) {
  let num = 0;
  options.plugins[0].params.remove = remove;
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

/**
 * Optimize a set of icons
 * @param {string}   files       Glob pattern for icons source
 * @param {boolean}  remove      Remove id attributes from output
 * @return {Promise}             Formatted object with all icon metadata
 */
module.exports = function (files, remove) {
  if (!files) {
    return Promise.resolve(true);
  }
  return glob(files).then((iconPaths) => {
    const format = "  \x1b[32m {bar} {percentage}% | {value}/{total} \x1b[0m";
    const bar = new progress.SingleBar(
      { format },
      progress.Presets.shades_classic,
    );
    bar.start(iconPaths.length, 0);
    return optimizeIcons(iconPaths, remove, bar).then(() => {
      bar.stop();
      console.log("");
    });
  });
};
