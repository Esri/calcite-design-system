import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import type { InputDatePicker } from "./input-date-picker";

describe("cross-century date values", () => {
  it.each([2050, 1950, 1850])("preserves the century when selecting a day in %i", async (year) => {
    const initialValue = `${year}-03-12`;
    const { el } = await mount<InputDatePicker>(<calcite-input-date-picker value={initialValue} />);
    const input = page.getBySelector("calcite-input-date-picker calcite-input-text");

    await expect.element(el).toHaveValue(initialValue);

    await userEvent.click(input);
    await userEvent.click(
      page.getBySelector(
        `calcite-input-date-picker calcite-date-picker-day[current-month][id="${year}0307"]`,
      ),
    );

    await expect.element(el).toHaveValue(`${year}-03-07`);
    await expect.element(input).toHaveValue(`3/7/${year}`);
  });
});

describe("date constraints", () => {
  it("clamps an initial out-of-range value", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker max="2018-12-31" min="2018-01-01" value="2017-07-22" />,
    );

    await expect.element(el).toHaveValue("2018-01-01");
    await expect
      .element(page.getBySelector("calcite-input-date-picker calcite-input-text"))
      .toHaveValue("1/1/2018");
  });

  it("updates Date bounds to local midnight and clears them when attributes change", async () => {
    const { el, component } = await mount<InputDatePicker>(
      <calcite-input-date-picker max="2024-11-15" min="2022-11-15" value="2022-11-27" />,
    );

    el.min = "2021-11-15";
    el.max = "2023-11-15";
    await component.updateComplete;

    await expect.element(el).toHaveProperty("minAsDate", new Date(2021, 10, 15));
    await expect.element(el).toHaveProperty("maxAsDate", new Date(2023, 10, 15));

    el.min = undefined;
    el.max = undefined;
    await component.updateComplete;

    await expect.element(el).toHaveProperty("minAsDate", undefined);
    await expect.element(el).toHaveProperty("maxAsDate", undefined);
  });
});
