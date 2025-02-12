import { iconNames } from "../../../.storybook/helpers";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { menuPlacements } from "../../utils/floating-ui";
import { SplitButton } from "./split-button";

const { appearance, kind, scale, width, iconType } = ATTRIBUTES;

type SplitButtonStoryArgs = Pick<
  SplitButton,
  | "appearance"
  | "kind"
  | "scale"
  | "width"
  | "loading"
  | "disabled"
  | "placement"
  | "primaryIconStart"
  | "primaryText"
  | "primaryLabel"
  | "dropdownLabel"
  | "dropdownIconType"
>;

export default {
  title: "Components/Buttons/Split Button",
  args: {
    appearance: appearance.defaultValue,
    kind: kind.defaultValue,
    scale: scale.defaultValue,
    width: width.defaultValue,
    loading: false,
    disabled: false,
    placement: "bottom-end",
    primaryIconStart: iconNames[0],
    primaryText: "Primary Option",
    primaryLabel: "Primary Option",
    dropdownLabel: "Additional Options",
    dropdownIconType: iconType.defaultValue,
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
    placement: {
      options: menuPlacements,
      control: { type: "select" },
    },
    primaryIconStart: {
      options: iconNames,
      control: { type: "select" },
    },
    dropdownIconType: {
      options: iconType.values.filter((option) => option !== "plus-minus"),
      control: { type: "select" },
    },
  },
};

export const simple = (args: SplitButtonStoryArgs): string => html`
  <div style="width:70vw;">
    <calcite-split-button
      active
      appearance="${args.appearance}"
      kind="${args.kind}"
      scale="${args.scale}"
      width="${args.width}"
      ${boolean("loading", args.loading)}
      ${boolean("disabled", args.disabled)}
      placement="${args.placement}"
      primary-icon-start="${args.primaryIconStart}"
      primary-text="${args.primaryText}"
      primary-label="${args.primaryLabel}"
      dropdown-label="${args.dropdownLabel}"
      dropdown-icon-type="${args.dropdownIconType}"
    >
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  </div>
`;

export const allWidths_TestOnly = (): string => html`
  <div style="width:70vw;">
    <calcite-split-button primary-text="auto" width="auto">
      <calcite-dropdown-group selection-mode="none" group-title="Veggies">
        <calcite-dropdown-item>Pea</calcite-dropdown-item>
        <calcite-dropdown-item>Parsnip</calcite-dropdown-item>
        <calcite-dropdown-item>Radish</calcite-dropdown-item>
        <calcite-dropdown-item>Tomato</calcite-dropdown-item>
        <calcite-dropdown-item>Rutabaga</calcite-dropdown-item>
        <calcite-dropdown-item>Bean</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
    <calcite-split-button primary-text="half width" width="half">
      <calcite-dropdown-group selection-mode="none" group-title="Veggies">
        <calcite-dropdown-item>Pea</calcite-dropdown-item>
        <calcite-dropdown-item>Parsnip</calcite-dropdown-item>
        <calcite-dropdown-item>Radish</calcite-dropdown-item>
        <calcite-dropdown-item>Tomato</calcite-dropdown-item>
        <calcite-dropdown-item>Rutabaga</calcite-dropdown-item>
        <calcite-dropdown-item>Bean</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
    <calcite-split-button primary-text="full width" width="full">
      <calcite-dropdown-group selection-mode="none" group-title="Veggies">
        <calcite-dropdown-item>Pea</calcite-dropdown-item>
        <calcite-dropdown-item>Parsnip</calcite-dropdown-item>
        <calcite-dropdown-item>Radish</calcite-dropdown-item>
        <calcite-dropdown-item>Tomato</calcite-dropdown-item>
        <calcite-dropdown-item>Rutabaga</calcite-dropdown-item>
        <calcite-dropdown-item>Bean</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  </div>
`;

export const iconEnd_TestOnly = (): string => html`
  <div style="width:70vw;">
    <calcite-split-button
      appearance="solid"
      kind="brand"
      scale="m"
      width="auto"
      primary-icon-end="${iconNames[0]}"
      primary-text="Primary Option"
      primary-label="Primary Option"
      dropdown-label="Additional Options"
      dropdown-icon-type="chevron"
    >
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  </div>
`;

export const iconStartAndIconEnd = (): string => html`
  <div style="width:70vw;">
    <calcite-split-button
      appearance="solid"
      kind="brand"
      scale="m"
      width="auto"
      primary-icon-start="${iconNames[0]}"
      primary-icon-end="${iconNames[0]}"
      primary-text="Primary Option"
      primary-label="Primary Option"
      dropdown-label="Additional Options"
      dropdown-icon-type="chevron"
    >
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  </div>
`;

