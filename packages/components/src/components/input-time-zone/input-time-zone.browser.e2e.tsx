import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  reflects,
  renders,
  t9n,
  openClose,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";

mockConsole();

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

describe("focusable", () => {
  focusable(() => mount("calcite-input-time-zone"));
});

describe("openClose", () => {
  openClose((mountOptions) => mount("calcite-input-time-zone", mountOptions));
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
