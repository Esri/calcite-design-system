#!/usr/bin/env node
import fsExtra from "fs-extra";
import svg2img from "svg2img";
import path from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const { readdir, writeFile, readFile, mkdirSync, writeFileSync, existsSync } = fsExtra;

const options = yargs(hideBin(process.argv))
  .usage(
    "Usage: -n <name of icon, omit if doing bulk>, \n-s <output size, defaults to 24>, \n-o <output path (defaults to ./output)>, \n-p <target platform (e.g. ios) \n-i <16, 24, 32, omit for 16>",
  )
  .option("n", {
    alias: "name",
    describe: "name of icon, without -32.svg; omit to convert all icons",
    type: "string",
    demandOption: false,
  })
  .option("o", {
    alias: "outputDir",
    describe: "output path, relative to this script",
    type: "string",
    demandOption: false,
  })
  .option("p", {
    alias: "outputPlatform",
    describe: "target platform, valid options are: ios",
    type: "string",
    demandOption: false,
  })
  .option("i", { alias: "inSize", describe: "source svg variant, defaults to 16", type: "string", demandOption: false })
  .option("s", { alias: "outSize", describe: "size of output image", type: "string", demandOption: false }).argv;
/**
 * Converts a single svg to png, with given width & height values. The function will automatically append '.png'
 * @param {string} svgFilePath - filepath to icon .svg
 * @param {int} width - width of output file
 * @param {int} height - height of output file
 * @param {string} outputBasePath - base directory in which to store output
 * @param {string} outputName - name of output png image, excluding '.png'
 * @param {string} outputSuffix - suffix appended to output file name (ex, '@2x')
 */
function convertSingleIconToPng(svgFilePath, width, height, outputBasePath, outputName, outputSuffix = null) {
  // make sure output base path exists
  if (!existsSync(outputBasePath)) {
    mkdirSync(outputBasePath, {
      recursive: true,
    });
  }
  // concatenate real output path
  let real_output_path = path.join(outputBasePath, outputName);
  if (outputSuffix) {
    real_output_path += outputSuffix;
  }
  real_output_path += ".png";
  // convert and save the image
  svg2img(svgFilePath, { width: width, height: height }, function (error, buffer) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    writeFileSync(real_output_path, buffer);
  });
}
/**
 * Creates an ImageSet (including Contents.json file) for an icon
 * @param {string} svgFilePath - filepath to icon .svg
 * @param {int} width - width of output file @1x
 * @param {int} height - height of output file @1x
 * @param {string} outputBasePath - base directory in which to store output
 * @param {string} outputName - name of output png image, excluding '.png'
 */
function convertIconToXcodeImageSet(svgFilePath, width, height, outputBasePath, outputName) {
  const outputImagesetPath = path.join(outputBasePath, outputName + ".imageset");
  // Create images at 3 sizes
  convertSingleIconToPng(svgFilePath, width, height, outputImagesetPath, outputName, "@1x");
  convertSingleIconToPng(svgFilePath, width * 2, height * 2, outputImagesetPath, outputName, "@2x");
  convertSingleIconToPng(svgFilePath, width * 3, height * 3, outputImagesetPath, outputName, "@3x");
  // read template
  const imagesetTemplatePath = path.join(import.meta.dirname, "templates", "imageset.json");
  // create Contents.json for asset catalog asset
  readFile(imagesetTemplatePath, "utf8", function (error, buffer) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    const contentsJsonBuffer = buffer.replace(/\$\{NAME\}/g, outputName);
    const contentsJsonOutputPath = path.join(outputImagesetPath, "Contents.json");
    writeFileSync(contentsJsonOutputPath, contentsJsonBuffer);
  });
}
/**
 * Indexes all calcite icons contained in directory at path
 * @param {string} baseIconPath - path to calcite .svg icons directory
 */
