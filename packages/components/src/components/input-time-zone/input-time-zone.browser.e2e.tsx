import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { CSS as ComboboxCSS } from "../combobox/resources";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  labelable,
  reflects,
  renders,
  scalePropagates,
  t9n,
  themed,
  openClose,
  topLayer,
} from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { defaultValidity } from "../../tests/common/defaults";
import { logger } from "../../utils/logger";
import { createTimeZoneItems, findTimeZoneItemByProp } from "./utils";

const DateTimeFormat = Intl.DateTimeFormat;

mockConsole();

describe("Factory compatibility", () => {
  it.each([
    ["name", true],
    ["region", true],
    ["offset", true],
    ["name", false],
    ["region", false],
    ["offset", false],
  ] as const)("preserves values in %s mode when native support is %s", async (mode, supported) => {
    vi.spyOn(Intl, "DateTimeFormat").mockImplementation(function (locale, options) {
      if (options?.timeZone === "Factory") {
        if (!supported) {
          throw new RangeError("Unsupported time zone: Factory");
        }

        return new DateTimeFormat(locale, { ...options, timeZone: "Etc/GMT" });
      }

      return new DateTimeFormat(locale, options);
    });
    const warnSpy = vi.spyOn(logger, "warn");
    const value = mode === "offset" ? "0" : "Factory";
    const { el } = await mount(<calcite-input-time-zone mode={mode} value={value} />);

    await expect.element(el).toHaveProperty("value", value);
    await expect
      .element(page.getBySelector("calcite-combobox-item[selected]"))
      .toHaveAttribute("value", value);

    const compatibilityWarnings = warnSpy.mock.calls.filter(([message]) =>
      message.startsWith("[input-time-zone]"),
    );
    expect(compatibilityWarnings).toEqual(
      mode === "offset" && !supported
        ? [
            [
              `[input-time-zone] The browser does not support the "Factory" time zone. Using a zero offset for compatibility; use a supported IANA time zone instead.`,
            ],
          ]
        : [],
    );
  });
});

describe(createTimeZoneItems, () => {
  it("preserves the Factory message override in region mode", async () => {
    const { component } = await mount<"calcite-input-time-zone">(
      <calcite-input-time-zone mode="name" />,
    );
    const items = await createTimeZoneItems(
      "en",
      { ...component.messages, Factory: "Custom Factory label" },
      "region",
      new Date("2026-01-01"),
      "gmt",
    );

    expect(findTimeZoneItemByProp(items, "value", "Factory")?.label).toBe("Custom Factory label");
  });

  it.each([
    ["Factory", new TypeError("Unexpected formatter error")],
    ["Africa/Abidjan", new RangeError("Unsupported time zone")],
  ])("does not suppress unrelated formatting errors for %s", async (timeZone, error) => {
    const { component } = await mount<"calcite-input-time-zone">(
      <calcite-input-time-zone mode="name" />,
    );
    vi.spyOn(Intl, "DateTimeFormat").mockImplementation(function (locale, options) {
      if (options?.timeZone === timeZone) {
        throw error;
      }

      return new DateTimeFormat(locale, options);
    });

    await expect(
      createTimeZoneItems("en", component.messages, "offset", new Date("2026-01-01"), "gmt"),
    ).rejects.toBe(error);
  });
});

describe("labelable", () => {
  labelable((mountOptions) => mount("calcite-input-time-zone", mountOptions));
});

describe("accessible", () => {
  accessible(() => mount("calcite-input-time-zone"));
});

/**
 * This file hosts component tests that do not depend on dynamic time zone changes.
 * Those tests reside in `input-time-zone.time-zone.browser.e2e.tsx`, which need to be run separate from the main test script
 */

describe("defaults", () => {
  defaults(
    () => mount("calcite-input-time-zone"),
    [
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "label", defaultValue: undefined },
      { propertyName: "labelText", defaultValue: undefined },
      { propertyName: "maxItems", defaultValue: 0 },
      { propertyName: "messageOverrides", defaultValue: undefined },
      { propertyName: "mode", defaultValue: "offset" },
      { propertyName: "open", defaultValue: false },
      { propertyName: "overlayPositioning", defaultValue: "absolute" },
      { propertyName: "placeholder", defaultValue: undefined },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "status", defaultValue: "idle" },
      { propertyName: "validationIcon", defaultValue: undefined },
      { propertyName: "validationMessage", defaultValue: undefined },
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-input-time-zone"),
    [
      { propertyName: "disabled", value: true },
      { propertyName: "maxItems", value: 0 },
      { propertyName: "mode", value: "offset" },
      { propertyName: "open", value: true },
      { propertyName: "scale", value: "m" },
      { propertyName: "overlayPositioning", value: "absolute" },
      { propertyName: "status", value: "invalid" },
      { propertyName: "validationIcon", value: true },
    ],
  );
});

describe("hidden", () => {
  hidden(() => mount("calcite-input-time-zone"));
});

describe("renders", () => {
  renders(() => mount("calcite-input-time-zone"), { display: "block" });
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-input-time-zone />, mountOptions), {
    targetSelector: "calcite-combobox",
  });
});

describe("focusable", () => {
  focusable(() => mount("calcite-input-time-zone"));
});

describe("openClose", () => {
  openClose((mountOptions) => mount("calcite-input-time-zone", mountOptions));
});

describe("top layer placement", () => {
  topLayer(() => mount("calcite-input-time-zone"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-input-time-zone"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-input-time-zone"));
});

describe("is form-associated", () => {
  formAssociated(() => mount("calcite-input-time-zone"), {
    testValue: "-360",
    clearable: false,
  });
});

describe("theme", () => {
  themed(() => mount("calcite-input-time-zone"), {
    "--calcite-input-time-zone-corner-radius": [
      {
        shadowSelector: "calcite-combobox",
        targetProp: "--calcite-combobox-corner-radius",
      },
      {
        shadowSelector: `calcite-combobox >>> .${ComboboxCSS.wrapper}`,
        targetProp: "borderRadius",
      },
    ],
  });
});
