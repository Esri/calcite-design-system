import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  disabled,
} from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-autocomplete-item"),
    [
      { propertyName: "active", defaultValue: false },
      { propertyName: "description", defaultValue: undefined },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "heading", defaultValue: undefined },
      { propertyName: "iconEnd", defaultValue: undefined },
      { propertyName: "iconFlipRtl", defaultValue: undefined },
      { propertyName: "iconStart", defaultValue: undefined },
      { propertyName: "label", defaultValue: undefined },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "value", defaultValue: undefined },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-autocomplete-item"),
    [
      { propertyName: "disabled", value: true },
      { propertyName: "iconEnd", value: "banana" },
      { propertyName: "iconFlipRtl", value: "end" },
      { propertyName: "iconStart", value: "banana" },
      { propertyName: "selected", value: true },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-autocomplete-item"));
});

describe("renders", () => {
  renders(() => mount("calcite-autocomplete-item"), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-autocomplete-item"), SLOTS);
});

describe("disabled", () => {
  disabled(() => mount("calcite-autocomplete-item"), { focusTarget: "none" });
});
