import { parseNumberString } from "./number";

describe("parseNumberString", () => {
  it("returns null if number string is not a valid number", async () => {
    expect(parseNumberString("undefined")).toBe(null);
    expect(parseNumberString("asdfawerasdfwer")).toBe(null);
    expect(parseNumberString("")).toBe(null);
  });
  it("returns valid number if number string is a valid number", async () => {
    expect(parseNumberString("123.234")).toBe(123.234);
  });
});
