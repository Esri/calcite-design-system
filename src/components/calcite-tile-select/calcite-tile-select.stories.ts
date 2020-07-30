import { storiesOf } from "@storybook/html";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import { darkBackground, iconNames, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";

const notes = parseReadme(readme);

storiesOf("Tile Select", module)
  .addDecorator(withKnobs)
  .add(
    "Left Input Light",
    () => `
      <calcite-tile-select
        ${boolean("checked", false)}
        description="${text(
          "description",
          "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        )}"
        ${boolean("disabled", false)}
        ${boolean("focused", false)}
        heading="${text("heading", "Tile heading lorem ipsum")}"
        ${boolean("hidden", false)}
        icon="${select("icon", iconNames, iconNames[296])}"
        name="${text("name", "tile-select-demo")}
        show-input="left"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="${text("value", "one")}"
      >
      </calcite-tile-select>
  `,
    { notes }
  )
  .add(
    "Right Input Light",
    () => `
      <calcite-tile-select
        ${boolean("checked", false)}
        description="${text(
          "description",
          "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        )}"
        ${boolean("disabled", false)}
        ${boolean("focused", false)}
        heading="${text("heading", "Tile heading lorem ipsum")}"
        ${boolean("hidden", false)}
        icon="${select("icon", iconNames, iconNames[296])}"
        name="${text("name", "tile-select-demo")}
        show-input="right"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="${text("value", "one")}"
      >
      </calcite-tile-select>
  `,
    { notes }
  )
  .add(
    "No Input Light",
    () => `
      <calcite-tile-select
        ${boolean("checked", false)}
        description="${text(
          "description",
          "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        )}"
        ${boolean("disabled", false)}
        ${boolean("focused", false)}
        heading="${text("heading", "Tile heading lorem ipsum")}"
        ${boolean("hidden", false)}
        icon="${select("icon", iconNames, iconNames[296])}"
        name="${text("name", "tile-select-demo")}
        show-input="none"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="${text("value", "one")}"
      >
      </calcite-tile-select>
  `,
    { notes }
  )
  .add(
    "Left Input Dark",
    () => `
      <calcite-tile-select
        ${boolean("checked", false)}
        description="${text(
          "description",
          "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        )}"
        ${boolean("disabled", false)}
        ${boolean("focused", false)}
        heading="${text("heading", "Tile heading lorem ipsum")}"
        ${boolean("hidden", false)}
        icon="${select("icon", iconNames, iconNames[296])}"
        name="${text("name", "tile-select-demo")}
        show-input="left"
        theme="dark"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="${text("value", "one")}"
      >
      </calcite-tile-select>
  `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "Right Input Dark",
    () => `
    <calcite-tile-select
        ${boolean("checked", false)}
        description="${text(
          "description",
          "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        )}"
        ${boolean("disabled", false)}
        ${boolean("focused", false)}
        heading="${text("heading", "Tile heading lorem ipsum")}"
        ${boolean("hidden", false)}
        icon="${select("icon", iconNames, iconNames[296])}"
        name="${text("name", "tile-select-demo")}
        show-input="right"
        theme="dark"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="${text("value", "one")}"
      >
      </calcite-tile-select>
  `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "No Input Dark",
    () => `
      <calcite-tile-select
        ${boolean("checked", false)}
        description="${text(
          "description",
          "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        )}"
        ${boolean("disabled", false)}
        ${boolean("focused", false)}
        heading="${text("heading", "Tile heading lorem ipsum")}"
        ${boolean("hidden", false)}
        icon="${select("icon", iconNames, iconNames[296])}"
        name="${text("name", "tile-select-demo")}
        show-input="none"
        theme="dark"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="${text("value", "one")}"
      >
      </calcite-tile-select>
  `,
    { notes, backgrounds: darkBackground }
  );
