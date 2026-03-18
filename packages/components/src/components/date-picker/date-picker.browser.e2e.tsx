import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, focusable, hidden, renders, t9n } from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(
    () => mount("calcite-date-picker"),
    [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "calendars",
        defaultValue: 2,
      },
      {
        propertyName: "monthStyle",
        defaultValue: "wide",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-date-picker"));
});

describe("renders", () => {
  renders(() => mount("calcite-date-picker"), { display: "inline-block" });
});

describe("focusable", () => {
  focusable(() => mount("calcite-date-picker"), {
    shadowFocusTargetSelector: "calcite-date-picker-month",
  });
});

describe("translation support", () => {
  t9n(() => mount("calcite-date-picker"));
});

describe("range calendars", () => {
  it("does not hide adjacent-month days when set to one calendar", async () => {
    const { el } = await mount<"calcite-date-picker">("calcite-date-picker", {
      afterConnect: (element) => {
        element.range = true;
        element.calendars = 1;
        element.value = ["2024-01-15", ""];
      },
    });

    const hiddenAdjacentMonthDays =
      el.shadowRoot
        ?.querySelector("calcite-date-picker-month")
        ?.shadowRoot?.querySelectorAll("calcite-date-picker-day.noncurrent") ?? [];

    expect(hiddenAdjacentMonthDays.length).toBe(0);
  });
});
