import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders } from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(
    () => mount("calcite-color-picker-swatch"),
    [
      {
        propertyName: "active",
        defaultValue: false,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-color-picker-swatch"),
    [
      {
        propertyName: "active",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-color-picker-swatch"));
});

describe("renders", () => {
  renders(() => mount("calcite-color-picker-swatch"), { display: "inline-flex" });
});
