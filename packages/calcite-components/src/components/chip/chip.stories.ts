import { select } from "@storybook/addon-knobs";
import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Chip",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["outline", "outline-fill", "solid"], "solid")}"
      kind="${select("kind", ["brand", "inverse", "neutral"], "neutral")}"
      ${boolean("closable", false)}
      ${boolean("selected", false)}
      >My great chip</calcite-chip
    >
  </div>
`;

export const withIcon = (): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip
      icon="${select("icon", iconNames, iconNames[0])}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["outline", "outline-fill", "solid"], "solid")}"
      kind="${select("kind", ["brand", "inverse", "neutral"], "neutral")}"
      ${boolean("closable", false)}
      ${boolean("selected", false)}
    >
      My great chip</calcite-chip
    >
  </div>
`;

export const withImage = (): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["outline", "outline-fill", "solid"], "solid")}"
      kind="${select("kind", ["brand", "inverse", "neutral"], "neutral")}"
      ${boolean("closable", false)}
      ${boolean("selected", false)}
    >
      <img alt="" slot="image" src="${placeholderImage({ width: 50, height: 50 })}" />
      My great chip</calcite-chip
    >
  </div>
`;

export const withAvatar = (): string => {
  const scale = select("scale", ["s", "m", "l"], "m");

  return html`
    <div style="background-color:white;padding:100px">
      <calcite-chip
        scale="${scale}"
        appearance="${select("appearance", ["outline", "outline-fill", "solid"], "solid")}"
        kind="${select("kind", ["brand", "inverse", "neutral"], "neutral")}"
        ${boolean("closable", false)}
        ${boolean("selected", false)}
      >
        <calcite-avatar
          slot="image"
          scale="${scale}"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  `;
};

export const withAvatarAndIcon = (): string => {
  const scale = select("scale", ["s", "m", "l"], "m");

  return html`
    <div style="background-color:white;padding:100px">
      <calcite-chip
        scale="${scale}"
        appearance="${select("appearance", ["outline", "outline-fill", "solid"], "solid")}"
        kind="${select("kind", ["brand", "inverse", "neutral"], "neutral")}"
        ${boolean("closable", false)}
        ${boolean("selected", false)}
        icon="layer"
      >
        <calcite-avatar
          slot="image"
          scale="${scale}"
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
    <calcite-chip
      icon="${select("icon", iconNames, iconNames[0])}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["outline", "outline-fill", "solid"], "solid")}"
      kind="${select("kind", ["brand", "inverse", "neutral"], "neutral")}"
      closable
      ${boolean("selected", false)}
    >
      My great chip</calcite-chip
    >
  </div>
`;

export const withAvatarAndIconAndClosable = (): string => {
  const scale = select("scale", ["s", "m", "l"], "m");

  return html`
    <div style="background-color:white;padding:100px">
      <calcite-chip
        scale="${scale}"
        appearance="${select("appearance", ["outline", "outline-fill", "solid"], "solid")}"
        kind="${select("kind", ["brand", "inverse", "neutral"], "neutral")}"
        closable
        ${boolean("selected", false)}
        icon="layer"
      >
        <calcite-avatar
          slot="image"
          scale="${scale}"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  `;
};
export const overriddenIconColor = (): string =>
  html`<calcite-chip icon="banana" style="--calcite-ui-icon-color: #ac9f42" closable>Banana</calcite-chip>`;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-chip class="calcite-mode-dark">My great chip</calcite-chip>
  </div>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const theming_TestOnly = (): string => html`
  <calcite-chip
    closable
    icon="layer"
    style="--calcite-chip-background-color: rgb(182, 101, 101);
      --calcite-chip-border-color: rgb(183, 61, 61);
      --calcite-chip-box-shadow: var(--calcite-shadow-sm);
      --calcite-chip-corner-radius: 4px;
      --calcite-chip-icon-color: rgb(244, 229, 229);
      --calcite-chip-text-color: rgb(244, 229, 229);"
  >
    Example Chip
  </calcite-chip>
`;
