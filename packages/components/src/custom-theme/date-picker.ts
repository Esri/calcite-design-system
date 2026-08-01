import { html } from "../../support/formatting";

export const datePickerTokens = {
  calciteDatePickerBorderColor: "",
  calciteDatePickerCornerRadius: "",
  calciteDatePickerRangeCalendarDividerColor: "",
  calciteDatePickerWeekHeaderTextColor: "",
  calciteDatePickerHeaderActionBackgroundColor: "",
  calciteDatePickerHeaderActionBackgroundColorHover: "",
  calciteDatePickerHeaderActionBackgroundColorPress: "",
  calciteDatePickerHeaderActionTextColor: "",
  calciteDatePickerHeaderActionTextColorPress: "",
  calciteDatePickerYearTextColor: "",
  calciteDatePickerMonthSelectFontSize: "",
  calciteDatePickerMonthSelectTextColor: "",
  calciteDatePickerMonthSelectIconColor: "",
  calciteDatePickerMonthSelectIconColorHover: "",
  calciteDatePickerDayBackgroundColor: "",
  calciteDatePickerDayBackgroundColorHover: "",
  calciteDatePickerDayTextColor: "",
  calciteDatePickerDayTextColorHover: "",
  calciteDatePickerCurrentDayTextColor: "",
  calciteDatePickerDayBackgroundColorSelected: "",
  calciteDatePickerDayTextColorSelected: "",
  calciteDatePickerDayRangeTextColor: "",
  calciteDatePickerDayRangeBackgroundColor: "",
  calciteDatePickerDayOutsideRangeBackgroundColorHover: "",
  calciteDatePickerDayOutsideRangeTextColorHover: "",
};

export const datePicker = html` <calcite-date-picker value="2020-11-27"></calcite-date-picker> `;

export const datePickerRange = html`
  <calcite-date-picker range></calcite-date-picker>
  <script>
    const datePicker = document.querySelector("calcite-date-picker[range]");
    datePicker.value = ["2025-01-01", "2025-02-20"];
  </script>
`;
