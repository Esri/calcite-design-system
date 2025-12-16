import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { disabled, hidden, internalLabel } from "../../tests/commonTests/browser";

describe("calcite-switch", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-switch"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-switch`));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-switch"));
  });
});
