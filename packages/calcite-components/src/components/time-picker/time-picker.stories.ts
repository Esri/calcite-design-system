import { number, select, text } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement, menuPlacements } from "../../utils/floating-ui";
import { locales, numberingSystems } from "../../utils/locale";

export default {
  title: "Components/Controls/Time/Time Picker",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-time-picker
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    lang="${select("lang", locales, "en")}"
    name="${text("name", "simple")}"
    numbering-system="${select("numbering-system", numberingSystems, "latn")}"
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 0.001)}"
    value="${text("value", "10:37:09.023")}"
  >
  </calcite-time-picker>
`;
