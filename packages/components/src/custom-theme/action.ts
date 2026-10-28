import "../components/action-bar/action-bar";
import "../components/action-group/action-group";
import "../components/action-menu/action-menu";
import "../components/action/action";
import { html } from "../../support/formatting";

export const actionTokens = {
  calciteActionIndicatorColor: "",
  calciteActionBackgroundColor: "",
  calciteActionBackgroundColorHover: "",
  calciteActionBackgroundColorPressed: "",
  calciteActionTextColor: "",
  calciteActionTextColorPressed: "",
  calciteActionLoaderColor: "",
};

export const actionBarTokens = {
  calciteActionBarExpandedMaxWidth: "",
  calciteActionBarItemsSpace: "",
};

export const actionBar = html`<calcite-action-bar layout="horizontal" style="width:100%">
  <calcite-action-group>
    <calcite-action text="Add" icon="plus"> </calcite-action>
    <calcite-action text="Save" icon="save"> </calcite-action>
    <calcite-action text="Layers" icon="layers"> </calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Add" icon="plus"> </calcite-action>
    <calcite-action text="Save" active icon="save"> </calcite-action>
    <calcite-action text="Layers" icon="layers"> </calcite-action>
  </calcite-action-group>
  <calcite-action slot="actions-end" text="hello world" icon="layers"></calcite-action>
  <calcite-action slot="actions-end" text="hello world 2" icon="information"></calcite-action>
</calcite-action-bar>`;

export const actionGroupTokens = {
  calciteActionGroupBorderColor: "",
  calciteActionGroupColumns: "",
};

export const actionMenuTokens = { calciteActionMenuItemsSpace: "" };

export const actionMenu = html`<calcite-action-menu open>
  <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
  <calcite-action-group>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action
    ><calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
  </calcite-action-group>
  <calcite-action-group> <calcite-action text="Table" icon="table" text-enabled></calcite-action></calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Save" icon="save" text-enabled></calcite-action>
  </calcite-action-group>
</calcite-action-menu>`;
