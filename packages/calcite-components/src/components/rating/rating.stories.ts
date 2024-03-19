import { number, select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Rating",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-rating
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="${number("value", 1)}"
    ${boolean("show-chip", true)}
    average="${number("average", 4.4)}"
    count="${number("count", 10)}"
    ${boolean("read-only", false)}
    ${boolean("disabled", false)}
  ></calcite-rating>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-rating
    class="calcite-mode-dark"
    dir="rtl"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="${number("value", 2)}"
    ${boolean("show-chip", true)}
    average="${number("average", 4.4)}"
    count="${number("count", 10)}"
    ${boolean("read-only", false)}
    ${boolean("disabled", false)}
  ></calcite-rating>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-rating disabled value="3"></calcite-rating>`;

export const Focus_TestOnly = (): string =>
  html` <calcite-rating value="4" required></calcite-rating>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-rating");
        await document.querySelector("calcite-rating").setFocus();
      })();
    </script>`;

Focus_TestOnly.parameters = {
  chromatic: { delay: 500 },
};
