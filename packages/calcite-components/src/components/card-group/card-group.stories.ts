import { select } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Card Group",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-card-group
    selection-mode="${select("selection-mode", ["single", "single-persist", "multiple", "none"], "multiple")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    <calcite-card label="forest">Forest</calcite-card>
    <calcite-card label="tundra">Tundra</calcite-card>
    <calcite-card label="shore">Seashore</calcite-card>
    <calcite-card label="estuary">Estuary</calcite-card>
  </calcite-card-group>
`;

export const single_TestOnly = (): string => html`
  <calcite-card-group selection-mode="single">
    <calcite-card label="forest">Forest</calcite-card>
    <calcite-card label="tundra">Tundra</calcite-card>
    <calcite-card label="shore">Seashore</calcite-card>
    <calcite-card label="estuary">Estuary</calcite-card>
  </calcite-card-group>
`;

export const singlePersistWithPreSelected_TestOnly = (): string => html`
  <calcite-card-group selection-mode="single">
    <calcite-card label="forest">Forest</calcite-card>
    <calcite-card label="tundra" selected>Tundra</calcite-card>
    <calcite-card label="shore">Seashore</calcite-card>
    <calcite-card label="estuary">Estuary</calcite-card>
  </calcite-card-group>
`;

export const multiple_TestOnly = (): string => html`
  <calcite-card-group selection-mode="multiple">
    <calcite-card label="forest">Forest</calcite-card>
    <calcite-card selected label="tundra">Tundra</calcite-card>
    <calcite-card label="shore">Seashore</calcite-card>
    <calcite-card selected label="estuary">Estuary</calcite-card>
  </calcite-card-group>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <div dir="rtl">
    <calcite-card-group>
      <calcite-card label="forest">Forest</calcite-card>
      <calcite-card label="tundra">Tundra</calcite-card>
      <calcite-card label="shore">Seashore</calcite-card>
      <calcite-card label="estuary">Estuary</calcite-card>
    </calcite-card-group>
  </div>
`;

darkThemeRTL_TestOnly.parameters = { themes: modesDarkDefault };
