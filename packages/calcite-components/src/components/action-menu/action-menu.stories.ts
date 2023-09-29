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

export const simple = (): string =>
  html`
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

export const open = (): string =>
  html`
    <calcite-action-menu open>
      <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
      <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
      <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    </calcite-action-menu>
  `;

export const keyDownOpen_TestOnly = (): string =>
  html`
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
            })
          );
        });
    </script>
  `;

keyDownOpen_TestOnly.parameters = { chromatic: { delay: 1000 } };
