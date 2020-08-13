import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";
import { darkBackground } from "../../../.storybook/helpers";

storiesOf("components|Tile Select Group", module)
  .add(
    "Light",
    () => `
    <calcite-tile-select-group>
      <calcite-tile-select
        checked
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
        icon="layers"
        name="light"
        show-input="${select("show-input", ["left", "right", "none"], "left")}"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="one"
      >
      </calcite-tile-select>
      <calcite-tile-select
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        name="light"
        show-input="${select("show-input", ["left", "right", "none"], "left")}"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="two"
      >
      </calcite-tile-select>
      <calcite-tile-select
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        name="light"
        show-input="${select("show-input", ["left", "right", "none"], "left")}"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="three"
      >
      </calcite-tile-select>
      <calcite-tile-select
        checked
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
        icon="layers"
        name="light"
        show-input="${select("show-input", ["left", "right", "none"], "left")}"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="four"
      >
      </calcite-tile-select>
    </calcite-tile-select-group>
  `
  )
  .add(
    "Dark",
    () => `
    <calcite-tile-select-group>
      <calcite-tile-select
        checked
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
        icon="layers"
        name="dark"
        show-input="${select("show-input", ["left", "right", "none"], "left")}"
        theme="dark"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="one"
      >
      </calcite-tile-select>
      <calcite-tile-select
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        name="dark"
        show-input="${select("show-input", ["left", "right", "none"], "left")}"
        theme="dark"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="two"
      >
      </calcite-tile-select>
      <calcite-tile-select
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        name="dark"
        show-input="${select("show-input", ["left", "right", "none"], "left")}"
        theme="dark"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="three"
      >
      </calcite-tile-select>
      <calcite-tile-select
        checked
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
        icon="layers"
        name="dark"
        show-input="${select("show-input", ["left", "right", "none"], "left")}"
        theme="dark"
        type="${select("type", ["radio", "checkbox"], "radio")}"
        value="four"
      >
    </calcite-tile-select-group>
  `,
    { backgrounds: darkBackground }
  );
