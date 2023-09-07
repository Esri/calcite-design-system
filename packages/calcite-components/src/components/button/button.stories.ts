import { text, select } from "@storybook/addon-knobs";
import { iconNames, boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Buttons/Button",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-button
    appearance="${select("appearance", ["solid", "outline", "outline-fill", "transparent"], "solid")}"
    kind="${select("kind", ["brand", "danger", "inverse", "neutral"], "brand")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    width="${select("width", ["auto", "half", "full"], "auto")}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

export const withIconStart = (): string => html`
  <calcite-button
    alignment="${select(
      "alignment",
      ["start", "end", "center", "space-between", "icon-start-space-between", "icon-end-space-between"],
      "center"
    )}"
    appearance="${select("appearance", ["solid", "outline", "outline-fill", "transparent"], "solid")}"
    kind="${select("kind", ["brand", "danger", "inverse", "neutral"], "brand")}"
    icon-start="${select("icon-start", iconNames, iconNames[0])}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

withIconStart.storyName = "With icon-start";

export const withIconEnd = (): string => html`
  <calcite-button
    alignment="${select(
      "alignment",
      ["start", "end", "center", "space-between", "icon-start-space-between", "icon-end-space-between"],
      "center"
    )}"
    appearance="${select("appearance", ["solid", "outline", "outline-fill", "transparent"], "solid")}"
    icon-end="${select("icon-end", iconNames, iconNames[0])}"
    kind="${select("kind", ["brand", "danger", "inverse", "neutral"], "brand")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    width="${select("width", ["auto", "half", "full"], "auto")}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

withIconEnd.storyName = "With icon-end";

export const withIconStartAndIconEnd = (): string => html`
  <calcite-button
    alignment="${select(
      "alignment",
      ["start", "end", "center", "space-between", "icon-start-space-between", "icon-end-space-between"],
      "center"
    )}"
    appearance="${select("appearance", ["solid", "outline", "outline-fill", "transparent"], "solid")}"
    kind="${select("kind", ["brand", "danger", "inverse", "neutral"], "brand")}"
    icon-start="${select("icon-start", iconNames, iconNames[0])}"
    icon-end="${select("icon-end", iconNames, iconNames[0])}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    width="${select("width", ["auto", "half", "full"], "auto")}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

withIconStartAndIconEnd.storyName = "With icon-start and icon-end";

export const setWidthContainer = (): string => html`
  <div style="width: 480px; max-width: 100%; background-color: #fff">
    <calcite-button
      width="${select("width", ["auto", "half", "full"], "auto")}"
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
    >
      ${text("text", "button text here")}
    </calcite-button>
  </div>
`;

export const disabled_TestOnly = (): string => html`<calcite-button disabled>disabled</calcite-button>`;

export const withIconStartEmpty_TestOnly = (): string => html` <calcite-button icon-start> Button </calcite-button>`;

withIconStartEmpty_TestOnly.storyName = "With icon-start set to empty";

export const withIconEndEmpty_TestOnly = (): string => html` <calcite-button icon-end> Button </calcite-button>`;

withIconEndEmpty_TestOnly.storyName = "With icon-end set to empty";

export const sideBySide_TestOnly = (): string => html`
  <div style="width: 300px; max-width: 100%; display: flex; flex-direction: row; background-color: #fff">
    <calcite-button
      width="half"
      appearance="${select("appearance", ["solid", "outline", "outline-fill", "transparent"], "outline-fill")}"
      kind="${select("kind", ["brand", "danger", "inverse", "neutral"], "brand")}"
    >
      ${text("text", "Back")}
    </calcite-button>
    <calcite-button
      width="half"
      appearance="${select("appearance-2", ["solid", "outline", "outline-fill", "transparent"], "solid")}"
      kind="${select("kind-2", ["brand", "danger", "inverse", "neutral"], "brand")}"
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
    >
      ${text("text-2", "Some long string")}
    </calcite-button>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-button
    class="calcite-mode-dark"
    dir="rtl"
    appearance="${select("appearance", ["solid", "outline", "outline-fill", "transparent"], "solid")}"
    kind="${select("kind", ["brand", "danger", "inverse", "neutral"], "brand")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    icon-start="${select("icon-start", iconNames, iconNames[0])}"
    icon-end="${select("icon-end", iconNames, iconNames[0])}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

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
