import { storiesOf } from "@storybook/html";
import { select, text } from "@storybook/addon-knobs";

import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

const locales = [
  "ar",
  "bs",
  "ca",
  "cs",
  "da",
  "de-CH",
  "de",
  "el",
  "en-AU",
  "en-CA",
  "en-GB",
  "en",
  "es-MX",
  "es",
  "et",
  "fi",
  "fr-CH",
  "fr",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it-CH",
  "it",
  "ja",
  "ko",
  "lt",
  "lv",
  "mk",
  "nb",
  "nl",
  "pl",
  "pt-PT",
  "pt",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW"
];

storiesOf("Components/Date", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    (): string => `
    <div style="width: 400px">
    <calcite-label layout="inline">
    Date
    <calcite-date
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${text("value", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      intl-next-month="${text("intl-next-month", "Next month")}"
      intl-prev-month="${text("intl-prev-month", "Previous month")}"
    ></calcite-date></calcite-label>
    </div>
  `
  )
  .add(
    "No input",
    (): string => `
    <div style="width: 400px">
    <calcite-date
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${text("value", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      active
      no-calendar-input
      intl-next-month="${text("intl-next-month", "Next month")}"
      intl-prev-month="${text("intl-prev-month", "Previous month")}"
    ></calcite-date>
    </div>
  `
  )
  .add(
    "Dark mode",
    (): string => `
    <div style="width: 400px">
    <calcite-label layout="inline" theme="dark">
    Date
    <calcite-date
      theme="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${text("value", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      intl-next-month="${text("intl-next-month", "Next month")}"
      intl-prev-month="${text("intl-prev-month", "Previous month")}"
    ></calcite-date></calcite-label>
    </div>
`,
    { backgrounds: darkBackground }
  );
