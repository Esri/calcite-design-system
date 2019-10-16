import { storiesOf } from '@storybook/html';
import { withKnobs, select, number } from '@storybook/addon-knobs'
import { parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Popover', module)
  .addDecorator(withKnobs)
  .add('Simple', () => {
    setTimeout(() => {
      document.querySelector("#reference-element").addEventListener("click", () => {
        document.querySelector("calcite-popover").toggle();
      });
    }, 200);
    return `
      <div>
        <calcite-button id="reference-element">Reference Element</calcite-button>
        <calcite-popover
          reference-element="reference-element"
          placement="${select("placement", ["vertical", "horizontal"], "horizontal")}"
          x-offset="${number("x-offset", 0)}"
          y-offset="${number("y-offset", 0)}"
        >
          Hello! I am some popover content!
        </calcite-popover>
      </div>
    `
  }, { notes });

