import { storiesOf } from '@storybook/html';
import { withKnobs, text, number, boolean, select } from '@storybook/addon-knobs'
import { darkBackground, scaleOptions, colorOptions } from "../../../.storybook/helpers";
import notes from './readme.md';

storiesOf('calcite-switch', module)
  .addDecorator(withKnobs)
  .add('Simple', () => {
    return `
    <label>
      <calcite-switch
        name="setting"
        value="enabled"
        switched="${boolean("switched", true)}"
        scale="${select("scale", scaleOptions, "m")}"
        color="${select("color", colorOptions, "blue")}"
      ></calcite-switch>
      Enable setting
    </label>
    `
  }, { notes })
  .add('Dark mode', () => `<calcite-switch theme="dark"></calcite-switch>`, { notes, backgrounds: darkBackground });
