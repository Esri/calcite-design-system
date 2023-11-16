import { Core as StyleDictionary } from "style-dictionary";

import { setTokenNameByPlatform } from "../../../utils/setTokenNameByPlatform.js";
import { PlatformUnion } from "../../../../types/platform.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const transformAttributesNamesPerPlatform: CalledTransformerFunction<{ [key: string]: any }> = (token, args) => {
  const tokenNameOutputByPlatform = args.options.platforms.reduce((acc, platform) => {
    let file;
    let platformArgs;

    if ("platform" in args) {
      file = args.file;
      platformArgs = args.platform;
    } else {
      file = args.files[0];
      platformArgs = args;
    }

    acc[platform] = setTokenNameByPlatform(token, {
      ...platformArgs,
      files: [{ ...file, format: platform }],
    });

    return acc;
  }, {} as Record<PlatformUnion, string>);
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
