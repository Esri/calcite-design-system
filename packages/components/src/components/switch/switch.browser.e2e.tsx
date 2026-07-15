import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { CSS } from "./resources";
import {
  disabled,
  focusable,
  formAssociated,
  hidden,
  internalLabel,
  defaults,
  renders,
  accessible,
  themed,
  reflects,
} from "../../tests/commonTests/browser";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount(<calcite-switch label="test-label" />));
  });

  describe("checked", () => {
    accessible(() => mount(<calcite-switch checked label="test-label" />));
  });
});

describe("renders", () => {
  renders(() => mount("calcite-switch"), { display: "inline-block" });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-switch"),
    [
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
      {
        propertyName: "required",
        defaultValue: false,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-switch"),
    [
      {
        propertyName: "required",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-switch"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-switch`));
});

describe("focusable", () => {
  focusable(() => mount("calcite-switch"));
});

describe("is form-associated", () => {
  formAssociated(() => mount("calcite-switch"), { testValue: true, inputType: "checkbox" });
});

describe("disabled", () => {
  disabled(() => mount("calcite-switch"));
});

describe("themed", () => {
  describe("default", () => {
    themed(() => mount("calcite-switch"), {
      "--calcite-switch-background-color": {
        shadowSelector: `.${CSS.track}`,
        targetProp: "backgroundColor",
      },
      "--calcite-switch-background-color-hover": {
        shadowSelector: `.${CSS.track}`,
        targetProp: "backgroundColor",
        state: "hover",
      },
      "--calcite-switch-corner-radius": {
        shadowSelector: `.${CSS.track}`,
        targetProp: "borderRadius",
      },
      "--calcite-switch-handle-background-color": {
        shadowSelector: `.${CSS.handle}`,
        targetProp: "backgroundColor",
      },
    });
  });

  describe("deprecated", () => {
    themed(() => mount("calcite-switch"), {
      "--calcite-switch-border-color": {
        shadowSelector: `.${CSS.track}`,
        targetProp: "borderColor",
      },
      "--calcite-switch-handle-border-color": {
        shadowSelector: `.${CSS.handle}`,
        targetProp: "borderColor",
      },
      "--calcite-switch-handle-shadow": {
        shadowSelector: `.${CSS.handle}`,
        targetProp: "boxShadow",
      },
    });
  });
});