async function indexCalciteIcons(baseIconPath) {
  return new Promise((resolve) => {
    const iconIndex = {};
    readdir(baseIconPath, function (error, files) {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      files.forEach(function (file) {
        // strip all files of file size information, catalog in an index
        let base_name = path.basename(file);
        base_name = base_name.replace(".svg", "");
        let size = undefined;
        if (base_name.includes("-16")) {
          base_name = base_name.replace("-16", "");
          size = 16;
        } else if (base_name.includes("-24")) {
          base_name = base_name.replace("-24", "");
          size = 24;
        } else if (base_name.includes("-32")) {
          base_name = base_name.replace("-32", "");
          size = 32;
        }
        if (!iconIndex[base_name]) {
          iconIndex[base_name] = {};
        }
        iconIndex[base_name][size] = path.join(baseIconPath, file);
      });
      resolve(iconIndex);
    });
  });
}
/**
 * Indexes all calcite icons contained in directory at path
 * @param {string} xcAssetsBaseDirectory - path where to derive calcite.xcassets
 */
async function createCalciteXCAssets(xcAssetsBaseDirectory) {
  return new Promise((resolve) => {
    // Put in .xcassets folder
    const directory = path.join(xcAssetsBaseDirectory, "calcite.xcassets");
    // Make sure dir exists
    if (!existsSync(directory)) {
      mkdirSync(directory, {
        recursive: true,
      });
    }
    // read contents.json template
    const template_path = path.join(import.meta.dirname, "templates", "xcassets.json");
    // write out file
    readFile(template_path, "utf8", function (error, buffer) {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      const contents_output_path = path.join(directory, "Contents.json");
      writeFile(contents_output_path, buffer, function () {
        resolve(directory);
      });
    });
  });
}
async function main() {
  // index all calcite icons
  const iconIndex = await indexCalciteIcons("./icons/");
  // establish output root path
  let outputRoot = path.join(import.meta.dirname, "output");
  if (options.outputDir) {
    outputRoot = path.join(import.meta.dirname, options.outputDir);
  }
  // establish input size
  let inputSize = 24;
  if (options.inSize === "16") {
    inputSize = 16;
  } else if (options.inSize === "24") {
    inputSize = 24;
  } else if (options.inSize === "32") {
    inputSize = 32;
  } else if (options.outSize) {
    const size = parseInt(options.outSize);
    if (size < 24) {
      inputSize = 16;
    } else if (size < 32) {
      inputSize = 24;
    } else if (size >= 32) {
      inputSize = 32;
    }
  }
  // establish output size (in pixels)
  let outputSize = 24;
  if (options.outSize) {
    const size = parseInt(options.outSize);
    if (size) {
      outputSize = size;
    }
  }
  // ensure icon name is valid, checking index
  if (options.name) {
    if (!(options.name in iconIndex)) {
      console.log("Invalid icon name " + options.name);
      process.exit(1);
    }
  }
  // build xcassets if output for iOS
  if (options.outputPlatform === "ios") {
    const xcAssetsDirectory = await createCalciteXCAssets(outputRoot);
    if (options.name) {
      const name = options.name;
      const file = iconIndex[name][inputSize];
      convertIconToXcodeImageSet(file, outputSize, outputSize, xcAssetsDirectory, name);
    } else {
      for (const key in iconIndex) {
        const file = iconIndex[key][inputSize];
        convertIconToXcodeImageSet(file, outputSize, outputSize, xcAssetsDirectory, key);
      }
    }
  } else {
    // platform is not ios, render plain png
    if (options.name) {
      const name = options.name;
      const file = iconIndex[name][inputSize];
      convertSingleIconToPng(file, outputSize, outputSize, outputRoot, name, undefined);
    } else {
      for (const key in iconIndex) {
        const file = iconIndex[key][inputSize];
        convertSingleIconToPng(file, outputSize, outputSize, outputRoot, key, undefined);
      }
    }
  }
}
main();
