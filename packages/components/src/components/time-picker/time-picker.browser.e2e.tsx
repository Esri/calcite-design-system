import { describe, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-time-picker", () => {
  mockConsole();

  beforeEach(() => {
    // patching Intl to work around bug where `en-US@posix` is set as the locale in the CI environment
    // this might be resolved by https://github.com/Esri/calcite-design-system/issues/12739
    const originalDateTimeFormat = Intl.DateTimeFormat;
    const originalNumberFormat = Intl.NumberFormat;

    vi.spyOn(Intl, "DateTimeFormat").mockImplementation((locale, options?) => {
      if (locale === "en-US@posix") {
        locale = "en-US";
      }

      return new originalDateTimeFormat(locale, options);
    });

    vi.spyOn(Intl, "NumberFormat").mockImplementation((locale, options) => {
      if (locale === "en-US@posix") {
        locale = "en-US";
      }

      return new originalNumberFormat(locale, options);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("defaults", () => {
    defaults(
      () => mount("calcite-time-picker"),
      [
        { propertyName: "hourFormat", defaultValue: "user" },
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "step", defaultValue: 60 },
      ],
    );
  });
});
