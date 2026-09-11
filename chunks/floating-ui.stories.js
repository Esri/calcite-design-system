/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as a } from "./formatting.js";
import "./alert.js";
import "./autocomplete-item.js";
import "./autocomplete.js";
import "./button.js";
import "./combobox-item.js";
import "./combobox.js";
import "./dialog.js";
import "./dropdown-group.js";
import "./dropdown-item.js";
import "./dropdown.js";
import "./input-date-picker.js";
import "./link.js";
import "./popover.js";
import "./tooltip.js";
const T = {
  title: "Components/Floating UI/Open"
}, n = a`
  <div style="display: flex; flex-direction: row; gap: 80px;">
    <calcite-dropdown width="m" open>
      <calcite-button slot="trigger">Dropdown</calcite-button>
      <calcite-dropdown-group group-title="Options">
        <calcite-dropdown-item>A</calcite-dropdown-item>
        <calcite-dropdown-item>B</calcite-dropdown-item>
        <calcite-dropdown-item>C</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>

    <br />

    <calcite-link id="tooltip-button">Tooltip</calcite-link>
    <calcite-tooltip reference-element="tooltip-button" placement="bottom-end" open>
      <span>Test</span>
    </calcite-tooltip>

    <br />

    <calcite-popover heading="Popover" reference-element="popover-button" closable open placement="bottom-start">
      <p>content</p>
    </calcite-popover>
    <calcite-button id="popover-button">Popover trigger</calcite-button>
  </div>
`, t = () => {
  const e = document.createElement("div");
  return e.innerHTML = n, e;
};
t.globals = {
  addonRtl: "ltr"
};
const o = () => {
  const e = document.createElement("div");
  return e.innerHTML = n, document.body.dir = "rtl", e;
};
o.globals = {
  addonRtl: "rtl"
};
const i = () => a`
  <div style="max-width: 800px; max-height: 400px;">
    <style>
      calcite-alert {
        --calcite-alert-width: 350px;
      }
      calcite-combobox {
        padding-inline-start: 10px;
      }
      calcite-input-date-picker {
        padding-inline-start: 30px;
      }
      calcite-dropdown {
        padding-inline-start: 20px;
      }
      calcite-dialog {
        --calcite-dialog-min-size-x: 450px;
        --calcite-dialog-max-size-x: 500px;
        --calcite-dialog-scrim-background-color: rgba(0, 0, 0, 0.3);
      }
      #popover-button {
        margin-inline-start: 50px;
      }
      #tooltip-button {
        margin-inline-start: 40px;
      }
    </style>
    <calcite-alert icon="banana" kind="brand" open label="A report alert" top-layer-disabled>
      <div slot="title">Trail Camera Report</div>
      <div slot="message">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    </calcite-alert>

    <calcite-autocomplete name="fruits" open top-layer-disabled>
      <calcite-autocomplete-item value="apple" heading="Apple"></calcite-autocomplete-item>
      <calcite-autocomplete-item value="banana" heading="Banana"></calcite-autocomplete-item>
      <calcite-autocomplete-item value="cherry" heading="Cherry"></calcite-autocomplete-item>
    </calcite-autocomplete>

    <calcite-combobox open top-layer-disabled>
      <calcite-combobox-item value="education" heading="Education"></calcite-combobox-item>
      <calcite-combobox-item value="utilities" heading="Utilities"></calcite-combobox-item>
      <calcite-combobox-item value="transportation" heading="Transportation"></calcite-combobox-item>
    </calcite-combobox>

    <calcite-dropdown open top-layer-disabled>
      <calcite-button slot="trigger">Dropdown</calcite-button>
      <calcite-dropdown-group group-title="Options">
        <calcite-dropdown-item>A</calcite-dropdown-item>
        <calcite-dropdown-item>B</calcite-dropdown-item>
        <calcite-dropdown-item>C</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>

    <calcite-input-date-picker open top-layer-disabled value="2018-06-06"></calcite-input-date-picker>

    <calcite-button id="tooltip-button">Tooltip</calcite-button>
    <calcite-tooltip reference-element="tooltip-button" placement="bottom-end" open top-layer-disabled>
      <span>Test</span>
    </calcite-tooltip>

    <br />

    <calcite-popover
      heading="Popover"
      reference-element="popover-button"
      closable
      open
      placement="bottom-start"
      top-layer-disabled
    >
      <p>content</p>
    </calcite-popover>
    <calcite-button id="popover-button">Popover trigger</calcite-button>

    <calcite-dialog heading="Dialog" modal open top-layer-disabled>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </calcite-dialog>
  </div>
`;
i.parameters = {
  chromatic: {
    // bump threshold to account for minor font rendering differences
    diffThreshold: 0.45
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): HTMLElement => {
  const container = document.createElement("div");
  container.innerHTML = template;
  return container;
}`,
      ...t.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): HTMLElement => {
  const container = document.createElement("div");
  container.innerHTML = template;

  /*
   * setting body-level dir for better coverage (e.g., https://github.com/Esri/calcite-design-system/issues/13388)
   * note: this will be reset by the bodyDirReset global decorator
   */
  document.body.dir = "rtl";
  return container;
}`,
      ...o.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="max-width: 800px; max-height: 400px;">
    <style>
      calcite-alert {
        --calcite-alert-width: 350px;
      }
      calcite-combobox {
        padding-inline-start: 10px;
      }
      calcite-input-date-picker {
        padding-inline-start: 30px;
      }
      calcite-dropdown {
        padding-inline-start: 20px;
      }
      calcite-dialog {
        --calcite-dialog-min-size-x: 450px;
        --calcite-dialog-max-size-x: 500px;
        --calcite-dialog-scrim-background-color: rgba(0, 0, 0, 0.3);
      }
      #popover-button {
        margin-inline-start: 50px;
      }
      #tooltip-button {
        margin-inline-start: 40px;
      }
    </style>
    <calcite-alert icon="banana" kind="brand" open label="A report alert" top-layer-disabled>
      <div slot="title">Trail Camera Report</div>
      <div slot="message">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    </calcite-alert>

    <calcite-autocomplete name="fruits" open top-layer-disabled>
      <calcite-autocomplete-item value="apple" heading="Apple"></calcite-autocomplete-item>
      <calcite-autocomplete-item value="banana" heading="Banana"></calcite-autocomplete-item>
      <calcite-autocomplete-item value="cherry" heading="Cherry"></calcite-autocomplete-item>
    </calcite-autocomplete>

    <calcite-combobox open top-layer-disabled>
      <calcite-combobox-item value="education" heading="Education"></calcite-combobox-item>
      <calcite-combobox-item value="utilities" heading="Utilities"></calcite-combobox-item>
      <calcite-combobox-item value="transportation" heading="Transportation"></calcite-combobox-item>
    </calcite-combobox>

    <calcite-dropdown open top-layer-disabled>
      <calcite-button slot="trigger">Dropdown</calcite-button>
      <calcite-dropdown-group group-title="Options">
        <calcite-dropdown-item>A</calcite-dropdown-item>
        <calcite-dropdown-item>B</calcite-dropdown-item>
        <calcite-dropdown-item>C</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>

    <calcite-input-date-picker open top-layer-disabled value="2018-06-06"></calcite-input-date-picker>

    <calcite-button id="tooltip-button">Tooltip</calcite-button>
    <calcite-tooltip reference-element="tooltip-button" placement="bottom-end" open top-layer-disabled>
      <span>Test</span>
    </calcite-tooltip>

    <br />

    <calcite-popover
      heading="Popover"
      reference-element="popover-button"
      closable
      open
      placement="bottom-start"
      top-layer-disabled
    >
      <p>content</p>
    </calcite-popover>
    <calcite-button id="popover-button">Popover trigger</calcite-button>

    <calcite-dialog heading="Dialog" modal open top-layer-disabled>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </calcite-dialog>
  </div>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
const f = ["ltrPositioning", "rtlPositioning", "stackingWhenTopLayerDisabled"];
export {
  f as __namedExportsOrder,
  T as default,
  t as ltrPositioning,
  o as rtlPositioning,
  i as stackingWhenTopLayerDisabled
};
