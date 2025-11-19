import { describe, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-input-time-picker", () => {
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
      () => mount("calcite-input-time-picker"),
      [
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "step", defaultValue: 60 },
        { propertyName: "overlayPositioning", defaultValue: "absolute" },
        { propertyName: "status", defaultValue: "idle" },
        { propertyName: "validationIcon", defaultValue: undefined },
        { propertyName: "validationMessage", defaultValue: undefined },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount(`calcite-input-time-picker`),
      [
        { propertyName: "open", value: true },
        { propertyName: "disabled", value: true },
        { propertyName: "scale", value: "m" },
        { propertyName: "status", value: "invalid" },
        { propertyName: "validationIcon", value: true },
      ],
    );
  });
});
