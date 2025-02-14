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

export const multipleClosable_TestOnly = (): string => html`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip value="forest" closable>Forest</calcite-chip>
    <calcite-chip selected value="tundra" closable>Tundra</calcite-chip>
    <calcite-chip value="shore" closable>Seashore</calcite-chip>
    <calcite-chip selected value="estuary" closable>Estuary</calcite-chip>
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

export const multipleClosableWithAvatar_TestOnly = (): string => html`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip icon="layer" value="forest" closable>
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Forest</calcite-chip
    >
    <calcite-chip icon="layer" value="tundra" closable>
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Tundra</calcite-chip
    >
    <calcite-chip icon="layer" value="shore" closable>
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Seashore</calcite-chip
    >
    <calcite-chip icon="layer" value="estuary" closable>
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

export const interactivityStates = (): string => html`
  <div style="width:500px; max-width:100%; background-color:white; padding:100px">
    <h2>appearance="solid" & kind="neutral"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="solid" kind="neutral" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="solid" kind="neutral" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="solid" kind="neutral" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="solid" kind="neutral" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="solid" & kind="inverse"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="solid" kind="inverse" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="solid" kind="inverse" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="solid" kind="inverse" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="solid" kind="inverse" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="solid" & kind="brand"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="solid" kind="brand" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="solid" kind="brand" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="solid" kind="brand" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="solid" kind="brand" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline-fill" & kind="neutral"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline-fill" kind="neutral" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="neutral" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="neutral" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="neutral" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline-fill" & kind="inverse"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline-fill" kind="inverse" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="inverse" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="inverse" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="inverse" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline-fill" & kind="brand"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline-fill" kind="brand" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="brand" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="brand" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="brand" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline" & kind="neutral"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline" kind="neutral" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline" kind="neutral" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline" kind="neutral" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline" kind="neutral" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline" & kind="inverse"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline" kind="inverse" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline" kind="inverse" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline" kind="inverse" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline" kind="inverse" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline" & kind="brand"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline" kind="brand" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline" kind="brand" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline" kind="brand" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline" kind="brand" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>
  </div>
`;
