"use strict";

const spriter = require("./index");
const { readFileSync } = require("fs");
const args = process.argv.slice(2); // skip runtime & script args

function hasArg(name, shorthand) {
  return getArgIndex(name, shorthand) > -1;
}

function getArgIndex(name, shorthand) {
  return args.findIndex((arg, index) => arg === `--${name}` || arg === `-${shorthand}`);
}

function getArg(name, shorthand) {
  return args[getArgIndex(name, shorthand) + 1];
}

if (hasArg("help", "h")) {
  process.stdout.write(`
    --input, -i       path to configuration file
    --output, -o      output location for generated SVG sprite
    --help, -h        display this help message
  `);

  process.exit(0);
}

function getConfig() {
  let input = getArg("input", "i");

  if (input) {
    try {
      const configFileContents = readFileSync(input);
      input = JSON.parse(configFileContents).input;
    } catch (error) {
      process.stderr.write(`config - could not read input: ${error}`);
      process.exit(1);
    }
  }

  const output = getArg("output", "o");

  return { input, output };
}

spriter(getConfig())
  .then((summary) => {
    const { ellapsed, spritesheets } = summary;

    process.stdout.write(
      `Success!

Generated ${spritesheets.length} spritesheets in ${ellapsed} ms:

${spritesheets.map((spritesheet) => `* ${spritesheet.output} (${spritesheet.icons.length} icons)`).join("\n")}

`,
    );

    process.exit(0);
  })
  .catch((err) => {
    process.stderr.write(`Fail! ${err}`);
    process.exit(1);
  });
