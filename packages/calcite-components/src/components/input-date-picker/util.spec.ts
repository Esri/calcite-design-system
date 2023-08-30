import { isTwoDigitYear, normalizeToCurrentCentury } from "./utils";

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
      expect(normalizeToCurrentCentury(20)).toEqual(2020);
      expect(normalizeToCurrentCentury(0)).toBe(2000);
      expect(normalizeToCurrentCentury(1)).toBe(2001);
    });
  });
});
