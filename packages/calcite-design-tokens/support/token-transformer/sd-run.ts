import { registerTransforms } from "@tokens-studio/sd-transforms";
import { default as StyleDictionary } from "style-dictionary";
import { formatSCSS } from "./format/scss.js";
import { formatCSS } from "./format/css.js";
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
    outputReferences: true,
  };

  // Here we are registering the Transforms provided by Token Studio
  // https://github.com/tokens-studio/sd-transforms
  await registerTransforms(StyleDictionary, {
    expand: {
      composition: true,
      typography: false,
      border: false,
      shadow: false,
    },
  });

  // Register custom formatter https://amzn.github.io/style-dictionary/#/formats?id=custom-formats
  StyleDictionary.registerFormat({
    name: "calcite/scss",
    formatter: formatSCSS,
  });
  StyleDictionary.registerFormat({
    name: "calcite/css",
    formatter: formatCSS,
  });

  // Registering Style Dictionary transformers https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms
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
            format: "calcite/css",
            filter: "filterSource",
            options,
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
            filter: "filterSource",
            options,
          },
        ],
      },
    },
  });

  try {
    sd.cleanAllPlatforms();
    sd.buildAllPlatforms();
  } catch (error) {
    console.error(error);
  }
};
