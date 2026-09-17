import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, focusable, hidden, renders, t9n, disabled, themed } from "../../tests/common";
import { CSS } from "./resources";

describe("accessible", () => {
  accessible(() => mount("calcite-handle"));
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-handle"));
});

describe("renders", () => {
  renders(() => mount("calcite-handle"), { display: "flex" });
});

describe("focusable", () => {
  focusable(() => mount("calcite-handle"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-handle"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-handle"));
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-handle"), {
      "--calcite-handle-background-color": {
        shadowSelector: `.${CSS.handle}`,
        targetProp: "backgroundColor",
      },
      "--calcite-handle-background-color-hover": {
        shadowSelector: `.${CSS.handle}`,
        targetProp: "backgroundColor",
        state: "hover",
      },
      "--calcite-handle-icon-color": {
        shadowSelector: `.${CSS.handle}`,
        targetProp: "color",
      },
      "--calcite-handle-icon-color-hover": {
        shadowSelector: `.${CSS.handle}`,
        targetProp: "color",
        state: "hover",
      },
    });
  });
  describe("selected", () => {
    themed(() => mount(<calcite-handle selected />), {
      "--calcite-handle-background-color-selected": {
        shadowSelector: `.${CSS.handleSelected}`,
        targetProp: "backgroundColor",
      },
      "--calcite-handle-icon-color-selected": {
        shadowSelector: `.${CSS.handleSelected}`,
        targetProp: "color",
      },
    });
  });
});
