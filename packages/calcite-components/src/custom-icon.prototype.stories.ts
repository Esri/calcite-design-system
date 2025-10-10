import { html } from "../support/formatting";

export default {
  title: "Prototype/Custom Icon Support",
  args: {
    icon: "banana",
    iconStart: "3d-glasses",
    iconEnd: "layers",
    placeholderIcon: "information",
    scale: "m",
  },
  argTypes: {
    icon: {
      control: {
        type: "text",
      },
    },
    iconStart: {
      control: {
        type: "text",
      },
    },
    iconEnd: {
      control: {
        type: "text",
      },
    },
    placeholderIcon: {
      control: {
        type: "text",
      },
    },
    scale: {
      control: { type: "select" },
      options: ["m", "s", "l"],
    },
  },
};

type TestIcons = { icon: string; iconStart: string; iconEnd: string; placeholderIcon: string; scale: string };

// create simple stories for icon and icon-owning components and configure a text control for icon props
export const icon = ({ icon, scale }: TestIcons): string => html`
  <calcite-icon icon="${icon}" scale="${scale}""></calcite-icon>
`;

export const dropdown = ({ iconStart, iconEnd, scale }: TestIcons): string => html`
  <calcite-dropdown scale="${scale}">
    <calcite-button scale="${scale}" icon-start="${iconStart}" icon-end="${iconEnd}" w slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Icon Start">
      <calcite-dropdown-item icon-start="${iconStart}" icon-end="${iconEnd}">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="${iconStart}" icon-end="${iconEnd}" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="${iconStart}" icon-end="${iconEnd}">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group selection-mode="single" group-title="Icon End">
      <calcite-dropdown-item icon-start="${iconStart}" icon-end="${iconEnd}">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="${iconStart}" icon-end="${iconEnd}"" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="${iconStart}" icon-end="${iconEnd}">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group selection-mode="single" group-title="Icon Both">
      <calcite-dropdown-item icon-start="${iconStart}" icon-end="${iconEnd}">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="${iconStart}" icon-end="${iconEnd}" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="${iconStart}" icon-end="${iconEnd}">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

export const combobox = ({ icon, placeholderIcon, scale }: TestIcons): string => html`
  <calcite-combobox placeholder="choose a number" placeholder-icon="${placeholderIcon}" scale="${scale}">
    <calcite-combobox-item icon="${icon}" value="one" text-label="one"></calcite-combobox-item>
    <calcite-combobox-item icon="${icon}" value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item icon="${icon}" value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>
`;
