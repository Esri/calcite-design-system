import { html } from "../support/formatting";
import { buttons } from "./custom-theme/button";
import { card } from "./custom-theme/card";
import { colorPicker } from "./custom-theme/color-picker";
import { defaultCombobox } from "./custom-theme/combobox";
import { datePicker } from "./custom-theme/date-picker";
import { inputNumber } from "./custom-theme/input-number";
import { inputText } from "./custom-theme/input-text";
import { inputTimePicker } from "./custom-theme/input-time-picker";
import { inputTimeZone } from "./custom-theme/input-time-zone";
import { input } from "./custom-theme/input";
import { menuItem } from "./custom-theme/menu-item";
import { select } from "./custom-theme/select";
import { segmentedControl } from "./custom-theme/segmented-control";
import { slider } from "./custom-theme/slider";
import { splitButton } from "./custom-theme/split-button";
import { table } from "./custom-theme/table";
import { tile } from "./custom-theme/tile";
import "./components/segmented-control/segmented-control";
import "./components/segmented-control-item/segmented-control-item";

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

      <div class="fallback-row">${inputText} ${inputTimePicker} ${inputTimeZone} ${input} ${select}</div>

      <div class="fallback-row">${defaultCombobox}</div>

      <div class="fallback-row">${segmentedControl}</div>

      <div class="fallback-row">
        <calcite-segmented-control>
          <calcite-segmented-control-item value="alpha" checked>Alpha</calcite-segmented-control-item>
          <calcite-segmented-control-item value="beta">Beta</calcite-segmented-control-item>
        </calcite-segmented-control>
      </div>

      <div class="fallback-row">${tile}</div>

      <div class="fallback-row">${slider}</div>

      <div class="fallback-row">${splitButton}</div>

      <div class="fallback-row">${menuItem}</div>

      <div class="fallback-row">${table}</div>
    </div>
  </div>`;

export default {
  title: "Theming/Corner Radius Fallbacks",
};

export const cornerRadiusFallbacks = (): string => {
  return kitchenSink();
};
