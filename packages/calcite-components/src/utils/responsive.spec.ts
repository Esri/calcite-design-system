import { getBreakpoints } from "./responsive";
import { toBeInteger } from "../tests/utils";

describe("getBreakpoints()", () => {
  // skipped due to JSDOM bugs with inheritance/getComputedStyle
  // see https://github.com/jsdom/jsdom/issues/2160 and https://github.com/jsdom/jsdom/issues/3563
  it.skip("returns breakpoints lookup object", async () => {
    document.head.innerHTML = `
      <style>
        :root {
        --calcite-app-breakpoint-width-lg: 10000px;
        --calcite-app-breakpoint-width-md: 1000px;
        --calcite-app-breakpoint-width-sm: 100px;
        --calcite-app-breakpoint-width-xs: 10px;
        --calcite-app-breakpoint-width-xxs: 1px;
      }
      </style>
    `;

    expect(await getBreakpoints()).toMatchObject({
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
