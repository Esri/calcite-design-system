import { storiesOf } from "@storybook/html";
import { select, text, boolean } from "@storybook/addon-knobs";

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

storiesOf("Components/Date Picker", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    (): string => `
    <div style="width: 400px">
    <calcite-label layout="inline">
    Date
    <calcite-date-picker
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${text("value", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      intl-next-month="${text("intl-next-month", "Next month")}"
      intl-prev-month="${text("intl-prev-month", "Previous month")}"
    ></calcite-date-picker></calcite-label>
    </div>
  `
  )
  .add(
    "No input",
    (): string => `
    <div style="width: 400px">
    <calcite-date-picker
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${text("value", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      active
      intl-next-month="${text("intl-next-month", "Next month")}"
      intl-prev-month="${text("intl-prev-month", "Previous month")}"
    ></calcite-date-picker>
    </div>
  `
  )
  .add(
    "Dark mode",
    (): string => `
    <div style="width: 400px">
    <calcite-label layout="inline" theme="dark">
    Date
    <calcite-date-picker
      theme="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${text("value", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      intl-next-month="${text("intl-next-month", "Next month")}"
      intl-prev-month="${text("intl-prev-month", "Previous month")}"
      range="${boolean("range", false)}"
    ></calcite-date-picker></calcite-label>
    </div>
`,
    { backgrounds: darkBackground }
  )
  .add(
    "Range",
    (): string => `
    <div style="width: 400px">
    <calcite-date-picker
      scale="${select("scale", ["s", "m", "l"], "m")}"
      start="${text("start", "")}"
      end="${text("end", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      next-month-label="${text("next-month-label", "Next month")}"
      prev-month-label="${text("prev-month-label", "Previous month")}"
      range="${boolean("range", true)}"
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    ></calcite-date-picker>
    </div>
  `
  );
