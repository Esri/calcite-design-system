import { Core as StyleDictionary } from "style-dictionary";

import { Platform, PlatformUnion } from "../../../../types/platform.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";
import { transformNamesSet } from "../name/nameSet.js";

export const transformAttributesNamesPerPlatform: CalledTransformerFunction<{ [key: string]: any }> = (token, args) => {
  const tokenNameOutputByPlatform = args.options.platforms.reduce(
    (acc, platform) => {
      acc[platform] = transformNamesSet(token, {
        ...args,
        options: {
          ...args.options,
          platform,
          prefix: platform === Platform.DOCS || platform === Platform.JS ? undefined : args.options.prefix,
        },
      });

      return acc;
    },
    {} as Record<PlatformUnion, string>,
  );
  return { ...token.attributes, names: tokenNameOutputByPlatform };
};

export const registerAttributePlatformNames = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: attributePlatformNames,
    transformer: transformAttributesNamesPerPlatform,
    type: "attribute",
  };

  sd.registerTransform(transformerConfig);
};

export const attributePlatformNames = "attribute/calcite/platform-name";
