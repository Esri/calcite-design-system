// import { registerTransforms } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';
import { expandComposites } from './parse/expandComposites.js';
import { Theme } from './getThemes.js';
import { formatJS } from './format/javascript.js';
import { formatCSS } from './format/css.js';
import { nameCamelCase } from './transform/nameCamelCase.js';
import { nameKebabCase } from './transform/nameKebabCase.js';
import { parseName } from './utils/parseName.js';

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
    outputReferences: false,
    sourceReferencesOnly: false,
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

  StyleDictionary.registerTransform({
    name: 'name/calcite/kebab',
    type: 'name',
    transformer: nameKebabCase
  })

  StyleDictionary.registerFilter({
    name: 'filterSource',
    matcher: (token) => token.isSource
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
          format: "javascript/es6",
          filter: /headless/gi.test(fileName) ? null : 'filterSource',
          options: /headless/gi.test(fileName) ? { ...options, outputReferences: true } : options,
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
          'name/calcite/kebab',
        ],
        buildPath: `${buildPath}/css/`,
        files: [{
          destination: `${fileName}.css`, 
          format: "css/variables",
          filter: /headless/gi.test(fileName) ? null : 'filterSource',
          options: /headless/gi.test(fileName) ? { ...options, outputReferences: true } : options,
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
