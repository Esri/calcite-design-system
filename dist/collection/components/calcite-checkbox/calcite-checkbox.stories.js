import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <label>
      <calcite-checkbox
        checked=${boolean('checked', true)}
        disabled=${boolean('disabled', false)}
        indeterminate=${boolean('indeterminate', false)}
        size=${select('size', {large: 'large', small: 'small'}, 'small')}
      ></calcite-checkbox>
      Text for the checkbox
    </label>
  `, { notes })
  .add('Dark mode', () => `
    <label>
      <calcite-checkbox
        theme="dark"
        checked=${boolean('checked', true)}
        disabled=${boolean('disabled', false)}
        indeterminate=${boolean('indeterminate', false)}
        size=${select('size', {large: 'large', small: 'small'}, 'small')}
      ></calcite-checkbox>
    </label>
`, { notes, backgrounds: darkBackground });
