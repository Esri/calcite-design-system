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
  >
    <calcite-card label="forest"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="tundra"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="shore"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="estuary"><span slot="heading">Heading</span></calcite-card>
  </calcite-card-group>
`;

export const single_TestOnly = (): string => html`
  <calcite-card-group selection-mode="single">
    <calcite-card label="forest"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="tundra"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="shore"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="estuary"><span slot="heading">Heading</span></calcite-card>
  </calcite-card-group>
`;

export const singlePersistWithPreSelected_TestOnly = (): string => html`
  <calcite-card-group selection-mode="single">
    <calcite-card label="forest"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="tundra" selected><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="shore"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="estuary"><span slot="heading">Heading</span></calcite-card>
  </calcite-card-group>
`;

export const multiple_TestOnly = (): string => html`
  <calcite-card-group selection-mode="multiple">
    <calcite-card label="forest"><span slot="heading">Heading</span></calcite-card>
    <calcite-card selected label="tundra"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="shore"><span slot="heading">Heading</span></calcite-card>
    <calcite-card selected label="estuary"><span slot="heading">Heading</span></calcite-card>
  </calcite-card-group>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <div dir="rtl">
    <calcite-card-group>
      <calcite-card label="forest"><span slot="heading">Heading</span></calcite-card>
      <calcite-card label="tundra"><span slot="heading">Heading</span></calcite-card>
      <calcite-card label="shore"><span slot="heading">Heading</span></calcite-card>
      <calcite-card label="estuary"><span slot="heading">Heading</span></calcite-card>
    </calcite-card-group>
  </div>
`;

darkThemeRTL_TestOnly.parameters = { themes: modesDarkDefault };
