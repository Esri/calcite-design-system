import { select, text } from "@storybook/addon-knobs";
import { iconNames, boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Tiles/Tile",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.",
    )}"
    ${boolean("disabled", false)}
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
  </calcite-tile>
`;

export const scales = (): string => html`
  <div style="width: 300px">
    <calcite-label scale="s"
      >small
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </calcite-label>
    <calcite-label scale="m"
      >medium
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </calcite-label>
    <calcite-label scale="l"
      >large
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </calcite-label>
  </div>
`;

export const largeTile = (): string => html`
  <calcite-tile
    ${boolean("active", false)}
    description=""
    heading="${text("heading", "Tile heading lorem ipsum!")}"
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
  >
  </calcite-tile>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.",
    )}"
    ${boolean("disabled", false)}
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
    class="calcite-mode-dark"
    dir="rtl"
  >
  </calcite-tile>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const contentStartRTL_TestOnly = (): string => html`
  <calcite-tile
    description="${text("description", "polygon layer")}"
    heading="${text("heading", "Percent of population that carpool to work")}"
    dir="rtl"
  >
    <calcite-icon scale="s" slot="content-start" icon="polygon"></calcite-icon>
    <calcite-icon scale="s" slot="content-end" icon="launch"></calcite-icon>
  </calcite-tile>
`;

export const overflowingContent_TestOnly = (): string => html`
  <calcite-tile
    icon="2d-explore"
    heading="Example tile headinghfjkdlsahfjklsdahfjklsadhfjkldsahfjldkashfjdkalshfds;ahfjkldshafljkdsahfljksdahfdlsajkfhsadkljfhsdajklfhsdalkjfhdsalkjfhdsalf"
    description="Example tile description contenthfjdkslahfjkdsalhf sdajklfh ksdjahfljksadhfljkdsahfjklsdahfjlkdsahflkjdsahfjkdsahflkdjsahfldksajhfdsklajhfdsljkahfdsajkfhsadlkjfsadhfdsa"
    style="width:200px"
  ></calcite-tile>
`;

export const disabled_TestOnly = (): string => html`
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.",
    )}"
    ${boolean("disabled", false)}
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
  >
  </calcite-tile>
`;
