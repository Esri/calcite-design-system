import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  internalLabel,
  t9n,
} from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(
    () => mount("calcite-checkbox"),
    [
      {
        propertyName: "validity",
        defaultValue: {
          badInput: false,
          customError: false,
          patternMismatch: false,
          rangeOverflow: false,
          rangeUnderflow: false,
          stepMismatch: false,
          tooLong: false,
          tooShort: false,
          typeMismatch: false,
          valid: true,
          valueMissing: false,
        },
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-checkbox"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-checkbox`));
});

describe("is focusable", () => {
  focusable(() => mount("calcite-checkbox"), {
    shadowFocusTargetSelector: ".toggle",
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-checkbox"));
  });
});

describe("is form associated", () => {
  formAssociated(() => mount("calcite-checkbox"), {
    inputType: "checkbox",
    testValue: true,
  });
});

describe("disabled", () => {
  disabled(() => mount("calcite-checkbox"), {
    focusTarget: {
      tab: "calcite-checkbox",
      click: {
        pointer: "calcite-checkbox",
        method: "body",
      },
    },
  });
});
