import { registerTransforms } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { formatSCSS } from "./format/scss.js";
import { formatCSS } from "./format/css.js";
import { nameCamelCase } from "./transform/nameCamelCase.js";
import { nameKebabCase } from "./transform/nameKebabCase.js";
import { parseName } from "./utils/parseName.js";
import { Theme } from "./getThemes.js";
import { parse } from "./parse/parseJSON.js";
import * as valueMultiWord from "./transform/valueMultiWordString.js";
import * as valueFontWeightDemi from "./transform/valueDemi.js";
import * as valueMathEvaluate from "./transform/valueEvaluateMath.js";

/**
 * Style Dictionary runner configuration overrides.
 * @param {string} tokenDir the directory containing design token files
 * @param {string} buildPath the directory to write generated assets to
 * @param {Theme} theme the theme configuration to use to generate the platform asset files
 * @param {string} theme.name the name of the theme. This will be used as the basis for the generated asset file names.
 * @param {string[]} theme.enabled an array of partial file names matching the token files which should be included in the output
 * @param {string[]} theme.disabled an array of partial file names matching the token files which should explicitly not be included in the output
 * @param {string[]} theme.source an array of partial file names matching the token files which should not always be included in the output but who's values should be used for variables references in the "enabled" files
 */
export const run = async (
  tokenDir = "tokens",
  buildPath = "dist",
  theme: Pick<Theme, "enabled" | "disabled" | "name" | "source">
): Promise<void> => {
  const fileName = parseName(theme.name);
  const source = theme.enabled.map((tokenFile) => `${tokenDir}/${tokenFile}.json`);
  // Bit confusing here. Style Dictionary uses the term "source" to mean the source of the files to build. While Token Studio uses the word "enabled".
  // Instead Token Studio uses the word "source" to refer to tokens that are used for reference.
  const include = theme.source.map((tokenFile) => `${tokenDir}/${tokenFile}.json`);
  const options = {
    enabled: theme.enabled,
    source: theme.source,
    disabled: theme.disabled,
    outputReferences: false,
    sourceReferencesOnly: false
  };

  // Here we are registering the Transforms provided by Token Studio however,
  // we need to pass "expand: false" so that we can use our own custom JSON file parser.
  // any references to "ts/..." below are references to these Token Studio transformers
  // https://github.com/tokens-studio/sd-transforms
  await registerTransforms(StyleDictionary, { expand: false });

  StyleDictionary.registerParser({
    pattern: /\.json$/,
    parse
  });
  // Register custom formatter https://amzn.github.io/style-dictionary/#/formats?id=custom-formats
  StyleDictionary.registerFormat({
    name: "calcite/format/scss",
    formatter: formatSCSS
  });
  StyleDictionary.registerFormat({
    name: "calcite/format/css",
    formatter: formatCSS
  });

  // Registering Style Dictionary transformers https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms
  StyleDictionary.registerTransform({
    name: "name/calcite/camel",
    type: "name",
    transformer: nameCamelCase
  });

  StyleDictionary.registerTransform({
    name: "calcite/name/kebab",
    type: "name",
    transformer: nameKebabCase
  });

  StyleDictionary.registerTransform({
    name: "calcite/value/multiWord",
    type: "value",
    ...valueMultiWord
  });

  StyleDictionary.registerTransform({
    name: "calcite/value/demi",
    type: "value",
    ...valueFontWeightDemi
  });

  StyleDictionary.registerTransform({
    name: "calcite/value/math",
    type: "value",
    ...valueMathEvaluate
  });

  StyleDictionary.registerFilter({
    name: "filterSource",
    matcher: (token) => token.isSource
  });

  // We are programmatically creating the Style Dictionary configuration here
  // https://amzn.github.io/style-dictionary/#/config
  const sd = StyleDictionary.extend({
    source,
    include,
    platforms: {
      css: {
        prefix: "calcite",
        transforms: [
          "ts/descriptionToComment",
          "ts/size/px",
          "ts/opacity",
          "ts/size/lineheight",
          "ts/type/fontWeight",
          "calcite/value/math",
          "ts/size/css/letterspacing",
          "ts/color/css/hexrgba",
          "ts/color/modifiers",
          "calcite/value/demi",
          "calcite/value/multiWord",
          "calcite/name/kebab"
        ],
        buildPath: `${buildPath}/css/`,
        files: [
          {
            destination: `${fileName}.css`,
            format: "calcite/format/css",
            filter: /headless/gi.test(fileName) ? null : "filterSource",
            options: /headless/gi.test(fileName) ? { ...options, outputReferences: true } : options
          }
        ]
      },
      scss: {
        prefix: "calcite",
        transforms: [
          "ts/descriptionToComment",
          "ts/size/px",
          "ts/opacity",
          "ts/size/lineheight",
          "ts/type/fontWeight",
          "calcite/value/math",
          "ts/size/css/letterspacing",
          "ts/color/css/hexrgba",
          "ts/color/modifiers",
          "calcite/value/demi",
          "calcite/value/multiWord",
          "ts/shadow/css/shorthand",
          "calcite/name/kebab"
        ],
        buildPath: `${buildPath}/scss/`,
        files: [
          {
            destination: `${fileName}.scss`,
            format: "calcite/format/scss",
            filter: /headless/gi.test(fileName) ? null : "filterSource",
            options: /headless/gi.test(fileName) ? { ...options, outputReferences: true } : options
          }
        ]
      }
    }
  });

  try {
    sd.cleanAllPlatforms();
    sd.buildAllPlatforms();
  } catch (error) {
    console.error(error);
  }
};
