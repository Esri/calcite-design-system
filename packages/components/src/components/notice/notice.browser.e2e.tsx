import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden } from "../../tests/commonTests/browser";

describe("calcite-notice", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-notice"));
  });
});
