import { storiesOf } from '@storybook/html';
import { withKnobs, select } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <calcite-dropdown
      alignment="${select("alignment", {left: "left", right: "right", center: "center"}, "left")}"
      scale="${select("scale", {s: "s", m: "m", l: "l"}, "m")}"
    >
      <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group grouptitle="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item active>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  `, { notes })
  .add('Dark mode', () => `
    <calcite-dropdown
      theme="dark"
      alignment="${select("alignment", {left: "left", right: "right", center: "center"}, "left")}"
      scale="${select("scale", {s: "s", m: "m", l: "l"}, "m")}"
    >
      <calcite-button slot="dropdown-trigger" theme="dark">Open Dropdown</calcite-button>
      <calcite-dropdown-group grouptitle="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item active>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  `, { notes, backgrounds: darkBackground });
