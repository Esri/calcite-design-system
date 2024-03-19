import { boolean, select, text } from "@storybook/addon-knobs";
import {
  Attribute,
  filterComponentAttributes,
  Attributes,
  createComponentHTML as create,
  modesDarkDefault,
} from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { iconNames, storyFilters } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { alignment, scale } = ATTRIBUTES;

export default {
  title: "Components/Buttons/Action",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes(
    [
      {
        name: "active",
        commit(): Attribute {
          this.value = boolean("active", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "alignment",
        commit(): Attribute {
          this.value = select("alignment", alignment.values, alignment.defaultValue);
          delete this.build;
          return this;
        },
      },
      {
        name: "appearance",
        commit(): Attribute {
          this.value = select("appearance", ["solid", "transparent"], "solid");
          delete this.build;
          return this;
        },
      },
      {
        name: "compact",
        commit(): Attribute {
          this.value = boolean("compact", false);
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
        name: "icon",
        commit(): Attribute {
          this.value = select("icon", ["", ...iconNames], "banana");
          delete this.build;
          return this;
        },
      },
      {
        name: "indicator",
        commit(): Attribute {
          this.value = boolean("indicator", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "label",
        commit(): Attribute {
          this.value = text("label", "Label");
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
        name: "scale",
        commit(): Attribute {
          this.value = select("scale", scale.values, scale.defaultValue);
          delete this.build;
          return this;
        },
      },
      {
        name: "text",
        commit(): Attribute {
          this.value = text("text", "Text");
          delete this.build;
          return this;
        },
      },
      {
        name: "text-enabled",
        commit(): Attribute {
          this.value = boolean("textEnabled", true);
          delete this.build;
          return this;
        },
      },
      {
        name: "style",
        commit(): Attribute {
          this.value = boolean("textEnabled", true);
          delete this.build;
          return this;
        },
      },
    ],
    exceptions,
  );
};

export const simple = (): string =>
  html`<div>
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["icon", "text"] }).concat([
        {
          name: "icon",
          value: "banana",
        },
        {
          name: "text",
          value: "",
        },
      ]),
    )}
  </div>`;

export const disabledAndCompactAndTextOnly_TestOnly = (): string =>
  html`<div>
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["compact", "disabled"] }).concat([
        { name: "compact", value: true },
        { name: "disabled", value: true },
      ]),
    )}
  </div>`;

export const activeAndAppearanceTransparent_TestOnly = (): string =>
  html`<div>
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["icon", "appearance", "active"] }).concat([
        { name: "active", value: true },
        { name: "icon", value: "banana" },
        { name: "appearance", value: "transparent" },
      ]),
    )}
  </div>`;

export const alignmentEndAndSmallScaleAndIndicator_TestOnly = (): string =>
  html`<div style="width: 300px">
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["icon", "indicator", "alignment", "scale"] }).concat([
        { name: "icon", value: "banana" },
        { name: "alignment", value: "end" },
        { name: "indicator", value: true },
        { name: "scale", value: "s" },
      ]),
    )}
  </div>`;

export const alignmentStartAndLargeScaleAndTextOverflow_TestOnly = (): string =>
  html`<div style="width: 150px">
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["icon", "text", "alignment", "scale"] }).concat([
        { name: "icon", value: "banana" },
        { name: "text", value: "Blah blah blah blah blah blah blah blah blah blah" },
        { name: "alignment", value: "start" },
        { name: "scale", value: "l" },
      ]),
    )}
  </div>`;

export const indicatorTextEnabled_TestOnly = (): string => html`
  <calcite-action indicator active text="click-me" text-enabled icon="gear"></calcite-action>
`;

export const indicatorTextEnabledNoIcon_TestOnly = (): string => html`
  <calcite-action indicator active text="click-me" text-enabled></calcite-action>
`;

export const indicatorNoTextEnabledNoIcon_TestOnly = (): string => html`
  <calcite-action indicator active text="click-me"></calcite-action>
`;

export const arabicLocale_TestOnly = (): string => html`
  <calcite-action
    dir="rtl"
    icon="banana"
    lang="ar"
    lang="ar-EG"
    text="لكن لا بد أن أوضح لك أن كل"
    text-enabled
  ></calcite-action>
`;

export const darkModeRTL_TestOnly = (): string =>
  html`<div>
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["icon", "class", "dir"] }).concat([
        { name: "icon", value: "banana" },
        { name: "class", value: "calcite-mode-dark" },
        { name: "dir", value: "rtl" },
      ]),
    )}
  </div>`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
