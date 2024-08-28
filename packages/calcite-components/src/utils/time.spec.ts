import {
  formatTimePart,
  getLocalizedMeridiem,
  getMeridiemOrder,
  isValidTime,
  localizeTimeStringToParts,
  parseTimeString,
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
  it("ar", () => {
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("ar", "AM")).toEqual("ص");
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("ar", "PM")).toEqual("م");
  });
  it("bg", () => {
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("bg", "AM")).toEqual("пр.об.");
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("bg", "PM")).toEqual("сл.об.");
  });
  it("bs", () => {
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("bs", "AM")).toEqual("prijepodne");
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("bs", "PM")).toEqual("popodne");
  });
  it("ca", () => {
    expect(getLocalizedMeridiem("ca", "AM")).toEqual("a. m.");
    expect(getLocalizedMeridiem("ca", "PM")).toEqual("p. m.");
  });
  it("cs", () => {
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("cs", "AM")).toEqual("dop.");
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("cs", "PM")).toEqual("odp.");
  });
  it("da", () => {
    expect(getLocalizedMeridiem("da", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("da", "PM")).toEqual("PM");
  });
  it("de", () => {
    expect(getLocalizedMeridiem("de", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("de", "PM")).toEqual("PM");
  });
  it("de-AT", () => {
    expect(getLocalizedMeridiem("de-AT", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("de-AT", "PM")).toEqual("PM");
  });
  it("de-CH", () => {
    expect(getLocalizedMeridiem("de-CH", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("de-CH", "PM")).toEqual("PM");
  });
  it("en-GB", () => {
    expect(getLocalizedMeridiem("en-GB", "AM")).toEqual("am");
    expect(getLocalizedMeridiem("en-GB", "PM")).toEqual("pm");
  });
  it("el", () => {
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("el", "AM")).toEqual("π.μ.");
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("el", "PM")).toEqual("μ.μ.");
  });
  it("en-US", () => {
    expect(getLocalizedMeridiem("en", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("en", "PM")).toEqual("PM");
  });
  it("en-AU", () => {
    expect(getLocalizedMeridiem("en-AU", "AM")).toEqual("am");
    expect(getLocalizedMeridiem("en-AU", "PM")).toEqual("pm");
  });
  it("en-CA", () => {
    expect(getLocalizedMeridiem("en-CA", "AM")).toEqual("a.m.");
    expect(getLocalizedMeridiem("en-CA", "PM")).toEqual("p.m.");
  });
  it("es", () => {
    expect(getLocalizedMeridiem("es", "AM")).toEqual("a. m.");
    expect(getLocalizedMeridiem("es", "PM")).toEqual("p. m.");
  });
  it("es-MX", () => {
    expect(getLocalizedMeridiem("es-MX", "AM")).toEqual("a.m.");
    expect(getLocalizedMeridiem("es-MX", "PM")).toEqual("p.m.");
  });
  it("et", () => {
    expect(getLocalizedMeridiem("et", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("et", "PM")).toEqual("PM");
  });
  it("fi", () => {
    expect(getLocalizedMeridiem("fi", "AM")).toEqual("ap.");
    expect(getLocalizedMeridiem("fi", "PM")).toEqual("ip.");
  });
  it("fr", () => {
    expect(getLocalizedMeridiem("fr", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("fr", "PM")).toEqual("PM");
  });
  it("fr-CH", () => {
    expect(getLocalizedMeridiem("fr-CH", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("fr-CH", "PM")).toEqual("PM");
  });
  it("he", () => {
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("he", "AM")).toEqual("לפנה״צ");
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("he", "PM")).toEqual("אחה״צ");
  });
  it("hi", () => {
    expect(getLocalizedMeridiem("hi", "AM")).toEqual("am");
    expect(getLocalizedMeridiem("hi", "PM")).toEqual("pm");
  });
  it("hu", () => {
    expect(getLocalizedMeridiem("hu", "AM")).toEqual("de.");
    expect(getLocalizedMeridiem("hu", "PM")).toEqual("du.");
  });
  it("hr", () => {
    expect(getLocalizedMeridiem("hr", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("hr", "PM")).toEqual("PM");
  });
  it("id", () => {
    expect(getLocalizedMeridiem("id", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("id", "PM")).toEqual("PM");
  });
  it("italian", () => {
    expect(getLocalizedMeridiem("it", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("it", "PM")).toEqual("PM");
  });
  it("it-CH", () => {
    expect(getLocalizedMeridiem("it-CH", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("it-CH", "PM")).toEqual("PM");
  });
  it("ja", () => {
    expect(getLocalizedMeridiem("ja", "AM")).toEqual("午前");
    expect(getLocalizedMeridiem("ja", "PM")).toEqual("午後");
  });
  it("ko", () => {
    expect(getLocalizedMeridiem("ko", "AM")).toEqual("오전");
    expect(getLocalizedMeridiem("ko", "PM")).toEqual("오후");
  });
  it("lt", () => {
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("lt", "AM")).toEqual("priešpiet");
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("lt", "PM")).toEqual("popiet");
  });
  it("lv", () => {
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("lv", "AM")).toEqual("priekšpusdienā");
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("lv", "PM")).toEqual("pēcpusdienā");
  });
  it("mk", () => {
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("mk", "AM")).toEqual("претпл.");
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("mk", "PM")).toEqual("попл.");
  });
  it("no", () => {
    expect(getLocalizedMeridiem("no", "AM")).toEqual("a.m.");
    expect(getLocalizedMeridiem("no", "PM")).toEqual("p.m.");
  });
  it("nl", () => {
    expect(getLocalizedMeridiem("nl", "AM")).toEqual("a.m.");
    expect(getLocalizedMeridiem("nl", "PM")).toEqual("p.m.");
  });
  it("pl", () => {
    expect(getLocalizedMeridiem("pl", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("pl", "PM")).toEqual("PM");
  });
  it("pt-BR", () => {
    expect(getLocalizedMeridiem("pt-BR", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("pt-BR", "PM")).toEqual("PM");
  });
  it("pt-PT", () => {
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("pt-PT", "AM")).toEqual("da manhã");
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("pt-PT", "PM")).toEqual("da tarde");
  });
  it("ro", () => {
    expect(getLocalizedMeridiem("ro", "AM")).toEqual("a.m.");
    expect(getLocalizedMeridiem("ro", "PM")).toEqual("p.m.");
  });
  it("ru", () => {
    expect(getLocalizedMeridiem("ru", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("ru", "PM")).toEqual("PM");
  });
  it("sl", () => {
    expect(getLocalizedMeridiem("sl", "AM")).toEqual("dop.");
    expect(getLocalizedMeridiem("sl", "PM")).toEqual("pop.");
  });
  it("sr", () => {
    expect(getLocalizedMeridiem("sr", "AM")).toEqual("AM");
    expect(getLocalizedMeridiem("sr", "PM")).toEqual("PM");
  });
  it("sv", () => {
    expect(getLocalizedMeridiem("sv", "AM")).toEqual("fm");
    expect(getLocalizedMeridiem("sv", "PM")).toEqual("em");
  });
  it("th", () => {
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("th", "AM")).toEqual("ก่อนเที่ยง");
    // eslint-disable-next-line @cspell/spellchecker -- localized characters
    expect(getLocalizedMeridiem("th", "PM")).toEqual("หลังเที่ยง");
  });
  it("tr", () => {
    expect(getLocalizedMeridiem("tr", "AM")).toEqual("ÖÖ");
    expect(getLocalizedMeridiem("tr", "PM")).toEqual("ÖS");
  });
  it("uk", () => {
    expect(getLocalizedMeridiem("uk", "AM")).toEqual("дп");
    expect(getLocalizedMeridiem("uk", "PM")).toEqual("пп");
  });
  it("vi", () => {
    expect(getLocalizedMeridiem("vi", "AM")).toEqual("SA");
    expect(getLocalizedMeridiem("vi", "PM")).toEqual("CH");
  });
  it("zh-CN", () => {
    expect(getLocalizedMeridiem("zh-CN", "AM")).toEqual("上午");
    expect(getLocalizedMeridiem("zh-CN", "PM")).toEqual("下午");
  });
  it("zh-HK", () => {
    expect(getLocalizedMeridiem("zh-HK", "AM")).toEqual("上午");
    expect(getLocalizedMeridiem("zh-HK", "PM")).toEqual("下午");
  });
  it("zh-TW", () => {
    expect(getLocalizedMeridiem("zh-TW", "AM")).toEqual("上午");
    expect(getLocalizedMeridiem("zh-TW", "PM")).toEqual("下午");
  });
});

