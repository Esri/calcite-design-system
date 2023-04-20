// import { registerTransforms } from '@tokens-studio/sd-transforms';
import * as StyleDictionary from 'style-dictionary';
import { excludeParentKeys, registerTransforms } from '@tokens-studio/sd-transforms';
import { expandComposites } from './parse/expandComposites';
import { Theme } from './getThemes'
const defaultThemes: Theme[] = [{
  name: 'calcite-headless',
  enabled: [
    "core",
    "semantic",
    "component/avatar",
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
  source: [],
  disabled: [],
}];

const matchConfigFiles = /\/\$[.\w]+$/;
const matchExclusions = /(backup|\[|\])(?=\.\w+$)/
const matchFiles = (filePath: string, matchList: string[]) => {
  return matchList.some((value) =>  filePath.includes(value) && !matchExclusions.test(filePath));
}

type TokenRef = {
  path: string;
  referencedBy: string[];
}

export const run = async (
  include: string[] = [
    'tokens/core.json',
    'tokens/semantic.json',
    ...defaultThemes[0].enabled
  ],
  source: string[] = ['tokens/**/*.json'],
  buildPath: string = 'build/css/',
  themes: Theme[] = defaultThemes
) => {
  let referencedTokens: TokenRef[] = [];

  StyleDictionary.registerFormat({
    name: 'calcite/json',
    formatter: (fileInfo) => {
      const { dictionary, platform, options, file } = fileInfo;
      return JSON.stringify(dictionary.tokens, null, 2);
    }
  });

  const regexMatchSDVariable = new RegExp('\{[\w\.-]+\}', 'g');
  await registerTransforms(StyleDictionary, { expand: false });
  StyleDictionary.registerTransform({
    name: 'calcite/ref-tokens',
    type: 'attribute',
    matcher: (token) => {
      return regexMatchSDVariable.test(token.original.value);
    },
    transformer: (token, options) => {
      const tokenPath = token.path.join('.');
      const matches = [...token.original.value.matchAll(/\{[\w\.-]+\}/g)];
      
      debugger;
      matches.forEach((match) => {
        const tokenRef: TokenRef = {
          path: match.slice(1, -1),
          referencedBy: [tokenPath]
        };
        const idx = referencedTokens.findIndex((tokenReference) => {
          return tokenReference.path === `${tokenPath}`;
        });
  
        if (idx === -1) {
          referencedTokens.push(tokenRef);
        } else {
          const updatedReferencedTokens = [...referencedTokens.splice(0, idx), tokenRef, ...referencedTokens.splice(idx+1)];
          referencedTokens = updatedReferencedTokens;
        }
      });

      return ({
        ...token.attributes,
        hasReference: token.value
      });
    }
  })
  const _sd = StyleDictionary.extend({
    source,
    include,
    platforms: {
      css: {
        prefix: "calcite",
        transforms: [
          'calcite/ref-tokens',
          'ts/descriptionToComment',
          'ts/size/px',
          'ts/opacity',
          'ts/size/lineheight',
          'ts/type/fontWeight',
          'ts/resolveMath',
          'ts/size/css/letterspacing',
          // 'ts/typography/css/shorthand',
          // 'ts/border/css/shorthand',
          // 'ts/shadow/css/shorthand',
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
          };

          acc.push({
            destination: `debug/${name}.css`, 
            format: 'calcite/json',
            options,
          });

          acc.push({
            destination: `${name}.css`, 
            format: "css/variables",
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
