import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { ActionPad } from "./action-pad";

const { position } = ATTRIBUTES;

type ActionPadStoryArgs = Pick<ActionPad, "expandDisabled" | "expanded" | "position">;

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
};

export const simple = (args: ActionPadStoryArgs): string => html`
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
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Add to my custom action pad application" icon="plus"></calcite-action>
      <calcite-action text-enabled text="Save to my custom action pad application" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Layers in my custom action pad application" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-pad>
`;

export const withGroups = (): string =>
  html`<calcite-action-pad layout="horizontal">
    <calcite-action-group>
      <calcite-action text="Add" icon="plus" appearance="solid" scale="m"></calcite-action>
      <calcite-action text="Save" icon="save" appearance="solid" scale="m"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" icon="layers" appearance="solid" scale="m"></calcite-action>
      <calcite-action text="Basemaps" icon="layer-basemap" appearance="solid" scale="m"></calcite-action>
    </calcite-action-group>
    <calcite-tooltip
      slot="expand-tooltip"
      id="calcite-tooltip-c19274e3-ff3b-6168-ef1e-8a700b056e1c"
      role="tooltip"
      overlay-positioning="absolute"
      placement="auto"
      style="visibility: hidden; pointer-events: none; position: absolute;"
      >Toggle Action Pad</calcite-tooltip
    >
  </calcite-action-pad>`;

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
