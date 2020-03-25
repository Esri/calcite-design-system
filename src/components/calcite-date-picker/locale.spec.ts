import { localeToDate } from "./locale";

describe("locale", () => {
  describe("localeToDate", () => {
    it("correctly finds dates in multiple languages", async () => {
      const date = new Date("03-25-2020");
      console.log(localeToDate("25/03/2020", "es"))
      expect(localeToDate("03/25/2020", "bs"), date);
      expect(localeToDate("25/03/2020", "ca"), date);
      expect(localeToDate("25. 03. 2020", "cs"), date);
      expect(localeToDate("25.03.2020", "da"), date);
      expect(localeToDate("25.03.2020", "de"), date);
      expect(localeToDate("25/03/2020", "el"), date);
      expect(localeToDate("25/03/2020", "es"), date);
      expect(localeToDate("25.03.2020", "et"), date);
      expect(localeToDate("25.03.2020", "fi"), date);
      expect(localeToDate("25/03/2020", "fr"), date);
      expect(localeToDate("25.03.2020", "he"), date);
      expect(localeToDate("25. 03. 2020.", "hr"), date);
      expect(localeToDate("2020. 03. 25.", "hu"), date);
      expect(localeToDate("25/03/2020", "id"), date);
      expect(localeToDate("25/03/2020", "it"), date);
      expect(localeToDate("2020/03/25", "ja"), date);
      expect(localeToDate("2020. 03. 25.", "ko"), date);
      expect(localeToDate("2020-03-25", "lt"), date);
      expect(localeToDate("2020.03.25.", "lv"), date);
      expect(localeToDate("25-03-2020", "nl"), date);
      expect(localeToDate("25.03.2020", "nb"), date);
      expect(localeToDate("25.03.2020", "pl"), date);
      expect(localeToDate("25/03/2020", "pt-br"), date);
      expect(localeToDate("25/03/2020", "pt-pt"), date);
      expect(localeToDate("25.03.2020", "ro"), date);
      expect(localeToDate("25.03.2020", "ru"), date);
      expect(localeToDate("25.03.2020.", "sr"), date);
      expect(localeToDate("2020-03-25", "sv"), date);
      expect(localeToDate("25/03/3876", "th"), date);
      expect(localeToDate("25.03.2020", "tr"), date);
      expect(localeToDate("25.03.2020", "uk"), date);
      expect(localeToDate("25/03/2020", "vi"), date);
      expect(localeToDate("2020/03/25", "zh-cn"), date);
      expect(localeToDate("25/03/2020", "zh-hk"), date);
      expect(localeToDate("2020/03/25", "zh-tw"), date);
    });
    it("correctly handles right to left dates and arabic numerals", async () => {
      const date = new Date("03-25-2020");
      expect(localeToDate("٢٢‏/١١‏/٣٣٣٣", "ar-EG"), date);
    });
  });
});
