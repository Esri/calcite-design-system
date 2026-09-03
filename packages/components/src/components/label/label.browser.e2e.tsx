import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, themed } from "../../tests/commonTests/browser";

import { CSS } from "./resources";

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-label"));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-label"),
    [
      {
        propertyName: "alignment",
        defaultValue: "start",
      },
      {
        propertyName: "layout",
        defaultValue: "block",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("renders", () => {
  renders(() => mount("calcite-label"), { display: "flex" });
});

describe("theme", () => {
  describe("default", () => {
    themed(
      () =>
        mount(
          <calcite-label>
            Label text
            <calcite-input />
          </calcite-label>,
        ),
      {
        "--calcite-label-margin-bottom": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "marginBlockEnd",
        },
        "--calcite-label-text-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "color",
        },
      },
    );
  });
});
