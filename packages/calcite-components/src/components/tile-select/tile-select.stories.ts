import { boolean, select, text } from "@storybook/addon-knobs";
import { iconNames, storyFilters } from "../../../.storybook/helpers";
import {
  Attribute,
  Attributes,
  createComponentHTML as create,
  filterComponentAttributes,
} from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Tiles/Tile Select",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes(
    [
      {
        name: "checked",
        commit(): Attribute {
          this.value = boolean("checked", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "description",
        commit(): Attribute {
          this.value = text("description", "");
          delete this.build;
          return this;
        },
      },
      {
        name: "disabled",
        commit(): Attribute {
          this.value = boolean("disabled", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "heading",
        commit(): Attribute {
          this.value = text("heading", "");
          delete this.build;
          return this;
        },
      },
      {
        name: "hidden",
        commit(): Attribute {
          this.value = boolean("hidden", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "icon",
        commit(): Attribute {
          this.value = select("icon", ["", ...iconNames], "");
          delete this.build;
          return this;
        },
      },
      {
        name: "input-alignment",
        commit(): Attribute {
          this.value = select("input-alignment", ["start", "end"], "start");
          delete this.build;
          return this;
        },
      },
      {
        name: "input-enabled",
        commit(): Attribute {
          this.value = boolean("input-enabled", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "type",
        commit(): Attribute {
          this.value = select("type", ["radio", "checkbox"], "radio");
          delete this.build;
          return this;
        },
      },
      {
        name: "value",
        commit(): Attribute {
          this.value = text("value", "one");
          delete this.build;
          return this;
        },
      },
      {
        name: "width",
        commit(): Attribute {
          this.value = select("width", ["auto", "full"], "auto");
          delete this.build;
          return this;
        },
      },
    ],
    exceptions
  );
};

export const simple = (): string => html`${create("calcite-tile-select", createAttributes())}`;

export const checkbox_TestOnly = (): string =>
  html`<calcite-tile-select icon="check" heading="test" value="one" type="checkbox"></calcite-tile-select>`;

export const radio_TestOnly = (): string =>
  html`<calcite-tile-select icon="list-radio" heading="test" value="one" type="radio"></calcite-tile-select>`;

export const checkboxDarkModeRTL_TestOnly = (): string =>
  html`<calcite-tile-select
    class="calcite-mode-dark"
    dir="rtl"
    icon="check"
    heading="test"
    value="one"
    type="checkbox"
  ></calcite-tile-select>`;

export const radioDarkModeRTL_TestOnly = (): string =>
  html`<calcite-tile-select
    class="calcite-mode-dark"
    dir="rtl"
    icon="list-radio"
    heading="test"
    value="one"
    type="radio"
  ></calcite-tile-select>`;

export const checkboxWidthFull_TestOnly = (): string =>
  html`<calcite-tile-select
    icon="check"
    heading="test"
    value="one"
    type="checkbox"
    width="full"
  ></calcite-tile-select>`;

export const radioWidthFull_TestOnly = (): string =>
  html`<calcite-tile-select
    icon="list-radio"
    heading="test"
    value="one"
    type="radio"
    width="full"
  ></calcite-tile-select>`;
