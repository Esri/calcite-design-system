import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { layout, dir, alignment, width, buttonType } = ATTRIBUTES;

interface TileSelectGroupArgs {
  layout: string;
  dir: string;
  inputEnabled: boolean;
  alignment: string;
  width: string;
  type: string;
}

export default {
  title: "Components/Tiles/Tile Select Group",
  args: {
    layout: layout.defaultValue,
    dir: dir.defaultValue,
    inputEnabled: true,
    alignment: alignment.defaultValue,
    width: width.defaultValue,
    type: buttonType.defaultValue,
  },
  argTypes: {
    layout: {
      options: layout.values.filter(
        (option) =>
          option !== "inline" &&
          option !== "center" &&
          option !== "auto" &&
          option !== "fixed" &&
          option !== "none" &&
          option !== "horizontal-single",
      ),
      control: { type: "select" },
    },
    dir: {
      options: dir.values,
      control: { type: "select" },
    },
    alignment: {
      options: alignment.values,
      control: { type: "select" },
    },
    width: {
      options: width.values.filter((option) => option !== "half"),
      control: { type: "select" },
    },
    type: {
      options: buttonType.values,
      control: { type: "select" },
    },
  },
};

const tileSelectsHTML = () => html`
  <calcite-tile-select
    checked
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    icon="layers"
    name="light"
    input-enabled
    input-alignment="start"
    width="auto"
    type="radio"
    value="one"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    name="light"
    input-enabled
    input-alignment="start"
    width="auto"
    type="radio"
    value="two"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    name="light"
    input-enabled
    input-alignment="start"
    width="auto"
    type="radio"
    value="three"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum"
    icon="layers"
    name="light"
    input-enabled
    input-alignment="start"
    width="auto"
    type="radio"
    value="four"
  >
  </calcite-tile-select>
`;

export const simple = (args: TileSelectGroupArgs): string => html`
  <calcite-tile-select-group layout="${args.layout}" dir="${args.dir}">
    <calcite-tile-select
      checked
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${args.inputEnabled ? "input-enabled" : ""}
      input-alignment="${args.alignment}"
      width="${args.width}"
      type="${args.type}"
      value="one"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${args.inputEnabled ? "input-enabled" : ""}
      input-alignment="${args.alignment}"
      width="${args.width}"
      type="${args.type}"
      value="two"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${args.inputEnabled ? "input-enabled" : ""}
      input-alignment="${args.alignment}"
      width="${args.width}"
      type="${args.type}"
      value="three"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum"
      icon="layers"
      name="light"
      ${args.inputEnabled ? "input-enabled" : ""}
      input-alignment="${args.alignment}"
      width="${args.width}"
      type="${args.type}"
      value="four"
    >
    </calcite-tile-select>
  </calcite-tile-select-group>
`;

export const disabled_TestOnly = (): string => html`
  <calcite-tile-select-group layout="horizontal}" dir="ltr"> ${tileSelectsHTML()} </calcite-tile-select-group>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-tile-select-group layout="horizontal" dir="rtl" class="calcite-mode-dark">
    ${tileSelectsHTML()}
  </calcite-tile-select-group>
`;
darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
