import { dirname } from "path";
import { Options, default as StyleDictionary } from "style-dictionary";
import { Platform } from "style-dictionary/types/Platform.js";
import { registerCalciteTransformers } from "./registerCalciteTransformers.js";
import { setPlatform } from "./utils/setPlatform.js";

type StyleDictionaryRunnerArguments = {
  name: string;
  source: string[];
  include: string[];
  options: Options;
  output: {
    dir: string;
    platforms: string[];
  };
};

await registerCalciteTransformers(StyleDictionary);

export function styleDictionaryRunner({
  name,
  source,
  include,
  options,
  output,
}: StyleDictionaryRunnerArguments): void {
  const styleDictionaryConfig = {
    source,
    include,
    platforms: output.platforms.reduce((acc, platform) => {
      try {
        acc = setPlatform(acc, {
          platform,
          name,
          options: {
            ...options,
            reference: include,
            sourceDir: dirname(source[0]),
          },
          output: output.dir,
        });
        return acc;
      } catch (error) {
        console.warn(`Calcite Token Transformer Error: Platform failed to build.\n ${platform}`);
        return acc;
      }
    }, {} as Record<string, Platform>),
  };
  const sdRunner = StyleDictionary.extend(styleDictionaryConfig);

  try {
    sdRunner.cleanAllPlatforms();
    sdRunner.buildAllPlatforms();
  } catch (error) {
    console.error(error);
  }
}
