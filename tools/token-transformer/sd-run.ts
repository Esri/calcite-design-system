// import { registerTransforms } from '@tokens-studio/sd-transforms';
import * as StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';
import { expandComposites } from './parse/expandComposites';
import { Theme } from './getThemes'
import { formatJS } from './format/javascript'

const defaultThemes: Theme[] = [{
  name: 'calcite-headless',
  source: [
    "core",
    "semantic",
    "component/checkbox",
    "component/chip",
    "component/loader",
    "component/radio",
    "component/rating",
    "component/label",
    "component/tooltip",
    "component/input-time",
    "component/switch",
    "component/input-message",
    "component/accordion-item",
    "component/alert",
    "component/accordion",
    "component/tip",
    "component/color-picker",
    "component/date-picker",
    "component/input-date-picker",
    "component/combobox",
    "component/button",
    "component/dropdown",
    "component/input-datetime-local",
    "component/link",
    "component/fab",
    "component/stepper",
    "component/pagination",
    "component/segmented-control",
    "component/stepper-item",
    "component/input-email",
    "component/input-file",
    "component/input-month",
    "component/input-number",
    "component/input-password",
    "component/input-search",
    "component/input-telephone",
    "component/input-text",
    "component/input-week",
    "component/textarea",
    "component/tab-title",
    "component/card",
    "component/tabs",
    "component/action-bar",
    "component/action",
    "component/action-pad",
    "component/action-bar-grid",
    "component/action-pad-grid",
    "component/block",
    "component/block-section",
    "component/notice",
    "component/modal",
    "component/panel-header",
    "component/popover",
    "component/tree-item",
    "component/tile"
  ],
  enabled: [
    "component/avatar"
  ],
  disabled: [],
}];

const matchExclusions = /(backup|\[|\])(?=\.\w+$)/
const matchFiles = (filePath: string, matchList: string[]) => {
  return matchList.some((value) =>  filePath.includes(value) && !matchExclusions.test(filePath));
}

export const run = async (
  include: string[] = defaultThemes[0].source.map(tokenFile => `tokens/${tokenFile}.json`),
  source: string[] = defaultThemes[0].enabled.map(tokenFile => `tokens/${tokenFile}.json`),
  buildPath: string = 'build/css/',
  themes: Theme[] = defaultThemes
) => {

  StyleDictionary.registerFormat({
    name: 'calcite/json',
    formatter: formatJS
  });

  StyleDictionary.registerFilter({
    name: 'isSource',
    matcher: (token) => token.isSource || token.isEnabled,
  })

  StyleDictionary.registerTransform({
    name: 'calcite/setSource',
    type: 'attribute',
    matcher: (token) => {
      return (!token.isSource);
    },
    transformer: (token, options) => {
      if (options && options['enableIncludes']) {
        token.isEnabled = true;
      }
      return token;
    }
  })

  // const regexMatchSDVariable = /\{[\w.-]+\}/g;
  await registerTransforms(StyleDictionary, { expand: false });

  const _sd = StyleDictionary.extend({
    source,
    include,
    platforms: {
      css: {
        prefix: "calcite",
        transforms: [
          'calcite/setSource',
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
        buildPath: `${buildPath}`,
        files: themes.reduce((acc, theme) => {
          const { name, enabled, source, disabled } = theme;
          const options = {
            enabled,
            source,
            disabled,
            outputReferences: true,
            enableIncludes: true,
          };

          acc.push({
            destination: `debug/${name}.css`, 
            format: 'calcite/json',
            filter: 'isSource',
            options,
          });

          acc.push({
            destination: `${name}.css`, 
            format: "css/variables",
            filter: 'isSource',
            options,
          });
          return acc;
        }, [])
      }
    },
    parsers: themes.reduce((acc, theme) => {
      const transformOpts = undefined;
      acc.push({
        pattern: /\.json$/,
        parse: (file) => {
          if (matchFiles(file.filePath, [...include, ...theme.source, ...theme.enabled])) {
            const obj = JSON.parse(file.contents);
            const expanded = expandComposites(obj, file.filePath, transformOpts);
            
            return expanded;
          } else {
            return {};
          }
        }
      })
      return acc;
    }, [])
  });

  _sd.cleanAllPlatforms();
  _sd.buildAllPlatforms();
}
