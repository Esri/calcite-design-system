import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { CSS as ComboboxCSS } from "../combobox/resources";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  reflects,
  renders,
  scalePropagates,
  t9n,
  themed,
  openClose,
  topLayer,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";

mockConsole();

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

describe("scale propagation", () => {
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
