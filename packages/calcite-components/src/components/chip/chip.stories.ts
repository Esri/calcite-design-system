import { iconNames } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { scale, appearance, kind } = ATTRIBUTES;

interface ChipArgs {
  scale: string;
  appearance: string;
  kind: string;
  closable: boolean;
  selected: boolean;
}

export default {
  title: "Components/Chip",
  args: {
    scale: scale.defaultValue,
    appearance: appearance.defaultValue,
    kind: kind.values[4],
    closable: false,
    selected: false,
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    appearance: {
      options: appearance.values.filter((option) => option !== "transparent"),
      control: { type: "select" },
    },
    kind: {
      options: kind.values.filter(
        (option) => option !== "danger" && option !== "info" && option !== "warning" && option !== "success",
      ),
      control: { type: "select" },
    },
  },
};

export const simple = (args: ChipArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip
      scale="${args.scale}"
      appearance="${args.appearance}"
      kind="${args.kind}"
      ${boolean("closable", args.closable)}
      ${boolean("selected", args.selected)}
      >My great chip</calcite-chip
    >
  </div>
`;

export const withIcon = (): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip icon="${iconNames[0]}" scale="m" appearance="solid" kind="neutral"> My great chip</calcite-chip>
  </div>
`;

export const withImage = (): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip scale="m" appearance="solid" kind="neutral">
      <img slot="image" src="${placeholderImage({ width: 50, height: 50 })}" />
      My great chip</calcite-chip
    >
  </div>
`;

export const withAvatar = (): string => {
  return html`
    <div style="background-color:white;padding:100px">
      <calcite-chip scale="m" appearance="solid" kind="neutral">
        <calcite-avatar
          slot="image"
          scale="m"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  `;
};

export const withAvatarAndIcon = (): string => {
  return html`
    <div style="background-color:white;padding:100px">
      <calcite-chip scale="m" appearance="solid" kind="neutral" icon="layer">
        <calcite-avatar
          slot="image"
          scale="m"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  `;
};

export const withClosable = (): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip icon="${iconNames[0]}" scale="m" appearance="solid" kind="neutral" closable>
      My great chip</calcite-chip
    >
  </div>
`;

export const withAvatarAndIconAndClosable = (): string => {
  return html`
    <div style="background-color:white;padding:100px">
      <calcite-chip scale="m" appearance="solid" kind="neutral" closable icon="layer">
        <calcite-avatar
          slot="image"
          scale="m"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  `;
};
export const overriddenIconColor = (): string =>
  html`<calcite-chip icon="banana" style="--calcite-chip-icon-color: #ac9f42" closable>Banana</calcite-chip>`;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-chip class="calcite-mode-dark">My great chip</calcite-chip>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const theming_TestOnly = (): string => html`
  <calcite-chip
    closable
    icon="layer"
    style="--calcite-chip-background-color: rgb(182, 101, 101);
      --calcite-chip-border-color: rgb(183, 61, 61);
      --calcite-chip-shadow: var(--calcite-shadow-sm);
      --calcite-chip-corner-radius: 4px;
      --calcite-chip-icon-color: rgb(244, 229, 229);
      --calcite-chip-close-icon-color: orange;
      --calcite-chip-text-color: rgb(244, 229, 229);"
  >
    Example Chip
  </calcite-chip>
`;
