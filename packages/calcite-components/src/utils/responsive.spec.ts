import { getBreakpoints } from "./responsive";
import { toBeInteger } from "../tests/utils";

describe("getBreakpoints()", () => {
  // skipped due to JSDOM bugs with inheritance/getComputedStyle
  // see https://github.com/jsdom/jsdom/issues/2160 and https://github.com/jsdom/jsdom/issues/3563
  it.skip("returns breakpoints lookup object", async () => {
    document.head.innerHTML = `
      <style>
        :root {
        --calcite-core-breakpoint-width-lg: 1000px;
        --calcite-core-breakpoint-width-md: 100px;
        --calcite-core-breakpoint-width-sm: 10px;
        --calcite-core-breakpoint-width-xs: 1px;
      }
      </style>
    `;

    expect(await getBreakpoints()).toMatchObject({
      width: {
        large: toBeInteger(),
        medium: toBeInteger(),
        small: toBeInteger(),
        xsmall: toBeInteger(),
      },
    });
  });
});
