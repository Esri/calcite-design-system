import { select, text } from "@storybook/addon-knobs";
import { iconNames, boolean } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Tiles/Tile",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <h1>Default</h1>
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    )}"
    ${boolean("disabled", false)}
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
  >
  </calcite-tile>
  <h1>Disabled</h1>
  <calcite-tile
    ${boolean("active", false)}
    disabled
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

export const darkRTL = (): string => html`
  <h1>Default</h1>
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    )}"
    ${boolean("disabled", false)}
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
    class="calcite-theme-dark"
    dir="rtl"
  >
  </calcite-tile>
  <h1>Disabled</h1>
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    )}"
    disabled
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
    class="calcite-theme-dark"
    dir="rtl"
  >
  </calcite-tile>
`;

darkRTL.parameters = { themes: themesDarkDefault };

export const LargeTile = (): string => html`
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

export const ContentStartRTL = (): string => html`
  <calcite-tile
    description="${text("description", "polygon layer")}"
    heading="${text("heading", "Percent of population that carpool to work")}"
    dir="rtl"
  >
    <calcite-icon scale="s" slot="content-start" icon="polygon"></calcite-icon>
    <calcite-icon scale="s" slot="content-end" icon="launch"></calcite-icon>
  </calcite-tile>
`;

export const OverflowingContent = (): string => html`
  <calcite-tile
    icon="2d-explore"
    heading="Example tile headinghfjkdlsahfjklsdahfjklsadhfjkldsahfjldkashfjdkalshfds;ahfjkldshafljkdsahfljksdahfdlsajkfhsadkljfhsdajklfhsdalkjfhdsalkjfhdsalf"
    description="Example tile description contenthfjdkslahfjkdsalhf sdajklfh ksdjahfljksadhfljkdsahfjklsdahfjlkdsahflkjdsahfjkdsahflkdjsahfldksajhfdsklajhfdsljkahfdsajkfhsadlkjfsadhfdsa"
    style="width:200px"
  ></calcite-tile>
`;
