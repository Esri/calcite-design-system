import { storiesOf } from "@storybook/html";
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

const locales = [
  "ar",
  "ar-eg",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "es",
  "et",
  "fi",
  "fr",
  "he",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "lt",
  "lv",
  "nl",
  "nb",
  "pl",
  "pt-br",
  "pt-pt",
  "ro",
  "ru",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-cn",
  "zh-hk",
  "zh-tw"
];

storiesOf("Date", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <div style="width: 400px">
    <calcite-date
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${text("value", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      next-month-label="${text("next-month-label", "Next month")}"
      prev-month-label="${text("prev-month-label", "Previous month")}"
    ></calcite-date>
    </div>
  `,
    { notes }
  )
  .add(
    "No input",
    () => `
    <div style="width: 400px">
    <calcite-date
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${text("value", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      active
      no-calendar-input
      next-month-label="${text("next-month-label", "Next month")}"
      prev-month-label="${text("prev-month-label", "Previous month")}"
    ></calcite-date>
    </div>
  `,
    { notes }
  )
  .add(
    "Dark mode",
    () => `
    <div style="width: 400px">
    <calcite-date
      theme="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${text("value", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      next-month-label="${text("next-month-label", "Next month")}"
      prev-month-label="${text("prev-month-label", "Previous month")}"
    ></calcite-date>
    </div>
`,
    { notes, backgrounds: darkBackground }
  );
