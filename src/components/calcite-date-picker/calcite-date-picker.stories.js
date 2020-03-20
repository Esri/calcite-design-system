import { storiesOf } from '@storybook/html';
import { withKnobs, select, text } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Date', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <calcite-date-picker
      value="${text("value", "12/8/2019")}"
      min="${text("min", "08/09/2019")}"
      max="${text("max", "12/18/2021")}"
      locale="${text("locale", "en-US")}"
      start-of-week="${select("start-of-week", {"0: Sunday": 0, "1: Monday": 1, "2: Tuesday": 2, "3: Wednesday": 3, "4: Thursday": 4, "5: Friday": 5, "6: Saturday": 6}, 0)}"
      next-month-label="${text("next-month-label", "Next month")}"
      prev-month-label="${text("prev-month-label", "Previous month")}"
    ></calcite-date-picker>
  `, { notes })
  .add('Dark mode', () => `
    <calcite-date-picker
      theme="dark"
      value="${text("value", "12/8/2019")}"
      min="${text("min", "08/09/2019")}"
      max="${text("max", "12/18/2021")}"
      locale="${text("locale", "en-US")}"
      start-of-week="${select("start-of-week", {"0: Sunday": 0, "1: Monday": 1, "2: Tuesday": 2, "3: Wednesday": 3, "4: Thursday": 4, "5: Friday": 5, "6: Saturday": 6}, 0)}"
      next-month-label="${text("next-month-label", "Next month")}"
      prev-month-label="${text("prev-month-label", "Previous month")}"
    ></calcite-date-picker>
`, { notes, backgrounds: darkBackground });