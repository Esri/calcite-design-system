import { boolean, text } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import {
  Attribute,
  Attributes,
  createComponentHTML as create,
  filterComponentAttributes,
  modesDarkDefault,
} from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import groupReadme from "../pick-list-group/readme.md";
import itemReadme from "../pick-list-item/readme.md";
import readme from "./readme.md";

export default {
  title: "Components/Pick List",
  parameters: {
    notes: [readme, itemReadme, groupReadme],
  },
  ...storyFilters(),
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
        },
      },
      {
        name: "filter-enabled",
        commit(): Attribute {
          this.value = boolean("filterEnabled", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "loading",
        commit(): Attribute {
          this.value = boolean("loading", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "multiple",
        commit(): Attribute {
          this.value = boolean("multiple", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "selection-follows-focus",
        commit(): Attribute {
          this.value = boolean("selection-follows-focus", false);
          delete this.build;
          return this;
        },
      },
    ],
    exceptions
  );
};

const action = html`
  <calcite-action
    slot="actions-end"
    label="click-me"
    onClick="console.log('clicked');"
    appearance="outline"
    scale="s"
    icon="information"
  ></calcite-action>
`;

export const simple = (): string =>
  create(
    "calcite-pick-list",
    createAttributes(),
    html`
      <calcite-pick-list-item label="T. Rex" description="arm strength impaired" value="trex">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item label="Triceratops" description="3 horn" value="triceratops" selected>
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item label="hi" description="there" value="helloWorld"> ${action} </calcite-pick-list-item>
    `
  );

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-pick-list",
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
      <calcite-pick-list-item label="T. Rex" description="arm strength impaired" value="trex">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item label="Triceratops" description="3 horn" value="triceratops" selected>
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item label="hi" description="there" value="helloWorld"> ${action} </calcite-pick-list-item>
    `
  );

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const grouped = (): string =>
  create(
    "calcite-pick-list",
    createAttributes(),
    html`
      <calcite-pick-list-group group-title="numbers" heading-level="${text("heading-level", "1")}">
        <calcite-pick-list-item label="one" description="fish" value="one" icon="grip">
          ${action}
        </calcite-pick-list-item>
        <calcite-pick-list-item label="two" description="fish" value="two" icon="grip">
          ${action}
        </calcite-pick-list-item>
      </calcite-pick-list-group>
      <calcite-pick-list-group group-title="colors" heading-level="${text("heading-level", "1")}">
        <calcite-pick-list-item label="red" description="fish" value="red" icon="grip">
          ${action}
        </calcite-pick-list-item>
        <calcite-pick-list-item label="blue" description="fish" value="blue" icon="grip">
          ${action}
        </calcite-pick-list-item>
      </calcite-pick-list-group>
    `
  );

export const nested = (): string =>
  create(
    "calcite-pick-list",
    createAttributes(),
    html`
      <calcite-pick-list-group>
        <calcite-pick-list-item label="All the dogs" value="all-dogs" slot="parent-item">
          ${action}
        </calcite-pick-list-item>
        <calcite-pick-list-item label="Husky" value="husky"> ${action} </calcite-pick-list-item>
        <calcite-pick-list-item label="Pomeranian" value="pom"> ${action} </calcite-pick-list-item>
        <calcite-pick-list-item label="Xoloitzcuintle" value="xolo"> ${action} </calcite-pick-list-item>
      </calcite-pick-list-group>
      <calcite-pick-list-group>
        <calcite-pick-list-item label="All the cats" value="all-cats" slot="parent-item">
          ${action}
        </calcite-pick-list-item>
        <calcite-pick-list-item label="Himalayan" value="himalayan"> ${action} </calcite-pick-list-item>
        <calcite-pick-list-item label="Persian" value="persian"> ${action} </calcite-pick-list-item>
        <calcite-pick-list-item label="Sphynx" value="sphynx"> ${action} </calcite-pick-list-item>
      </calcite-pick-list-group>
    `
  );

export const disabled_TestOnly = (): string => html`<calcite-pick-list disabled>
  <calcite-pick-list-item label="T. Rex" description="arm strength impaired" value="trex"></calcite-pick-list-item>
  <calcite-pick-list-item
    label="Triceratops"
    description="3 horn"
    value="triceratops"
    selected
  ></calcite-pick-list-item>
  <calcite-pick-list-item label="hi" description="there" value="helloWorld"></calcite-pick-list-item>
</calcite-pick-list>`;
