import { disabled } from "../../tests/commonTests";
import { newProgrammaticE2EPage } from "../../tests/utils";
import { numberStringFormatter } from "../../utils/locale";

describe("calcite-date-picker-day", () => {
  it("can be disabled", async () => {
    numberStringFormatter.numberFormatOptions = {
      locale: "ar",
      numberingSystem: "arab",
      useGrouping: false
    };

    const page = await newProgrammaticE2EPage();
    await page.evaluate(() => {
      const dateEl = document.createElement("calcite-date-picker-day") as HTMLCalciteDatePickerDayElement;
      dateEl.active = true;
      dateEl.day = 3;
      document.body.append(dateEl);
    });
    await page.waitForChanges();

    return disabled({ tag: "calcite-date-picker-day", page });
  });
});
