import { iconNames } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { appearance, kind, scale, width } = ATTRIBUTES;

interface ButtonArgs {
  appearance: string;
  kind: string;
  scale: string;
  round: boolean;
  href: string;
  loading: boolean;
  disabled: boolean;
  width: string;
  text: string;
}

export default {
  title: "Components/Buttons/Button",
  args: {
    appearance: appearance.defaultValue,
    kind: kind.defaultValue,
    scale: scale.defaultValue,
    round: false,
    href: "",
    loading: false,
    disabled: false,
    width: width.defaultValue,
    text: "button text here",
  },
  argTypes: {
    appearance: {
      options: appearance.values,
      control: { type: "select" },
    },
    kind: {
      options: kind.values.filter((option) => option !== "info" && option !== "warning" && option !== "success"),
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    width: {
      options: width.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: ButtonArgs): string => html`
  <calcite-button
    appearance="${args.appearance}"
    kind="${args.kind}"
    scale="${args.scale}"
    ${args.round && "round"}
    href="${args.href}"
    ${args.loading && "loading"}
    ${args.disabled && "disabled"}
    width="${args.width}"
  >
    ${args.text}
  </calcite-button>
`;

export const withIconStart = (): string => html`
  <calcite-button
    alignment="center"
    appearance="solid"
    kind="brand"
    icon-start="${iconNames[0]}"
    scale="m"
    href=""
    type="button"
    width="auto"
  >
    button text here
  </calcite-button>
`;

withIconStart.storyName = "With icon-start";

export const withIconEnd = (): string => html`
  <calcite-button
    alignment="center"
    appearance="solid"
    icon-end="${iconNames[0]}"
    kind="brand"
    scale="m"
    href=""
    width="auto"
  >
    button text here
  </calcite-button>
`;

withIconEnd.storyName = "With icon-end";

export const withIconStartAndIconEnd = (): string => html`
  <calcite-button
    alignment="center"
    appearance="solid"
    kind="brand"
    icon-start="${iconNames[0]}"
    icon-end="${iconNames[0]}"
    scale="m"
    href=""
    width="auto"
    type="button"
  >
    button text here
  </calcite-button>
`;

withIconStartAndIconEnd.storyName = "With icon-start and icon-end";

export const setWidthContainer = (): string => html`
  <div style="width: 480px; max-width: 100%; background-color: #fff">
    <calcite-button
      width="auto"
      icon-start="${iconNames[0]}"
      alignment="center"
      appearance="solid"
      kind="brand"
      scale="m"
      type="button"
    >
      button text here
    </calcite-button>
  </div>
`;

export const disabled_TestOnly = (): string => html`
  <calcite-button disabled>disabled</calcite-button>
  <br />
  <calcite-button loading disabled>loading + disabled</calcite-button>
`;

export const withIconStartEmpty_TestOnly = (): string => html` <calcite-button icon-start> Button </calcite-button>`;

withIconStartEmpty_TestOnly.storyName = "With icon-start set to empty";

export const withIconEndEmpty_TestOnly = (): string => html` <calcite-button icon-end> Button </calcite-button>`;

withIconEndEmpty_TestOnly.storyName = "With icon-end set to empty";

export const sideBySide_TestOnly = (): string => html`
  <div style="width: 300px; max-width: 100%; display: flex; flex-direction: row; background-color: #fff">
    <calcite-button
      width="half"
      appearance="outline-fill"
      kind="brand"
      alignment="center"
      scale="m"
      type="button"
      calcite-hydrated=""
    >
      Back
    </calcite-button>
    <calcite-button
      width="half"
      appearance="solid"
      kind="brand"
      icon-start="${iconNames[0]}"
      alignment="center"
      scale="m"
      type="button"
    >
      Some long string
    </calcite-button>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-button
    class="calcite-mode-dark"
    dir="rtl"
    appearance="solid"
    kind="brand"
    scale="m"
    href=""
    icon-start="${iconNames[0]}"
    icon-end="${iconNames[0]}"
    alignment="center"
    type="button"
    width="auto"
  >
    button text here
  </calcite-button>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const appearanceAndKindCombinations_TestOnly = (): string => html`
  <calcite-button scale="s" appearance="outline" kind="brand">outline+brand</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="danger">outline+danger</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="inverse">outline+inverse</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="neutral">outline+neutral</calcite-button>

  <calcite-button scale="s" appearance="outline-fill" kind="brand">outline-fill+brand</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="danger">outline-fill+danger</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="inverse">outline-fill+inverse</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="neutral">outline-fill+neutral</calcite-button>

  <calcite-button scale="s" appearance="solid" kind="brand">solid+brand</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="danger">solid+danger</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="inverse">solid+inverse</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="neutral">solid+neutral</calcite-button>

  <calcite-button scale="s" appearance="transparent" kind="brand">transparent+brand</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="danger">transparent+danger</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="inverse">transparent+inverse</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="neutral">transparent+neutral</calcite-button>
`;
