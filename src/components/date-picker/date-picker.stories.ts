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
import { createSteps, setKnobs, setTheme, stepStory } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { scale } = ATTRIBUTES;

export default {
  title: "Components/Controls/DatePicker",

  parameters: {
    notes: readme
  }
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

export const Default = stepStory(
  (): string => html`<div style="width: 400px">${create("calcite-date-picker", createAttributes())}</div>`,

  createSteps("calcite-date-picker")
    .snapshot("Default")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: [{ name: "dir", value: "rtl" }]
      })
    )
    .snapshot("Default RTL")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: []
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Dark")

    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: [
          { name: "end", value: "2020-02-16" },
          { name: "min", value: "2016-08-09" },
          { name: "range", value: "true" },
          { name: "start", value: "2020-02-12" }
        ]
      })
    )
    .snapshot("Range")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: [
          { name: "dir", value: "rtl" },
          { name: "end", value: "2020-02-16" },
          { name: "min", value: "2016-08-09" },
          { name: "range", value: "true" },
          { name: "start", value: "2020-02-12" }
        ]
      })
    )
    .snapshot("Range RTL")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
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
    .snapshot(" set maxAsDate & minAsDate")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: [{ name: "locale", value: "bg" }]
      })
    )
    .snapshot("bg locale")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: [{ name: "locale", value: "pt-PT" }]
      })
    )
    .snapshot("pt-PT locale")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: [{ name: "locale", value: "ru" }]
      })
    )
    .snapshot("ru locale")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: [{ name: "locale", value: "th" }]
      })
    )
    .snapshot("th locale (Buddhist calendar)")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: [
          { name: "locale", value: "de" },
          { name: "value", value: "2022-08-11" }
        ]
      })
    )
    .snapshot("german locale")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: [
          { name: "locale", value: "es" },
          { name: "value", value: "2023-05-11" }
        ]
      })
    )
    .snapshot("spanish locale")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: [
          { name: "locale", value: "nb" },
          { name: "value", value: "2023-05-11" }
        ]
      })
    )
    .snapshot("norwegian locale")

    .executeScript(
      setKnobs({
        story: "components-controls-datepicker--default",
        knobs: [
          { name: "locale", value: "en-gb" },
          { name: "value", value: "2024-01-11" }
        ]
      })
    )
    .snapshot("birtish english locale")
);
