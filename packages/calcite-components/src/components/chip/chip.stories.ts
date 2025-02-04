import { iconNames } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Chip } from "./chip";

const { scale, appearance, kind } = ATTRIBUTES;

type ChipStoryArgs = Pick<Chip, "scale" | "appearance" | "kind" | "closable" | "selected" | "label">;

export default {
  title: "Components/Chip",
  args: {
    scale: scale.defaultValue,
    appearance: appearance.defaultValue,
    kind: kind.values[4],
    closable: false,
    selected: false,
    label: "My great chip",
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
    label: {
      control: { type: "text" },
    },
  },
};

export const simple = (args: ChipStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip
      scale="${args.scale}"
      appearance="${args.appearance}"
      kind="${args.kind}"
      label="${args.label}"
      ${boolean("closable", args.closable)}
      ${boolean("selected", args.selected)}
      >My great chip</calcite-chip
    >
  </div>
`;

export const withIcon = (args: ChipStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip icon="${iconNames[0]}" scale="m" appearance="solid" kind="neutral" label="${args.label}">
      My great chip</calcite-chip
    >
  </div>
`;

export const withImage = (args: ChipStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip scale="m" appearance="solid" kind="neutral" label="${args.label}">
      <img slot="image" src="${placeholderImage({ width: 50, height: 50 })}" />
      My great chip</calcite-chip
    >
  </div>
`;

export const withAvatar = (): string => {
  return html`
    <div style="background-color:white;padding:100px">
      <calcite-chip scale="m" appearance="solid" kind="neutral" label="Username">
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
      <calcite-chip scale="m" appearance="solid" kind="neutral" icon="layer" label="Username">
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

// <div style="background-color:var(--calcite-color-foreground-current); padding:50px; display=inline-grid; grid-template-columns: 1fr; gap:var(--calcite-spacing-xxs);">

export const withClosable = (args: ChipStoryArgs): string => html`
  <div
    style="display: grid; background-color:var(--calcite-color-foreground-current); padding: 50px; gap:var(--calcite-spacing-xxs);"
  >
    <calcite-chip icon="${iconNames[0]}" scale="m" appearance="solid" kind="neutral" label="${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="${iconNames[0]}" scale="m" appearance="solid" kind="brand" label="${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="${iconNames[0]}" scale="m" appearance="solid" kind="inverse" label="${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="${iconNames[0]}" scale="m" appearance="outline" kind="neutral" label="${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="${iconNames[0]}" scale="m" appearance="outline" kind="brand" label="${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="${iconNames[0]}" scale="m" appearance="outline" kind="inverse" label="${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip
      icon="${iconNames[0]}"
      scale="m"
      appearance="outline-fill"
      kind="neutral"
      label="${args.label}"
      closable
    >
      My great chip</calcite-chip
    >
    <calcite-chip
      icon="${iconNames[0]}"
      scale="m"
      appearance="outline-fill"
      kind="brand"
      label="${args.label}"
      closable
    >
      My great chip</calcite-chip
    >
    <calcite-chip
      icon="${iconNames[0]}"
      scale="m"
      appearance="outline-fill"
      kind="inverse"
      label="${args.label}"
      closable
    >
      My great chip</calcite-chip
    >
  </div>
`;

export const withAvatarAndIconAndClosable = (): string => {
  return html`
    <div style="background-color:white;padding:100px">
      <calcite-chip scale="m" appearance="solid" kind="neutral" label="Username" closable icon="layer">
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
  html`<calcite-chip icon="banana" style="--calcite-icon-color: #ac9f42" label="Banana" closable>Banana</calcite-chip>`;

export const darkModeRTL_TestOnly = (args: ChipStoryArgs): string => html`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-chip class="calcite-mode-dark" label="${args.label}">My great chip</calcite-chip>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
