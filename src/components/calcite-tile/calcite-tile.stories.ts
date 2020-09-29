import { storiesOf } from "@storybook/html";
import { select, text } from "@storybook/addon-knobs";
import { iconNames, boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Tile", module)
  .addParameters({ notes: readme })
  .add(
    "Light",
    (): string => `
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
  `
  )
  .add(
    "Dark",
    (): string => `
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
    { backgrounds: darkBackground }
  );
