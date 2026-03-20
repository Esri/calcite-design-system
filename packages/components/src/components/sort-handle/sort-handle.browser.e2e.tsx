import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(
    () => mount("calcite-sort-handle"),
    [
      {
        propertyName: "sortDisabled",
        defaultValue: false,
      },
      {
        propertyName: "setPosition",
        defaultValue: undefined,
      },
      {
        propertyName: "setSize",
        defaultValue: undefined,
      },
      {
        propertyName: "moveToItems",
        defaultValue: [],
      },
      {
        propertyName: "addToItems",
        defaultValue: [],
      },
      {
        propertyName: "placement",
        defaultValue: "bottom-start",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-sort-handle"),
    [
      {
        propertyName: "sortDisabled",
        value: true,
      },
      {
        propertyName: "placement",
        value: "leading-start",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-sort-handle"));
});

describe("renders", () => {
  renders(() => mount("calcite-sort-handle"), { display: "flex" });
});

describe("focusable", () => {
  focusable(() => mount(<calcite-sort-handle label="test" set-position="4" set-size="10" />));
});

describe("translation support", () => {
  t9n(() => mount("calcite-sort-handle"));
});

describe("disabled", () => {
  disabled(() => mount(<calcite-sort-handle label="test" set-position="4" set-size="10" />));
});
