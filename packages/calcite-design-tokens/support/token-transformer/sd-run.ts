import { default as StyleDictionary } from "style-dictionary";

import { registerCalciteTransformers } from "./registerCalciteTransformers.js";
import { filterSource } from "./styleDictionary/filter/filterSource.js";
import { fileExtension } from "../types/fileExtensions.js";
import { Platform, PlatformFormats, PlatformUnion, TypescriptPlatform } from "../types/platform.js";

import { CalciteConfigStyleDictionaryRunner } from "../types/config.js";
import { Options } from "../types/styleDictionary/options.js";
import { PlatformOptions } from "../types/styleDictionary/platform.js";
import { File } from "../types/styleDictionary/file.js";
import { transformations } from "./styleDictionary/transformer/utils.js";
import { format } from "./styleDictionary/formatter/utils.js";

const destination = (name: string, format: PlatformFormats) => `${name}${fileExtension[format]}`;

const files = (platform: PlatformUnion, name: string, options?: Options): File[] => {
  const f = [];

  f.push({
    format: format(platform),
    destination: destination(name, platform),
    filter: filterSource,
    options: { ...options, platform },
  });

  switch (platform) {
    case Platform.JS:
    case Platform.ES6:
      f.push({
        format: format(platform === Platform.JS ? TypescriptPlatform.TS : TypescriptPlatform.ES6TS),
        destination: destination(name, TypescriptPlatform.TS),
        filter: filterSource,
        options: { ...options, platform },
      });
      break;

    default:
      break;
  }

  return f;
};

/**
 * Style Dictionary runner configuration overrides.
 *
 * @param {CalciteConfigStyleDictionaryRunner} config the style dictionary configuration
 */
export const run = async ({
  name,
  source,
  include,
  options,
  output,
}: CalciteConfigStyleDictionaryRunner): Promise<void> => {
  // To optimize performance of Calcite, we must generate additional files for certain platforms and for certain token tiers and contexts.
  // We generate the tiered token files via the normal StyleDictionary output. Any additional compiled files are handled by the expandFiles.
  const expandFiles = output.expandFiles || undefined;

  const platforms = output.platforms.reduce(
    (acc, platform) => {
      const platformConfig: PlatformOptions = {
        options: { ...options, expandFiles, platforms: output.platforms },
        transforms: transformations[platform],
        buildPath: `${output.dir}/${platform}/`,
        files: files(platform, name),
      };
      acc[platform] = platformConfig;
      return acc;
    },
    {} as Partial<Record<PlatformUnion, PlatformOptions>>,
  );

  const config = {
    source,
    include,
    platforms,
  };

  await registerCalciteTransformers(StyleDictionary);

  // We are programmatically creating the Style Dictionary configuration here
  // https://amzn.github.io/style-dictionary/#/config
  const sd = StyleDictionary.extend(config);

  try {
    sd.cleanAllPlatforms();
    sd.buildAllPlatforms();
  } catch (error) {
    console.error(error);
  }
};
