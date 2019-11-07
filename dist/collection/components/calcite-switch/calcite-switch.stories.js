import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Switch', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <label>
      <calcite-switch
        name="setting"
        value="enabled"
        switched="${boolean("switched", true)}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        color="${select("color", ["blue", "red"], "blue")}"
      ></calcite-switch>
      Enable setting
    </label>
  `, { notes })
  .add('Dark mode', () => `<calcite-switch theme="dark"></calcite-switch>`,
   { notes, backgrounds: darkBackground });
