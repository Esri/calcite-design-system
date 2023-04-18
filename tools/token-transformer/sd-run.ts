// import { registerTransforms } from '@tokens-studio/sd-transforms';
import * as StyleDictionary from 'style-dictionary';
import { Theme } from './getThemes'

const defaultThemes: Theme[] = [{
  name: 'calcite-headless',
  enabled: [
    "core",  "semantic",  "component/avatar",  "component/checkbox",
    "component/chip", "component/loader",  "component/radio",  "component/rating",
    "component/label",  "component/tooltip",  "component/input-time", "component/switch",
    "component/input-message",  "component/accordion-item",  "component/alert",  "component/accordion",
    "component/tip",  "component/color-picker",  "component/date-picker",  "component/input-date-picker",
    "component/combobox",  "component/button",  "component/dropdown",  "component/input-datetime-local",
    "component/link",  "component/fab",  "component/stepper",  "component/pagination",
    "component/segmented-control",  "component/stepper-item",  "component/input-email",  "component/input-file",
    "component/input-month",  "component/input-number",  "component/input-password",  "component/input-search",
    "component/input-telephone",  "component/input-text",  "component/input-week",  "component/textarea",
    "component/tab-title",  "component/card",  "component/tabs",  "component/action-bar",
    "component/action",  "component/action-pad",  "component/action-bar-grid",  "component/action-pad-grid",
    "component/block",  "component/block-section",  "component/notice",  "component/modal",
    "component/panel-header",  "component/popover",  "component/tree-item",  "component/tile"
  ],
  source: [],
  disabled: [],
}]

export const run = async (
  source: string[] = ['tokens/**/*.json'],
  buildPath: string = 'build/css/',
  themes: Theme[] = defaultThemes) => {
  const _sd = StyleDictionary.extend({
    source,
    platforms: {
      css: {
        transforms: [
          'name/cti/kebab',
        ],
        buildPath: `${buildPath}`,
        files: themes.map(({name, enabled, source, disabled}) => ({
            destination: `${name}.css`, 
            format: 'css/variables',
            options: {
              enabled,
              source,
              disabled,
            }
          })),
      }
    }
  });

  _sd.cleanAllPlatforms();
  _sd.buildAllPlatforms();
}
