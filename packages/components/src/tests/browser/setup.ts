import { beforeAll, beforeEach, afterEach, vi } from "vitest";
import { css } from "../../../support/formatting";

beforeAll(() => {
  const style = document.createElement("style");
  style.innerHTML = css`
    :root {
      --calcite-duration-factor: 0;
    }
  `;
  document.head.append(style);
});

beforeEach(() => {
  // patching Intl to work around bug where `en-US@posix` is set as the locale in the CI environment
  // this might be resolved by https://github.com/Esri/calcite-design-system/issues/12739
  const originalDateTimeFormat = Intl.DateTimeFormat;
  const originalNumberFormat = Intl.NumberFormat;

  vi.spyOn(Intl, "DateTimeFormat").mockImplementation(function (locale, options?) {
    if (locale === "en-US@posix") {
      locale = "en-US";
    }

    return originalDateTimeFormat(locale, options);
  });

  vi.spyOn(Intl, "NumberFormat").mockImplementation(function (locale, options) {
    if (locale === "en-US@posix") {
      locale = "en-US";
    }

    return originalNumberFormat(locale, options);
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});
