import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, defaults } from "../../tests/common";

describe("calcite-virtualizer", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-virtualizer"),
      [
        {
          propertyName: "scroller",
          defaultValue: false,
        },
      ],
    );
  });

  describe("renders", () => {
    renders(() => mount("calcite-virtualizer"));
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-virtualizer"));
  });
});
