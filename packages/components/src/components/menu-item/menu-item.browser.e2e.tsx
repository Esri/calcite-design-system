import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { reflects, hidden, renders, focusable } from "../../tests/commonTests/browser";

describe("calcite-menu-item", () => {
  describe("reflects", () => {
    reflects(
      () => mount("calcite-menu-item"),
      [
        {
          propertyName: "active",
          value: "true",
        },
        {
          propertyName: "target",
          value: "_blank",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-menu-item"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-menu-item"), { display: "flex" });
  });

  describe("is focusable", () => {
    focusable(() => mount("calcite-menu-item"));
  });
});
