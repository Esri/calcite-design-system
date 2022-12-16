import { select } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
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
  <div style="background-color:white;padding:100px">
    <calcite-chip-group
      selection-mode="${select("selection-mode", ["single", "single-persist", "multi", "none"], "multi")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
    >
      <calcite-chip selectable>My great chip</calcite-chip>
      <calcite-chip selectable>My great chip</calcite-chip>
      <calcite-chip selectable>My great chip</calcite-chip>
      <calcite-chip selectable>My great chip</calcite-chip>
    </calcite-chip-group>
  </div>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-chip-group
      selection-mode="${select("selection-mode", ["single", "single-persist", "multi", "none"], "multi")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
    >
      <calcite-chip selectable>My great chip</calcite-chip>
      <calcite-chip selectable>My great chip</calcite-chip>
      <calcite-chip selectable>My great chip</calcite-chip>
      <calcite-chip selectable>My great chip</calcite-chip>
    </calcite-chip-group>
  </div>
`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };
