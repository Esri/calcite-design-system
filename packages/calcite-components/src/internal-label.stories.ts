import { html } from "../support/formatting";

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
        <div class="demo-row">
          <calcite-autocomplete scale="m" label-text="Label text" required>
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-autocomplete>
        </div>

        <div class="demo-row">
          <calcite-checkbox name="m-unchecked" scale="m" label-text="Label text" required></calcite-checkbox>
        </div>

        <div class="demo-row">
          <calcite-combobox
            label="test"
            label-text="Label text"
            placeholder="select element"
            max-items="6"
            selection-mode="single"
            scale="m"
            required
          >
            <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
            <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
            <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-combobox>
        </div>

        <div class="demo-row">
          <calcite-input-date-picker scale="m" value="2023-03-07" label-text="Label text" required>
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-input-date-picker>
        </div>

        <div class="demo-row">
          <calcite-input-number
            placeholder="Placeholder"
            scale="m"
            value="123"
            step="1"
            label-text="Label text"
            required
          >
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-input-number>
        </div>

        <div class="demo-row">
          <calcite-input-text placeholder="Placeholder" scale="m" label-text="Label text" required>
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-input-text>
        </div>

        <div class="demo-row">
          <calcite-input-time-picker label-text="Label text" required scale="m" step="0.1" value="10:37:09.5"
            ><calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon
          ></calcite-input-time-picker>
        </div>

        <div class="demo-row">
          <calcite-input-time-zone scale="m" label-text="Label text" required
            ><calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon
          ></calcite-input-time-zone>
        </div>

        <div class="demo-row">
          <calcite-input type="text" placeholder="Placeholder" scale="m" label-text="Label text" required>
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-input>
        </div>
      </div>

      <div class="demo-column">
        <div class="demo-row">
          <calcite-radio-button-group scale="m" name="def-h-m" label-text="Label text" required>
            <calcite-radio-button value="stencil-def-m" checked label-text="Stencil"></calcite-radio-button>
            <calcite-radio-button value="react-def-m" label-text="React"></calcite-radio-button>
            <calcite-radio-button value="ember-def-m" label-text="Ember"></calcite-radio-button>
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-radio-button-group>
        </div>

        <div class="demo-row">
          <calcite-radio-button scale="m" label-text="Label text"></calcite-radio-button>
        </div>

        <div class="demo-row">
          <calcite-rating scale="m" label-text="Label text" required>
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-rating>
        </div>

        <div class="demo-row">
          <calcite-segmented-control scale="m" label-text="Label text" required>
            <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
            <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
            <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
            <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-segmented-control>
        </div>

        <div class="demo-row">
          <calcite-select label="calcite select" width="auto" scale="m" label-text="Label text" required>
            <calcite-option value="high">😃</calcite-option>
            <calcite-option value="medium">😶</calcite-option>
            <calcite-option value="low">😭</calcite-option>
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-select>
        </div>

        <div class="demo-row">
          <calcite-slider
            scale="m"
            min="10000"
            max="100000"
            value="100000"
            step="1000"
            label-text="Label text"
            required
          >
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-slider>
        </div>

        <div class="demo-row">
          <calcite-switch label-text-start="Label text start" label-text-end="Label text end"></calcite-switch>
        </div>

        <div class="demo-row">
          <calcite-text-area placeholder="add notes" scale="m" label-text="Label text" required>
            <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
          </calcite-text-area>
        </div>
      </div>
    </div>
  </div>`;

export default {
  title: "Internal label",
};

export const themingInteractive = (): string => {
  return kitchenSink();
};
