import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Rating } from "./rating";
const { scale } = ATTRIBUTES;

type RatingStoryArgs = Pick<Rating, "scale" | "value" | "showChip" | "average" | "count" | "readOnly" | "disabled">;

export default {
  title: "Components/Controls/Rating",
  args: {
    scale: scale.defaultValue,
    value: 1,
    showChip: true,
    average: 4.4,
    count: 10,
    readOnly: false,
    disabled: false,
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: RatingStoryArgs): string => html`
  <calcite-rating
    scale="${args.scale}"
    value="${args.value}"
    ${boolean("show-chip", args.showChip)}
    average="${args.average}"
    count="${args.count}"
    ${boolean("read-only", args.readOnly)}
    ${boolean("disabled", args.disabled)}
  ></calcite-rating>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-rating
    class="calcite-mode-dark"
    dir="rtl"
    scale="m"
    value="2"
    show-chip
    average="4.4"
    count="10"
  ></calcite-rating>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

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
