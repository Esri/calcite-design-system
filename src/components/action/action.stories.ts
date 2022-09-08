import { boolean, select, text } from "@storybook/addon-knobs";
import {
  Attribute,
  filterComponentAttributes,
  Attributes,
  createComponentHTML as create,
  themesDarkDefault
} from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { iconNames, storyFilters } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { alignment, scale } = ATTRIBUTES;

export default {
  title: "Components/Buttons/Action",
  parameters: {
    notes: readme
  },
  ...storyFilters()
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
        }
      },
      {
        name: "alignment",
        commit(): Attribute {
          this.value = select("alignment", alignment.values, alignment.defaultValue);
          delete this.build;
          return this;
        }
      },
      {
        name: "appearance",
        commit(): Attribute {
          this.value = select("appearance", ["solid", "clear"], "solid");
          delete this.build;
          return this;
        }
      },
      {
        name: "compact",
        commit(): Attribute {
          this.value = boolean("compact", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "disabled",
        commit(): Attribute {
          this.value = boolean("disabled", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "icon",
        commit(): Attribute {
          this.value = select("icon", ["", ...iconNames], "banana");
          delete this.build;
          return this;
        }
      },
      {
        name: "indicator",
        commit(): Attribute {
          this.value = boolean("indicator", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "label",
        commit(): Attribute {
          this.value = text("label", "Label");
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
        name: "scale",
        commit(): Attribute {
          this.value = select("scale", scale.values, scale.defaultValue);
          delete this.build;
          return this;
        }
      },
      {
        name: "text",
        commit(): Attribute {
          this.value = text("text", "Text");
          delete this.build;
          return this;
        }
      },
      {
        name: "text-enabled",
        commit(): Attribute {
          this.value = boolean("textEnabled", true);
          delete this.build;
          return this;
        }
      },
      {
        name: "style",
        commit(): Attribute {
          this.value = boolean("textEnabled", true);
          delete this.build;
          return this;
        }
      }
    ],
    exceptions
  );
};

export const simple = (): string =>
  html`<div style="width: 150px">
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["icon"] }).concat([
        {
          name: "icon",
          value: "banana"
        }
      ])
    )}
  </div>`;

export const disabledAndCompact_TestOnly = (): string =>
  html`<div style="width: 150px">
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["compact", "disabled", "icon"] }).concat([
        { name: "compact", value: true },
        { name: "disabled", value: true }
      ])
    )}
  </div>`;

export const activeAndAppearanceClear_TestOnly = (): string =>
  html`<div style="width: 150px">
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["icon", "appearance", "active"] }).concat([
        { name: "appearance", value: "clear" },
        { name: "active", value: true }
      ])
    )}
  </div>`;

export const indicatorAndText_TestOnly = (): string =>
  html`<div style="width: 150px">
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["icon", "indicator", "textEnabled", "text"] }).concat([
        { name: "textEnabled", value: true },
        { name: "text", value: "Blah" },
        { name: "indicator", value: true }
      ])
    )}
  </div>`;

export const alignmentStartSmallScale_TestOnly = (): string =>
  html`<div style="width: 150px">
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["icon", "indicator", "textEnabled", "text", "alignment", "scale"] }).concat([
        { name: "textEnabled", value: true },
        { name: "text", value: "Blah" },
        { name: "indicator", value: true },
        { name: "alignment", value: "start" },
        { name: "scale", value: "s" }
      ])
    )}
  </div>`;

export const alignmentEndLargeScaleTextOverflow_TestOnly = (): string =>
  html`<div style="width: 150px">
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["icon", "indicator", "textEnabled", "text", "alignment", "scale"] }).concat([
        { name: "textEnabled", value: true },
        { name: "text", value: "Blah blah blah blah blah blah blah blah blah blah" },
        { name: "indicator", value: true },
        { name: "alignment", value: "end" },
        { name: "scale", value: "l" }
      ])
    )}
  </div>`;

export const arabicLocale_TestOnly = (): string => html`
  <calcite-action
    dir="rtl"
    icon="banana"
    lang="ar"
    locale="ar-EG"
    text="لكن لا بد أن أوضح لك أن كل"
    text-enabled
  ></calcite-action>
`;

export const darkThemeRTL_TestOnly = (): string =>
  html`<div style="width: 150px">
    ${create(
      "calcite-action",
      createAttributes({ exceptions: ["icon", "indicator", "textEnabled", "text", "class", "dir"] }).concat([
        { name: "textEnabled", value: true },
        { name: "text", value: "Blah" },
        { name: "indicator", value: true },
        { name: "class", value: "calcite-theme-dark" },
        { name: "dir", value: "rtl" }
      ])
    )}
  </div>`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };
