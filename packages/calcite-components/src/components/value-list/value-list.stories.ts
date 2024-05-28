import { boolean } from "../../../.storybook/fake-knobs";
import {
  Attribute,
  Attributes,
  createComponentHTML as create,
  filterComponentAttributes,
  modesDarkDefault,
} from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Value List",
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes(
    [
      {
        name: "disabled",
        commit(): Attribute {
          this.value = boolean("disabled", false, "", "prop");
          delete this.build;
          return this;
        },
      },
      {
        name: "drag-enabled",
        commit(): Attribute {
          this.value = boolean("dragEnabled", false, "", "prop");
          delete this.build;
          return this;
        },
      },
      {
        name: "filter-enabled",
        commit(): Attribute {
          this.value = boolean("filterEnabled", false, "", "prop");
          delete this.build;
          return this;
        },
      },
      {
        name: "loading",
        commit(): Attribute {
          this.value = boolean("loading", false, "", "prop");
          delete this.build;
          return this;
        },
      },
      {
        name: "multiple",
        commit(): Attribute {
          this.value = boolean("multiple", false, "", "prop");
          delete this.build;
          return this;
        },
      },
      {
        name: "selection-follows-focus",
        commit(): Attribute {
          this.value = boolean("selection-follows-focus", false, "", "prop");
          delete this.build;
          return this;
        },
      },
    ],
    exceptions,
  );
};

const action = html`
  <calcite-action
    slot="actions-end"
    label="click-me"
    onClick="console.log('clicked');"
    appearance="outline"
    scale="s"
    icon="ellipsis"
  ></calcite-action>
`;

export const simple = (): string => html`
  ${create(
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
    `,
  )}
`;

export const disabled_TestOnly = (): string => html`
  <calcite-value-list disabled>
    <calcite-value-list-item label="T. Rex" description="arm strength impaired" value="trex"></calcite-value-list-item>
    <calcite-value-list-item
      label="Triceratops"
      description="3 horn"
      value="triceratops"
      selected
    ></calcite-value-list-item>
    <calcite-value-list-item label="hi" description="there" value="helloWorld"></calcite-value-list-item>
  </calcite-value-list>
`;

export const darkModeRTL_TestOnly = (): string => html`
  ${create(
    "calcite-value-list",
    createAttributes({ exceptions: ["dir", "class"] }).concat([
      { name: "dir", value: "rtl" },
      { name: "class", value: "calcite-mode-dark" },
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
    `,
  )}
`;
darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
