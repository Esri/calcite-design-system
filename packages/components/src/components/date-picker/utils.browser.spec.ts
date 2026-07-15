import { afterEach, describe, expect, it } from "vitest";
import { dateLocaleDataCache, dateLocaleFormatterCache, getLocaleData } from "./utils";

describe(getLocaleData, () => {
  afterEach(() => {
    Object.keys(dateLocaleDataCache).forEach((key) => delete dateLocaleDataCache[key]);
    Object.keys(dateLocaleFormatterCache).forEach((key) => delete dateLocaleFormatterCache[key]);
  });

  it("defaults to en locale if the language code is invalid", () => {
    getLocaleData("invalid_locale");

    expect(dateLocaleDataCache).toHaveProperty("en");
  });

  it("falls back to the language if the regional code is invalid", () => {
    getLocaleData("es-UnsupportedRegion");

    expect(dateLocaleDataCache).toHaveProperty("es");
  });

  it("canonicalizes locale casing", () => {
    getLocaleData("zh-cn");

    expect(dateLocaleDataCache).toHaveProperty("zh-CN");
  });

  it("supports locales without a manually maintained allowlist", () => {
    const localeData = getLocaleData("de-AT");

    expect(localeData.months.wide).toHaveLength(12);
    expect(dateLocaleDataCache).toHaveProperty("de-AT");
  });

  it("uses Intl short weekdays as the temporary two-character weekday fallback", () => {
    const localeData = getLocaleData("en");

    expect(localeData.days.short).toBe(localeData.days.abbreviated);
  });

  it("derives calendar metadata from Intl", () => {
    const localeData = getLocaleData("en-GB");

    expect(localeData["default-calendar"]).toBe("gregorian");
    expect(localeData.separator).toBe("/");
    expect(localeData.unitOrder).toBe("DD/MM/YYYY");
    expect(localeData.weekStart).toBe(1);
    expect(localeData.placeholder).toBe("DD/MM/YYYY");
    expect(localeData.days.abbreviated).toHaveLength(7);
    expect(localeData.days.narrow).toHaveLength(7);
    expect(localeData.days.short).toHaveLength(7);
    expect(localeData.months.abbreviated).toHaveLength(12);
    expect(localeData.months.wide).toHaveLength(12);
    expect(localeData.year).toBeUndefined();
  });

  it("derives non-Gregorian years and year suffixes from Intl", () => {
    expect(getLocaleData("th")["default-calendar"]).toBe("buddhist");
    expect(getLocaleData("ko").year?.suffix).toBe("년");
  });

  it("creates and caches formatters only when their data is requested", () => {
    const localeData = getLocaleData("en");

    expect(dateLocaleFormatterCache).toEqual({});
    expect(localeData.placeholder).toBe("MM/DD/YYYY");
    expect(Object.keys(dateLocaleFormatterCache)).toEqual(["en:calendar", "en:date-pattern"]);
    expect(localeData.placeholder).toBe("MM/DD/YYYY");
    expect(Object.keys(dateLocaleFormatterCache)).toHaveLength(2);
    expect(localeData.months.wide).toHaveLength(12);
    expect(Object.keys(dateLocaleFormatterCache)).toContain("en:months-wide");
  });
});
