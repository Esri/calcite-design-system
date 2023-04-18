// import { registerTransforms } from '@tokens-studio/sd-transforms';
import * as StyleDictionary from 'style-dictionary';

export const run = async () => {
  const _sd = StyleDictionary.extend({
    source: ['tokens/**/*.json'],
    platforms: {
      css: {
        transforms: [
          'name/cti/kebab',
        ],
        buildPath: 'build/css/',
        files: [
          {
            destination: 'calcite-headless.css', 
            format: 'css/variables',
          },
        ],
      },
    },
  });

  _sd.cleanAllPlatforms();
  _sd.buildAllPlatforms();
}
