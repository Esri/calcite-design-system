import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { ActionBar } from "./action-bar";

const { position } = ATTRIBUTES;

type ActionBarStoryArgs = Pick<ActionBar, "expandDisabled" | "expanded" | "position">;

export default {
  title: "Components/Action Bar",
  args: {
    expandDisabled: false,
    expanded: false,
    position: position.defaultValue,
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

export const fullWidth = (): string => html`
  <div style="display: flex; flex-flow: column;width: 800px; margin-block: 2rem;">
    <calcite-action-bar layout="horizontal-fill" expanded>
      <calcite-action text="Add" icon="plus"> </calcite-action>
    </calcite-action-bar>
  </div>
`;
