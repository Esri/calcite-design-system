import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, disabled, focusable, hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-link", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-link"),
      [
        {
          propertyName: "download",
          defaultValue: false,
        },
      ],
    );
  });

  describe("focusable", () => {
    describe("default", () => {
      focusable(() => mount(<calcite-link>link</calcite-link>));
    });

    describe("with href", () => {
      focusable(() => mount(<calcite-link href="/">link</calcite-link>));
    });
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-link"));
  });

  describe("renders", () => {
    renders(() => mount(<calcite-link href="/">link</calcite-link>), { display: "inline" });
  });

  describe("disabled", () => {
    disabled(() => mount(<calcite-link href="/">link</calcite-link>));
  });
});
