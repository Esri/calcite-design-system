import { select } from "../../../.storybook/fake-knobs";
import { boolean, iconNames } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Chip",
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

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
