import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { ChipGroup } from "./chip-group";
const { selectionMode, scale } = ATTRIBUTES;

type ChipGroupStoryArgs = Pick<ChipGroup, "selectionMode" | "scale">;

export default {
  title: "Components/Chip Group",
  args: {
    selectionMode: selectionMode.defaultValue,
    scale: scale.defaultValue,
  },
  argTypes: {
    selectionMode: {
      options: selectionMode.values.filter(
        (option) => option !== "children" && option !== "multichildren" && option !== "ancestors",
      ),
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: ChipGroupStoryArgs): string => html`
  <calcite-chip-group selection-mode="${args.selectionMode}" scale="${args.scale}">
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

export const multiPadding = (): string => html`
  <div style="display: flex; flex-direction: row; gap: 50px;">
    <div>
      <calcite-chip-group label="demo-group-label" selection-mode="multiple" scale="s">
        <calcite-chip kind="inverse" selected closable value="KML"> KML </calcite-chip>
      </calcite-chip-group>
      <calcite-chip-group label="demo-group-label" selection-mode="multiple" scale="m" style="padding-top: 16px">
        <calcite-chip kind="inverse" selected closable value="KML"> KML </calcite-chip>
      </calcite-chip-group>
      <calcite-chip-group label="demo-group-label" selection-mode="multiple" scale="l" style="padding-top: 16px">
        <calcite-chip kind="inverse" selected closable value="KML"> KML </calcite-chip>
      </calcite-chip-group>
    </div>
    <div>
      <calcite-chip-group label="demo-group-label" selection-mode="multiple" scale="s">
        <calcite-chip kind="inverse" selected icon="file-kml" closable value="KML">
          KML <calcite-avatar slot="image" full-name="Alluvial"></calcite-avatar
        ></calcite-chip>
      </calcite-chip-group>
      <calcite-chip-group label="demo-group-label" selection-mode="multiple" scale="m" style="padding-top: 16px">
        <calcite-chip kind="inverse" selected icon="file-kml" closable value="KML">
          KML<calcite-avatar slot="image" full-name="Alluvial"></calcite-avatar>
        </calcite-chip>
      </calcite-chip-group>
      <calcite-chip-group label="demo-group-label" selection-mode="multiple" scale="l" style="padding-top: 16px">
        <calcite-chip kind="inverse" selected closable value="KML">
          KML<calcite-avatar slot="image" full-name="Alluvial"></calcite-avatar>
        </calcite-chip>
      </calcite-chip-group>
    </div>
  </div>
`;
