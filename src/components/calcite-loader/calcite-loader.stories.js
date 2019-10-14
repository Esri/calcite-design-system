import { storiesOf } from '@storybook/html';
import { withKnobs, text, number, boolean, color } from '@storybook/addon-knobs'
import { darkBackground } from "../../../.storybook/helpers";
import notes from './readme.md';


// <calcite-loader is-active></calcite-loader>
// <calcite-loader is-active title="optional loading text&hellip;" type="indeterminate"></calcite-loader>
// <calcite-loader is-active class="green" title="Custom theme..."></calcite-loader>
// <style>
//   calcite-loader.green {
//     --calcite-loader-spot-light: #50ba5f;
//     --calcite-loader-spot-dark: #1a6324;
//     --calcite-loader-spot: #338033;
//   }
// </style>
// <p style="text-align: center;">
//   <calcite-loader is-active inline></calcite-loader>Inline Loader
// </p>
// <calcite-loader is-active type="determinate" value="0" id="loader-determinate" text="Determinate loader">
// </calcite-loader>

storiesOf('calcite-loader', module)
  .addDecorator(withKnobs)
  .add('Indeterminate', () => {
    return `
      <calcite-loader
        is-active="${boolean("is-active", true)}"
        text="${text("text", "")}"
      />
  `
  }, { notes })
  .add('Determinate', () => {
    return `
      <calcite-loader
        is-active
        type="determinate"
        value="${number('value', 0, {range: true, min: 0, max: 100, step: 1})}"
      />
  `
  }, { notes })
  .add('Inline', () => {
    return `
    <calcite-loader
      inline
      is-active
    /></calcite-loader>Next to some text
    `
  }, { notes })
  .add('Dark mode', () => {
    return `
      <calcite-loader is-active text="Loading" theme="dark" />
    `
  }, { notes, backgrounds: darkBackground })
  .add('Custom theme', () => {
    return `
    <calcite-loader
      style="
        --calcite-loader-spot-light: ${color('spot-light', '#50ba5f')};
        --calcite-loader-spot-dark: ${color('spot-dark', '#1a6324')};
        --calcite-loader-spot: ${color('loader-spot', '#338033')};"
      is-active
    />
    `
  }, { notes })
