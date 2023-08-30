import { isTwoDigitYear } from "./utils";

describe("utils", () => {
  describe("isTwoDigitYear", () => {
    it("returns whether a given ISO string date has two digit year", () => {
      expect(isTwoDigitYear("2023-08-01")).toBe(false);
      expect(isTwoDigitYear("00-08-01")).toBe(true);
      expect(isTwoDigitYear("")).toBe(false);
    });
  });

  describe("normalizedYear", () => {
    it("return normalized date for a given ISO string date with two digit year", () => {
      expect(normalizeToCurrentCentury("20-08-01")).toEqual("2020-08-01");
      expect(normalizeToCurrentCentury("00-08-01")).toBe("2000-08-01");
      expect(normalizeToCurrentCentury("1-08-01")).toBe("2001-08-01");
      expect(normalizeToCurrentCentury("")).toBe("");
    });
  });
});
