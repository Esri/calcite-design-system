import { getIconScale } from "./component";

describe("getIconScale", () => {
  it('should return "m" when input is "l"', () => {
    expect(getIconScale("l")).toBe("m");
  });

  it('should return "s" when input is not "l"', () => {
    expect(getIconScale("m")).toBe("s");
    expect(getIconScale("s")).toBe("s");
  });
});
