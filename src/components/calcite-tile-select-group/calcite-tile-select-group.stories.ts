import { storiesOf } from "@storybook/html";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Tile Select", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-tile-select-group>
      <calcite-tile-select checked icon="layers" name="left-radio" value="one"
        heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.">
      </calcite-tile-select>
      <calcite-tile-select checked icon="layers" name="left-radio" value="two"
        heading="Tile title lorem ipsum"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.">
      </calcite-tile-select>
      <calcite-tile-select icon="layers" name="left-radio" value="three"
        heading="Tile title lorem ipsum"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.">
      </calcite-tile-select>
      <calcite-tile-select icon="layers" name="left-radio" value="four" heading="Tile title lorem ipsum"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.">
      </calcite-tile-select>
      <calcite-tile-select icon="layers" name="left-radio" value="five" heading="Tile title lorem ipsum"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.">
      </calcite-tile-select>
      <calcite-tile-select icon="layers" name="left-radio" value="six" heading="Tile title lorem ipsum"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.">
      </calcite-tile-select>
      <calcite-tile-select icon="layers" name="left-radio" value="seven"
        heading="Tile title lorem ipsum"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.">
      </calcite-tile-select>
      <calcite-tile-select icon="layers" name="left-radio" value="eight"
        heading="Tile title lorem ipsum"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.">
      </calcite-tile-select>
    </calcite-tile-select-group>
  `
  );
