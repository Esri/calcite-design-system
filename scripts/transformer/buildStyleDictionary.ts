import { registerTransforms } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

export const buildStyleDictionary = async (options: {source:string; destination: string; buildPath: string;}) => {
  const {source, destination, buildPath} = options;
  await registerTransforms(StyleDictionary);

  const sd = StyleDictionary.extend({
    source: [source],
    platforms: {
      js: {
        transformGroup: 'tokens-studio',
        buildPath: `${buildPath}/js/`,
        files: [
          {
            destination: `${destination}.js`,
            format: 'javascript/es6',
          },
        ],
      },
      css: {
        transforms: [
          'ts/descriptionToComment',
          'ts/size/px',
          'ts/opacity',
          'ts/size/css/letterspacing',
          'ts/size/lineheight',
          'ts/type/fontWeight',
          'ts/resolveMath',
          'ts/typography/css/shorthand',
          'ts/border/css/shorthand',
          'ts/shadow/css/shorthand',
          'ts/color/css/hexrgba',
          'ts/color/modifiers',
          'name/cti/kebab',
        ],
        buildPath:  `${buildPath}/css/`,
        files: [
          {
            destination: `${destination}.css`,
            format: 'css/variables',
          },
        ],
      },
    },
  });

  sd.cleanAllPlatforms();
  sd.buildAllPlatforms();
}
