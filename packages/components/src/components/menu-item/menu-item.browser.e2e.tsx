import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { reflects, hidden } from "../../tests/commonTests/browser";

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
});
