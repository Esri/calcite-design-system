import { storiesOf } from '@storybook/html';
import { withKnobs, select, number, text } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Progress', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <calcite-progress
      type="${select('type', {determinate: 'determinate', indeterminate: 'indeterminate'}, 'indeterminate')}"
      value="${number('value', 0, {range: true, min: 0, max: 1, step: 0.01})}"
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
