import { select, text } from "@storybook/addon-knobs";
import { iconNames } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Action Group",

  parameters: {
    notes: readme
  }
};

export const GridCentering = (): string => html`
  <div style="width:400px">
    <calcite-action-group layout="${select("layout", ["horizontal", "vertical", "grid"], "grid")}">
      <calcite-action
        alignment="${select("alignment", ["start", "center", "end"], "center")}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        appearance="${select("appearance", ["solid", "clear", "outline"], "solid")}"
        icon="${select("icon", iconNames, "polygon")}"
        ${text("text", "polygon")}
      >
      </calcite-action>
      <calcite-action
        alignment="${select("alignment", ["start", "center", "end"], "center")}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        appearance="${select("appearance", ["solid", "clear", "outline"], "solid")}"
        icon="${select("icon", iconNames, "rectangle")}"
        ${text("text", "rectangle")}
      >
      </calcite-action>
      <calcite-action
        alignment="${select("alignment", ["start", "center", "end"], "center")}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        appearance="${select("appearance", ["solid", "clear", "outline"], "solid")}"
        icon="${select("icon", iconNames, "trash")}"
        ${text("text", "trash")}
      >
      </calcite-action>
    </calcite-action-group>
  </div>
`;

GridCentering.storyName = "Grid Centering of Actions in a Group";
