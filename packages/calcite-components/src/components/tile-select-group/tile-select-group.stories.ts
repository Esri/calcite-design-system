import { select, boolean } from "@storybook/addon-knobs";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";
import { storyFilters } from "../../../.storybook/helpers";

export default {
  title: "Components/Tiles/Tile Select Group",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

const tileSelectsHTML = () => html`
  <calcite-tile-select
    checked
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    icon="layers"
    name="light"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
    width="${select("width", ["full", "auto"], "auto", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
    value="one"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    name="light"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
    width="${select("width", ["full", "auto"], "auto", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
    value="two"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    name="light"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
    width="${select("width", ["full", "auto"], "auto", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
    value="three"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum"
    icon="layers"
    name="light"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
    width="${select("width", ["full", "auto"], "auto", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
    value="four"
  >
  </calcite-tile-select>
`;

export const simple = (): string => html`
  <calcite-tile-select-group
    layout="${select("layout", ["horizontal", "vertical"], "horizontal", "Tile Select Group")}"
    dir="${select("dir", ["ltr", "rtl"], "ltr", "Tile Select Group")}"
  >
    ${tileSelectsHTML()}
  </calcite-tile-select-group>
`;

export const disabled_TestOnly = (): string => html`
  <calcite-tile-select-group
    layout="${select("layout", ["horizontal", "vertical"], "horizontal", "Tile Select Group")}"
    dir="${select("dir", ["ltr", "rtl"], "ltr", "Tile Select Group")}"
  >
    ${tileSelectsHTML()}
  </calcite-tile-select-group>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-tile-select-group
    layout="${select("layout", ["horizontal", "vertical"], "horizontal", "Tile Select Group")}"
    dir="${select("dir", ["ltr", "rtl"], "rtl", "Tile Select Group")}"
    class="calcite-mode-dark"
  >
    ${tileSelectsHTML()}
  </calcite-tile-select-group>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