export const placementTopStart = (): string => html`
  <div style="width:70vw;">
    <calcite-split-button
      active
      appearance="solid"
      kind="brand"
      scale="m"
      width="auto"
      placement="top-start"
      primary-icon-start="${iconNames[0]}"
      primary-icon-end="${iconNames[0]}"
      primary-text="Primary Option"
      primary-label="Primary Option"
      dropdown-label="Additional Options"
      dropdown-icon-type="chevron"
    >
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="width:70vw;">
    <calcite-split-button
      appearance="solid"
      kind="brand"
      scale="m"
      width="auto"
      primary-icon-start="${iconNames[0]}"
      primary-text="Primary Option"
      dropdown-label="Additional Options"
      dropdown-icon-type="chevron"
      class="calcite-mode-dark"
    >
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`
  <calcite-split-button disabled>
    <calcite-dropdown-group selection-mode="none">
      <calcite-dropdown-item>Option 2</calcite-dropdown-item>
      <calcite-dropdown-item>Option 3</calcite-dropdown-item>
      <calcite-dropdown-item>Option 4</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-split-button>
  <br />
  <calcite-split-button disabled loading>
    <calcite-dropdown-group selection-mode="none">
      <calcite-dropdown-item>Option 2</calcite-dropdown-item>
      <calcite-dropdown-item>Option 3</calcite-dropdown-item>
      <calcite-dropdown-item>Option 4</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-split-button>
`;

export const appearanceAndKindCombinations_TestOnly = (): string => html`
  <calcite-split-button primary-text="outline+brand" appearance="outline" kind="brand"></calcite-split-button>
  <calcite-split-button primary-text="outline+danger" appearance="outline" kind="danger"></calcite-split-button>
  <calcite-split-button primary-text="outline+inverse" appearance="outline" kind="inverse"></calcite-split-button>
  <calcite-split-button primary-text="outline+neutral" appearance="outline" kind="neutral"></calcite-split-button>

  <calcite-split-button primary-text="outline-fill+brand" appearance="outline-fill" kind="brand"></calcite-split-button>
  <calcite-split-button
    primary-text="outline-fill+danger"
    appearance="outline-fill"
    kind="danger"
  ></calcite-split-button>
  <calcite-split-button
    primary-text="outline-fill+inverse"
    appearance="outline-fill"
    kind="inverse"
  ></calcite-split-button>
  <calcite-split-button
    primary-text="outline-fill+neutral"
    appearance="outline-fill"
    kind="neutral"
  ></calcite-split-button>

  <calcite-split-button primary-text="solid+brand" appearance="solid" kind="brand"></calcite-split-button>
  <calcite-split-button primary-text="solid+danger" appearance="solid" kind="danger"></calcite-split-button>
  <calcite-split-button primary-text="solid+inverse" appearance="solid" kind="inverse"></calcite-split-button>
  <calcite-split-button primary-text="solid+neutral" appearance="solid" kind="neutral"></calcite-split-button>

  <calcite-split-button primary-text="transparent+brand" appearance="transparent" kind="brand"></calcite-split-button>
  <calcite-split-button primary-text="transparent+danger" appearance="transparent" kind="danger"></calcite-split-button>
  <calcite-split-button
    primary-text="transparent+inverse"
    appearance="transparent"
    kind="inverse"
  ></calcite-split-button>
  <calcite-split-button
    primary-text="transparent+neutral"
    appearance="transparent"
    kind="neutral"
  ></calcite-split-button>
`;

export const loadingAndDisabled_TestOnly = (): string => html`<calcite-button loading disabled>Test</calcite-button>`;

export const primaryAsALink = (): string =>
  html` <calcite-split-button
    scale="s"
    primary-text="Primary Option"
    dropdown-icon-type="overflow"
    href="split-button.html"
    rel="external"
    target="_blank"
  >
    <calcite-dropdown-group selection-mode="none">
      <calcite-dropdown-item>Option 2</calcite-dropdown-item>
      <calcite-dropdown-item>Option 3</calcite-dropdown-item>
      <calcite-dropdown-item>Option 4</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-split-button>`;

export const primaryAsADownload = (): string =>
  html` <calcite-split-button
    download
    scale="s"
    primary-text="Primary Option"
    primary-icon-start="download"
    dropdown-icon-type="overflow"
    href="/"
  >
    <calcite-dropdown-group selection-mode="none">
      <calcite-dropdown-item>Option 2</calcite-dropdown-item>
      <calcite-dropdown-item>Option 3</calcite-dropdown-item>
      <calcite-dropdown-item>Option 4</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-split-button>`;
