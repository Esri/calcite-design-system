import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, themed } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-tab"),
    [
      { propertyName: "tab", defaultValue: undefined },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "scale", defaultValue: "m" },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-tab"));
});

describe("renders", () => {
  renders(() => mount(<calcite-tab>A tab</calcite-tab>), { display: "none", visible: false });

  describe("selected", () => {
    renders(() => mount(<calcite-tab selected>A tab</calcite-tab>), { display: "flex" });
  });
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-tab"), {
      "--calcite-tab-content-space-y": {
        shadowSelector: `.${CSS.content}`,
        targetProp: "paddingBlock",
      },
    });
  });
});
