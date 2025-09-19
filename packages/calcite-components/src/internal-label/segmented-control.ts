import { html } from "../../support/formatting";

export const segmentedControl = html`<calcite-segmented-control scale="m" label-text="Label text" required>
  <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
  <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
  <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
  <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-segmented-control>`;
