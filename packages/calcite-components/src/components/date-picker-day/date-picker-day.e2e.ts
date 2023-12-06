import { E2EPage } from "@stencil/core/testing";
import { disabled } from "../../tests/commonTests";
import { newProgrammaticE2EPage } from "../../tests/utils";
import { DATE_PICKER_FORMAT_OPTIONS } from "../date-picker/resources";

describe("calcite-date-picker-day", () => {
  describe("disabled within a tree", () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newProgrammaticE2EPage();
      await page.evaluate(() => {
        const dateEl = document.createElement("calcite-date-picker-day") as HTMLCalciteDatePickerDayElement;
        dateEl.active = true;
        dateEl.dateTimeFormat = new Intl.DateTimeFormat("en"); // options not needed as this is only needed for rendering
        dateEl.day = 3;
        document.body.append(dateEl);
      });
      await page.waitForChanges();
    });

    disabled(() => ({ tag: "calcite-date-picker-day", page }));
  });

  describe("accessibility", () => {
    it("labels its associated day", async () => {
      const page = await newProgrammaticE2EPage();
      await page.evaluate((dateTimeFormatOptions: Intl.DateTimeFormatOptions) => {
        const dateEl = document.createElement("calcite-date-picker-day") as HTMLCalciteDatePickerDayElement;
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
