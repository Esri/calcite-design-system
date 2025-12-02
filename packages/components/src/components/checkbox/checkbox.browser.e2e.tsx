import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { focusable, hidden, internalLabel, t9n } from "../../tests/commonTests/browser";

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

    describe("translation support", () => {
      t9n(() => mount("calcite-checkbox"));
    });
  });
});
