import { adjustIconScale } from "./iconScaleAdjuster";

describe("adjustIconScale", () => {
  it('returns "m" when the input is "l"', () => {
    expect(adjustIconScale("l")).toBe("m");
  });

  it('returns "s" when the input is not "l"', () => {
    expect(adjustIconScale("m")).toBe("s");
    expect(adjustIconScale("s")).toBe("s");
  });
});
