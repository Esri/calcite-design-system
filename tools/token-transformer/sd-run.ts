// import { registerTransforms } from '@tokens-studio/sd-transforms';
import * as StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';
import { expandComposites } from './parse/expandComposites';
import { Theme } from './getThemes'
import { formatJS } from './format/javascript';
import { formatCSS } from './format/css';
import { nameCamelCase } from './transform/nameCamelCase';
import { parseName } from './utils/parseName';

const matchExclusions = /(backup|\[|\])(?=\.\w+$)/
const matchFiles = (filePath: string, matchList: string[]) => {
  return matchList.some((value) =>  filePath.includes(value) && !matchExclusions.test(filePath));
}

export const run = async (
  tokenDir: string = 'tokens',
  buildPath: string = 'build',
  theme: Theme
) => {
  const fileName = parseName(theme.name);
  const include = theme.source.map(tokenFile => `tokens/${tokenFile}.json`);
  const source = theme.enabled.map(tokenFile => `tokens/${tokenFile}.json`);
  const options = {
    enabled: theme.enabled,
    source: theme.source,
    disabled: theme.disabled,
    outputReferences: true,
    sourceReferencesOnly: true,
  };

  await registerTransforms(StyleDictionary, { expand: false });

  StyleDictionary.registerFormat({
    name: 'calcite/js',
    formatter: formatJS
  });
  StyleDictionary.registerFormat({
    name: 'calcite/css',
    formatter: formatCSS
  })

  StyleDictionary.registerTransform({
    name: 'name/calcite/camel',
    type: 'name',
    transformer: nameCamelCase
  })

  const _sd = StyleDictionary.extend({
    source,
    include,
    platforms: {
      js: {
        prefix: "calcite",
        transforms: [
          'ts/descriptionToComment',
          'ts/opacity',
          'ts/size/lineheight',
          'ts/type/fontWeight',
          'ts/resolveMath',
          'ts/size/css/letterspacing',
          'ts/color/css/hexrgba',
          'ts/color/modifiers',
          'name/calcite/camel',
        ],
        buildPath: `${buildPath}/js/`,
        files: [{
          destination: `${fileName}.js`, 
          format: "calcite/js",
          options,
        }]
      },
      css: {
        prefix: "calcite",
        transforms: [
          'ts/descriptionToComment',
          'ts/size/px',
          'ts/opacity',
          'ts/size/lineheight',
          'ts/type/fontWeight',
          'ts/resolveMath',
          'ts/size/css/letterspacing',
          'ts/color/css/hexrgba',
          'ts/color/modifiers',
          'name/cti/kebab',
        ],
        buildPath: `${buildPath}/css/`,
        files: [{
          destination: `${fileName}.css`, 
          format: "calcite/css",
          options,
        }]
      }
    },
    parsers: [{
      pattern: /\.json$/,
      parse: (file) => {
        if (matchFiles(file.filePath, [...include, ...theme.source, ...theme.enabled])) {
          const obj = JSON.parse(file.contents);
          const expanded = expandComposites(obj, file.filePath);
          
          return expanded;
        } else {
          return {};
        }
      }
    }]
  });

  try {
    _sd.cleanAllPlatforms();
    _sd.buildAllPlatforms();
  } catch (error) {
    console.error(error)
  }
}
