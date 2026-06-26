import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, defaults, hidden, renders, t9n, themed } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("accessible: checked", () => {
  accessible(() => mount("calcite-tab-nav"));
});

describe("defaults", () => {
  defaults(() => mount("calcite-tab-nav"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-tab-nav"));
});

describe("renders", () => {
  renders(() => mount("calcite-tab-nav"), { display: "flex" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-tab-nav"));
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount(<calcite-tab-nav />), {
      "--calcite-tab-border-color": {
        shadowSelector: `.${CSS.scrollBackwardButton}::before`,
        targetProp: "backgroundColor",
      },
      "--calcite-tab-text-color": {
        shadowSelector: `calcite-button`,
        targetProp: "--calcite-button-text-color",
      },
    });
  });

  describe("bordered", () => {
    themed(() => mount(<calcite-tabs bordered />), {
      "--calcite-tab-background-color": {
        targetProp: "backgroundColor",
      },
    });
  });
});
