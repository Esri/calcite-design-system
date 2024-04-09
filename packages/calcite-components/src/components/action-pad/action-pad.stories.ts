import { boolean, select } from "../../../.storybook/fake-knobs";
import {
  Attributes,
  Attribute,
  filterComponentAttributes,
  createComponentHTML as create,
  modesDarkDefault,
} from "../../../.storybook/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Action Pad",
  parameters: {
    chromatic: {
      delay: 5000,
    },
  },
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  const { position } = ATTRIBUTES;

  return filterComponentAttributes(
    [
      {
        name: "expand-disabled",
        commit(): Attribute {
          this.value = boolean("expandDisabled", false, "", "prop");
          delete this.build;
          return this;
        },
      },
      {
        name: "expanded",
        commit(): Attribute {
          this.value = boolean("expanded", false, "", "prop");
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
    "calcite-action-pad",
    createAttributes(),
    html`
      <calcite-action-group>
        <calcite-action text="Undo" label="Undo Action" icon="undo"></calcite-action>
        <calcite-action text="Redo" label="Redo Action" icon="redo"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Delete" label="Delete Item" icon="trash"></calcite-action>
      </calcite-action-group>
    `,
  );

export const withDefinedWidths = (): string => html`
  <style>
    calcite-action-pad {
      --calcite-action-pad-expanded-max-width: 150px;
    }
  </style>
  <calcite-action-pad expanded>
    <calcite-action-group>
      <calcite-action text="Add to my custom action pad application" icon="plus"></calcite-action>
      <calcite-action text="Save to my custom action pad application" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers in my custom action pad application" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-pad>
`;

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-action-pad",
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

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const hebrewLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="he" layout="horizontal"> </calcite-action-pad>
  </div>`;

export const norwegianLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="nb" layout="horizontal"> </calcite-action-pad>
  </div>`;

export const spanishLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="es" layout="horizontal"> </calcite-action-pad>
  </div>`;

export const taiwanLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="zh-TW" layout="horizontal"> </calcite-action-pad>
  </div>`;

export const russianLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="ru" layout="horizontal"> </calcite-action-pad>
  </div>`;

export const romanianMoldovaLocale_TestOnly = (): string =>
  html`<div style="width:400px">
    <calcite-action-pad expanded lang="ro-mo" layout="horizontal"> </calcite-action-pad>
  </div>`;
