import { E2EPage } from "@stencil/core/testing";
import { DateLocaleData } from "../date-picker/utils";
import { renders } from "../../tests/commonTests";
import { newProgrammaticE2EPage } from "../../tests/utils";
import { DatePickerMessages } from "../date-picker/assets/date-picker/t9n";

describe("calcite-date-picker-month-header", () => {
  const localeDataFixture = {
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
      abbreviated: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."],
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
  } as DateLocaleData;

  let page: E2EPage;
  let messages: DatePickerMessages;
  beforeEach(async () => {
    messages = await import(`../date-picker/assets/date-picker/t9n/messages.json`);
    page = await newProgrammaticE2EPage();
    await page.evaluate(
      (localeData, messages) => {
        const dateMonthHeader = document.createElement("calcite-date-picker-month-header");
        const now = new Date();
        dateMonthHeader.activeDate = now;
        dateMonthHeader.localeData = localeData;
        dateMonthHeader.messages = messages;
        dateMonthHeader.monthStyle = "wide";
        document.body.append(dateMonthHeader);
      },
      localeDataFixture,
      messages,
    );
    await page.waitForChanges();
  });

  renders(() => ({ tag: "calcite-date-picker-month-header", page }), { display: "block" });

  it("displays next/previous options", async () => {
    const [prev, next] = await page.findAll("calcite-date-picker-month-header >>> .chevron");
    expect(await prev.isVisible()).toBe(true);
    expect(await next.isVisible()).toBe(true);
  });

  it("should set the input aria-label to year", async () => {
    const yearInput = await page.find(`calcite-date-picker-month-header >>> input`);
    expect(yearInput.getAttribute("aria-label")).toBe(messages.year);
  });
});
