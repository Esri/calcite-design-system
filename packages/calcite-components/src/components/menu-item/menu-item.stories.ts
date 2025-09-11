import { boolean } from "../../../.storybook/utils";
import { iconNames } from "../../../.storybook/helpers";
import { html } from "../../../support/formatting";
import { SLOTS } from "../../../src/components/menu-item/resources";
import { CalciteMenuItem } from "./menu-item";

interface MenuItemStoryArgs
  extends Pick<CalciteMenuItem, "text" | "href" | "rel" | "target" | "label" | "active" | "breadcrumb"> {
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
    label: "",
    active: false,
    breadcrumb: false,
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
      label="${args.label}"
      ${boolean("active", args.active)}
      ${boolean("breadcrumb", args.breadcrumb)}
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

export const allIconsAndSubMenu_TestOnly = (): string =>
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

export const allIconsAndSubMenuVertical_TestOnly = (): string =>
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

export const darkModeRTL_TestOnly = (): string =>
  html`<calcite-menu-item
    text="Menu item"
    active
    dir="rtl"
    class="calcite-mode-dark"
    icon-start="layer"
    icon-end="layer"
  />`;
