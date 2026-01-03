import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, t9n, accessible } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-scrim", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-scrim"),
      [
        {
          propertyName: "loading",
          defaultValue: false,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-scrim"));
  });

  describe("renders", () => {
    renders(() => mount(<calcite-scrim />), { display: "flex" });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-scrim"));
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() => mount(<calcite-scrim>My content</calcite-scrim>));
    });

    describe("when loading", () => {
      accessible(() => mount(<calcite-scrim loading>My content</calcite-scrim>));
    });
  });
});
