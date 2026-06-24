import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  disabled,
  focusable,
  formAssociated,
  hidden,
  internalLabel,
  renders,
  accessible,
} from "../../tests/commonTests/browser";

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
