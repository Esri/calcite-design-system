import { html } from "../support/formatting";

export default {
  title: "Components/Floating UI/Open",
};

const template = html`
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
`;

export const ltrPositioning = (): HTMLElement => {
  const container = document.createElement("div");
  container.innerHTML = template;

  return container;
};

ltrPositioning.globals = {
  addonRtl: "ltr",
};

export const rtlPositioning = (): HTMLElement => {
  const container = document.createElement("div");
  container.innerHTML = template;

  /*
   * setting body-level dir for better coverage (e.g., https://github.com/Esri/calcite-design-system/issues/13388)
   * note: this will be reset by the bodyDirReset global decorator
   */
  document.body.dir = "rtl";

  return container;
};

rtlPositioning.globals = {
  addonRtl: "rtl",
};

export const stackingWhenTopLayerDisabled = (): string => html`
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
    <calcite-alert icon="banana" kind="brand" open label="A report alert" placement="top" top-layer-disabled>
      <div slot="title">Trail Camera Report</div>
      <div slot="message">
        all<br />work<br />and<br />no<br />play<br />make<br />Jack<br />a<br />dull<br />boy<br />
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

    <calcite-input-date-picker open top-layer-disabled></calcite-input-date-picker>

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

    <calcite-dialog heading="Dialog" modal open placement="top" top-layer-disabled>
      all<br />work<br />and<br />no<br />play<br />make<br />Jack<br />a<br />dull<br />boy
    </calcite-dialog>
  </div>
`;
