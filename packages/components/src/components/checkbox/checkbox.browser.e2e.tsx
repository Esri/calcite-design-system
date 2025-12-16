import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, internalLabel, t9n, disabled } from "../../tests/commonTests/browser";

describe("calcite-checkbox", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-checkbox"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-checkbox`));
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-checkbox"));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-checkbox"), {
      focusTarget: {
        tab: "calcite-checkbox",
        click: {
          pointer: "calcite-checkbox",
          method: "body",
        },
      },
    });
  });
});
