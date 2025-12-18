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

    <div>
      <calcite-link id="tooltip-button">Tooltip</calcite-link>
      <calcite-tooltip reference-element="tooltip-button" placement="bottom-end" open>
        <span>Test</span>
      </calcite-tooltip>
    </div>

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
