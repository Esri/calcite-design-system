import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, disabled } from "../../tests/commonTests/browser";

describe("calcite-dropdown-item", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-dropdown-item"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-dropdown-item"), { display: "flex" });
  });

  describe("disabled", () => {
    disabled(() => mount(`calcite-dropdown-item`));
  });
});
