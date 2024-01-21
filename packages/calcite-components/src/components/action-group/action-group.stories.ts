import { select, text } from "@storybook/addon-knobs";
import { iconNames, storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Action Group",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const honorsFlexGrow = (): string =>
  html`<style>
      calcite-action {
        flex-grow: 1;
      }
    </style>
    <calcite-action-group style="width:600px" layout="horizontal">
      <calcite-action icon="bell" alignment="center"></calcite-action>
      <calcite-action icon="biking" alignment="center"></calcite-action>
      <calcite-action icon="bluetooth" alignment="center"></calcite-action>
    </calcite-action-group>`;

export const gridCenteringOfActionsInAGroup = (): string => html`
  <div style="width:400px">
    <calcite-action-group layout="${select("layout", ["horizontal", "vertical", "grid"], "grid")}">
      <calcite-action
        alignment="${select("alignment", ["start", "center", "end"], "center")}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        appearance="${select("appearance", ["solid", "transparent", "outline"], "solid")}"
        icon="${select("icon", iconNames, "polygon")}"
        ${text("text", "polygon")}
      >
      </calcite-action>
      <calcite-action
        alignment="${select("alignment", ["start", "center", "end"], "center")}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        appearance="${select("appearance", ["solid", "transparent", "outline"], "solid")}"
        icon="${select("icon", iconNames, "rectangle")}"
        ${text("text", "rectangle")}
      >
      </calcite-action>
      <calcite-action
        alignment="${select("alignment", ["start", "center", "end"], "center")}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        appearance="${select("appearance", ["solid", "transparent", "outline"], "solid")}"
        icon="${select("icon", iconNames, "trash")}"
        ${text("text", "trash")}
      >
      </calcite-action>
    </calcite-action-group>
  </div>
`;

export const withoutDefinedGridGap_TestOnly = (): string =>
  html` <calcite-action-group layout="grid">
    <calcite-action text="Add" icon="arrow-up-left"></calcite-action>
    <calcite-action text="Save" icon="chevron-up"></calcite-action>
    <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>
    <calcite-action text="Layers" icon="chevron-down"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>
  </calcite-action-group>`;

export const withDefinedGridGap_TestOnly = (): string => html`
  <calcite-action-group layout="grid" style="--calcite-action-group-gap: 0; --calcite-action-group-padding:0;">
    <calcite-action text="Add" icon="arrow-up-left"></calcite-action>
    <calcite-action text="Save" icon="chevron-up"></calcite-action>
    <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>
    <calcite-action text="Layers" icon="chevron-down"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>
  </calcite-action-group>
`;

export const arabicLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="ar">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;

export const germanLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="de">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;

export const norwegianLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="no">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;

export const ChineseLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="zh-CN">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;

export const GreekLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="el">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;

export const TurkishLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-group expanded lang="tr">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;
