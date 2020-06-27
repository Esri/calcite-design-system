import { storiesOf } from '@storybook/html';
import { withKnobs } from '@storybook/addon-knobs'

storiesOf('Tile Select', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <calcite-tile-select></calcite-tile-select>
  `);
