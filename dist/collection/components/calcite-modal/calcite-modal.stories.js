import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add('Simple', () => {
    setTimeout(function () {
      document.querySelector('calcite-modal').open();
    }, 200);
    return `
      <calcite-modal
        color="${select("color", {blue: "blue", red: "red", none: null}, null)}"
        size="${select("size", ["small", "medium", "large", "fullscreen"], "small")}"
        docked="${boolean("docked", false)}"
        disable-escape="${boolean("disable-escape", false)}"
        no-padding="${boolean("no-padding", false)}"
        close-label="${text("close-label", "Close")}"
      >
        <h3 slot="header">Small Modal</h3>
        <div slot="content">
          <p>
            The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements.
          </p>
        </div>
        <calcite-button slot="back" color="light" appearance="outline" icon="chevron-left" width="full">Back</calcite-button>
        <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
        <calcite-button slot="primary" width="full">Save</calcite-button>
      </calcite-modal>
    `;
  }, { notes })
  .add('Dark mode', () => {
    setTimeout(function () {
      document.querySelector('calcite-modal').open();
    }, 200);
    return `
      <calcite-modal
        theme="dark"
        color="${select("color", {blue: "blue", red: "red", none: null}, null)}"
        size="${select("size", ["small", "medium", "large", "fullscreen"], "small")}"
        docked="${boolean("docked", false)}"
        disable-escape="${boolean("disable-escape", false)}"
        no-padding="${boolean("no-padding", false)}"
        close-label="${text("close-label", "Close")}"
      >
        <h3 slot="header">Small Modal</h3>
        <div slot="content">
          <p>
            The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements.
          </p>
        </div>
        <calcite-button theme="dark" slot="back" color="light" appearance="outline" icon="chevron-left" width="full">Back</calcite-button>
        <calcite-button theme="dark" slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
        <calcite-button theme="dark" slot="primary" width="full">Save</calcite-button>
      </calcite-modal>
    `;
  }, { notes, backgrounds: darkBackground });
