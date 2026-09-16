import "../components/button/button";
import "../components/dropdown-group/dropdown-group";
import "../components/dropdown-item/dropdown-item";
import "../components/dropdown/dropdown";
import { html } from "../../support/formatting";

export const DropdownTokens = {
  calciteDropdownWidth: "",
  calciteDropdownBackgroundColor: "",
  calciteDropdownMaxHeight: "",
};

export const DropdownGroupTokens = {
  calciteDropdownGroupBorderColor: "",
  calciteDropdownGroupTitleTextColor: "",
};

export const DropdownItemTokens = {
  calciteDropdownItemTextColor: "",
  calciteDropdownItemBackgroundColorHover: "",
  calciteDropdownItemBackgroundColorPress: "",
  calciteDropdownItemIconColorHover: "",
  calciteDropdownItemIconColorPress: "",
  calciteDropdownItemTextColorPress: "",
};

export const dropdown = html`<calcite-dropdown open>
  <calcite-button slot="trigger">Primary</calcite-button>
  <calcite-dropdown-group group-title="View">
    <calcite-dropdown-item icon-start="list-bullet" icon-end="list-bullet" selected>List</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="grid">Grid</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-group>
    <calcite-dropdown-item href="esri.com" icon-start="home">Home</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>`;
