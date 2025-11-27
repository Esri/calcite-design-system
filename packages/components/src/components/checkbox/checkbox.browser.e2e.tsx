import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { internalLabel, focusable } from "../../tests/commonTests/browser";
import { hidden } from "../../tests/commonTests/browser";

describe("calcite-checkbox", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-checkbox"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-checkbox`));
  });

  describe("is focusable", () => {
    focusable(() => mount("calcite-checkbox"), {
      shadowFocusTargetSelector: ".toggle",
    });
  });
});
