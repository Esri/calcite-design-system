import { storiesOf } from '@storybook/html';
import { withKnobs, select } from '@storybook/addon-knobs'
import { darkBackground } from "../../../.storybook/helpers";
import notes from './readme.md';

storiesOf('Radio Group', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <calcite-radio-group
      scale="${select('scale', { s: 's', m: 'm', l:'l' }, 'm')}"
    >
      <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
    </calcite-radio-group>
  `, { notes })
  .add('Dark mode', () => `
    <calcite-radio-group
      theme="dark"
      scale="${select('scale', { s: 's', m: 'm', l:'l' }, 'm')}"
    >
      <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
    </calcite-radio-group>
  `, { notes, backgrounds: darkBackground });
