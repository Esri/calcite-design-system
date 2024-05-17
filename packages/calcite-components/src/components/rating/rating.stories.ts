import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { scale } = ATTRIBUTES;

interface RatingArgs {
  scale: string;
  value: number;
  showChip: boolean;
  average: number;
  count: number;
  readOnly: boolean;
  disabled: boolean;
}

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

export const simple = (args: RatingArgs): string => html`
  <calcite-rating
    scale="${args.scale}"
    value="${args.value}"
    ${args.showChip ? "show-chip" : ""}
    average="${args.average}"
    count="${args.count}"
    ${args.readOnly ? "read-only" : ""}
    ${args.disabled ? "disabled" : ""}
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
