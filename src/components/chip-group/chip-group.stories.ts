import { select } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Chip Group",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-chip-group
    selection-mode="${select("selection-mode", ["single", "single-persist", "multiple", "none"], "multiple")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    <calcite-chip value="forest">Forest</calcite-chip>
    <calcite-chip value="tundra">Tundra</calcite-chip>
    <calcite-chip value="shore">Seashore</calcite-chip>
    <calcite-chip value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
`;

export const singleWithIcon_TestOnly = (): string => html`
  <calcite-chip-group selection-mode="single">
    <calcite-chip icon="layer" value="forest">Forest</calcite-chip>
    <calcite-chip icon="layer" value="tundra">Tundra</calcite-chip>
    <calcite-chip icon="layer" value="shore">Seashore</calcite-chip>
    <calcite-chip icon="layer" value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
`;

export const multiple_TestOnly = (): string => html`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip value="forest">Forest</calcite-chip>
    <calcite-chip selected value="tundra">Tundra</calcite-chip>
    <calcite-chip value="shore">Seashore</calcite-chip>
    <calcite-chip selected value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
`;

export const multipleWithIcon_TestOnly = (): string => html`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip icon="layer" value="forest">Forest</calcite-chip>
    <calcite-chip selected icon="layer" value="tundra">Tundra</calcite-chip>
    <calcite-chip icon="layer" value="shore">Seashore</calcite-chip>
    <calcite-chip selected icon="layer" value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
`;

export const multipleWithAvatar_TestOnly = (): string => html`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip icon="layer" value="forest">
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Forest</calcite-chip
    >
    <calcite-chip icon="layer" value="tundra">
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Tundra</calcite-chip
    >
    <calcite-chip icon="layer" value="shore">
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Seashore</calcite-chip
    >
    <calcite-chip icon="layer" value="estuary">
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Estuary</calcite-chip
    >
  </calcite-chip-group>
`;

export const multipleWithIconAndClosable_TestOnly = (): string => html`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip closable icon="layer" value="forest">Forest</calcite-chip>
    <calcite-chip closable icon="layer" value="tundra">Tundra</calcite-chip>
    <calcite-chip closable icon="layer" value="shore">Seashore</calcite-chip>
    <calcite-chip closable icon="layer" value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <div dir="rtl">
    <calcite-chip-group>
      <calcite-chip value="forest">Forest</calcite-chip>
      <calcite-chip value="tundra">Tundra</calcite-chip>
      <calcite-chip value="shore">Seashore</calcite-chip>
      <calcite-chip value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>
  </div>
`;

darkThemeRTL_TestOnly.parameters = { themes: modesDarkDefault };