describe("getMeridiemOrder", () => {
  it("returns 0 for arabic lang", () => {
    expect(getMeridiemOrder("ar")).toEqual(0);
  });
  it("returns 0 for chinese lang", () => {
    expect(getMeridiemOrder("zh-CN")).toEqual(0);
  });
  it("returns 0 for chinese (hong kong) lang", () => {
    expect(getMeridiemOrder("zh-HK")).toEqual(0);
  });
  it("returns 0 for hebrew lang", () => {
    expect(getMeridiemOrder("he")).toEqual(0);
  });
  it("returns 0 for hungarian lang", () => {
    expect(getMeridiemOrder("hu")).toEqual(0);
  });
  it("returns 0 for japanese lang", () => {
    expect(getMeridiemOrder("ja")).toEqual(0);
  });
  it("returns 0 for korean lang", () => {
    expect(getMeridiemOrder("ko")).toEqual(0);
  });
  it("returns 0 for turkish lang", () => {
    expect(getMeridiemOrder("tr")).toEqual(0);
  });
  it("returns non-zero for ltr langs", () => {
    expect(getMeridiemOrder("el")).not.toEqual(0);
    expect(getMeridiemOrder("en")).not.toEqual(0);
    expect(getMeridiemOrder("es")).not.toEqual(0);
    expect(getMeridiemOrder("hi")).not.toEqual(0);
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
});

describe("localizeTimeStringToParts", () => {
  it("returns localized decimal separator and fractional second value", () => {
    expect(localizeTimeStringToParts({ value: "06:45:30.12123", locale: "fr" })).toEqual({
      localizedHour: "06",
      localizedHourSuffix: ":",
      localizedMinute: "45",
      localizedMinuteSuffix: ":",
      localizedSecond: "30",
      localizedDecimalSeparator: ",",
      localizedFractionalSecond: "12123",
      localizedSecondSuffix: null,
      localizedMeridiem: null,
    });

    expect(localizeTimeStringToParts({ value: "06:45:30", locale: "fr" })).toEqual({
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

    expect(localizeTimeStringToParts({ value: "06:45:30.12123", locale: "da" })).toEqual({
      localizedHour: "06",
      localizedHourSuffix: ".",
      localizedMinute: "45",
      localizedMinuteSuffix: ".",
      localizedSecond: "30",
      localizedDecimalSeparator: ",",
      localizedFractionalSecond: "12123",
      localizedSecondSuffix: null,
      localizedMeridiem: null,
    });
  });

  it("returns fractional second value with padded zeros when necessary", () => {
    expect(localizeTimeStringToParts({ value: "06:45:30.04", locale: "en" })).toEqual({
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
    expect(localizeTimeStringToParts({ value: "06:45:30.003", locale: "en" })).toEqual({
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
    expect(localizeTimeStringToParts({ value: "06:45:30.007", locale: "ar", numberingSystem: "arab" })).toEqual({
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
  it("returns hh:mm value when includeSeconds is false", () => {
    const fullTime = toISOTimeString("1:2:3", false);
    const partialTime = toISOTimeString("4:5", false);

    expect(fullTime).toBe("01:02");
    expect(partialTime).toBe("04:05");
  });

  it("returns hh:mm:ss value when includeSeconds is true", () => {
    const fullTime = toISOTimeString("1:2:3", true);
    const partialTime = toISOTimeString("3:4", true);

    expect(fullTime).toBe("01:02:03");
    expect(partialTime).toBe("03:04:00");
  });

  it("returns empty value with invalid time", () => {
    const result = toISOTimeString("25:34");
    expect(result).toBe("");
  });
});
