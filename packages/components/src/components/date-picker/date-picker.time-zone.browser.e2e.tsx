import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import type { DatePicker } from "./date-picker";

describe("min and max", () => {
  it("updates minAsDate and maxAsDate to local midnight when min and max change", async () => {
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker max="2024-11-15" min="2022-11-15" value="2022-11-27" />,
    );

    el.min = "2021-11-15";
    el.max = "2023-11-15";
    await component.updateComplete;

    expect(el.minAsDate).toEqual(new Date(2021, 10, 15));
    expect(el.maxAsDate).toEqual(new Date(2023, 10, 15));
  });
});

describe("cross-century date values", () => {
  it.each([2050, 1950, 1850, 1750])("selects a day in %i", async (year) => {
    const initialValue = `${year}-03-12`;
    const { el } = await mount<DatePicker>(<calcite-date-picker value={initialValue} />);

    expect(el.value).toBe(initialValue);

    await userEvent.click(
      page.getBySelector(`calcite-date-picker-day[current-month][id="${year}0307"]`),
    );

    expect(el.value).toBe(`${year}-03-07`);
  });
});
