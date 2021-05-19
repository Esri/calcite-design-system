import { select } from "@storybook/addon-knobs";
import { darkBackground } from "../../../.storybook/utils";
import { boolean } from "@storybook/addon-knobs";
import { html } from "../../tests/utils";
import readme from "./readme.md";

export default {
  title: "Components/Tiles/Tile Select Group",

  parameters: {
    notes: readme
  }
};

export const Light = (): string => html`
  <calcite-tile-select-group
    layout="${select("layout", ["horizontal", "vertical"], "horizontal", "Tile Select Group")}"
    dir="${select("dir", ["ltr", "rtl"], "ltr", "Tile Select Group")}"
  >
    <calcite-tile-select
      checked
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
      input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
      width="${select("width", ["full", "auto"], "auto", "Tile Select")}"
      type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
      value="one"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
      input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
      width="${select("width", ["full", "auto"], "auto", "Tile Select")}"
      type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
      value="two"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
      input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
      width="${select("width", ["full", "auto"], "auto", "Tile Select")}"
      type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
      value="three"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
      input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
      width="${select("width", ["full", "auto"], "auto", "Tile Select")}"
      type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
      value="four"
    >
    </calcite-tile-select>
  </calcite-tile-select-group>
`;

export const Dark = (): string => html`
<calcite-tile-select-group
  layout="${select("layout", ["horizontal", "vertical"], "horizontal", "Tile Select Group")}"
  dir="${select("dir", ["ltr", "rtl"], "ltr", "Tile Select Group")}"
  theme="dark"
>
  <calcite-tile-select
    checked
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    icon="layers"
    name="dark"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
    value="one"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    name="dark"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
    value="two"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    name="dark"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
    value="three"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    icon="layers"
    name="dark"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "start", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "radio", "Tile Select")}"
    value="four"
  >
</calcite-tile-select-group>
`;

Dark.story = {
  parameters: { backgrounds: darkBackground }
};

export const RTL = (): string => html`
<calcite-tile-select-group
  dir="rtl"
  layout="${select("layout", ["horizontal", "vertical"], "horizontal", "Tile Select Group")}"
>
  <calcite-tile-select
    checked
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    icon="layers"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "end", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "checkbox", "Tile Select")}"
    value="one"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "end", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "checkbox", "Tile Select")}"
    value="two"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "end", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "checkbox", "Tile Select")}"
    value="three"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    icon="layers"
    ${boolean("input-enabled", true, "Tile Select") && "input-enabled"}
    input-alignment="${select("input-alignment", ["start", "end"], "end", "Tile Select")}"
    type="${select("type", ["radio", "checkbox"], "checkbox", "Tile Select")}"
    value="four"
  >
</calcite-tile-select-group>
`;
