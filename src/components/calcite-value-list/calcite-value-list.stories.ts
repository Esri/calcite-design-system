import { boolean, select } from "@storybook/addon-knobs";
import { Attributes, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { html } from "../../tests/utils";
const { dir, theme } = ATTRIBUTES;

export default {
  title: "Components/Value List",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const createAttributes: () => Attributes = () => [
  {
    name: "dir",
    value: select("dir", dir.values, dir.defaultValue)
  },
  {
    name: "disabled",
    value: boolean("disabled", false)
  },
  {
    name: "drag-enabled",
    value: boolean("dragEnabled", false)
  },
  {
    name: "filter-enabled",
    value: boolean("filterEnabled", false)
  },
  {
    name: "loading",
    value: boolean("loading", false)
  },
  {
    name: "multiple",
    value: boolean("multiple", false)
  },
  {
    name: "theme",
    value: select("theme", theme.values, theme.defaultValue)
  }
];

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
