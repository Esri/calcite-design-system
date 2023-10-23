import { registerTransforms } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { expandComposites } from "./parse/expandComposites.js";
import { formatSCSS } from "./format/scss.js";
import { matchExclusions } from "./utils/regex.js";
import { matchList } from "./utils/matchList.js";
import { nameCamelCase } from "./transform/nameCamelCase.js";
import { nameKebabCase } from "./transform/nameKebabCase.js";
import { parseName } from "./utils/parseName.js";
import { Theme } from "./getThemes.js";

/**
 * Style Dictionary runner configuration overrides.
 *
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
  const include = theme.source.map((tokenFile) => `${tokenDir}/${tokenFile}.json`);
  const source = theme.enabled.map((tokenFile) => `${tokenDir}/${tokenFile}.json`);
  const options = {
    enabled: theme.enabled,
    source: theme.source,
    disabled: theme.disabled,
    outputReferences: false,
    sourceReferencesOnly: false,
  };

  // Here we are registering the Transforms provided by Token Studio
  // https://github.com/tokens-studio/sd-transforms
  // @ts-expect-error - @token-studio does not keep their types up to date.
  await registerTransforms(StyleDictionary, {
    expand: false,
  });

  // Register custom formatter https://amzn.github.io/style-dictionary/#/formats?id=custom-formats
  StyleDictionary.registerFormat({
    name: "calcite/scss",
    formatter: formatSCSS,
  });

  // Registering Style Dictionary transformers https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms
  StyleDictionary.registerTransform({
    name: "name/calcite/camel",
    type: "name",
    transformer: nameCamelCase,
  });

  StyleDictionary.registerTransform({
    name: "name/calcite/kebab",
    type: "name",
    transformer: nameKebabCase,
  });

  StyleDictionary.registerFilter({
    name: "filterSource",
    matcher: (token) => token.isSource,
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
          "ts/resolveMath",
          "ts/size/css/letterspacing",
          "ts/color/css/hexrgba",
          "ts/color/modifiers",
          "name/calcite/kebab",
        ],
        buildPath: `${buildPath}/css/`,
        files: [
          {
            destination: `${fileName}.css`,
            format: "css/variables",
            filter: /headless/gi.test(fileName) ? null : "filterSource",
            options: /headless/gi.test(fileName) ? { ...options, outputReferences: true } : options,
          },
        ],
      },
      scss: {
        prefix: "calcite",
        transforms: [
          "ts/descriptionToComment",
          "ts/size/px",
          "ts/opacity",
          "ts/size/lineheight",
          "ts/type/fontWeight",
          "ts/resolveMath",
          "ts/size/css/letterspacing",
          "ts/color/css/hexrgba",
          "ts/color/modifiers",
          "name/calcite/kebab",
        ],
        buildPath: `${buildPath}/scss/`,
        files: [
          {
            destination: `${fileName}.scss`,
            format: "calcite/scss",
            filter: /headless/gi.test(fileName) ? null : "filterSource",
            options: /headless/gi.test(fileName) ? { ...options, outputReferences: true } : options,
          },
        ],
      },
    },
    parsers: [
      {
        pattern: /\.json$/,
        parse: (file) => {
          if (matchList(file.filePath, [...include, ...theme.source, ...theme.enabled], matchExclusions)) {
            const obj = JSON.parse(file.contents);
            const expanded = expandComposites(obj, file.filePath);
            return expanded;
          }

          return {};
        },
      },
    ],
  });

  try {
    sd.cleanAllPlatforms();
    sd.buildAllPlatforms();
  } catch (error) {
    console.error(error);
  }
};
