import { html } from "../../support/formatting";
import "../components/icon/icon";
import "../components/segmented-control/segmented-control";
import "../components/segmented-control-item/segmented-control-item";

export const segmentedControl = html`<calcite-segmented-control scale="m" label-text="Label text" required>
  <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
  <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
  <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
  <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-segmented-control>`;
