import { storiesOf } from "@storybook/html";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import { darkBackground, iconNames, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";

const notes = parseReadme(readme);

storiesOf("Tile", module)
  .addDecorator(withKnobs)
  .add(
    "Light Theme",
    () => `
      <calcite-tile
        ${boolean("active", false)}
        description="${text(
          "description",
          "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        )}"
        ${boolean("embed", false)}
        ${boolean("focused", false)}
        heading="${text("heading", "Tile heading lorem ipsum")}"
        ${boolean("hidden", false)}
        href="${text("href", "#")}"
        icon="${select("icon", iconNames, iconNames[296])}"
      >
      </calcite-tile>
  `,
    { notes }
  )
  .add(
    "Dark Theme",
    () => `
    <calcite-tile
        ${boolean("active", false)}
        description="${text(
          "description",
          "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        )}"
        ${boolean("embed", false)}
        ${boolean("focused", false)}
        heading="${text("heading", "Tile heading lorem ipsum")}"
        ${boolean("hidden", false)}
        href="${text("href", "#")}"
        icon="${select("icon", iconNames, iconNames[296])}"
        theme="dark"
      >
      </calcite-tile>
  `,
    { notes, backgrounds: darkBackground }
  );
