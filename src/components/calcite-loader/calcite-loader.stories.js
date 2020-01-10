import { storiesOf } from '@storybook/html';
import { withKnobs, text, number, boolean, color } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Loader', module)
  .addDecorator(withKnobs)
  .add('Indeterminate', () => `
    <calcite-loader
      is-active="${boolean("is-active", true)}"
      text="${text("text", "")}"
    />
  `, { notes })
  .add('Determinate', () => `
    <calcite-loader
      is-active
      type="determinate"
      no-padding="${boolean("no-padding", false)}"
      value="${number('value', 0, {range: true, min: 0, max: 100, step: 1})}"
    />
  `, { notes })
  .add('Inline', () => `
    <calcite-loader
      inline
      is-active
    /></calcite-loader>Next to some text
  `, { notes })
  .add('Dark mode', () => `
    <calcite-loader
      no-padding="${boolean("no-padding", false)}"
      value="${number('value', 0, {range: true, min: 0, max: 100, step: 1})}"
      is-active
      theme="dark" />
  `, { notes, backgrounds: darkBackground })
  .add('Custom theme', () => `
    <calcite-loader

      style="
        --calcite-loader-spot-light: ${color('spot-light', '#50ba5f')};
        --calcite-loader-spot-dark: ${color('spot-dark', '#1a6324')};
        --calcite-loader-spot: ${color('loader-spot', '#338033')};"
      is-active
    />
  `, { notes })
