import { withKnobs, number, select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);


export default {
  title: "Pagination",
  decorators: [ withKnobs ],
  parameters: { notes }
};

export const simple = () =>
  `<calcite-pagination
    start="${number("Start", 1)}"
    total="${number("Total", 3)}"
    num="${number("Num", 1)}"
    dir="${select("dir", ["ltr", "rtl"],"ltr")}"
    theme="${select("Theme", ["light", "dark"] ,"light")}"
    background-style="${select("Background Style", ["backgroundColor", "foregroundColor"] ,"foregroundColor")}">
  </calcite-pagination>`;
