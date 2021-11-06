import { boolean } from "@storybook/addon-knobs";
import {
  Attribute,
  filterComponentAttributes,
  Attributes,
  createComponentHTML as create,
  themesDarkDefault
} from "../../../.storybook/utils";
import readme from "./readme.md";
import itemReadme from "../calcite-value-list-item/readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Value List",
  parameters: {
    notes: [readme, itemReadme]
  }
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes(
    [
      {
        name: "disabled",
        commit(): Attribute {
          this.value = boolean("disabled", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "drag-enabled",
        commit(): Attribute {
          this.value = boolean("dragEnabled", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "filter-enabled",
        commit(): Attribute {
          this.value = boolean("filterEnabled", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "loading",
        commit(): Attribute {
          this.value = boolean("loading", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "multiple",
        commit(): Attribute {
          this.value = boolean("multiple", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "selection-follows-focus",
        commit(): Attribute {
          this.value = boolean("selection-follows-focus", false);
          delete this.build;
          return this;
        }
      }
    ],
    exceptions
  );
};

const action = html`
  <calcite-action
    slot="actions-end"
    label="click-me"
    onClick="console.log('clicked');"
    appearance="clear"
    scale="s"
    icon="ellipsis"
  ></calcite-action>
`;

export const basic = (): string =>
  create(
    "calcite-value-list",
    createAttributes(),
    html`
      <calcite-value-list-item label="Dogs" description="Man's best friend" value="dogs">
        ${action}
      </calcite-value-list-item>
      <calcite-value-list-item label="Cats" description="Independent and fluffy" value="cats">
        ${action}
      </calcite-value-list-item>
      <calcite-value-list-item
        label="Fish. But not just any fish, a tiger fish caught live in the Atlantic Ocean while on vacation."
        description="Easy to care for."
        value="fish"
      >
        ${action}
      </calcite-value-list-item>
    `
  );

export const darkThemeRTL = (): string =>
  create(
    "calcite-value-list",
    createAttributes({ exceptions: ["dir", "class"] }).concat([
      { name: "dir", value: "rtl" },
      { name: "class", value: "calcite-theme-dark" }
    ]),
    html`
      <calcite-value-list-item label="Dogs" description="Man's best friend" value="dogs">
        ${action}
      </calcite-value-list-item>
      <calcite-value-list-item label="Cats" description="Independent and fluffy" value="cats">
        ${action}
      </calcite-value-list-item>
      <calcite-value-list-item
        label="Fish. But not just any fish, a tiger fish caught live in the Atlantic Ocean while on vacation."
        description="Easy to care for."
        value="fish"
      >
        ${action}
      </calcite-value-list-item>
    `
  );

darkThemeRTL.parameters = { themes: themesDarkDefault };
