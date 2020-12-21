import { createComponentHTML as create, darkBackground, AttributeMap } from "../../../.storybook/utils";
import { html } from "../../tests/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { boolean, select, text } from "@storybook/addon-knobs";
import selectReadme from "../calcite-select/readme.md";
import optionReadme from "../calcite-option/readme.md";
import optionGroupReadme from "../calcite-option-group/readme.md";

const createSelectAttributeMap = (): AttributeMap => {
  const group = "select";
  const { dir, theme } = ATTRIBUTES;

  return {
    dir: () => select("dir", dir.values, dir.defaultValue, group),
    disabled: () => boolean("disabled", false, group),
    theme: () => select("theme", theme.values, theme.defaultValue, group)
  };
};

const createOptionAttributeMap = (): AttributeMap => {
  const group = "option";

  return {
    disabled: () => boolean("disabled", false, group),
    label: () => text("label", "fancy label", group),
    selected: () => boolean("selected", false, group),
    value: () => text("value", "value", group)
  };
};

const createOptionGroupAttributeMap = (): AttributeMap => {
  const group = "option-group";

  return {
    label: () => text("label", "My fancy group label", group)
  };
};

export default {
  title: "Components/Select",
  parameters: {
    backgrounds: darkBackground,
    notes: {
      select: selectReadme,
      option: optionReadme,
      optionGroup: optionGroupReadme
    }
  }
};

export const basic = (): string =>
  create(
    "calcite-select",
    createSelectAttributeMap(),
    html`
      ${create("calcite-option", createOptionAttributeMap())}
      <calcite-option label="some fixed option" value="some-fixed-value"></calcite-option>
      <calcite-option label="another fixed option" value="another-fixed-value"></calcite-option>
    `
  );

export const grouped = (): string =>
  create(
    "calcite-select",
    createSelectAttributeMap(),
    html`
      ${create(
        "calcite-option-group",
        createOptionGroupAttributeMap(),
        html`
          ${create("calcite-option", createOptionAttributeMap())}
          <calcite-option label="some fixed option (A)" value="some-fixed-value-a"></calcite-option>
          <calcite-option label="another fixed option (A)" value="another-fixed-value-a"></calcite-option>
        `
      )}
      <calcite-option-group label="group B (fixed)">
        <calcite-option label="some fixed option (B)" value="some-fixed-value-b"></calcite-option>
        <calcite-option label="another fixed option (B)" value="another-fixed-value-b"></calcite-option>
      </calcite-option-group>
    `
  );
