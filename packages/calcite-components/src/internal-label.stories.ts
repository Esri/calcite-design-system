import { html } from "../support/formatting";
import { autocomplete } from "./internal-label/autocomplete";
import { checkbox } from "./internal-label/checkbox";
import { combobox } from "./internal-label/combobox";
import { inputDatePicker } from "./internal-label/input-date-picker";
import { inputNumber } from "./internal-label/input-number";
import { inputText } from "./internal-label/input-text";
import { inputTimePicker } from "./internal-label/input-time-picker";
import { inputTimeZone } from "./internal-label/input-time-zone";
import { input } from "./internal-label/input";
import { radioButtonGroup } from "./internal-label/radio-button-group";
import { radioButton } from "./internal-label/radio-button";
import { rating } from "./internal-label/rating";
import { segmentedControl } from "./internal-label/segmented-control";
import { select } from "./internal-label/select";
import { slider } from "./internal-label/slider";
import { calciteSwitch } from "./internal-label/switch";
import { textArea } from "./internal-label/text-area";

const kitchenSink = () =>
  html`<div>
    <style>
      .demo {
        display: flex;
        align-items: flex-start;
        justify-items: space-between;
      }
      .demo-column {
        margin-right: 2rem;
      }
      .demo-row {
        display: flex;
        margin-bottom: 2rem;
      }
    </style>
    <div class="demo">
      <div class="demo-column">
        <div class="demo-row">${autocomplete}</div>

        <div class="demo-row">${checkbox}</div>

        <div class="demo-row">${combobox}</div>

        <div class="demo-row">${inputDatePicker}</div>

        <div class="demo-row">${inputNumber}</div>

        <div class="demo-row">${inputText}</div>

        <div class="demo-row">${inputTimePicker}</div>

        <div class="demo-row">${inputTimeZone}</div>

        <div class="demo-row">${input}</div>
      </div>

      <div class="demo-column">
        <div class="demo-row">${radioButtonGroup}</div>

        <div class="demo-row">${radioButton}</div>

        <div class="demo-row">${rating}</div>

        <div class="demo-row">${segmentedControl}</div>

        <div class="demo-row">${select}</div>

        <div class="demo-row">${slider}</div>

        <div class="demo-row">${calciteSwitch}</div>

        <div class="demo-row">${textArea}</div>
      </div>
    </div>
  </div>`;

export default {
  title: "Forms/Internal label",
};

export const themingInteractive = (): string => {
  return kitchenSink();
};
