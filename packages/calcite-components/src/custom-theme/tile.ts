import { html } from "../../support/formatting";

export const tileTokens = {
  calciteTileBackgroundColor: "",
  calciteTileBorderColor: "",
  calciteTileHeadingTextColor: "",
  calciteTileIconColor: "",
  calciteTileSelectionIconColor: "",
  calciteTileSelectionIconColorHover: "",
  calciteTileShadow: "",
  calciteTileTextColor: "",
  calciteTileTextColorHover: "",
};

export const tile = html`
  <calcite-tile
    heading="Tile heading lorem ipsum"
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    icon="layers"
    selected
  ></calcite-tile>
`;
