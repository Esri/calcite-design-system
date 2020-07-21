import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select, text, number } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add('Simple', () => {
    const fullscreen = boolean("fullscreen", null);
    const docked = boolean("docked", null);
    const disableEscape = boolean("disable-escape", null);
    const noPadding = boolean("no-padding", null);
    return `
      <calcite-modal
        active="${boolean("active", true)}"
        color="${select("color", {blue: "blue", red: "red", none: null}, null)}"
        background-color="${select("background-color", ["white", "grey"], "white")}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        width="${select("width", ["s", "m", "l"], "s")}"
        ${fullscreen ? "fullscreen" : ""}
        ${docked ? "docked" : ""}
        ${disableEscape ? "disable-escape" : ""}
        ${noPadding ? "no-padding" : ""}
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
    const fullscreen = boolean("fullscreen", null);
    const docked = boolean("docked", null);
    const disableEscape = boolean("disable-escape", null);
    const noPadding = boolean("no-padding", null);
    return `
      <calcite-modal
        theme="dark"
        active="${boolean("active", true)}"
        color="${select("color", {blue: "blue", red: "red", none: null}, null)}"
        background-color="${select("background-color", ["white", "grey"], "white")}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        width="${select("width", ["s", "m", "l"], "s")}"
        ${fullscreen ? "fullscreen" : ""}
        ${docked ? "docked" : ""}
        ${disableEscape ? "disable-escape" : ""}
        ${noPadding ? "no-padding" : ""}
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
