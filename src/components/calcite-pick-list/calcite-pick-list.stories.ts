import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { Attributes, createComponentHTML as create, darkBackground, parseReadme } from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import dedent from "dedent";
const { dir, theme } = ATTRIBUTES;

export default {
  title: "app components|calcite-pick-list",
  decorators: [withKnobs, withA11y],
  parameters: {
    backgrounds: darkBackground,
    notes: parseReadme(readme)
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

const action = dedent`
  <calcite-action slot="secondary-action" label="click-me" onClick="console.log('clicked');" appearance="clear" scale="s" icon="information"></calcite-action>
`;

export const basic = (): string =>
  create(
    "calcite-pick-list",
    createAttributes(),
    dedent`
    <calcite-pick-list-item text-label="T. Rex" text-description="arm strength impaired" value="trex">
      ${action}
    </calcite-pick-list-item>
    <calcite-pick-list-item text-label="Triceratops" text-description="3 horn" value="triceratops" selected>
      ${action}
    </calcite-pick-list-item>
    <calcite-pick-list-item text-label="hi" text-description="there" value="helloWorld">
      ${action}
    </calcite-pick-list-item>
  `
  );

export const grouped = (): string =>
  create(
    "calcite-pick-list",
    createAttributes(),
    dedent`
    <calcite-pick-list-group text-group-title="numbers">
      <calcite-pick-list-item text-label="one" text-description="fish" value="one" icon="grip">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item text-label="two" text-description="fish" value="two" icon="grip">
        ${action}
      </calcite-pick-list-item>
    </calcite-pick-list-group>
    <calcite-pick-list-group text-group-title="colors">
      <calcite-pick-list-item text-label="red" text-description="fish" value="red" icon="grip">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item text-label="blue" text-description="fish" value="blue" icon="grip">
        ${action}
      </calcite-pick-list-item>
    </calcite-pick-list-group>
  `
  );

export const nested = (): string =>
  create(
    "calcite-pick-list",
    createAttributes(),
    dedent`
    <calcite-pick-list-group>
      <calcite-pick-list-item text-label="All the dogs" value="all-dogs" slot="parent-item">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item text-label="Husky" value="husky">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item text-label="Pomeranian" value="pom">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item text-label="Xoloitzcuintle" value="xolo">
        ${action}
      </calcite-pick-list-item>
    </calcite-pick-list-group>
    <calcite-pick-list-group>
      <calcite-pick-list-item text-label="All the cats" value="all-cats" slot="parent-item">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item text-label="Himalayan" value="himalayan">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item text-label="Persian" value="persian">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item text-label="Spynx" value="spynx">
        ${action}
      </calcite-pick-list-item>
    </calcite-pick-list-group>
  `
  );
