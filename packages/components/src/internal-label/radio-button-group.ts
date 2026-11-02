import { html } from "../../support/formatting";
import "../components/icon/icon";
import "../components/radio-button-group/radio-button-group";
import "../components/radio-button/radio-button";

export const radioButtonGroup = html`<calcite-radio-button-group
  scale="m"
  name="def-h-m"
  label-text="Label text"
  required
>
  <calcite-radio-button value="stencil-def-m" checked label-text="Stencil"></calcite-radio-button>
  <calcite-radio-button value="react-def-m" label-text="React"></calcite-radio-button>
  <calcite-radio-button value="ember-def-m" label-text="Ember"></calcite-radio-button>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-radio-button-group>`;
