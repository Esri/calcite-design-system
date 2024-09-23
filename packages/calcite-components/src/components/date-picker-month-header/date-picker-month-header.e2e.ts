import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { focusable, renders } from "../../tests/commonTests";
import { DateLocaleData } from "../date-picker/utils";
import { ComponentTestContent } from "../../tests/commonTests/interfaces";
import { CSS } from "./resources";

describe("calcite-date-picker-month-header", () => {
  describe("renders", () => {
    renders("calcite-date-picker-month-header", { display: "block" });
  });

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

  async function setUpPage(page: E2EPage): Promise<void> {
    // intentionally using calcite-date-picker to wire up supporting components to be used in `evaluate` fn below
    await page.setContent(html`<calcite-date-picker></calcite-date-picker>`);
    await page.evaluate((localeData) => {
      const dateMonthHeader = document.createElement("calcite-date-picker-month-header");
      const now = new Date();
      dateMonthHeader.activeDate = now;
      dateMonthHeader.selectedDate = now;
      dateMonthHeader.localeData = localeData;
      dateMonthHeader.messages = {
        nextMonth: "Next month",
        prevMonth: "Previous month",
        monthMenu: "Month menu",
        yearMenu: "Year menu",
        year: "Year",
      };

      document.body.innerHTML = "";
      document.body.append(dateMonthHeader);
    }, localeDataFixture);
    await page.waitForChanges();
  }

  async function setUpProvider(): Promise<ComponentTestContent> {
    const page = await newE2EPage();
    await setUpPage(page);
    return {
      tag: "calcite-date-picker-month-header",
      page,
    };
  }

  describe("focusable", () => {
    focusable(() => setUpProvider(), {
      shadowFocusTargetSelector: `.${CSS.chevron}`,
    });
  });

  it("displays next/previous options", async () => {
    const page = await newE2EPage();
    await setUpPage(page);

    const [prev, next] = await page.findAll("calcite-date-picker-month-header >>> .chevron");

    expect(await prev.isVisible()).toBe(true);
    expect(await next.isVisible()).toBe(true);
  });

  it("should set the input aria-label to year", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-date-picker></calcite-date-picker>`);

    await page.evaluate((localeData) => {
      const dateMonthHeader = document.createElement("calcite-date-picker-month-header");
      const now = new Date();
      dateMonthHeader.activeDate = now;
      dateMonthHeader.selectedDate = now;
      dateMonthHeader.localeData = localeData;
      dateMonthHeader.messages = {
        nextMonth: "Next month",
        prevMonth: "Previous month",
        monthMenu: "Month menu",
        yearMenu: "Year menu",
        year: "Year",
      };

      document.body.innerHTML = "";
      document.body.append(dateMonthHeader);
    }, localeDataFixture);
    await page.waitForChanges();
    const date = await page.find(`calcite-date-picker-month-header >>> input`);

    expect(await date.getAttribute("aria-label")).toBe("Year");
  });
});
