import { storiesOf } from '@storybook/html';
import { withKnobs, select, number, text, boolean } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Progress', module)
  .addDecorator(withKnobs)
  .add('Determinate', () => `
    <calcite-progress
      type="determinate"
      value="${number('value', 0, {range: true, min: 0, max: 1, step: 0.01})}"
      text="${text('text', '')}"
    ></calcite-progress>
  `, { notes })
  .add('Indeterminate', () => `
    <calcite-progress
      reversed=${boolean("reversed", false)}
      type="indeterminate"
      text="${text('text', '')}"
    ></calcite-progress>
  `, { notes })
  .add('Dark mode', () => `
    <calcite-progress
      theme="dark"
      type="${select('type', {determinate: 'determinate', indeterminate: 'indeterminate'}, 'indeterminate')}"
      value="${number('value', 0, {range: true, min: 0, max: 1, step: 0.01})}"
      text="${text('text', '')}"
    ></calcite-progress>
  `, { notes, backgrounds: darkBackground });
