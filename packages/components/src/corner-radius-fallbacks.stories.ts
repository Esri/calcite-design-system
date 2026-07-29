import { html } from "../support/formatting";
import { buttons } from "./custom-theme/button";
import { card } from "./custom-theme/card";
import { colorPicker } from "./custom-theme/color-picker";
import { datePicker } from "./custom-theme/date-picker";
import { inputNumber } from "./custom-theme/input-number";
import { inputText } from "./custom-theme/input-text";
import { inputTimePicker } from "./custom-theme/input-time-picker";
import { input } from "./custom-theme/input";
import { select } from "./custom-theme/select";
import { slider } from "./custom-theme/slider";
import { splitButton } from "./custom-theme/split-button";
import { table } from "./custom-theme/table";

const kitchenSink = () =>
  html`<div style="--calcite-corner-radius: 24px; padding: 1rem;">
    <style>
      .fallback-grid {
        display: grid;
        gap: 1rem;
      }

      .fallback-row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 1rem;
      }

      .fallback-row > * {
        flex: 0 0 auto;
      }

      .fallback-card {
        inline-size: 260px;
      }
    </style>

    <div class="fallback-grid">
      <div class="fallback-row">${buttons}</div>

      <div class="fallback-row fallback-card">${card}</div>

      <div class="fallback-row">${colorPicker} ${datePicker} ${inputNumber}</div>

      <div class="fallback-row">${inputText} ${inputTimePicker} ${input} ${select}</div>

      <div class="fallback-row">${slider}</div>

      <div class="fallback-row">${splitButton}</div>

      <div class="fallback-row">${table}</div>
    </div>
  </div>`;

export default {
  title: "Theming/Corner Radius Fallbacks",
};

export const cornerRadiusFallbacks = (): string => {
  return kitchenSink();
};
