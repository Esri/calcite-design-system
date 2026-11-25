import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import { renders, scalePropagates } from "../../tests/common";
import type { Action } from "../action/action";
import { DateLocaleData } from "../date-picker/utils";
import { DatePickerMonthHeader } from "./date-picker-month-header";

const setupDatePickerMonthHeader = async (el: DatePickerMonthHeader["el"]) => {
  const messages = await import("../date-picker/assets/t9n/messages.json");
  const localeDataFixture: DateLocaleData = {
    "default-calendar": "gregorian",
    separator: "/",
    unitOrder: "DD/MM/YYYY",
    weekStart: 7,
    placeholder: "DD/MM/YYYY",
    days: {
      narrow: ["D", "L", "M", "M", "J", "V", "S"],
    },
    months: {
      abbreviated: [
        "ene.",
        "feb.",
        "mar.",
        "abr.",
        "may.",
        "jun.",
        "jul.",
        "ago.",
        "sept.",
        "oct.",
        "nov.",
        "dic.",
      ],
      wide: [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ],
    },
  };

  el.activeDate = new Date();
  el.localeData = localeDataFixture;
  el.messages = messages;
  el.monthStyle = "wide";
};

describe("renders", () => {
  renders(
    () =>
      mount("calcite-date-picker-month-header", {
        afterConnect: setupDatePickerMonthHeader,
      }),
    { display: "block" },
  );
});

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount<"calcite-date-picker-month-header">(<calcite-date-picker-month-header />, {
        ...mountOptions,
        afterConnect: async (el) => {
          await setupDatePickerMonthHeader(el);
          await mountOptions.afterConnect?.(el);
        },
      }),
    { targetSelector: ".chevron" },
  );
});

describe("month navigation", () => {
  it.each([
    {
      label: "before the minimum in the same month",
      activeDate: new Date(2025, 11, 1),
      min: new Date(2025, 11, 4),
      max: undefined,
      previousDisabled: true,
      nextDisabled: false,
    },
    {
      label: "after the maximum in the same month",
      activeDate: new Date(2026, 0, 20),
      min: undefined,
      max: new Date(2026, 0, 15),
      previousDisabled: false,
      nextDisabled: true,
    },
    {
      label: "before the minimum month",
      activeDate: new Date(2025, 11, 1),
      min: new Date(2026, 0, 10),
      max: undefined,
      previousDisabled: true,
      nextDisabled: false,
    },
    {
      label: "after the maximum month",
      activeDate: new Date(2026, 0, 20),
      min: undefined,
      max: new Date(2025, 11, 15),
      previousDisabled: false,
      nextDisabled: true,
    },
    {
      label: "within a single allowed month",
      activeDate: new Date(2025, 11, 10),
      min: new Date(2025, 11, 4),
      max: new Date(2025, 11, 15),
      previousDisabled: true,
      nextDisabled: true,
    },
  ])(
    "enables navigation toward valid months when the active date is $label",
    async ({ activeDate, min, max, previousDisabled, nextDisabled }) => {
      await mount("calcite-date-picker-month-header", {
        afterConnect: async (el) => {
          await setupDatePickerMonthHeader(el);
          el.activeDate = activeDate;
          el.min = min;
          el.max = max;
        },
      });

      await expect
        .element(page.getBySelector("calcite-action[aria-label='Previous month']"))
        .toHaveProperty("disabled", previousDisabled);
      await expect
        .element(page.getBySelector("calcite-action[aria-label='Next month']"))
        .toHaveProperty("disabled", nextDisabled);
    },
  );

  it("keeps focus on Previous when navigating back to the maximum month without a minimum", async () => {
    await mount("calcite-date-picker-month-header", {
      afterConnect: async (el) => {
        await setupDatePickerMonthHeader(el);
        el.activeDate = new Date(2026, 0, 20);
        el.max = new Date(2025, 11, 15);
        el.addEventListener("calciteInternalDatePickerMonthHeaderSelectChange", (event) => {
          el.activeDate = (event as CustomEvent<Date>).detail;
        });
      },
    });

    const previous = page.getBySelector("calcite-action[aria-label='Previous month']");
    const next = page.getBySelector("calcite-action[aria-label='Next month']");

    await expect.element(previous).toHaveProperty("disabled", false);
    await expect.element(next).toHaveProperty("disabled", true);

    await (previous.element() as Action["el"]).setFocus();
    const focusedPrevious = page.getBySelector(
      "calcite-action[aria-label='Previous month']:focus-within",
    );
    await expect.element(focusedPrevious).toBeInTheDocument();
    await userEvent.keyboard("{Enter}");

    await expect
      .element(page.getByRole("combobox", { name: "Month menu" }))
      .toHaveProperty("value", "diciembre");
    await expect.element(focusedPrevious).toBeInTheDocument();
    await expect.element(next).toHaveProperty("disabled", true);
  });
});
