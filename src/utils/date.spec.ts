import {
  inRange,
  dateFromRange,
  dateFromISO,
  sameDate,
  prevMonth,
  nextMonth
} from "./date";

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
    expect(dateFromISO("")).toEqual(null);
    expect(dateFromISO("asdflkjasdhoui")).toEqual(null);
  });
  it("correctly parses ISO format", () => {
    const time = new Date(2011, 10, 29).getTime();
    expect(dateFromISO('2011-11-29').getTime()).toEqual(time)
    // note: if we expand dateFromISO to handle time,
    // these will need to be updated
    expect(dateFromISO('2011-11-29T15:52:30.5').getTime()).toEqual(time)
    expect(dateFromISO('2011-11-29T15:52:30.52').getTime()).toEqual(time)
    expect(dateFromISO('2011-11-29T15:52:18.867').getTime()).toEqual(time)
    expect(dateFromISO('2011-11-29T15:52:18.867Z').getTime()).toEqual(time)
    expect(dateFromISO('2011-11-29T15:52:18.867-03:30').getTime()).toEqual(time)
  });
  it("defaults to first of any missing units", () => {
    expect(dateFromISO('2011-11').getTime()).toEqual(new Date(2011, 10, 1).getTime());
    expect(dateFromISO('2011').getTime()).toEqual(new Date(2011, 0, 1).getTime())
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
    var d1 = nextMonth(new Date(2020, 2, 23));
    expect(d1.getDate()).toEqual(23);
    expect(d1.getMonth()).toEqual(3);
    expect(d1.getFullYear()).toEqual(2020);
    var d2 = nextMonth(new Date(2020, 11, 23));
    expect(d2.getMonth()).toEqual(0);
    expect(d2.getFullYear()).toEqual(2021);
  });
  it("if date doesn't exist, uses last day of month", () => {
    var d1 = nextMonth(new Date(2020, 2, 31)); // March 31
    expect(d1.getFullYear()).toEqual(2020);
    expect(d1.getMonth()).toEqual(3);
    expect(d1.getDate()).toEqual(30);
  });
});

