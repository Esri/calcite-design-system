import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { focusable, hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-dropdown-item", () => {
  describe("is focusable", () => {
    focusable(() => mount(`calcite-dropdown-item`));
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-dropdown-item"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-dropdown-item"), { display: "flex" });
  });
});
