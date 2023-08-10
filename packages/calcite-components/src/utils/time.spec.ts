import { isValidTime, localizeTimeStringToParts, parseTimeString, toISOTimeString } from "./time";

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
      localizedFractionalSecond: "121",
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
      localizedFractionalSecond: "121",
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
  it("returns real fractional second, rounded to the nearest millisecond", () => {
    expect(parseTimeString("12:30:45.0")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: null,
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
      fractionalSecond: null,
    });
    expect(parseTimeString("12:30:45.0049")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "005",
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
      fractionalSecond: "123",
    });
    expect(parseTimeString("12:30:45.12345")).toEqual({
      hour: "12",
      minute: "30",
      second: "45",
      fractionalSecond: "123",
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
