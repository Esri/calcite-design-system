import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, focusable, hidden, renders, t9n } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

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

  describe("is focusable", () => {
    describe("focuses previous button when not on the first page", () => {
      focusable(() => mount(<calcite-pagination page-size="1" start-item="2" total-items="10" />), {
        shadowFocusTargetSelector: `[data-test-chevron="previous"]`,
      });
    });

    describe("focuses page number 1 when on the first page", () => {
      focusable(() => mount(<calcite-pagination page-size="1" start-item="1" total-items="10" />), {
        shadowFocusTargetSelector: `.${CSS.page}`,
      });
    });
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
