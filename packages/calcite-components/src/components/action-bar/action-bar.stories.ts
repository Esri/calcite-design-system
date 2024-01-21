import { boolean, select } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
import {
  Attribute,
  Attributes,
  createComponentHTML as create,
  filterComponentAttributes,
  modesDarkDefault,
} from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Action Bar",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  const { position } = ATTRIBUTES;

  return filterComponentAttributes(
    [
      {
        name: "expand-disabled",
        commit(): Attribute {
          this.value = boolean("expandDisabled", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "expanded",
        commit(): Attribute {
          this.value = boolean("expanded", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "position",
        commit(): Attribute {
          this.value = select("position", position.values, position.defaultValue);
          delete this.build;
          return this;
        },
      },
    ],
    exceptions,
  );
};

export const simple = (): string =>
  create(
    "calcite-action-bar",
    createAttributes(),
    html`
      <calcite-action-group>
        <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
        <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
      </calcite-action-group>
    `,
  );

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
          style="width:400px"
          text="Wide action with a super long title that is unreasonable in my opinion"
          icon="banana"
        ></calcite-action>
        <calcite-action
          style="width:400px"
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
    <calcite-action-group>
      <calcite-action text="Add to my custom action bar application" icon="plus"></calcite-action>
      <calcite-action text="Save to my custom action bar application" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers in my custom action bar application" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
`;

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-action-bar",
    createAttributes({ exceptions: ["dir", "class"] }).concat([
      {
        name: "dir",
        value: "rtl",
      },
      {
        name: "class",
        value: "calcite-mode-dark",
      },
    ]),
    html`
      <calcite-action-group>
        <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
        <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
      </calcite-action-group>
    `,
  );

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const adjacentTooltipsOpenQuickly = (): string =>
  html`<div style="display:flex; height:500px; width: 200px;">
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
  </div>`;

export const withTooltip_NoTest = (): string =>
  create(
    "calcite-action-bar",
    createAttributes(),
    html`
      <calcite-tooltip placement="bottom" slot="expand-tooltip">Expand</calcite-tooltip>
      <calcite-action text="Add" icon="plus"></calcite-action>
    `,
  );

withTooltip_NoTest.parameters = {
  chromatic: { disableSnapshot: true },
};

export const hebrewLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="he">
<calcite-action text="Information" icon="information"></calcite-action>
<calcite-action text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const norwegianLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="nb">
<calcite-action text="Information" icon="information"></calcite-action>
<calcite-action text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const FrenchLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="fr">
<calcite-action text="Information" icon="information"></calcite-action>
<calcite-action text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const hongKongLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="zh-HK">
<calcite-action text="Information" icon="information"></calcite-action>
<calcite-action text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const ukrainianLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="uk">
<calcite-action text="Information" icon="information"></calcite-action>
<calcite-action text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;

export const bosnianLocale_TestOnly = (): string => `<calcite-action-bar expanded lang="bs">
<calcite-action text="Information" icon="information"></calcite-action>
<calcite-action text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`;
