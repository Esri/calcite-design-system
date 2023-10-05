import { getIconScale } from "./iconScaleAdjuster";

describe("getIconScale", () => {
  it('returns "m" when the input is "l"', () => {
    expect(getIconScale("l")).toBe("m");
  });

  it('returns "s" when the input is not "l"', () => {
    expect(getIconScale("m")).toBe("s");
    expect(getIconScale("s")).toBe("s");
  });
});
