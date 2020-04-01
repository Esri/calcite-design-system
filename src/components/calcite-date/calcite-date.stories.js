import { storiesOf } from '@storybook/html';
import { withKnobs, select, text } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

const locales = ["ar-EG", "en-US", "es-es", "de", "th"];

storiesOf('Date', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <calcite-date
      value="${text("value", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      next-month-label="${text("next-month-label", "Next month")}"
      prev-month-label="${text("prev-month-label", "Previous month")}"
    ></calcite-date>
  `, { notes })
  .add('Dark mode', () => `
    <calcite-date
      theme="dark"
      value="${text("value", "")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en-US")}"
      next-month-label="${text("next-month-label", "Next month")}"
      prev-month-label="${text("prev-month-label", "Previous month")}"
    ></calcite-date>
`, { notes, backgrounds: darkBackground });