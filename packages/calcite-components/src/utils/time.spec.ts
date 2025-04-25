import { describe, expect, it } from "vitest";
import {
  formatTimePart,
  getLocalizedMeridiem,
  getMeridiemOrder,
  isValidTime,
  localizeTimeString,
  parseTimeString,
  Time,
  toISOTimeString,
} from "./time";

describe("formatTimePart", () => {
  it("returns decimals less than 1 with leading and trailing zeros to match the provided length", () => {
    expect(formatTimePart(0.3)).toEqual("3");
    expect(formatTimePart(0.3, 1)).toEqual("3");
    expect(formatTimePart(0.3, 2)).toEqual("30");
    expect(formatTimePart(0.3, 3)).toEqual("300");
    expect(formatTimePart(0.03)).toEqual("03");
    expect(formatTimePart(0.03, 2)).toEqual("03");
    expect(formatTimePart(0.03, 3)).toEqual("030");
    expect(formatTimePart(0.003)).toEqual("003");
    expect(formatTimePart(0.003, 3)).toEqual("003");
  });
  it("returns hour, minute and second values between 0 and 10 with leading zeros", () => {
    expect(formatTimePart(0)).toEqual("00");
    expect(formatTimePart(1)).toEqual("01");
    expect(formatTimePart(2)).toEqual("02");
    expect(formatTimePart(3)).toEqual("03");
    expect(formatTimePart(4)).toEqual("04");
    expect(formatTimePart(5)).toEqual("05");
    expect(formatTimePart(6)).toEqual("06");
    expect(formatTimePart(7)).toEqual("07");
    expect(formatTimePart(8)).toEqual("08");
    expect(formatTimePart(9)).toEqual("09");
  });
});

