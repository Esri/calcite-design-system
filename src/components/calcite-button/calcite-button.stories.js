import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import { images24 } from "@esri/calcite-ui-icons/js/images24";
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <calcite-button
      appearance="${select("appearance", {solid: "solid", clear: "clear", inline: "inline", outline: "outline"}, "solid")}"
      color="${select("color", {blue: "blue", red: "red", dark: "dark", light: "light"}, "blue")}"
      scale="${select("scale", {xs: "xs", s: "s", m: "m", l: "l", xl: "xl" }, "m")}"
      href="${text("href", "")}"
      loading="${boolean("loading", false)}"
      disabled="${boolean("disabled", false)}"
    >
      Button text
    </calcite-button>
  `, { notes })
  .add('With icon', () => `
    <calcite-button
      icon="${text("icon", images24)}"
      iconposition="${select("iconposition", {start: "start", end: "end"}, "start")}"
    >
      Button text
    </calcite-button>
  `, { notes })
  .add('Set width', () => `
    <div style="width: 480px; max-width: 100%; background-color: #fff">
      <calcite-button
        width="${select("width", {auto: "auto", half: "half", full: "full"}, "auto")}"
      >
        Button text
      </calcite-button>
    </div>
  `, { notes })
  .add('Dark mode', () => `
    <calcite-button
      theme="dark"
      appearance="${select("appearance", {solid: "solid", clear: "clear", inline: "inline", outline: "outline"}, "solid")}"
      color="${select("color", {blue: "blue", red: "red", dark: "dark", light: "light"}, "blue")}"
      scale="${select("scale", {xs: "xs", s: "s", m: "m", l: "l", xl: "xl" }, "m")}"
      href="${text("href", "")}"
      loading="${boolean("loading", false)}"
      disabled="${boolean("disabled", false)}"
    >
      Button text
    </calcite-button>
  `, { notes, backgrounds: darkBackground });
