import { describe, expect, it } from "vitest";
import { newProgrammaticE2EPage } from "../../tests/utils/puppeteer";
import { DATE_PICKER_FORMAT_OPTIONS } from "../date-picker/resources";

describe("calcite-date-picker-day", () => {
  describe("accessibility", () => {
    it("labels its associated day", async () => {
      const page = await newProgrammaticE2EPage();
      await page.evaluate((dateTimeFormatOptions: Intl.DateTimeFormatOptions) => {
        const dateEl = document.createElement("calcite-date-picker-day");
        dateEl.dateTimeFormat = new Intl.DateTimeFormat("en", dateTimeFormatOptions);
        dateEl.day = 20;
        dateEl.value = new Date("2020-02-20T08:00:00.000Z");
        document.body.append(dateEl);
      }, DATE_PICKER_FORMAT_OPTIONS);
      await page.waitForChanges();
      const day = await page.find(`calcite-date-picker-day`);

      expect(day.getAttribute("aria-label")).toBe("Thursday, February 20, 2020");
    });
  });
});
