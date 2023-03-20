import { select } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Chip Group",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-chip-group
    selection-mode="${select("selection-mode", ["single", "single-persist", "multi", "none"], "multi")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    <calcite-chip value="forest">Forest</calcite-chip>
    <calcite-chip value="tundra">Tundra/calcite-chip>
    <calcite-chip value="shore">Seashore</calcite-chip>
    <calcite-chip value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <div style="background-color:#2b2b2b;" dir="rtl">
    <calcite-chip-group>
      <calcite-chip value="forest">Forest</calcite-chip>
      <calcite-chip value="tundra">Tundra/calcite-chip>
      <calcite-chip value="shore">Seashore</calcite-chip>
      <calcite-chip value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>
  </div>
`;

darkThemeRTL_TestOnly.parameters = { themes: modesDarkDefault };
