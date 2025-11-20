import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { internalLabel } from "../../tests/commonTests/browser";
import { cancelable, defaults, reflects, hidden } from "../../tests/commonTests/browser";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-autocomplete", () => {
  mockConsole();

  describe("cancelable", () => {
    cancelable("calcite-autocomplete");
  });

  describe("defaults", () => {
    defaults(
      () => mount("calcite-autocomplete"),
      [
        {
          propertyName: "alignment",
          defaultValue: "start",
        },
        {
          propertyName: "autocomplete",
          defaultValue: undefined,
        },
        {
          propertyName: "disabled",
          defaultValue: false,
        },
        {
          propertyName: "flipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "form",
          defaultValue: undefined,
        },
        {
          propertyName: "icon",
          defaultValue: undefined,
        },
        {
          propertyName: "iconFlipRtl",
          defaultValue: false,
        },
        {
          propertyName: "inputValue",
          defaultValue: undefined,
        },
        {
          propertyName: "label",
          defaultValue: undefined,
        },
        {
          propertyName: "loading",
          defaultValue: false,
        },
        {
          propertyName: "maxLength",
          defaultValue: undefined,
        },
        {
          propertyName: "minLength",
          defaultValue: undefined,
        },
        {
          propertyName: "name",
          defaultValue: undefined,
        },
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "pattern",
          defaultValue: undefined,
        },
        {
          propertyName: "placeholder",
          defaultValue: undefined,
        },
        {
          propertyName: "placement",
          defaultValue: defaultMenuPlacement,
        },
        {
          propertyName: "prefixText",
          defaultValue: undefined,
        },
        {
          propertyName: "readOnly",
          defaultValue: false,
        },
        {
          propertyName: "required",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "status",
          defaultValue: "idle",
        },
        {
          propertyName: "suffixText",
          defaultValue: undefined,
        },
        {
          propertyName: "validationIcon",
          defaultValue: undefined,
        },
        {
          propertyName: "validationMessage",
          defaultValue: undefined,
        },
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
            valid: false,
            valueMissing: false,
          },
        },
        {
          propertyName: "value",
          defaultValue: "",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-autocomplete"),
      [
        {
          propertyName: "alignment",
          value: "start",
        },
        {
          propertyName: "disabled",
          value: true,
        },
        {
          propertyName: "form",
          value: "test-form",
        },
        {
          propertyName: "icon",
          value: "banana",
        },
        {
          propertyName: "iconFlipRtl",
          value: true,
        },
        {
          propertyName: "loading",
          value: true,
        },
        {
          propertyName: "maxLength",
          value: 2,
        },
        {
          propertyName: "minLength",
          value: 2,
        },
        {
          propertyName: "name",
          value: "test-name",
        },
        {
          propertyName: "open",
          value: true,
        },

        {
          propertyName: "overlayPositioning",
          value: "absolute",
        },
        {
          propertyName: "placement",
          value: "bottom",
        },
        {
          propertyName: "readOnly",
          value: true,
        },
        {
          propertyName: "required",
          value: true,
        },
        {
          propertyName: "scale",
          value: "m",
        },
        {
          propertyName: "status",
          value: "invalid",
        },
        {
          propertyName: "validationIcon",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-autocomplete"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-autocomplete`));
  });
});
