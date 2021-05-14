import { select, text } from "@storybook/addon-knobs";
import { iconNames, boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Tiles/Tile",

  parameters: {
    notes: readme
  }
};

export const Light = (): string => html`
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    )}"
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
  >
  </calcite-tile>
`;

export const Dark = (): string => html`
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    )}"
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
    theme="dark"
  >
  </calcite-tile>
`;

Dark.story = {
  parameters: { backgrounds: darkBackground }
};

export const RTL = (): string => html`
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    )}"
    heading="${text("heading", "Tile heading lorem ipsum!")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
    dir="rtl"
  >
  </calcite-tile>
`;
