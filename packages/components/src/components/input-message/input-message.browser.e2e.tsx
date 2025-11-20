import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden } from "../../tests/commonTests/browser";

describe("calcite-input-message", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount(<calcite-input-message>Text</calcite-input-message>));
  });
});
