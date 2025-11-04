import { describe, expect, it } from "vitest";
import { toBeInteger } from "../tests/utils/puppeteer";
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
