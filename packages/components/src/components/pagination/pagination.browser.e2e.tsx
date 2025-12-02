import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, t9n } from "../../tests/commonTests/browser";

describe("calcite-pagination", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-pagination"),
      [
        {
          propertyName: "totalItems",
          defaultValue: 0,
        },
        {
          propertyName: "startItem",
          defaultValue: 1,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-pagination"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-pagination"), { display: "flex" });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-pagination"));
  });
});
