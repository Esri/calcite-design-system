import { select, text, boolean } from "@storybook/addon-knobs";

import {
  Attribute,
  filterComponentAttributes,
  Attributes,
  createComponentHTML as create,
  themesDarkDefault
} from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { locales } from "../../utils/locale";
import { createSteps, setKnobs, stepStory, storyFilters } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { scale } = ATTRIBUTES;

export default {
  title: "Components/Controls/DatePicker",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes(
    [
      {
        name: "dir",
        commit(): Attribute {
          this.value = text("dir", "");
          delete this.build;
          return this;
        }
      },
      {
        name: "end",
        commit(): Attribute {
          this.value = text("end", "");
          delete this.build;
          return this;
        }
      },
      {
        name: "intl-next-month",
        commit(): Attribute {
          this.value = text("intl-next-month", "Next month");
          delete this.build;
          return this;
        }
      },
      {
        name: "intl-prev-month",
        commit(): Attribute {
          this.value = text("intl-prev-month", "Previous month");
          delete this.build;
          return this;
        }
      },
      {
        name: "locale",
        commit(): Attribute {
          this.value = select("locale", locales, "en");
          delete this.build;
          return this;
        }
      },
      {
        name: "max",
        commit(): Attribute {
          this.value = text("max", "");
          delete this.build;
          return this;
        }
      },
      {
        name: "min",
        commit(): Attribute {
          this.value = text("min", "");
          delete this.build;
          return this;
        }
      },
      {
        name: "next-month-label",
        commit(): Attribute {
          this.value = text("next-month-label", "");
          delete this.build;
          return this;
        }
      },
      {
        name: "prev-month-label",
        commit(): Attribute {
          this.value = text("prev-month-label", "");
          delete this.build;
          return this;
        }
      },
      {
        name: "range",
        commit(): Attribute {
          this.value = boolean("range", false);
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
        name: "start",
        commit(): Attribute {
          this.value = text("start", "");
          delete this.build;
          return this;
        }
      },
      {
        name: "value",
        commit(): Attribute {
          this.value = text("value", "2020-02-28");
          delete this.build;
          return this;
        }
      }
    ],
    exceptions
  );
};

export const simple = (): string =>
  html`<div style="width: 400px">${create("calcite-date-picker", createAttributes())}</div>`;

export const range = (): string =>
  html`<div style="width: 400px">
    ${create(
      "calcite-date-picker",
      createAttributes({ exceptions: ["end", "min", "range", "start"] }).concat([
        { name: "end", value: "2020-02-16" },
        { name: "min", value: "2016-08-09" },
        { name: "range", value: "true" },
        { name: "start", value: "2020-02-12" }
      ])
    )}
  </div>`;

export const rangeRTL_TestOnly = (): string =>
  html`<div style="width: 400px">
    ${create(
      "calcite-date-picker",
      createAttributes({ exceptions: ["end", "min", "range", "start", "dir"] }).concat([
        { name: "dir", value: "rtl" },
        { name: "end", value: "2020-02-16" },
        { name: "min", value: "2016-08-09" },
        { name: "range", value: "true" },
        { name: "start", value: "2020-02-12" }
      ])
    )}
  </div>`;

export const darkThemeRTL_TestOnly = (): string =>
  html`<div style="width: 400px">
    ${create(
      "calcite-date-picker",
      createAttributes({ exceptions: ["class", "dir"] }).concat([
        { name: "dir", value: "rtl" },
        { name: "class", value: "calcite-theme-dark" }
      ])
    )}
  </div>`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };

export const bgLocale_TestOnly = (): string =>
  html`<div style="width: 400px">
    ${create("calcite-date-picker", createAttributes({ exceptions: ["lang"] }).concat([{ name: "lang", value: "bg" }]))}
  </div>`;

export const ptPTLocale_TestOnly = (): string =>
  html`<div style="width: 400px">
    ${create(
      "calcite-date-picker",
      createAttributes({ exceptions: ["lang"] }).concat([{ name: "lang", value: "pt-PT" }])
    )}
  </div>`;

export const germanLocale_TestOnly = (): string =>
  html`<div style="width: 400px">
    ${create(
      "calcite-date-picker",
      createAttributes({ exceptions: ["lang", "value"] }).concat([
        { name: "lang", value: "de" },
        { name: "value", value: "2022-08-11" }
      ])
    )}
  </div>`;

export const spanishLocale_TestOnly = (): string =>
  html`<div style="width: 400px">
    ${create(
      "calcite-date-picker",
      createAttributes({ exceptions: ["lang", "value"] }).concat([
        { name: "lang", value: "es" },
        { name: "value", value: "2023-05-11" }
      ])
    )}
  </div>`;

export const norwegianLocale_TestOnly = (): string =>
  html`<div style="width: 400px">
    ${create(
      "calcite-date-picker",
      createAttributes({ exceptions: ["lang", "value"] }).concat([
        { name: "lang", value: "nb" },
        { name: "value", value: "2023-05-11" }
      ])
    )}
  </div>`;

export const britishLocale_TestOnly = (): string =>
  html`<div style="width: 400px">
    ${create(
      "calcite-date-picker",
      createAttributes({ exceptions: ["lang", "value"] }).concat([
        { name: "lang", value: "en-gb" },
        { name: "value", value: "2024-01-11" }
      ])
    )}
  </div>`;

export const chineseLocale_TestOnly = (): string =>
  html`<div style="width: 400px">
    ${create(
      "calcite-date-picker",
      createAttributes({ exceptions: ["lang", "value"] }).concat([
        { name: "lang", value: "zh-cn" },
        { name: "value", value: "2024-01-11" }
      ])
    )}
  </div>`;

export const arabLocaleNumberingSystem_TestOnly = (): string =>
  html`<div style="width: 400px">
    ${create(
      "calcite-date-picker",
      createAttributes({ exceptions: ["lang", "numberingSystem"] }).concat([
        { name: "lang", value: "ar" },
        { name: "numbering-system", value: "arab" }
      ])
    )}
  </div>`;

export const thaiLocaleNumberingSystem_TestOnly = (): string =>
  html`<div style="width: 400px">
    ${create(
      "calcite-date-picker",
      createAttributes({ exceptions: ["lang", "numberingSystem"] }).concat([
        { name: "lang", value: "th" },
        { name: "numbering-system", value: "thai" }
      ])
    )}
  </div>`;

export const interactions_TestOnly = stepStory(
  (): string => html`<div style="width: 400px">${create("calcite-date-picker", createAttributes())}</div>`,
  createSteps("calcite-date-picker")
    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--simple",
        knobs: [{ name: "value", value: "2022-03-15" }]
      })
    )
    .executeScript(
      `
      const datePicker = document.querySelector("calcite-date-picker");
      datePicker.maxAsDate = new Date(2022, 2, 18);
      datePicker.minAsDate = new Date(2022, 2, 10);
    `
    )
    .snapshot("set maxAsDate & minAsDate")
);
