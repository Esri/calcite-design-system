"use strict";

const { readdir, mkdir, writeFile, readFile, lstatSync } = require("fs-extra");
const path = require("path");

const ICONS = path.resolve(path.dirname(process.argv[1]), "../icons");
const NAME = "generated";

const SIZES = [16, 24, 32];

const OUTLINE = "outline";
const FILL = "fill";

const isDir = (file) => lstatSync(`${ICONS}/${file}`).isDirectory();
const readSVG = (icon) => readFile(`${ICONS}/${icon.fileName}`, { encoding: "utf-8" });
const has = (haystack, needle) => haystack.indexOf(needle) > -1;

/**
 * Icon descriptor.
 *
 * @typedef {Object} IconDescriptor
 *
 * @property {string} name
 * @property {string} size - possible options are "16" | "24" | "32"
 * @property {string} style - possible options are "outline" | "fill"
 */

/**
 * Requested icon.
 *
 * @typedef {Object} IconRequest
 *
 * @property {string} name
 * @property {string} size - possible options are "16" | "24" | "32"
 * @property {string} style - possible options are "outline" | "fill"
 * @property {string} fileName
 */

/**
 * Config icon.
 *
 * @typedef {Object} ConfigIcon
 *
 * @property {string} name
 * @property {string[] = [16]} size - possible options are 16 | 24 | 32
 * @property {string = "outline"} style - possible options are "outline" | "fill"
 */

/**
 * Config
 *
 * @typedef {Object} Config
 *
 * @property {ConfigIcon[]} input - icons to process, if missing all icons will be included.
 * @property {string = "output"} output - output directory for spritesheets, if missing "output" will be used
 */

/**
 * Spritesheet export info.
 *
 * @typedef {Object} ExportInfo
 *
 * @property {string} [16] - Size 16 Icons
 * @property {string} [24] - Size 24 Icons
 * @property {string} [32] - Size 32 Icons
 */

/**
 * Export summary.
 *
 * @typedef {Object} ExportSummary
 *
 * @property {number} ellapsed - total ellapsed time in ms
 * @property {ExportedSpritesheet[]}
 */

/**
 * Exported spritesheet info
 *
 * @typedef {Object} ExportedSpritesheet
 *
 * @property {string} output - output path
 * @property {IconDescriptor[]} icons - exported icons
 */

/**
 * Creates directory if non-existent.
 *
 * @param {string} dir - Path to create.
 *
 * @return {ThenPromise<T>} - Promise that resolves when directory creation is ensured.
 */
function ensureDir(dir) {
  return mkdir(dir).catch((error) => {
    const triedToCreateExisting = error.code === "EEXIST";

    if (!triedToCreateExisting) {
      throw error;
    }
  });
}

/**
 * Builds map of requested icons.
 *
 * @param {ConfigIcon[]} input
 *
 * @return {ExportInfo} - Key-value pair where keys correspond to icon size and values are @link{IconRequest[] requested icons}.
 */
function getRequestedIcons(input) {
  const iconsPerSize = {};

  SIZES.forEach((size) => (iconsPerSize[size] = []));

  input.forEach((icon) => {
    const { name, sizes = SIZES[0], style = OUTLINE } = icon;

    sizes
      .filter((size) => has(SIZES, size))
      .forEach((size) => {
        const fillPart = style === FILL ? "-f" : "";
        const fileName = `${name}-${size}${fillPart}.svg`;

        iconsPerSize[size].push({ name, size, style, fileName });
      });
  });

  return iconsPerSize;
}

/**
 * Creates spritesheet export details.
 *
 * @param {ExportInfo} requested
 *
 * @return {ThenPromise<ExportInfo>} - Promise that resolves with export info.
 */
function generateExportInfo(requested) {
  const processRequested = (icons) => {
    SIZES.forEach((size) => {
      requested[size].forEach((icon) => {
        if (!has(icons, icon.fileName)) {
          return;
        }

        exportInfo[size].push({
          name: icon.name,
          style: icon.style,
          size,
          fileName: icon.fileName,
        });
      });
    });
  };

  const processAll = (icons) => {
    icons.forEach((icon) => {
      SIZES.forEach((size) => {
        const fileMatchesSize = icon.indexOf(`-${size}`) > -1;

        if (!fileMatchesSize) {
          return;
        }

        const parserPattern = /(.+)-\d\d(-f)?\.svg/;
        const [, name, filled] = parserPattern.exec(icon);

        exportInfo[size].push({
          name,
          style: filled ? FILL : OUTLINE,
          size,
          fileName: icon,
        });
      });
    });
  };

  const includeAll = SIZES.every((size) => requested[size].length === 0);

  const exportInfo = {};
  SIZES.forEach((size) => (exportInfo[size] = []));

  return readdir(ICONS)
    .then((icons) => {
      if (includeAll) {
        processAll(icons);
        return;
      }

      processRequested(icons);
    })
    .then(() => exportInfo);
}

/**
 * Converts an SVG into a Symbol element.
 *
 * @param {string} icon - Icon descriptor.
 *
 * @return {ThenPromise<string>} - Promise that resolves with symbol element text content.
 */
function svgToSymbol(icon) {
  return readSVG(icon).then((svgContent) => {
    const svgContentCapturingPattern = /^\s*\<svg[^>]*>(.+)\<\/svg>\s*$/;
    const [, innerContent] = svgContentCapturingPattern.exec(svgContent);
    const { size } = icon;

    return `<symbol id="${icon.name}-${size}" viewbox="0 0 ${size} ${size}">${innerContent}</symbol>`;
  });
}

/**
 * Creates spritesheet content.
 *
 * @param {object} params - params for creating spritesheet.
 * @param {IconDescriptor[]} object.icons - Icons to include.
 * @param {string} object.output - Output directory.
 * @param {number} object.size - Target icon size.
 *
 * @return {ThenPromise<T>} - Promise that resolves when spritesheet is created
 */
function createSpritesheet({ icons, output, size }) {
  return Promise.all(icons.map(svgToSymbol))
    .then((symbols) => `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join("")}</svg>`)
    .then((content) => writeFile(`${output}/${`${NAME}-${size}.svg`}`, content));
}

/**
 * Creates icon spritesheet from config.
 *
 * @param {Config} config - Config file for spritesheet generation.
 *
 * @return {ThenPromise<ExportSummary>} - Promise that resolves with export summary.
 */
function spriter(config) {
  const startTime = process.hrtime();
  const { input = [], output = "./output" } = config;

  return ensureDir(output)
    .then(() => generateExportInfo(getRequestedIcons(input)))
    .then((exportInfo) =>
      Promise.all(
        SIZES.map((size) => {
          const icons = exportInfo[size];

          if (icons.length === 0) {
            return;
          }

          return createSpritesheet({ icons, output, size });
        }),
      ).then(() => exportInfo),
    )
    .then((exportInfo) => {
      const endTime = process.hrtime(startTime);

      const nanoToMillis = 1000000;
      const ellapsed = endTime[1] / nanoToMillis;

      const spritesheets = Object.keys(exportInfo).map((size) => {
        return {
          output: `${output}/${NAME}-${size}.svg`,
          icons: exportInfo[size],
        };
      });

      return { ellapsed, spritesheets };
    });
}

module.exports = spriter;
