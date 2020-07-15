import { storiesOf } from '@storybook/html';
import { withKnobs, text, number, boolean, array } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('Single value', () => `
    <calcite-slider
      min="${number('min', 0)}"
      max="${number('max', 100)}"
      value="${number('value', 50)}"
      step="${number('step', 1)}"
      label="${text('label', 'Temperature')}"
      disabled="${boolean('disabled', false)}"
      label-handles="${boolean('label-handles', false)}"
      label-ticks="${boolean('label-ticks', false)}"
      ticks="${number('ticks', undefined)}
      page-step="${number('page-step', false)}"
      precise="${boolean('precise', false)}"
      snap="${boolean('snap', true)}"
    ></calcite-slider>
  `, { notes })
  .add('Range', () => `
    <calcite-slider
      min="${number('min', 0)}"
      min-label="${text('min-label', 'Temperature, lower bound')}"
      min-value="${number('min-value', 25)}"
      max="${number('max', 100)}"
      max-label="${text('max-label', 'Temperature, upper bound')}"
      max-value="${number('max-value', 75)}"
      step="${number('step', 1)}"
      label-handles="${boolean('label-handles', false)}"
      label-ticks="${boolean('label-ticks', false)}"
      ticks="${number('ticks', 20)}"
      precise="${boolean('precise', false)}"
      snap="${boolean('snap', true)}"
    ></calcite-slider>
  `, { notes })
  .add('Histogram', () => {
    const slider = document.createElement("calcite-slider");
    slider.min = number('min', 0)
    slider.minValue = number('min-value', 25)
    slider.max = number('max', 100)
    slider.maxValue = number('max-value', 75)
    slider.histogram = array('histogram', [
      [0, 0],
      [20, 12],
      [40, 25],
      [60, 55],
      [80, 10],
      [100, 0]
    ], "  ")
    return slider;
  }, { notes })
  .add('Dark mode', () => `
    <calcite-slider
      min="0"
      max="100"
      value="50"
      step="1"
      label="Temperature"
      theme="dark"
    ></calcite-slider>
  `, { notes, backgrounds: darkBackground });
