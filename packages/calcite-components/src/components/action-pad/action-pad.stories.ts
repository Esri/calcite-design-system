import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { position } = ATTRIBUTES;

interface ActionPadArgs {
  expandDisabled: boolean;
  expanded: boolean;
  position: string;
}

export default {
  title: "Components/Action Pad",
  args: {
    expandDisabled: false,
    expanded: false,
    position: position.defaultValue,
  },
  argTypes: {
    position: {
      options: position.values.filter((option) => option !== "top" && option !== "bottom"),
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 5000,
    },
  },
};

export const simple = (args: ActionPadArgs): string => html`
  <calcite-action-pad
    ${boolean("expand-disabled", args.expandDisabled)}
    ${boolean("expanded", args.expanded)}
    position="${args.position}"
  >
    <calcite-action-group>
      <calcite-action text="Undo" label="Undo Action" icon="undo"></calcite-action>
      <calcite-action text="Redo" label="Redo Action" icon="redo"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Delete" label="Delete Item" icon="trash"></calcite-action>
    </calcite-action-group>
  </calcite-action-pad>
`;

export const withDefinedWidths = (): string => html`
  <style>
    calcite-action-pad {
      --calcite-action-pad-expanded-max-width: 150px;
    }
  </style>
  <calcite-action-pad expanded>
    <calcite-action-group>
      <calcite-action text="Add to my custom action pad application" icon="plus"></calcite-action>
      <calcite-action text="Save to my custom action pad application" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers in my custom action pad application" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-pad>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-action-pad position="start" dir="rtl" class="calcite-mode-dark">
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-pad>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const hebrewLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="he" layout="horizontal"> </calcite-action-pad>
  </div>`;

export const norwegianLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="nb" layout="horizontal"> </calcite-action-pad>
  </div>`;

export const spanishLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="es" layout="horizontal"> </calcite-action-pad>
  </div>`;

export const taiwanLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="zh-TW" layout="horizontal"> </calcite-action-pad>
  </div>`;

export const russianLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="ru" layout="horizontal"> </calcite-action-pad>
  </div>`;

export const romanianMoldovaLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="ro-mo" layout="horizontal"> </calcite-action-pad>
  </div>`;
