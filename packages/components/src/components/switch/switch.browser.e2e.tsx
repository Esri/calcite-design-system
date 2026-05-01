import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  disabled,
  focusable,
  formAssociated,
  hidden,
  internalLabel,
} from "../../tests/commonTests/browser";

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
