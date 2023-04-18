import { registerTransforms } from '@tokens-studio/sd-transforms';
import * as StyleDictionary from 'style-dictionary';

await registerTransforms(StyleDictionary, { expand: {
  composition: true,
  typography: true,
  border: true,
  shadow: true,
}});

const sd = StyleDictionary.extend({
  source: ['**/*.tokens.json'],
  platforms: {
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'variables.js',
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
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
    },
  },
});

export const run = () => {
  sd.cleanAllPlatforms();
  sd.buildAllPlatforms();
}
