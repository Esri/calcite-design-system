import { storiesOf } from '@storybook/html';
import { withKnobs } from '@storybook/addon-knobs'

storiesOf('Tile', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <calcite-tile></calcite-tile>
  `);
