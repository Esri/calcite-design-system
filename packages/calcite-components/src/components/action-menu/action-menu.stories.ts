import { storyFilters } from "../../../.storybook/helpers";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Action Menu",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-action-menu>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
`;

export const simpleTransparent_TestOnly = (): string =>
  html`<div style="background-color:red">
    <calcite-action-menu appearance="transparent">
      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
      <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
      <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    </calcite-action-menu>
  </div> `;

export const open = (): string => html`
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
`;

export const openWithGroups = (): string => html`
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action-group>
      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action
      ><calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Table" icon="table" text-enabled></calcite-action
    ></calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Save" icon="save" text-enabled></calcite-action>
    </calcite-action-group>
  </calcite-action-menu>
`;

export const keyDownOpen_TestOnly = (): string => html`
  <calcite-action-menu>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
  <script>
    document
      .querySelector("calcite-action-menu")
      .setFocus()
      .then(() => {
        document.querySelector("calcite-action[slot=trigger]").dispatchEvent(
          new KeyboardEvent("keydown", {
            code: "Enter",
            key: "Enter",
            charCode: 13,
            keyCode: 13,
            view: window,
            bubbles: true,
          }),
        );
      });
  </script>
`;

export const openMaxHeight_TestOnly = (): string => html`
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
`;

keyDownOpen_TestOnly.parameters = { chromatic: { delay: 1000 } };

export const theming_TestOnly = (): string => html`
  <calcite-action-menu
    open
    style="
      --calcite-action-menu-close-background-color-active: #9BDAF2;
      --calcite-action-menu-close-background-color-hover: #9BDAF2;
      --calcite-action-menu-close-background-color: #9BDAF2;
      --calcite-action-menu-close-icon-color-active: #D93D4A;
      --calcite-action-menu-close-icon-color-hover: #D93D4A;
      --calcite-action-menu-close-icon-color: #D93D4A;
      --calcite-action-menu-close-text-color-active: #044BD9;
      --calcite-action-menu-close-text-color-hover: #044BD9;
      --calcite-action-menu-close-text-color: #044BD9;
      --calcite-action-menu-popover-background-color: #9BDAF2;
      --calcite-action-menu-popover-border-color: #9BDAF2;
      --calcite-action-menu-popover-corner-radius: 0;
      --calcite-action-menu-popover-shadow: 0 0 0 0.25rem #D93A2B;
      --calcite-action-menu-popover-text-color: #044BD9;
      --calcite-action-menu-trigger-background-color-active: #9BDAF2;
      --calcite-action-menu-trigger-background-color-focus: #9BDAF2;
      --calcite-action-menu-trigger-background-color-hover: #9BDAF2;
      --calcite-action-menu-trigger-background-color: #9BDAF2;
      --calcite-action-menu-trigger-icon-color-active: #D93D4A;
      --calcite-action-menu-trigger-icon-color-focus: #D93D4A;
      --calcite-action-menu-trigger-icon-color-hover: #D93D4A;
      --calcite-action-menu-trigger-icon-color: #D93D4A;
      --calcite-action-menu-trigger-indicator-color: #BFA939;
      --calcite-action-menu-trigger-loader-color: #BFA939;
      --calcite-action-menu-trigger-shadow: 0 0 0 0.25rem #D93A2B;  
      --calcite-action-menu-trigger-text-color-active: #044BD9;
      --calcite-action-menu-trigger-text-color-focus: #044BD9;
      --calcite-action-menu-trigger-text-color-hover: #044BD9;
      --calcite-action-menu-trigger-text-color: #044BD9;"
  >
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action-group>
      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action
      ><calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Table" icon="table" text-enabled></calcite-action
    ></calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Save" icon="save" text-enabled></calcite-action>
    </calcite-action-group>
  </calcite-action-menu>
`;
