import { newE2EPage } from "@stencil/core/testing";
import { dateToISO } from "./date";

describe("Date", () => {
  describe("dateToISO", () => {
    it("ISO string should consider local timezone", async () => {
      const page = await newE2EPage({
        html: "<calcite-date-picker></calcite-date-picker>"
      });
      await page.emulateTimezone("Europe/Berlin");
      await page.waitForChanges();
      const date = new Date(973724400000);
      expect(date.toISOString()).toEqual("2000-11-08T23:00:00.000Z");
      expect(dateToISO(date)).toEqual("2000-11-09");
    });
  });
});
