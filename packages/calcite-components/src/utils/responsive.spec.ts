import { toBeInteger } from "../tests/utils";
import { breakpoints } from "./responsive";

describe("breakpoints", () => {
  it("provides a breakpoints lookup object", async () => {
    expect(breakpoints).toMatchObject({
      width: {
        large: toBeInteger(),
        medium: toBeInteger(),
        small: toBeInteger(),
        xsmall: toBeInteger(),
        xxsmall: toBeInteger(),
      },
    });
  });
});
