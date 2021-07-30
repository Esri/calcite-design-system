import { DateLocaleData } from "../components/calcite-date-picker/utils";
import {
  inRange,
  dateFromRange,
  dateFromISO,
  sameDate,
  prevMonth,
  nextMonth,
  localizeNumber,
  parseNumber,
  parseDateString,
  getOrder,
  dateToISO
} from "./date";

import arabic from "../components/calcite-date-picker/assets/calcite-date-picker/nls/ar.json";
import french from "../components/calcite-date-picker/assets/calcite-date-picker/nls/fr.json";
import korean from "../components/calcite-date-picker/assets/calcite-date-picker/nls/ko.json";

describe("dateToISO", () => {
  it("ISO string should consider local timezone", () => {
    const date = new Date(973717200000);
    expect(date.toISOString()).toEqual("2000-11-08T21:00:00.000Z");
    expect(dateToISO(date)).toEqual("2000-11-09");
  });
});

describe("inRange", () => {
  it("returns true if no min/max", () => {
    expect(inRange(new Date())).toEqual(true);
  });
  it("returns false when out of range, true when in range", () => {
    const min = new Date(2020, 0, 1);
    const value = new Date(2020, 1, 1);
    const max = new Date(2020, 2, 1);
    expect(inRange(value, min, max)).toEqual(true);
    expect(inRange(min, value, max)).toEqual(false);
    expect(inRange(min, max, value)).toEqual(false);
  });
});

describe("dateFromRange", () => {
  it("returns null from bad input", () => {
    expect(dateFromRange("sdafasdfasdf" as any)).toEqual(null);
  });
  it("returns date with no min/max", () => {
    const date = new Date();
    expect(dateFromRange(date)).toEqual(date);
  });
  it("returns correct date from range", () => {
    const min = new Date(2020, 0, 1);
    const value = new Date(2020, 1, 1);
    const max = new Date(2020, 2, 1);
    expect(dateFromRange(value, min, max)).toEqual(value);
    expect(dateFromRange(min, value, max)).toEqual(value);
    expect(dateFromRange(max, min, value)).toEqual(value);
  });
});

describe("dateFromISO", () => {
  it("returns null from bad input", () => {
    expect(dateFromISO("")).toBeNull();
    expect(() => {
      dateFromISO("asdflkjasdhoui");
    }).toThrow();
  });
  it("correctly parses ISO format", () => {
    const time = new Date(2011, 10, 29).getTime();
    expect(dateFromISO("2011-11-29").getTime()).toEqual(time);
    // note: if we expand dateFromISO to handle time,
    // these will need to be updated
    expect(dateFromISO("2011-11-29T15:52:30.5").getTime()).toEqual(time);
    expect(dateFromISO("2011-11-29T15:52:30.52").getTime()).toEqual(time);
    expect(dateFromISO("2011-11-29T15:52:18.867").getTime()).toEqual(time);
    expect(dateFromISO("2011-11-29T15:52:18.867Z").getTime()).toEqual(time);
    expect(dateFromISO("2011-11-29T15:52:18.867-03:30").getTime()).toEqual(time);
  });
  it("defaults to first of any missing units", () => {
    expect(dateFromISO("2011-11").getTime()).toEqual(new Date(2011, 10, 1).getTime());
    expect(dateFromISO("2011").getTime()).toEqual(new Date(2011, 0, 1).getTime());
  });
});

describe("sameDate", () => {
  it("returns false for bad input", () => {
    expect(sameDate(1 as any, "hey" as any)).toEqual(false);
  });
  it("returns true for same dates", () => {
    const d1 = new Date(2020, 0, 1);
    const d2 = new Date(2020, 0, 1);
    expect(sameDate(d1, d2)).toEqual(true);
  });
  it("returns false for different dates", () => {
    const d1 = new Date(2020, 0, 1);
    const d2 = new Date(2020, 0, 3);
    expect(sameDate(d1, d2)).toEqual(false);
  });
});

describe("prevMonth", () => {
  it("returns a date 1 month in the past", () => {
    const d1 = prevMonth(new Date(2020, 2, 23));
    expect(d1.getDate()).toEqual(23);
    expect(d1.getMonth()).toEqual(1);
    expect(d1.getFullYear()).toEqual(2020);
    const d2 = prevMonth(new Date(2020, 0, 23));
    expect(d2.getMonth()).toEqual(11);
    expect(d2.getFullYear()).toEqual(2019);
  });
  it("if date doesn't exist, uses last day of month", () => {
    const d1 = prevMonth(new Date(2020, 4, 31)); // May 31
    expect(d1.getDate()).toEqual(30);
    expect(d1.getMonth()).toEqual(3);
    expect(d1.getFullYear()).toEqual(2020);
  });
});

describe("nextMonth", () => {
  it("returns a date 1 month in the future", () => {
    const d1 = nextMonth(new Date(2020, 2, 23));
    expect(d1.getDate()).toEqual(23);
    expect(d1.getMonth()).toEqual(3);
    expect(d1.getFullYear()).toEqual(2020);
    const d2 = nextMonth(new Date(2020, 11, 23));
    expect(d2.getMonth()).toEqual(0);
    expect(d2.getFullYear()).toEqual(2021);
  });
  it("if date doesn't exist, uses last day of month", () => {
    const d1 = nextMonth(new Date(2020, 2, 31)); // March 31
    expect(d1.getFullYear()).toEqual(2020);
    expect(d1.getMonth()).toEqual(3);
    expect(d1.getDate()).toEqual(30);
  });
});

describe("localizeNumber", () => {
  it("preserves standard numerals", () => {
    const dummyLocale = { numerals: "0123456789" };
    expect(localizeNumber(123, dummyLocale as DateLocaleData)).toEqual("123");
  });
  it("converts standard numerals to arabic", () => {
    expect(localizeNumber(123, arabic as DateLocaleData)).toEqual("١٢٣");
  });
});

describe("parseNumber", () => {
  it("correctly parses number string", () => {
    const dummyLocale = { numerals: "0123456789" };
    expect(parseNumber("123", dummyLocale as DateLocaleData)).toEqual(123);
  });
  it("parses arabic number", () => {
    expect(parseNumber("٧٨٩", arabic as DateLocaleData)).toEqual(789);
  });
});

describe("parseDateString", () => {
  it("parses arabic date", () => {
    const parsed = parseDateString("٢٧‏/١١‏/٢٠٠٠", arabic as DateLocaleData);
    expect(parsed.day).toEqual(27);
    expect(parsed.month).toEqual(10);
    expect(parsed.year).toEqual(2000);
  });
  it("parses french date", () => {
    const parsed = parseDateString("27/11/2000", french as DateLocaleData);
    expect(parsed.day).toEqual(27);
    expect(parsed.month).toEqual(10);
    expect(parsed.year).toEqual(2000);
  });
  it("parses korean date", () => {
    const parsed = parseDateString("2000. 11. 27.", korean as DateLocaleData);
    expect(parsed.day).toEqual(27);
    expect(parsed.month).toEqual(10);
    expect(parsed.year).toEqual(2000);
  });
});

describe("getOrder", () => {
  it("derives order from various unit orders", () => {
    expect(getOrder("d‏/M‏/y")).toEqual(["d", "m", "y"]);
    expect(getOrder("DD.MM.YYYY")).toEqual(["d", "m", "y"]);
    expect(getOrder("MM/DD/YYYY")).toEqual(["m", "d", "y"]);
    expect(getOrder("YYYY/MM/DD")).toEqual(["y", "m", "d"]);
    expect(getOrder("YYYY. MM. DD.")).toEqual(["y", "m", "d"]);
  });
});
