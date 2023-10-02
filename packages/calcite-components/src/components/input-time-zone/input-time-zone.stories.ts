import { select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

const storyDelayInMs = 250;

export default {
  title: "Components/Controls/InputTimeZone",
  parameters: {
    notes: readme,
    options: {
      timezone: "America/Los_Angeles",
    },
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-input-time-zone
    ${boolean("disabled", false)}
    mode="${select("mode", ["offset", "name"], "offset")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-input-time-zone>
`;

export const timeZoneNameMode_TestOnly = (): string => html`
  <calcite-input-time-zone mode="name" open></calcite-input-time-zone>
`;

timeZoneNameMode_TestOnly.parameters = {
  chromatic: { delay: storyDelayInMs },
};

export const initialNameSelected_TestOnly = (): string => html`
  <calcite-input-time-zone mode="name" value="America/Ciudad_Juarez"></calcite-input-time-zone>
`;

initialNameSelected_TestOnly.parameters = {
  chromatic: { delay: storyDelayInMs },
};

export const initialOffsetSelected_TestOnly = (): string => html`
  <calcite-input-time-zone value="-360"></calcite-input-time-zone>
`;

initialOffsetSelected_TestOnly.parameters = {
  chromatic: { delay: storyDelayInMs },
};

export const offsetAndGroupLabelsAreLocalized_TestOnly = (): string => html`
  <calcite-input-time-zone lang="en"></calcite-input-time-zone>
  <calcite-input-time-zone lang="es"></calcite-input-time-zone>
  <calcite-input-time-zone lang="fr"></calcite-input-time-zone>
  <calcite-input-time-zone lang="zh"></calcite-input-time-zone>
`;

offsetAndGroupLabelsAreLocalized_TestOnly.parameters = {
  chromatic: { delay: storyDelayInMs },
};

export const offsetAndGroupLabelsBasedOnReferenceDate_TestOnly = (): string => html`
  <calcite-input-time-zone></calcite-input-time-zone>
  <calcite-input-time-zone reference-date="2023-11-28T06:31:19.129Z"></calcite-input-time-zone>
`;

offsetAndGroupLabelsBasedOnReferenceDate_TestOnly.parameters = {
  chromatic: { delay: storyDelayInMs },
};

export const displayingTimeZoneOffsets_TestOnly = (): string => html`
  <div style="width: 450px; height: 500px;">
    <calcite-input-time-zone open></calcite-input-time-zone>
  </div>
`;

displayingTimeZoneOffsets_TestOnly.parameters = {
  chromatic: { delay: storyDelayInMs },
};

export const disabled_TestOnly = (): string => html`<calcite-input-time-zone disabled></calcite-input-time-zone>`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-input-time-zone dir="rtl" class="calcite-mode-dark"></calcite-input-time-zone>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
