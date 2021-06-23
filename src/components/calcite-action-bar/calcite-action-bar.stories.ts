import { boolean, select, text } from "@storybook/addon-knobs";
import {
  Attributes,
  Attribute,
  filterComponentAttributes,
  createComponentHTML as create,
  darkBackground
} from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { html } from "../../tests/utils";
import { TEXT } from "./resources";

export default {
  title: "Components/Action Bar",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  const { dir, position, theme } = ATTRIBUTES;

  return filterComponentAttributes(
    [
      {
        name: "expand-disabled",
        commit(): Attribute {
          this.value = boolean("expandDisabled", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "expanded",
        commit(): Attribute {
          this.value = boolean("expanded", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "overflow-actions-disabled",
        commit(): Attribute {
          this.value = boolean("overflow-actions-disabled", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "dir",
        commit(): Attribute {
          this.value = select("dir", dir.values, dir.defaultValue);
          delete this.build;
          return this;
        }
      },
      {
        name: "intl-expand",
        commit(): Attribute {
          this.value = text("intlExpand", TEXT.expand);
          delete this.build;
          return this;
        }
      },
      {
        name: "intl-collapse",
        commit(): Attribute {
          this.value = text("intlCollapse", TEXT.collapse);
          delete this.build;
          return this;
        }
      },
      {
        name: "position",
        commit(): Attribute {
          this.value = select("position", position.values, position.defaultValue);
          delete this.build;
          return this;
        }
      },
      {
        name: "class",
        commit(): Attribute {
          this.value = select("class", theme.values, theme.defaultValue);
          delete this.build;
          return this;
        }
      }
    ],
    exceptions
  );
};

export const basic = (): string =>
  create(
    "calcite-action-bar",
    createAttributes(),
    html`
      <calcite-action-group layout="${select("group layout", ["horizontal", "vertical", "grid"], "vertical")}">
        <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
        <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
        <calcite-action text="Clear" label="Clear" icon="erase"></calcite-action>
      </calcite-action-group>
      <calcite-action-group layout="${select("group layout", ["horizontal", "vertical", "grid"], "vertical")}">
        <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
      </calcite-action-group>
    `
  );
  
  export const groupsWithGridLayout = (): string =>
    create(
      "calcite-action-bar",
      createAttributes({ exceptions: ["overflow-actions-disabled"]}).concat([
        {
          name: "overflow-actions-disabled",
          value: "true"
        }
      ]),
      html`
      <calcite-action-group layout="${select("group layout", ["vertical", "horizontal", "grid"], "grid")}" columns="${select("columns", ["1", "2", "3", "4", "5", "6"], "3")}">
        <calcite-action text="Undo" label="Undo Action" icon="undo"></calcite-action>
        <calcite-action text="Redo" label="Redo Action" icon="redo"></calcite-action>
        <calcite-action text="Erase" label="Erase" icon="erase"></calcite-action>
        <calcite-action text="Delete" label="Delete" icon="trash"></calcite-action>
        <calcite-action text="Open" label="Open" icon="folder-open"></calcite-action>
        <calcite-action text="Save" label="Save" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group layout="${select("group layout", ["vertical", "horizontal", "grid"], "grid")}" columns="${select("columns", ["1", "2", "3", "4", "5", "6"], "3")}">
        <calcite-action text="Title" label="Title" icon="title"></calcite-action>
        <calcite-action text="Bold" label="Bold" icon="bold"></calcite-action>
        <calcite-action text="Italicize" label="Italicize" icon="italicize"></calcite-action>
      </calcite-action-group>
      `
    );

export const darkThemeRTL = (): string =>
  create(
    "calcite-action-bar",
    createAttributes({ exceptions: ["dir", "class"] }).concat([
      {
        name: "dir",
        value: "rtl"
      },
      {
        name: "class",
        value: "calcite-theme-dark"
      }
    ]),
    html`
      <calcite-action-group>
        <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
        <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
      </calcite-action-group>
    `
  );

export const withTooltip = (): string =>
  create(
    "calcite-action-bar",
    createAttributes(),
    html`
      <calcite-tooltip placement="bottom" slot="expand-tooltip">Expand</calcite-tooltip>
      <calcite-action text="Add" icon="plus"></calcite-action>
    `
  );
