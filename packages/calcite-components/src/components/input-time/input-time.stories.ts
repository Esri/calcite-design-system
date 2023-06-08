import { number, select, text } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Controls/Input Time",

  parameters: {
    notes: readme
  }
};

export const Basic = (): string => html`
  <calcite-input-time
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    name="${text("name", "light")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "10:37")}"
  >
  </calcite-input-time>
`;

export const Variants = (): string => html`
  <div style="padding: 20px; display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr)">
    <calcite-label scale="s">
      Default
      <calcite-input-time scale="s"></calcite-input-time>
    </calcite-label>
    <calcite-label scale="m">
      Default
      <calcite-input-time scale="m"></calcite-input-time>
    </calcite-label>
    <calcite-label scale="l">
      Default
      <calcite-input-time scale="l"></calcite-input-time>
    </calcite-label>

    <calcite-label scale="s">
      Seconds
      <calcite-input-time scale="s" step="1"></calcite-input-time>
    </calcite-label>

    <calcite-label scale="m">
      Seconds
      <calcite-input-time scale="m" step="1"></calcite-input-time>
    </calcite-label>

    <calcite-label scale="l">
      Seconds
      <calcite-input-time scale="l" step="1"></calcite-input-time>
    </calcite-label>

    <calcite-label scale="s">
      24-hour
      <calcite-input-time scale="s" value="23:59" lang="fr"></calcite-input-time>
    </calcite-label>

    <calcite-label scale="m">
      24-hour
      <calcite-input-time scale="m" value="23:59" lang="fr"></calcite-input-time>
    </calcite-label>

    <calcite-label scale="l">
      24-hour
      <calcite-input-time scale="l" value="23:59" lang="fr"></calcite-input-time>
    </calcite-label>

    <calcite-label scale="s">
      24-hour seconds
      <calcite-input-time scale="s" value="23:59" lang="fr" step="1"></calcite-input-time>
    </calcite-label>

    <calcite-label scale="m">
      24-hour seconds
      <calcite-input-time scale="m" value="23:59" lang="fr" step="1"></calcite-input-time>
    </calcite-label>

    <calcite-label scale="l">
      24-hour seconds
      <calcite-input-time scale="l" value="23:59" lang="fr" step="1"></calcite-input-time>
    </calcite-label>

    <calcite-label scale="s">
      readonly
      <calcite-input-time scale="s" value="23:59" readonly></calcite-input-time>
    </calcite-label>

    <calcite-label scale="m">
      readonly
      <calcite-input-time scale="m" value="23:59" readonly></calcite-input-time>
    </calcite-label>

    <calcite-label scale="l">
      readonly
      <calcite-input-time scale="l" value="23:59" readonly></calcite-input-time>
    </calcite-label>

    <calcite-label scale="s">
      disabled
      <calcite-input-time scale="s" value="23:59" step="1" disabled></calcite-input-time>
    </calcite-label>

    <calcite-label scale="m">
      disabled
      <calcite-input-time scale="m" value="23:59" step="1" disabled></calcite-input-time>
    </calcite-label>

    <calcite-label scale="l">
      disabled
      <calcite-input-time scale="l" value="23:59" step="1" disabled></calcite-input-time>
    </calcite-label>
  </div>
`;
