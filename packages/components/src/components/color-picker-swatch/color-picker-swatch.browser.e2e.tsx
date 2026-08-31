import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, accessible } from "../../tests/commonTests/browser";

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount("calcite-color-picker-swatch"));
  });

  describe("selected + value", () => {
    accessible(() => mount(<calcite-color-picker-swatch active />));
  });

  describe("color + value", () => {
    accessible(() => mount(<calcite-color-picker-swatch color="#c0ffee" />));
  });

  describe("color + active + value", () => {
    accessible(() => mount(<calcite-color-picker-swatch active color="#c0ffee" />));
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-color-picker-swatch"),
    [
      {
        propertyName: "active",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-color-picker-swatch"),
    [
      {
        propertyName: "active",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-color-picker-swatch"));
});

describe("renders", () => {
  renders(() => mount("calcite-color-picker-swatch"), { display: "inline-flex" });
});
