import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, themed } from "../../tests/common";

import { CSS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-segmented-control-item"),
    [{ propertyName: "scale", defaultValue: "m" }],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-segmented-control-item"));
});

describe("renders", () => {
  renders(() => mount("calcite-segmented-control-item"), { display: "flex" });
});

describe("theme", () => {
  themed(() => mount("calcite-segmented-control-item"), {
    "--calcite-segmented-control-color": {
      shadowSelector: `.${CSS.label}`,
      targetProp: "color",
    },
    "--calcite-segmented-control-background-color": {
      shadowSelector: `.${CSS.label}`,
      targetProp: "backgroundColor",
    },
    "--calcite-segmented-control-corner-radius": {
      shadowSelector: `.${CSS.label}`,
      targetProp: "borderRadius",
      expectedValue: "40px",
    },
    "--calcite-segmented-control-shadow": {
      shadowSelector: `.${CSS.label}`,
      targetProp: "boxShadow",
    },
  });
  themed(
    () =>
      mount(
        <calcite-segmented-control-item icon-start="car">Content</calcite-segmented-control-item>,
      ),
    {
      "--calcite-segmented-control-icon-color": {
        shadowSelector: `.${CSS.icon}`,
        targetProp: "--calcite-icon-color",
      },
    },
  );
});
