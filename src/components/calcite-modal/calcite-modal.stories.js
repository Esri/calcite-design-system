import { storiesOf } from '@storybook/html';
import { withKnobs, select, text, number } from '@storybook/addon-knobs'
import { darkBackground, parseReadme, boolean } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add('Simple', () => {
    return `
      <calcite-modal
        ${boolean("active", true)}
        color="${select("color", {blue: "blue", red: "red", none: null}, null)}"
        background-color="${select("background-color", ["white", "grey"], "white")}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        width="${select("width", ["s", "m", "l"], "s")}"
        ${boolean("fullscreen", false)}
        ${boolean("docked", false)}
        ${boolean("disable-escape", false)}
        ${boolean("no-padding", false)}
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
  .add('Custom Size', () => {
    return `
      <calcite-modal
        active
        width="${number("width", 500)}"
      >
        <h3 slot="header">Custom Size</h3>
        <div slot="content">
          <p>
            By passing a number rather than "small", "medium", "large", or "fullscreen", you can set your own max width for the modal.
            Below this size, the modal will become fullscreen.
          </p>
        </div>
        <calcite-button slot="back" color="light" appearance="outline" icon="chevron-left" width="full">Back</calcite-button>
        <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
        <calcite-button slot="primary" width="full">Save</calcite-button>
      </calcite-modal>
    `;
  }, { notes })
  .add('Dark mode', () => {
    return `
      <calcite-modal
        theme="dark"
        ${boolean("active", true)}
        color="${select("color", {blue: "blue", red: "red", none: null}, null)}"
        background-color="${select("background-color", ["white", "grey"], "white")}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        width="${select("width", ["s", "m", "l"], "s")}"
        ${boolean("fullscreen", false)}
        ${boolean("docked", false)}
        ${boolean("disable-escape", false)}
        ${boolean("no-padding", false)}
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