describe("getLocalizedMeridiem", () => {
  function getTimeParts(locale, meridiem) {
    const formatter = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
      timeZone: "UTC",
    });
    const arbitraryAMHour = 6;
    const arbitraryPMHour = 18;
    const dateWithHourBasedOnMeridiem = new Date(
      Date.UTC(0, 0, 0, meridiem === "PM" ? arbitraryPMHour : arbitraryAMHour, 0),
    );
    return formatter.formatToParts(dateWithHourBasedOnMeridiem);
  }

  it("ar", () => {
    expect(getLocalizedMeridiem({ locale: "ar", meridiem: "AM" })).toEqual("ص");
    expect(getLocalizedMeridiem({ locale: "ar", meridiem: "PM" })).toEqual("م");
    expect(getLocalizedMeridiem({ locale: "ar", parts: getTimeParts("ar", "AM") })).toEqual("ص");
    expect(getLocalizedMeridiem({ locale: "ar", parts: getTimeParts("ar", "PM") })).toEqual("م");
  });
  it("bg", () => {
    expect(getLocalizedMeridiem({ locale: "bg", meridiem: "AM" })).toEqual("пр.об.");
    expect(getLocalizedMeridiem({ locale: "bg", meridiem: "PM" })).toEqual("сл.об.");
    expect(getLocalizedMeridiem({ locale: "bg", parts: getTimeParts("bg", "AM") })).toEqual("пр.об.");
    expect(getLocalizedMeridiem({ locale: "bg", parts: getTimeParts("bg", "PM") })).toEqual("сл.об.");
  });
  it("bs", () => {
    expect(getLocalizedMeridiem({ locale: "bs", meridiem: "AM" })).toEqual("prijepodne");
    expect(getLocalizedMeridiem({ locale: "bs", meridiem: "PM" })).toEqual("popodne");
    expect(getLocalizedMeridiem({ locale: "bs", parts: getTimeParts("bs", "AM") })).toEqual("prijepodne");
    expect(getLocalizedMeridiem({ locale: "bs", parts: getTimeParts("bs", "PM") })).toEqual("popodne");
  });
  it("ca", () => {
    expect(getLocalizedMeridiem({ locale: "ca", meridiem: "AM" })).toEqual("a. m.");
    expect(getLocalizedMeridiem({ locale: "ca", meridiem: "PM" })).toEqual("p. m.");
    expect(getLocalizedMeridiem({ locale: "ca", parts: getTimeParts("ca", "AM") })).toEqual("a. m.");
    expect(getLocalizedMeridiem({ locale: "ca", parts: getTimeParts("ca", "PM") })).toEqual("p. m.");
  });
  it("cs", () => {
    expect(getLocalizedMeridiem({ locale: "cs", meridiem: "AM" })).toEqual("dop.");
    expect(getLocalizedMeridiem({ locale: "cs", meridiem: "PM" })).toEqual("odp.");
    expect(getLocalizedMeridiem({ locale: "cs", parts: getTimeParts("cs", "AM") })).toEqual("dop.");
    expect(getLocalizedMeridiem({ locale: "cs", parts: getTimeParts("cs", "PM") })).toEqual("odp.");
  });
  it("da", () => {
    expect(getLocalizedMeridiem({ locale: "da", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "da", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "da", parts: getTimeParts("da", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "da", parts: getTimeParts("da", "PM") })).toEqual("PM");
  });
  it("de", () => {
    expect(getLocalizedMeridiem({ locale: "de", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "de", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "de", parts: getTimeParts("de", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "de", parts: getTimeParts("de", "PM") })).toEqual("PM");
  });
  it("de-AT", () => {
    expect(getLocalizedMeridiem({ locale: "de-AT", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "de-AT", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "de-AT", parts: getTimeParts("de-AT", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "de-AT", parts: getTimeParts("de-AT", "PM") })).toEqual("PM");
  });
  it("de-CH", () => {
    expect(getLocalizedMeridiem({ locale: "de-CH", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "de-CH", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "de-CH", parts: getTimeParts("de-CH", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "de-CH", parts: getTimeParts("de-CH", "PM") })).toEqual("PM");
  });
  it("en-GB", () => {
    expect(getLocalizedMeridiem({ locale: "en-GB", meridiem: "AM" })).toEqual("am");
    expect(getLocalizedMeridiem({ locale: "en-GB", meridiem: "PM" })).toEqual("pm");
    expect(getLocalizedMeridiem({ locale: "en-GB", parts: getTimeParts("en-GB", "AM") })).toEqual("am");
    expect(getLocalizedMeridiem({ locale: "en-GB", parts: getTimeParts("en-GB", "PM") })).toEqual("pm");
  });
  it("el", () => {
    expect(getLocalizedMeridiem({ locale: "el", meridiem: "AM" })).toEqual("π.μ.");
    expect(getLocalizedMeridiem({ locale: "el", meridiem: "PM" })).toEqual("μ.μ.");
    expect(getLocalizedMeridiem({ locale: "el", parts: getTimeParts("el", "AM") })).toEqual("π.μ.");
    expect(getLocalizedMeridiem({ locale: "el", parts: getTimeParts("el", "PM") })).toEqual("μ.μ.");
  });
  it("en-US", () => {
    expect(getLocalizedMeridiem({ locale: "en", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "en", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "en", parts: getTimeParts("en", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "en", parts: getTimeParts("en", "PM") })).toEqual("PM");
  });
  it("en-AU", () => {
    expect(getLocalizedMeridiem({ locale: "en-AU", meridiem: "AM" })).toEqual("am");
    expect(getLocalizedMeridiem({ locale: "en-AU", meridiem: "PM" })).toEqual("pm");
    expect(getLocalizedMeridiem({ locale: "en-AU", parts: getTimeParts("en-AU", "AM") })).toEqual("am");
    expect(getLocalizedMeridiem({ locale: "en-AU", parts: getTimeParts("en-AU", "PM") })).toEqual("pm");
  });
  it("en-CA", () => {
    expect(getLocalizedMeridiem({ locale: "en-CA", meridiem: "AM" })).toEqual("a.m.");
    expect(getLocalizedMeridiem({ locale: "en-CA", meridiem: "PM" })).toEqual("p.m.");
    expect(getLocalizedMeridiem({ locale: "en-CA", parts: getTimeParts("en-CA", "AM") })).toEqual("a.m.");
    expect(getLocalizedMeridiem({ locale: "en-CA", parts: getTimeParts("en-CA", "PM") })).toEqual("p.m.");
  });
  it("es", () => {
    expect(getLocalizedMeridiem({ locale: "es", meridiem: "AM" })).toEqual("a. m.");
    expect(getLocalizedMeridiem({ locale: "es", meridiem: "PM" })).toEqual("p. m.");
    expect(getLocalizedMeridiem({ locale: "es", parts: getTimeParts("es", "AM") })).toEqual("a. m.");
    expect(getLocalizedMeridiem({ locale: "es", parts: getTimeParts("es", "PM") })).toEqual("p. m.");
  });
  it("es-MX", () => {
    expect(getLocalizedMeridiem({ locale: "es-MX", meridiem: "AM" })).toEqual("a.m.");
    expect(getLocalizedMeridiem({ locale: "es-MX", meridiem: "PM" })).toEqual("p.m.");
    expect(getLocalizedMeridiem({ locale: "es-MX", parts: getTimeParts("es-MX", "AM") })).toEqual("a.m.");
    expect(getLocalizedMeridiem({ locale: "es-MX", parts: getTimeParts("es-MX", "PM") })).toEqual("p.m.");
  });
  it("et", () => {
    expect(getLocalizedMeridiem({ locale: "et", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "et", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "et", parts: getTimeParts("et", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "et", parts: getTimeParts("et", "PM") })).toEqual("PM");
  });
  it("fi", () => {
    expect(getLocalizedMeridiem({ locale: "fi", meridiem: "AM" })).toEqual("ap.");
    expect(getLocalizedMeridiem({ locale: "fi", meridiem: "PM" })).toEqual("ip.");
    expect(getLocalizedMeridiem({ locale: "fi", parts: getTimeParts("fi", "AM") })).toEqual("ap.");
    expect(getLocalizedMeridiem({ locale: "fi", parts: getTimeParts("fi", "PM") })).toEqual("ip.");
  });
  it("fr", () => {
    expect(getLocalizedMeridiem({ locale: "fr", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "fr", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "fr", parts: getTimeParts("fr", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "fr", parts: getTimeParts("fr", "PM") })).toEqual("PM");
  });
  it("fr-CH", () => {
    expect(getLocalizedMeridiem({ locale: "fr-CH", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "fr-CH", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "fr-CH", parts: getTimeParts("fr-CH", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "fr-CH", parts: getTimeParts("fr-CH", "PM") })).toEqual("PM");
  });
  it("he", () => {
    expect(getLocalizedMeridiem({ locale: "he", meridiem: "AM" })).toEqual("לפנה״צ");
    expect(getLocalizedMeridiem({ locale: "he", meridiem: "PM" })).toEqual("אחה״צ");
    expect(getLocalizedMeridiem({ locale: "he", parts: getTimeParts("he", "AM") })).toEqual("לפנה״צ");
    expect(getLocalizedMeridiem({ locale: "he", parts: getTimeParts("he", "PM") })).toEqual("אחה״צ");
  });
  it("hi", () => {
    expect(getLocalizedMeridiem({ locale: "hi", meridiem: "AM" })).toEqual("am");
    expect(getLocalizedMeridiem({ locale: "hi", meridiem: "PM" })).toEqual("pm");
    expect(getLocalizedMeridiem({ locale: "hi", parts: getTimeParts("hi", "AM") })).toEqual("am");
    expect(getLocalizedMeridiem({ locale: "hi", parts: getTimeParts("hi", "PM") })).toEqual("pm");
  });
  it("hu", () => {
    expect(getLocalizedMeridiem({ locale: "hu", meridiem: "AM" })).toEqual("de.");
    expect(getLocalizedMeridiem({ locale: "hu", meridiem: "PM" })).toEqual("du.");
    expect(getLocalizedMeridiem({ locale: "hu", parts: getTimeParts("hu", "AM") })).toEqual("de.");
    expect(getLocalizedMeridiem({ locale: "hu", parts: getTimeParts("hu", "PM") })).toEqual("du.");
  });
  it("hr", () => {
    expect(getLocalizedMeridiem({ locale: "hr", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "hr", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "hr", parts: getTimeParts("hr", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "hr", parts: getTimeParts("hr", "PM") })).toEqual("PM");
  });
  it("id", () => {
    expect(getLocalizedMeridiem({ locale: "id", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "id", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "id", parts: getTimeParts("id", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "id", parts: getTimeParts("id", "PM") })).toEqual("PM");
  });
  it("italian", () => {
    expect(getLocalizedMeridiem({ locale: "it", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "it", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "it", parts: getTimeParts("it", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "it", parts: getTimeParts("it", "PM") })).toEqual("PM");
  });
  it("it-CH", () => {
    expect(getLocalizedMeridiem({ locale: "it-CH", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "it-CH", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "it-CH", parts: getTimeParts("it-CH", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "it-CH", parts: getTimeParts("it-CH", "PM") })).toEqual("PM");
  });
  it("ja", () => {
    expect(getLocalizedMeridiem({ locale: "ja", meridiem: "AM" })).toEqual("午前");
    expect(getLocalizedMeridiem({ locale: "ja", meridiem: "PM" })).toEqual("午後");
    expect(getLocalizedMeridiem({ locale: "ja", parts: getTimeParts("ja", "AM") })).toEqual("午前");
    expect(getLocalizedMeridiem({ locale: "ja", parts: getTimeParts("ja", "PM") })).toEqual("午後");
  });
  it("ko", () => {
    expect(getLocalizedMeridiem({ locale: "ko", meridiem: "AM" })).toEqual("오전");
    expect(getLocalizedMeridiem({ locale: "ko", meridiem: "PM" })).toEqual("오후");
    expect(getLocalizedMeridiem({ locale: "ko", parts: getTimeParts("ko", "AM") })).toEqual("오전");
    expect(getLocalizedMeridiem({ locale: "ko", parts: getTimeParts("ko", "PM") })).toEqual("오후");
  });
  it("lt", () => {
    expect(getLocalizedMeridiem({ locale: "lt", meridiem: "AM" })).toEqual("priešpiet");
    expect(getLocalizedMeridiem({ locale: "lt", meridiem: "PM" })).toEqual("popiet");
    expect(getLocalizedMeridiem({ locale: "lt", parts: getTimeParts("lt", "AM") })).toEqual("priešpiet");
    expect(getLocalizedMeridiem({ locale: "lt", parts: getTimeParts("lt", "PM") })).toEqual("popiet");
  });
  it("lv", () => {
    expect(getLocalizedMeridiem({ locale: "lv", meridiem: "AM" })).toEqual("priekšpusdienā");
    expect(getLocalizedMeridiem({ locale: "lv", meridiem: "PM" })).toEqual("pēcpusdienā");
    expect(getLocalizedMeridiem({ locale: "lv", parts: getTimeParts("lv", "AM") })).toEqual("priekšpusdienā");
    expect(getLocalizedMeridiem({ locale: "lv", parts: getTimeParts("lv", "PM") })).toEqual("pēcpusdienā");
  });
  it("mk", () => {
    expect(getLocalizedMeridiem({ locale: "mk", meridiem: "AM" })).toEqual("претпл.");
    expect(getLocalizedMeridiem({ locale: "mk", meridiem: "PM" })).toEqual("попл.");
    expect(getLocalizedMeridiem({ locale: "mk", parts: getTimeParts("mk", "AM") })).toEqual("претпл.");
    expect(getLocalizedMeridiem({ locale: "mk", parts: getTimeParts("mk", "PM") })).toEqual("попл.");
  });
  it("no", () => {
    expect(getLocalizedMeridiem({ locale: "no", meridiem: "AM" })).toEqual("a.m.");
    expect(getLocalizedMeridiem({ locale: "no", meridiem: "PM" })).toEqual("p.m.");
    expect(getLocalizedMeridiem({ locale: "no", parts: getTimeParts("no", "AM") })).toEqual("a.m.");
    expect(getLocalizedMeridiem({ locale: "no", parts: getTimeParts("no", "PM") })).toEqual("p.m.");
  });
  it("nl", () => {
    expect(getLocalizedMeridiem({ locale: "nl", meridiem: "AM" })).toEqual("a.m.");
    expect(getLocalizedMeridiem({ locale: "nl", meridiem: "PM" })).toEqual("p.m.");
    expect(getLocalizedMeridiem({ locale: "nl", parts: getTimeParts("nl", "AM") })).toEqual("a.m.");
    expect(getLocalizedMeridiem({ locale: "nl", parts: getTimeParts("nl", "PM") })).toEqual("p.m.");
  });
  it("pl", () => {
    expect(getLocalizedMeridiem({ locale: "pl", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "pl", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "pl", parts: getTimeParts("pl", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "pl", parts: getTimeParts("pl", "PM") })).toEqual("PM");
  });
  it("pt-BR", () => {
    expect(getLocalizedMeridiem({ locale: "pt-BR", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "pt-BR", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "pt-BR", parts: getTimeParts("pt-BR", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "pt-BR", parts: getTimeParts("pt-BR", "PM") })).toEqual("PM");
  });
  it("pt-PT", () => {
    expect(getLocalizedMeridiem({ locale: "pt-PT", meridiem: "AM" })).toEqual("da manhã");
    expect(getLocalizedMeridiem({ locale: "pt-PT", meridiem: "PM" })).toEqual("da tarde");
    expect(getLocalizedMeridiem({ locale: "pt-PT", parts: getTimeParts("pt-PT", "AM") })).toEqual("da manhã");
    expect(getLocalizedMeridiem({ locale: "pt-PT", parts: getTimeParts("pt-PT", "PM") })).toEqual("da tarde");
  });
  it("ro", () => {
    expect(getLocalizedMeridiem({ locale: "ro", meridiem: "AM" })).toEqual("a.m.");
    expect(getLocalizedMeridiem({ locale: "ro", meridiem: "PM" })).toEqual("p.m.");
    expect(getLocalizedMeridiem({ locale: "ro", parts: getTimeParts("ro", "AM") })).toEqual("a.m.");
    expect(getLocalizedMeridiem({ locale: "ro", parts: getTimeParts("ro", "PM") })).toEqual("p.m.");
  });
  it("ru", () => {
    expect(getLocalizedMeridiem({ locale: "ru", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "ru", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "ru", parts: getTimeParts("ru", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "ru", parts: getTimeParts("ru", "PM") })).toEqual("PM");
  });
  it("sl", () => {
    expect(getLocalizedMeridiem({ locale: "sl", meridiem: "AM" })).toEqual("dop.");
    expect(getLocalizedMeridiem({ locale: "sl", meridiem: "PM" })).toEqual("pop.");
    expect(getLocalizedMeridiem({ locale: "sl", parts: getTimeParts("sl", "AM") })).toEqual("dop.");
    expect(getLocalizedMeridiem({ locale: "sl", parts: getTimeParts("sl", "PM") })).toEqual("pop.");
  });
  it("sr", () => {
    expect(getLocalizedMeridiem({ locale: "sr", meridiem: "AM" })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "sr", meridiem: "PM" })).toEqual("PM");
    expect(getLocalizedMeridiem({ locale: "sr", parts: getTimeParts("sr", "AM") })).toEqual("AM");
    expect(getLocalizedMeridiem({ locale: "sr", parts: getTimeParts("sr", "PM") })).toEqual("PM");
  });
  it("sv", () => {
    expect(getLocalizedMeridiem({ locale: "sv", meridiem: "AM" })).toEqual("fm");
    expect(getLocalizedMeridiem({ locale: "sv", meridiem: "PM" })).toEqual("em");
    expect(getLocalizedMeridiem({ locale: "sv", parts: getTimeParts("sv", "AM") })).toEqual("fm");
    expect(getLocalizedMeridiem({ locale: "sv", parts: getTimeParts("sv", "PM") })).toEqual("em");
  });
  it("th", () => {
    expect(getLocalizedMeridiem({ locale: "th", meridiem: "AM" })).toEqual("ก่อนเที่ยง");
    expect(getLocalizedMeridiem({ locale: "th", meridiem: "PM" })).toEqual("หลังเที่ยง");
    expect(getLocalizedMeridiem({ locale: "th", parts: getTimeParts("th", "AM") })).toEqual("ก่อนเที่ยง");
    expect(getLocalizedMeridiem({ locale: "th", parts: getTimeParts("th", "PM") })).toEqual("หลังเที่ยง");
  });
  it("tr", () => {
    expect(getLocalizedMeridiem({ locale: "tr", meridiem: "AM" })).toEqual("ÖÖ");
    expect(getLocalizedMeridiem({ locale: "tr", meridiem: "PM" })).toEqual("ÖS");
    expect(getLocalizedMeridiem({ locale: "tr", parts: getTimeParts("tr", "AM") })).toEqual("ÖÖ");
    expect(getLocalizedMeridiem({ locale: "tr", parts: getTimeParts("tr", "PM") })).toEqual("ÖS");
  });
  it("uk", () => {
    expect(getLocalizedMeridiem({ locale: "uk", meridiem: "AM" })).toEqual("дп");
    expect(getLocalizedMeridiem({ locale: "uk", meridiem: "PM" })).toEqual("пп");
    expect(getLocalizedMeridiem({ locale: "uk", parts: getTimeParts("uk", "AM") })).toEqual("дп");
    expect(getLocalizedMeridiem({ locale: "uk", parts: getTimeParts("uk", "PM") })).toEqual("пп");
  });
  it("vi", () => {
    expect(getLocalizedMeridiem({ locale: "vi", meridiem: "AM" })).toEqual("SA");
    expect(getLocalizedMeridiem({ locale: "vi", meridiem: "PM" })).toEqual("CH");
    expect(getLocalizedMeridiem({ locale: "vi", parts: getTimeParts("vi", "AM") })).toEqual("SA");
    expect(getLocalizedMeridiem({ locale: "vi", parts: getTimeParts("vi", "PM") })).toEqual("CH");
  });
  it("zh-CN", () => {
    expect(getLocalizedMeridiem({ locale: "zh-CN", meridiem: "AM" })).toEqual("上午");
    expect(getLocalizedMeridiem({ locale: "zh-CN", meridiem: "PM" })).toEqual("下午");
    expect(getLocalizedMeridiem({ locale: "zh-CN", parts: getTimeParts("zh-CN", "AM") })).toEqual("上午");
    expect(getLocalizedMeridiem({ locale: "zh-CN", parts: getTimeParts("zh-CN", "PM") })).toEqual("下午");
  });
  it("zh-HK", () => {
    expect(getLocalizedMeridiem({ locale: "zh-HK", meridiem: "AM" })).toEqual("上午");
    expect(getLocalizedMeridiem({ locale: "zh-HK", meridiem: "PM" })).toEqual("下午");
    expect(getLocalizedMeridiem({ locale: "zh-HK", parts: getTimeParts("zh-HK", "AM") })).toEqual("上午");
    expect(getLocalizedMeridiem({ locale: "zh-HK", parts: getTimeParts("zh-HK", "PM") })).toEqual("下午");
  });
  it("zh-TW", () => {
    expect(getLocalizedMeridiem({ locale: "zh-TW", meridiem: "AM" })).toEqual("上午");
    expect(getLocalizedMeridiem({ locale: "zh-TW", meridiem: "PM" })).toEqual("下午");
    expect(getLocalizedMeridiem({ locale: "zh-TW", parts: getTimeParts("zh-TW", "AM") })).toEqual("上午");
    expect(getLocalizedMeridiem({ locale: "zh-TW", parts: getTimeParts("zh-TW", "PM") })).toEqual("下午");
  });
});

describe("getMeridiemOrder", () => {
  const nonZeroLangs = ["ar", "el", "en", "es", "he", "hi"];
  const zeroLangs = ["hu", "ja", "ko", "tr", "zh-CN", "zh-HK"];

  nonZeroLangs.forEach((lang) => {
    it(`returns non-zero for ${lang}`, () => {
      expect(getMeridiemOrder(lang)).not.toEqual(0);
    });
  });

  zeroLangs.forEach((lang) => {
    it(`returns zero for ${lang}`, () => {
      expect(getMeridiemOrder(lang)).toEqual(0);
    });
  });
});

describe("isValidTime", () => {
  it("returns true when time string contains fractional seconds", () => {
    expect(isValidTime("12:30:45.0")).toBe(true);
    expect(isValidTime("12:30:45.01")).toBe(true);
    expect(isValidTime("12:30:45.001")).toBe(true);
    expect(isValidTime("12:30:45.1")).toBe(true);
    expect(isValidTime("12:30:45.12")).toBe(true);
    expect(isValidTime("12:30:45.123")).toBe(true);
    expect(isValidTime("12:30:45.1234")).toBe(true);
    expect(isValidTime("12:30:45.12345")).toBe(true);
    expect(isValidTime("12:30:45.123456")).toBe(true);
    expect(isValidTime("12:30:45.1234567")).toBe(true);
    expect(isValidTime("12:30:45.12345678")).toBe(true);
    expect(isValidTime("12:30:45.123456789")).toBe(true);
  });
  it("returns true when hour and minute are valid but seconds are omitted", () => {
    expect(isValidTime("12:30")).toBe(true);
    expect(isValidTime("18:40")).toBe(true);
  });
  it("returns false when time string doesn't contain in-range values with at least hour and minute", () => {
    expect(isValidTime("12")).toBe(false);
    expect(isValidTime("55")).toBe(false);
    expect(isValidTime("34:30")).toBe(false);
    expect(isValidTime("3:455")).toBe(false);
    expect(isValidTime("3:44:333")).toBe(false);
  });
  it("returns true when time object contains fractional seconds", () => {
    expect(
      isValidTime({
        fractionalSecond: "123",
        hour: "12",
        minute: "30",
        second: "45",
      }),
    ).toBe(true);
    expect(
      isValidTime({
        fractionalSecond: "0",
        hour: "12",
        minute: "30",
        second: "45",
      }),
    ).toBe(true);
  });
  it("returns true when hour and minute are valid but seconds are omitted in time object", () => {
    expect(
      isValidTime({
        hour: "12",
        minute: "30",
      }),
    ).toBe(true);
  });
  it("returns false when time object doesn't contain in-range values with at least hour and minute", () => {
    expect(isValidTime({ hour: "6", minute: "350" })).toBe(false);
    expect(isValidTime({ hour: "55", minute: "30" })).toBe(false);
  });
});

describe("localizeTimeString", () => {
  it("returns localized decimal separator and fractional second value as parts", () => {
    expect(localizeTimeString({ step: 0.001, parts: true, value: "06:45:30.12123", locale: "fr" })).toEqual({
      localizedHour: "06",
      localizedHourSuffix: ":",
      localizedMinute: "45",
      localizedMinuteSuffix: ":",
      localizedSecond: "30",
      localizedDecimalSeparator: ",",
      localizedFractionalSecond: "121",
      localizedSecondSuffix: null,
      localizedMeridiem: null,
    });

    expect(localizeTimeString({ parts: true, value: "06:45:30", locale: "fr" })).toEqual({
      localizedHour: "06",
      localizedHourSuffix: ":",
      localizedMinute: "45",
      localizedMinuteSuffix: ":",
      localizedSecond: "30",
      localizedDecimalSeparator: ",",
      localizedFractionalSecond: null,
      localizedSecondSuffix: null,
      localizedMeridiem: null,
    });

    expect(localizeTimeString({ step: 0.001, parts: true, value: "06:45:30.12123", locale: "da" })).toEqual({
      localizedHour: "06",
      localizedHourSuffix: ".",
      localizedMinute: "45",
      localizedMinuteSuffix: ".",
      localizedSecond: "30",
      localizedDecimalSeparator: ",",
      localizedFractionalSecond: "121",
      localizedSecondSuffix: null,
      localizedMeridiem: null,
    });
  });

  it("returns fractional second value with padded zeros when necessary as parts", () => {
    expect(localizeTimeString({ step: 0.01, parts: true, value: "06:45:30.04", locale: "en" })).toEqual({
      localizedHour: "06",
      localizedHourSuffix: ":",
      localizedMinute: "45",
      localizedMinuteSuffix: ":",
      localizedSecond: "30",
      localizedDecimalSeparator: ".",
      localizedFractionalSecond: "04",
      localizedSecondSuffix: null,
      localizedMeridiem: "AM",
    });
    expect(localizeTimeString({ step: 0.001, parts: true, value: "06:45:30.003", locale: "en" })).toEqual({
      localizedHour: "06",
      localizedHourSuffix: ":",
      localizedMinute: "45",
      localizedMinuteSuffix: ":",
      localizedSecond: "30",
      localizedDecimalSeparator: ".",
      localizedFractionalSecond: "003",
      localizedSecondSuffix: null,
      localizedMeridiem: "AM",
    });
    expect(
      localizeTimeString({
        step: 0.001,
        parts: true,
        value: "06:45:30.007",
        locale: "ar",
        numberingSystem: "arab",
      }),
    ).toEqual({
      localizedHour: "٠٦",
      localizedHourSuffix: ":",
      localizedMinute: "٤٥",
      localizedMinuteSuffix: ":",
      localizedSecond: "٣٠",
      localizedDecimalSeparator: "٫",
      localizedFractionalSecond: "٠٠٧",
      localizedSecondSuffix: null,
      localizedMeridiem: "ص",
    });
  });
});

describe("parseTimeString", () => {
  it("returns literal hour, minute, second and fractional second values from given string", () => {
    expect(parseTimeString("12:30:45.0")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "0",
    });
    expect(parseTimeString("12:30:45.01")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "01",
    });
    expect(parseTimeString("12:30:45.001")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "001",
    });
    expect(parseTimeString("12:30:45.0001")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "0001",
    });
    expect(parseTimeString("12:30:45.0049")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "0049",
    });
    expect(parseTimeString("12:30:45.1")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "1",
    });
    expect(parseTimeString("12:30:45.12")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "12",
    });
    expect(parseTimeString("12:30:45.123")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "123",
    });
    expect(parseTimeString("12:30:45.1234")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "1234",
    });
    expect(parseTimeString("12:30:45.12345")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "12345",
    });
    expect(parseTimeString("12:30:45.12345.34")).toEqual({
      hour: null,
      minute: null,
      second: null,
      fractionalSecond: null,
    });
  });

  it("returns null fractionalSecond when second is a whole number", () => {
    expect(parseTimeString("12:30:45")).toEqual({ fractionalSecond: null, hour: "12", minute: "30", second: "45" });
  });
});

describe("toISOTimeString", () => {
  describe("passing in a string value", () => {
    it("returns hh:mm value when step is 60 (default)", () => {
      expect(toISOTimeString("1:2")).toBe("01:02");
      expect(toISOTimeString("1:2:3")).toBe("01:02");
      expect(toISOTimeString("1:2:3.4")).toBe("01:02");
      expect(toISOTimeString("1:2:3.45")).toBe("01:02");
      expect(toISOTimeString("1:2:3.456")).toBe("01:02");
    });

    it("returns hh:mm:ss value when step is less than 60 and greater than 0", () => {
      expect(toISOTimeString("1:2", 1)).toBe("01:02:00");
      expect(toISOTimeString("1:2:3", 1)).toBe("01:02:03");
      expect(toISOTimeString("1:2:3.4", 1)).toBe("01:02:03");
      expect(toISOTimeString("1:2:3.45", 1)).toBe("01:02:03");
      expect(toISOTimeString("1:2:3.456", 1)).toBe("01:02:03");

      expect(toISOTimeString("1:2", 10)).toBe("01:02:00");
      expect(toISOTimeString("1:2:3", 10)).toBe("01:02:03");
      expect(toISOTimeString("1:2:3.4", 10)).toBe("01:02:03");
      expect(toISOTimeString("1:2:3.45", 10)).toBe("01:02:03");
      expect(toISOTimeString("1:2:3.456", 10)).toBe("01:02:03");

      expect(toISOTimeString("1:2", 59)).toBe("01:02:00");
      expect(toISOTimeString("1:2:3", 59)).toBe("01:02:03");
      expect(toISOTimeString("1:2:3.4", 59)).toBe("01:02:03");
      expect(toISOTimeString("1:2:3.45", 59)).toBe("01:02:03");
      expect(toISOTimeString("1:2:3.456", 59)).toBe("01:02:03");
    });

    it("returns hh:mm:ss.sss value when step is less than 1 (fractional second)", () => {
      expect(toISOTimeString("1:2", 0.1)).toBe("01:02:00.0");
      expect(toISOTimeString("1:2:3", 0.1)).toBe("01:02:03.0");
      expect(toISOTimeString("1:2:3.4", 0.1)).toBe("01:02:03.4");
      expect(toISOTimeString("1:2:3.45", 0.1)).toBe("01:02:03.5");
      expect(toISOTimeString("1:2:3.456", 0.1)).toBe("01:02:03.5");
      expect(toISOTimeString("01:2", 0.1)).toBe("01:02:00.0");
      expect(toISOTimeString("01:2:3", 0.1)).toBe("01:02:03.0");
      expect(toISOTimeString("01:2:3.4", 0.1)).toBe("01:02:03.4");
      expect(toISOTimeString("01:2:3.45", 0.1)).toBe("01:02:03.5");
      expect(toISOTimeString("01:2:3.456", 0.1)).toBe("01:02:03.5");
      expect(toISOTimeString("1:02", 0.1)).toBe("01:02:00.0");
      expect(toISOTimeString("1:02:3", 0.1)).toBe("01:02:03.0");
      expect(toISOTimeString("1:02:3.4", 0.1)).toBe("01:02:03.4");
      expect(toISOTimeString("1:02:3.45", 0.1)).toBe("01:02:03.5");
      expect(toISOTimeString("1:02:3.456", 0.1)).toBe("01:02:03.5");
      expect(toISOTimeString("1:2", 0.1)).toBe("01:02:00.0");
      expect(toISOTimeString("1:2:03", 0.1)).toBe("01:02:03.0");
      expect(toISOTimeString("1:2:03.4", 0.1)).toBe("01:02:03.4");
      expect(toISOTimeString("1:2:03.45", 0.1)).toBe("01:02:03.5");
      expect(toISOTimeString("1:2:03.456", 0.1)).toBe("01:02:03.5");
      expect(toISOTimeString("01:02", 0.1)).toBe("01:02:00.0");
      expect(toISOTimeString("01:02:03", 0.1)).toBe("01:02:03.0");
      expect(toISOTimeString("01:02:03.4", 0.1)).toBe("01:02:03.4");
      expect(toISOTimeString("01:02:03.45", 0.1)).toBe("01:02:03.5");
      expect(toISOTimeString("01:02:03.456", 0.1)).toBe("01:02:03.5");

      expect(toISOTimeString("1:2", 0.01)).toBe("01:02:00.00");
      expect(toISOTimeString("1:2:3", 0.01)).toBe("01:02:03.00");
      expect(toISOTimeString("1:2:3.4", 0.01)).toBe("01:02:03.40");
      expect(toISOTimeString("1:2:3.04", 0.01)).toBe("01:02:03.04");
      expect(toISOTimeString("01:2", 0.01)).toBe("01:02:00.00");
      expect(toISOTimeString("01:2:3", 0.01)).toBe("01:02:03.00");
      expect(toISOTimeString("01:2:3.4", 0.01)).toBe("01:02:03.40");
      expect(toISOTimeString("01:2:3.04", 0.01)).toBe("01:02:03.04");
      expect(toISOTimeString("1:02", 0.01)).toBe("01:02:00.00");
      expect(toISOTimeString("1:02:3", 0.01)).toBe("01:02:03.00");
      expect(toISOTimeString("1:02:3.4", 0.01)).toBe("01:02:03.40");
      expect(toISOTimeString("1:02:3.04", 0.01)).toBe("01:02:03.04");
      expect(toISOTimeString("1:2", 0.01)).toBe("01:02:00.00");
      expect(toISOTimeString("1:2:03", 0.01)).toBe("01:02:03.00");
      expect(toISOTimeString("1:2:03.4", 0.01)).toBe("01:02:03.40");
      expect(toISOTimeString("1:2:03.04", 0.01)).toBe("01:02:03.04");

      expect(toISOTimeString("1:2", 0.001)).toBe("01:02:00.000");
      expect(toISOTimeString("1:2:3", 0.001)).toBe("01:02:03.000");
      expect(toISOTimeString("1:2:3.4", 0.001)).toBe("01:02:03.400");
      expect(toISOTimeString("1:2:3.04", 0.001)).toBe("01:02:03.040");
      expect(toISOTimeString("1:2:3.004", 0.001)).toBe("01:02:03.004");
      expect(toISOTimeString("01:2", 0.001)).toBe("01:02:00.000");
      expect(toISOTimeString("01:2:3", 0.001)).toBe("01:02:03.000");
      expect(toISOTimeString("01:2:3.4", 0.001)).toBe("01:02:03.400");
      expect(toISOTimeString("01:2:3.04", 0.001)).toBe("01:02:03.040");
      expect(toISOTimeString("01:2:3.004", 0.001)).toBe("01:02:03.004");
      expect(toISOTimeString("1:02", 0.001)).toBe("01:02:00.000");
      expect(toISOTimeString("1:02:3", 0.001)).toBe("01:02:03.000");
      expect(toISOTimeString("1:02:3.4", 0.001)).toBe("01:02:03.400");
      expect(toISOTimeString("1:02:3.04", 0.001)).toBe("01:02:03.040");
      expect(toISOTimeString("1:02:3.004", 0.001)).toBe("01:02:03.004");
      expect(toISOTimeString("1:2", 0.001)).toBe("01:02:00.000");
      expect(toISOTimeString("1:2:03", 0.001)).toBe("01:02:03.000");
      expect(toISOTimeString("1:2:03.4", 0.001)).toBe("01:02:03.400");
      expect(toISOTimeString("1:2:03.04", 0.001)).toBe("01:02:03.040");
      expect(toISOTimeString("1:2:03.004", 0.001)).toBe("01:02:03.004");
    });

    it("returns null value with invalid time", () => {
      expect(toISOTimeString("1")).toBeNull();
      expect(toISOTimeString(":2")).toBeNull();
      expect(toISOTimeString("1:2:90")).toBeNull();
      expect(toISOTimeString("25:34")).toBeNull();

      expect(toISOTimeString("1", 1)).toBeNull();
      expect(toISOTimeString(":2", 1)).toBeNull();
      expect(toISOTimeString("1:2:90", 1)).toBeNull();
      expect(toISOTimeString("25:34", 1)).toBeNull();

      expect(toISOTimeString("1", 0.1)).toBeNull();
      expect(toISOTimeString(":2", 0.1)).toBeNull();
      expect(toISOTimeString("1:2:90", 0.1)).toBeNull();
      expect(toISOTimeString("25:34", 0.1)).toBeNull();

      expect(toISOTimeString("1", 0.01)).toBeNull();
      expect(toISOTimeString(":2", 0.01)).toBeNull();
      expect(toISOTimeString("1:2:90", 0.01)).toBeNull();
      expect(toISOTimeString("25:34", 0.01)).toBeNull();

      expect(toISOTimeString("1", 0.001)).toBeNull();
      expect(toISOTimeString(":2", 0.001)).toBeNull();
      expect(toISOTimeString("1:2:90", 0.001)).toBeNull();
      expect(toISOTimeString("25:34", 0.001)).toBeNull();
    });
  });

  describe("passing in a Time object", () => {
    it("returns hh:mm value when step is 60 (default)", () => {
      expect(toISOTimeString({ hour: "1", minute: "2" } as Time)).toBe("01:02");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3" } as Time)).toBe("01:02");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "4" } as Time)).toBe("01:02");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "45" } as Time)).toBe("01:02");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "456" } as Time)).toBe("01:02");
    });

    it("returns hh:mm:ss value when step is less than 60 and greater than 0", () => {
      expect(toISOTimeString({ hour: "1", minute: "2" } as Time, 1)).toBe("01:02:00");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3" } as Time, 1)).toBe("01:02:03");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "4" } as Time, 1)).toBe(
        "01:02:03",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "45" } as Time, 1)).toBe(
        "01:02:03",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "456" } as Time, 1)).toBe(
        "01:02:03",
      );
      expect(toISOTimeString({ hour: "1", minute: "2" } as Time, 10)).toBe("01:02:00");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3" } as Time, 10)).toBe("01:02:03");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "4" } as Time, 10)).toBe(
        "01:02:03",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "45" } as Time, 10)).toBe(
        "01:02:03",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "456" } as Time, 10)).toBe(
        "01:02:03",
      );
      expect(toISOTimeString({ hour: "1", minute: "2" } as Time, 59)).toBe("01:02:00");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3" } as Time, 59)).toBe("01:02:03");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "4" } as Time, 59)).toBe(
        "01:02:03",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "45" } as Time, 59)).toBe(
        "01:02:03",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "456" } as Time, 59)).toBe(
        "01:02:03",
      );
    });

    it("returns hh:mm:ss.sss value when step is less than 1 (fractional second)", () => {
      expect(toISOTimeString({ hour: "1", minute: "2" } as Time, 0.1)).toBe("01:02:00.0");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3" } as Time, 0.1)).toBe("01:02:03.0");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "4" } as Time, 0.1)).toBe(
        "01:02:03.4",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "45" } as Time, 0.1)).toBe(
        "01:02:03.5",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "456" } as Time, 0.1)).toBe(
        "01:02:03.5",
      );
      expect(toISOTimeString({ hour: "1", minute: "2" } as Time, 0.01)).toBe("01:02:00.00");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3" } as Time, 0.01)).toBe("01:02:03.00");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "4" } as Time, 0.01)).toBe(
        "01:02:03.40",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "45" } as Time, 0.01)).toBe(
        "01:02:03.45",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "456" } as Time, 0.01)).toBe(
        "01:02:03.46",
      );
      expect(toISOTimeString({ hour: "1", minute: "2" } as Time, 0.001)).toBe("01:02:00.000");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3" } as Time, 0.001)).toBe("01:02:03.000");
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "4" } as Time, 0.001)).toBe(
        "01:02:03.400",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "45" } as Time, 0.001)).toBe(
        "01:02:03.450",
      );
      expect(toISOTimeString({ hour: "1", minute: "2", second: "3", fractionalSecond: "456" } as Time, 0.001)).toBe(
        "01:02:03.456",
      );
    });

    it("returns null value when hour or minute is missing or when any value is out of range", () => {
      expect(toISOTimeString({ hour: "1" } as Time)).toBeNull();
      expect(toISOTimeString({ minute: "2" } as Time)).toBeNull();
      expect(toISOTimeString({ second: "3" } as Time)).toBeNull();
      expect(toISOTimeString({ hour: "25", minute: "34" } as Time)).toBeNull();
      expect(toISOTimeString({ hour: "12", minute: "61" } as Time)).toBeNull();
      expect(toISOTimeString({ hour: "50", minute: "70" } as Time)).toBeNull();
      expect(toISOTimeString({ hour: "26", minute: "2", second: "30" } as Time)).toBeNull();
      expect(toISOTimeString({ hour: "12", minute: "90", second: "30" } as Time)).toBeNull();
      expect(toISOTimeString({ hour: "1", minute: "2", second: "90" } as Time)).toBeNull();
      expect(toISOTimeString({ hour: "51", minute: "200", second: "90" } as Time)).toBeNull();
    });
  });
});
