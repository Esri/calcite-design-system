import { boolean, optionalAttribute } from "../../../.storybook/utils";
import { iconNames } from "../../../.storybook/helpers";
import { html } from "../../../support/formatting";
import { SLOTS } from "../../../src/components/menu-item/resources";
import type { MenuItem } from "./menu-item";

interface MenuItemStoryArgs extends Pick<
  MenuItem,
  | "active"
  | "breadcrumb"
  | "href"
  | "iconEnd"
  | "iconFlipRtl"
  | "iconStart"
  | "label"
  | "open"
  | "rel"
  | "target"
  | "text"
> {
  src: string;
}

export default {
  title: "Components/Menu Item",
  args: {
    text: "Menu item",
    src: "",
    href: "",
    rel: "",
    target: "",
    iconStart: "",
    iconEnd: "",
    iconFlipRtl: false,
    label: "",
    active: false,
    breadcrumb: false,
    open: false,
  },
  argTypes: {
    iconStart: {
      options: ["", ...iconNames],
      control: { type: "select" },
    },
    iconEnd: {
      options: ["", ...iconNames],
      control: { type: "select" },
    },
  },
};

export const simple = (args: MenuItemStoryArgs): string => html`
  <calcite-menu>
    <calcite-menu-item
      text="${args.text}"
      src="${args.src}"
      href="${args.href}"
      rel="${args.rel}"
      target="${args.target}"
      ${optionalAttribute("icon-start", args.iconStart)}
      ${optionalAttribute("icon-end", args.iconEnd)}
      ${boolean("icon-flip-rtl", !!args.iconFlipRtl)}
      label="${args.label}"
      ${boolean("active", args.active)}
      ${boolean("breadcrumb", args.breadcrumb)}
      ${boolean("open", args.open)}
    />
  </calcite-menu>
`;

export const iconStart = (): string =>
  html`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-start="${iconNames[0]}" />
  </calcite-menu>`;

export const iconEnd = (): string =>
  html`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-end="${iconNames[0]}" />
  </calcite-menu>`;

export const iconsBoth = (): string =>
  html`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-end="${iconNames[0]}" icon-start="${iconNames[0]}" />
  </calcite-menu>`;

export const allIconsAndSubMenu = (): string =>
  html`<calcite-menu>
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="${SLOTS.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="${SLOTS.submenuItem}" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="${SLOTS.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item
  ></calcite-menu>`;

export const allIconsAndSubMenuVertical = (): string =>
  html`<calcite-menu layout="vertical">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="${SLOTS.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="${SLOTS.submenuItem}" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="${SLOTS.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item>
  </calcite-menu>`;

export const darkModeRTL = (): string =>
  html`<calcite-menu-item
    text="Menu item"
    active
    dir="rtl"
    class="calcite-mode-dark"
    icon-start="layer"
    icon-end="layer"
  />`;
