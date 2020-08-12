import { storiesOf } from "@storybook/html";
import { select, text } from "@storybook/addon-knobs";
import { darkBackground, iconNames, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";

const notes = parseReadme(readme);

storiesOf("components|Tile", module)
  .add(
    "Light",
    () => `
      <calcite-tile
        ${boolean("active", false)}
        description="${text(
          "description",
          "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        )}"
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
    "Dark",
    () => `
    <calcite-tile
        ${boolean("active", false)}
        description="${text(
          "description",
          "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        )}"
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
