import { without } from "es-toolkit";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { ActionBar } from "./action-bar";

const { position, selectionAppearance } = ATTRIBUTES;

type ActionBarStoryArgs = Pick<
  ActionBar,
  "expandDisabled" | "expanded" | "floating" | "position" | "selectionAppearance"
>;

export default {
  title: "Components/Action Bar",
  args: {
    expandDisabled: false,
    expanded: false,
    position: position.defaultValue,
    floating: false,
    selectionAppearance: selectionAppearance.values[2],
  },
  argTypes: {
    position: {
      options: position.values.filter((option) => option !== "top" && option !== "bottom"),
      control: { type: "select" },
    },
    selectionAppearance: {
      options: without(selectionAppearance.values, "icon", "border"),
      control: { type: "select" },
    },
  },
};

export const Simple = (args: ActionBarStoryArgs): string => html`
  <calcite-action-bar
    ${boolean("expand-disabled", args.expandDisabled)}
    ${boolean("expanded", args.expanded)}
    ${boolean("floating", args.floating)}
    position="${args.position}"
    selection-appearance="${args.selectionAppearance}"
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

export const Floating = (args: ActionBarStoryArgs): string =>
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

export const FloatingWithDefinedWidths = (): string => html`
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

export const FloatingWithGroups = (): string =>
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

export const FloatingDarkModeRTL = (): string =>
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

FloatingDarkModeRTL.parameters = { themes: modesDarkDefault };

export const Horizontal = (): string => html`
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
    </calcite-action-bar>
  </div>
`;

export const HorizontalSmall = (): string => html`
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
    </calcite-action-bar>
  </div>
`;

export const HorizontalOverflow = (): string => html`
  <div style="width: 450px; display:flex;">
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

export const WithDefinedWidths = (): string => html`
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

export const GridLayout = (): string =>
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

export const DarkModeRTL = (): string => html`
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

DarkModeRTL.parameters = { themes: modesDarkDefault };

export const AdjacentTooltipsOpenQuickly = (): string => html`
  <div style="display:flex; height:500px; width: 200px;">
    <calcite-action-bar>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" id="add"></calcite-action>
        <calcite-tooltip placement="right" reference-element="add">Add</calcite-tooltip>
        <calcite-action text="Save" icon="save" id="save"></calcite-action>
        <calcite-tooltip placement="right" reference-element="save">Save</calcite-tooltip>
        <calcite-action text="Layers" icon="layers" id="layers"></calcite-action>
        <calcite-tooltip placement="right" reference-element="layers">Layers</calcite-tooltip>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" id="add-2"></calcite-action>
        <calcite-tooltip placement="right" reference-element="add-2">Add</calcite-tooltip>
        <calcite-action text="Save" active icon="save" id="save-2"></calcite-action>
        <calcite-tooltip placement="right" reference-element="save-2">Save</calcite-tooltip>
        <calcite-action text="Layers" icon="layers" id="layers-2"></calcite-action>
        <calcite-tooltip placement="right" reference-element="layers-2">Layers</calcite-tooltip>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers" id="hello-world"></calcite-action>
      <calcite-tooltip placement="right" reference-element="hello-world">hello world</calcite-tooltip>
    </calcite-action-bar>
  </div>
`;

export const HebrewLocale = (): string => `<calcite-action-bar expanded lang="he">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const NorwegianLocale = (): string => `<calcite-action-bar expanded lang="nb">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const FrenchLocale = (): string => `<calcite-action-bar expanded lang="fr">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const HongKongLocale = (): string => `<calcite-action-bar expanded lang="zh-HK">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const UkrainianLocale = (): string => `<calcite-action-bar expanded lang="uk">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const BosnianLocale = (): string => `<calcite-action-bar expanded lang="bs">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const FullWidthActions = (): string => html`
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
      <calcite-action text="Remove" icon="minus" width="full"> </calcite-action>
      <calcite-action text="Copy" icon="plus" width="full"> </calcite-action>
    </calcite-action-bar>
  </div>
`;
