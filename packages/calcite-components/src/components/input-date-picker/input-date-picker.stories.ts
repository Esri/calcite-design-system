import { boolean, select, text } from "@storybook/addon-knobs";
import { iconNames, storyFilters } from "../../../.storybook/helpers";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement, menuPlacements } from "../../utils/floating-ui";
import { locales } from "../../utils/locale";
import readme from "./readme.md";

export default {
  title: "Components/Controls/InputDatePicker",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <div style="width: 400px">
    <calcite-input-date-picker
      scale="${select("scale", ["s", "m", "l"], "m")}"
      status="${select("status", ["idle", "invalid", "valid"], "idle")}"
      value="${text("value", "2020-12-12")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      lang="${select("locale", locales, "en")}"
      placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
      message-text="${text("message-text", "")}"
      message-icon="${select("message-icon", ["", ...iconNames], "")}"
    ></calcite-input-date-picker
  </div>
`;

export const range = (): string => html`
  <div style="width: 400px">
    <calcite-input-date-picker
      scale="${select("scale", ["s", "m", "l"], "m")}"
      status="${select("status", ["idle", "invalid", "valid"], "idle")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      lang="${select("locale", locales, "en")}"
      next-month-label="${text("next-month-label", "Next month")}"
      prev-month-label="${text("prev-month-label", "Previous month")}"
      range="${boolean("range", true)}"
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
      message-text="${text("message-text", "")}"
      message-icon="${select("message-icon", ["", ...iconNames], "")}"
    ></calcite-input-date-picker>
  </div>
`;

export const disabled_TestOnly = (): string => html`<calcite-input-date-picker disabled></calcite-input-date-picker>`;

export const flipPlacements_TestOnly = (): string => html`
  <style>
    .my-input-date-picker-div {
      margin-top: 50px;
    }

    .my-input-date-picker {
      position: unset;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <div class="my-input-date-picker-div">
      <calcite-input-date-picker open class="my-input-date-picker" value="2020-02-12"></calcite-input-date-picker>
    </div>
  </div>
  <script>
    document.querySelector(".my-input-date-picker").flipPlacements = ["right"];
  </script>
`;

export const laoNumberingSystemAndMediumIconForLargeInput_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-input-date-picker
      open
      value="1/1/1"
      lang="zh-CN"
      numbering-system="laoo"
      scale="l"
      start="2020-12-12"
      end="2020-12-16"
      range=""
      layout="horizontal"
    ></calcite-input-date-picker>
  </div>
`;

export const readOnlyHasNoDropdownAffordance_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>
  </div>
`;

export const validationMessageAllScales_TestOnly = (): string => html`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="s"
      status="invalid"
      value="2020-12-12"
      message-text="Choose a more recent date"
      message-icon
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="m"
      status="invalid"
      value="2020-12-12"
      message-text="Choose a more recent date"
      message-icon
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="l"
      status="invalid"
      value="2020-12-12"
      message-text="Choose a more recent date"
      message-icon
    ></calcite-input-date-picker>
  </div>
`;

export const scales_TestOnly = (): string =>
  html`
    <style>
      .container {
        display: flex;
        flex-direction: column;
        width: 1400px;
        height: 1200px;
        gap: 400px;
      }

      .use-case {
        display: flex;
        gap: 100px;
      }
    </style>
    <div class="container">
      <div class="use-case">
        <calcite-input-date-picker scale="s" icon open value="2020-12-12"></calcite-input-date-picker>
        <calcite-input-date-picker scale="m" icon open value="2020-12-12"></calcite-input-date-picker>
        <calcite-input-date-picker scale="l" icon open value="2020-12-12"></calcite-input-date-picker>
      </div>
      <div class="use-case">
        <calcite-input-date-picker
          scale="s"
          open
          start="2020-12-12"
          end="2020-12-16"
          range
          layout="horizontal"
          value="2020-12-12"
        ></calcite-input-date-picker>
        <calcite-input-date-picker
          scale="m"
          open
          start="2020-12-12"
          end="2020-12-16"
          range
          layout="horizontal"
          value="2020-12-12"
        ></calcite-input-date-picker>
        <calcite-input-date-picker
          scale="l"
          open
          start="2020-12-12"
          end="2020-12-16"
          range
          layout="horizontal"
          value="2020-12-12"
        ></calcite-input-date-picker>
      </div>
    </div>
  `;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-input-date-picker
      class="calcite-mode-dark"
      dir="rtl"
      value="2020-12-12"
    ></calcite-input-date-picker
  </div>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const widthSetToBreakpoints_TestOnly = (): string =>
  createBreakpointStories(
    html`<calcite-input-date-picker scale="{scale}" value="2020-12-12"></calcite-input-date-picker>`
  );
