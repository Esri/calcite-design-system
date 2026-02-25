import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, it, expect } from "vitest";
import { renders } from "../../tests/commonTests/browser";
import { DateLocaleData } from "../date-picker/utils";
import { Action } from "../action/action";
import { DatePickerMonthHeader } from "./date-picker-month-header";

const setupDatePickerMonthHeader = async (el: DatePickerMonthHeader) => {
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
    numerals: "0123456789",
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
      narrow: ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
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

it("displays the correct scale for actions", async () => {
  const { el, reRender } = await mount("calcite-date-picker-month-header", {
    afterConnect: setupDatePickerMonthHeader,
  });

  const datePickerMonthHeader = el;
  const [prev, next] = el.shadowRoot.querySelectorAll<Action>(".chevron");

  const scales = ["s", "m", "l"] as const;

  for (const scale of scales) {
    datePickerMonthHeader.scale = scale;
    await reRender();
    expect(prev.scale).toBe(scale);
    expect(next.scale).toBe(scale);
  }
});
