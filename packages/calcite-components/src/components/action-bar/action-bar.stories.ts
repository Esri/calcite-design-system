import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { ActionBar } from "./action-bar";

const { position } = ATTRIBUTES;

type ActionBarStoryArgs = Pick<ActionBar, "expandDisabled" | "expanded" | "floating" | "position">;

export default {
  title: "Components/Action Bar",
  args: {
    expandDisabled: false,
    expanded: false,
    position: position.defaultValue,
    floating: false,
  },
  argTypes: {
    position: {
      options: position.values.filter((option) => option !== "top" && option !== "bottom"),
      control: { type: "select" },
    },
  },
};

export const simple = (args: ActionBarStoryArgs): string => html`
  <calcite-action-bar
    ${boolean("expand-disabled", args.expandDisabled)}
    ${boolean("expanded", args.expanded)}
    ${boolean("floating", args.floating)}
    position="${args.position}"
  >
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
`;

export const floating = (args: ActionBarStoryArgs): string =>
  html`<div style="padding:20px;">
    <calcite-action-bar position="${args.position}" floating>
      <calcite-action-group>
        <calcite-action text="Undo" label="Undo Action" icon="undo"></calcite-action>
        <calcite-action text="Redo" label="Redo Action" icon="redo"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Delete" label="Delete Item" icon="trash"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div> `;

export const floatingWithDefinedWidths = (): string => html`
  <style>
    calcite-action-bar {
      --calcite-action-bar-expanded-max-width: 150px;
    }
  </style>
  <div style="padding:20px;">
    <calcite-action-bar floating expanded>
      <calcite-action-group expanded>
        <calcite-action text-enabled text="Add to my custom action bar application" icon="plus"></calcite-action>
        <calcite-action text-enabled text="Save to my custom action bar application" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group expanded>
        <calcite-action text-enabled text="Layers in my custom action bar application" icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
`;

export const floatingWithGroups = (): string =>
  html`<div style="padding:20px;">
    <calcite-action-bar floating layout="horizontal">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" appearance="solid" scale="m"></calcite-action>
        <calcite-action text="Save" icon="save" appearance="solid" scale="m"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" icon="layers" appearance="solid" scale="m"></calcite-action>
        <calcite-action text="Basemaps" icon="layer-basemap" appearance="solid" scale="m"></calcite-action>
      </calcite-action-group>
      <calcite-tooltip
        slot="expand-tooltip"
        id="calcite-tooltip-c19274e3-ff3b-6168-ef1e-8a700b056e1c"
        role="tooltip"
        overlay-positioning="absolute"
        placement="auto"
        style="visibility: hidden; pointer-events: none; position: absolute;"
        >Toggle Action bar</calcite-tooltip
      >
    </calcite-action-bar>
  </div>`;

export const floatingDarkModeRTL = (): string =>
  html`<div style="padding:20px;">
    <calcite-action-bar floating position="start" dir="rtl" class="calcite-mode-dark">
      <calcite-action-group>
        <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
        <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>`;

floatingDarkModeRTL.parameters = { themes: modesDarkDefault };

export const horizontal = (): string => html`
  <div style="width: 500px;">
    <calcite-action-bar layout="horizontal" style="width:100%">
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
      <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
      <!-- The "bottom-actions" slot is deprecated -->
      <calcite-action slot="bottom-actions" text="hello world 2" icon="information"> </calcite-action>
    </calcite-action-bar>
  </div>
`;

export const horizontalSmall = (): string => html`
  <div style="width: 250px;">
    <calcite-action-bar layout="horizontal" style="width:100%">
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
      <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
      <!-- The "bottom-actions" slot is deprecated -->
      <calcite-action slot="bottom-actions" text="hello world 2" icon="information"> </calcite-action>
    </calcite-action-bar>
  </div>
`;

export const horizontalOverflow_TestOnly = (): string => html`
  <div style="width: 500px; display:flex;">
    <calcite-action-bar layout="horizontal" expand-disabled style="flex:1;">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Help" icon="question"></calcite-action>
        <calcite-action
          text-enabled
          text="Wide action with a super long title that is unreasonable in my opinion"
          icon="banana"
        ></calcite-action>
        <calcite-action
          text-enabled
          text="Wide action with a super long title that is unreasonable in my opinion"
          icon="banana"
        ></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
`;

export const withDefinedWidths = (): string => html`
  <style>
    calcite-action-bar {
      --calcite-action-bar-expanded-max-width: 150px;
    }
  </style>
  <calcite-action-bar expanded>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Add to my custom action bar application" icon="plus"></calcite-action>
      <calcite-action text-enabled text="Save to my custom action bar application" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Layers in my custom action bar application" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
`;

export const gridLayout = (): string =>
  html`<div style="padding:20px;">
    <calcite-action-bar layout="grid" expand-disabled overflow-actions-disabled floating>
      <calcite-action-group>
        <calcite-action text="Northwest" icon="chevron-up-left"></calcite-action>
        <calcite-action text="North" icon="chevron-up"></calcite-action>
        <calcite-action text="Northeast" icon="chevron-up-right"></calcite-action>
        <calcite-action text="West" icon="chevron-left"></calcite-action>
        <calcite-action text="Center" icon="gps-on"></calcite-action>
        <calcite-action text="East" icon="chevron-right"></calcite-action>
        <calcite-action text="Southwest" icon="chevron-down-left"></calcite-action>
        <calcite-action text="South" icon="chevron-down"></calcite-action>
        <calcite-action text="Southeast" icon="chevron-down-right"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-action-bar position="start" dir="rtl" class="calcite-mode-dark">
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const adjacentTooltipsOpenQuickly = (): string => html`
  <div style="display:flex; height:500px; width: 200px;">
    <calcite-action-bar>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus">
          <calcite-tooltip placement="right" slot="tooltip">Add</calcite-tooltip>
        </calcite-action>
        <calcite-action text="Save" icon="save"
          ><calcite-tooltip placement="right" slot="tooltip">Save</calcite-tooltip></calcite-action
        >
        <calcite-action text="Layers" icon="layers"
          ><calcite-tooltip placement="right" slot="tooltip">Layers</calcite-tooltip></calcite-action
        >
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"
          ><calcite-tooltip placement="right" slot="tooltip">Add</calcite-tooltip></calcite-action
        >
        <calcite-action text="Save" active icon="save"
          ><calcite-tooltip placement="right" slot="tooltip">Save</calcite-tooltip></calcite-action
        >
        <calcite-action text="Layers" icon="layers"
          ><calcite-tooltip placement="right" slot="tooltip">Layers</calcite-tooltip></calcite-action
        >
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers"
        ><calcite-tooltip placement="right" slot="tooltip">hello world</calcite-tooltip></calcite-action
      >
    </calcite-action-bar>
  </div>
`;

export const hebrewLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="he">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const norwegianLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="nb">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const FrenchLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="fr">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const hongKongLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="zh-HK">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const ukrainianLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="uk">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const bosnianLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="bs">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const fullWidthActions = (): string => html`
  <style>
    .container {
      display: flex;
      flex-flow: column;
      width: 800px;
      margin-block: 2rem;
    }
  </style>
  <div class="container">
    <calcite-action-bar layout="horizontal">
      <calcite-action text="Add" icon="plus" width="full"> </calcite-action>
    </calcite-action-bar>
  </div>
`;
