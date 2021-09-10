import { select, text } from "@storybook/addon-knobs";
import { iconNames, boolean } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Tiles/Tile Select",

  parameters: {
    notes: readme
  }
};

export const Light = (): string => html`
  <calcite-tile-select
    ${boolean("checked", true)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    )}"
    ${boolean("disabled", false)}
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    icon="${select("icon", iconNames, "layer")}"
    ${boolean("input-enabled", true)}
    input-alignment="${select("input-alignment", ["start", "end"], "end")}"
    type="${select("type", ["radio", "checkbox"], "radio")}"
    value="${text("value", "one")}"
  >
  </calcite-tile-select>
`;

export const Dark = (): string => html`
  <calcite-tile-select
    ${boolean("checked", true)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    )}"
    ${boolean("disabled", false)}
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    icon="${select("icon", iconNames, "layer")}"
    name="${text("name", "tile-select-demo")}"
    ${boolean("input-enabled", true)}
    input-alignment="${select("input-alignment", ["start", "end"], "end")}"
    class="calcite-theme-dark"
    type="${select("type", ["radio", "checkbox"], "radio")}"
    value="${text("value", "one")}"
  >
  </calcite-tile-select>
`;

Dark.story = {
  parameters: { themes: themesDarkDefault }
};

export const RTL = (): string => html`
  <calcite-tile-select
    ${boolean("checked", true)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    )}"
    ${boolean("disabled", false)}
    heading="${text("heading", "Tile heading lorem ipsum!")}"
    ${boolean("hidden", false)}
    icon="${select("icon", iconNames, "layer")}"
    name="${text("name", "tile-select-demo")}"
    ${boolean("input-enabled", true)}
    input-alignment="${select("input-alignment", ["start", "end"], "end")}"
    type="${select("type", ["radio", "checkbox"], "radio")}"
    value="${text("value", "one")}"
    dir="rtl"
  >
  </calcite-tile-select>
`;
