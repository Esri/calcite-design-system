import { html } from "../../support/formatting";

export const menuItemTokens = {
  calciteMenuItemAccentColor: "",
  calciteMenuBackgroundColor: "",
  calciteMenuItemSubMenuBorderColor: "",
  calciteMenuItemSubMenuCornerRadius: "",
  calciteMenuTextColor: "",
};

const menuHTML = (layout: string) =>
  html`<calcite-menu layout="${layout}">
    <calcite-menu-item text="Ideas" breadcrumb icon-start="layers" icon-end="layers" open>
      <calcite-menu-item
        href="#calcite-navigation-slots"
        icon-start="add-in"
        slot="submenu-item"
        text="Slots"
        active
      ></calcite-menu-item>
      <calcite-menu-item
        href="#calcite-navigation-css-vars"
        icon-start="multiple-variables"
        slot="submenu-item"
        text="Css vars"
      ></calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Ideas"> </calcite-menu-item>
    <calcite-menu-item text="calcite-navigation" href="#calcite-menu" open>
      <calcite-menu-item
        href="#calcite-navigation-slots"
        icon-start="add-in"
        slot="submenu-item"
        text="Slots"
        active
      ></calcite-menu-item>
      <calcite-menu-item
        href="#calcite-navigation-css-vars"
        icon-start="multiple-variables"
        slot="submenu-item"
        text="Css vars"
      ></calcite-menu-item>
    </calcite-menu-item>
  </calcite-menu>`;

export const menuItem = html` ${menuHTML("horizontal")} ${menuHTML("vertical")} `;
