import { boolean, select } from "@storybook/addon-knobs";
import { createComponentHTML as create, darkBackground, AttributeMap } from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { html } from "../../tests/utils";
const { dir, theme } = ATTRIBUTES;

export default {
  title: "App Components/Value List",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const createAttributeMap = (): AttributeMap => ({
  dir: () => select("dir", dir.values, dir.defaultValue),
  disabled: () => boolean("disabled", false),
  "drag-enabled": () => boolean("dragEnabled", false),
  "filter-enabled": () => boolean("filterEnabled", false),
  loading: () => boolean("loading", false),
  multiple: () => boolean("multiple", false),
  theme: () => select("theme", theme.values, theme.defaultValue)
});

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
    createAttributeMap(),
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
