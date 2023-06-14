import { toISOTimeString } from "./time";

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
