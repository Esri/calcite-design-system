import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  renders,
  slots,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { CSS, IDS, SLOTS } from "./resources";

describe("defaults", () => {
  defaults(() => mount("calcite-swatch"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount("calcite-swatch"));
  });

  describe("selected + value", () => {
    accessible(() => mount(<calcite-swatch label="swatch" selected value="123" />));
  });

  describe("color + value", () => {
    accessible(() => mount(<calcite-swatch color="#c0ffee" label="swatch" value="123" />));
  });

  describe("color + selected + value", () => {
    accessible(() => mount(<calcite-swatch color="#c0ffee" label="swatch" selected value="123" />));
  });
});

describe("disabled", () => {
  disabled(() => mount(<calcite-swatch interactive />));
});

describe("is focusable", () => {
  focusable(() => mount(<calcite-swatch interactive />));
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-swatch"));
});

describe("renders", () => {
  renders(() => mount("calcite-swatch"), { display: "block" });
});

describe("slots", () => {
  slots(() => mount("calcite-swatch"), SLOTS);
});

describe("themed", () => {
  describe("default", () => {
    themed(() => mount("calcite-swatch"), {
      "--calcite-swatch-corner-radius": [
        { shadowSelector: `.${CSS.container}`, targetProp: "borderRadius" },
        { shadowSelector: `#${IDS.swatchRect}`, targetProp: "rx" },
      ],
    });
  });
  describe("solid", () => {
    themed(() => mount(<calcite-swatch color="#ff8200" />), {
      "--calcite-swatch-corner-radius": [
        { shadowSelector: `#${IDS.swatchSolid}`, targetProp: "rx" },
      ],
    });
  });
  describe("transparent", () => {
    themed(() => mount(<calcite-swatch color="rgba(255, 255, 255, 0.5)" />), {
      "--calcite-swatch-corner-radius": [
        { shadowSelector: `#${IDS.swatchTransparent}`, targetProp: "rx" },
      ],
    });
  });
});
