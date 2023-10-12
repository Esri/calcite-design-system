import { Options } from "style-dictionary/types/Options";
import { Platform } from "style-dictionary/types/Platform";
import { nameKebabCase } from "../transform/nameKebabCase.js";
import { valueStringWrapper } from "../transform/valueStringWrapper.js";
import { filterSource } from "../filter/filterSource.js";
import { formatCSS } from "../format/css.js";
import { formatSCSS } from "../format/scss.js";

const styleTransformDefaults = [
  "ts/descriptionToComment",
  "ts/size/px",
  "ts/opacity",
  "ts/size/lineheight",
  "ts/type/fontWeight",
  "ts/resolveMath",
  "ts/size/css/letterspacing",
  "ts/color/css/hexrgba",
  "ts/color/modifiers",
  valueStringWrapper,
  nameKebabCase,
];

const lookupFormatter = {
  css: formatCSS,
  scss: formatSCSS,
};

export function setPlatform(
  obj: Record<string, Platform>,
  platformArguments: {
    platform: string | Record<string, Platform>;
    name: string;
    options: Options & {
      themeable?: boolean;
      reference?: string[];
      sourceDir?: string;
    };
    output: string;
  }
): Record<string, Platform> {
  const { platform, name, options, output } = platformArguments;

  if (typeof platform === "string") {
    obj[platform] = {
      prefix: options.prefix,
      transforms: styleTransformDefaults,
      buildPath: `${output}/${platform}/`,
      files: [
        {
          destination: `${name}.${platform}`,
          format: lookupFormatter[platform],
          filter: filterSource,
          options: {
            ...options,
            output: {
              dir: output,
              platform,
              filePath: `${output}/${platform}/${name}.${platform}`,
            },
          },
        },
      ],
    };
    return obj;
  } else {
    return { ...obj, ...platform };
  }
}
