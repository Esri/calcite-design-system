import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  disabled,
  focusable,
  hidden,
  renders,
  slots,
  accessible,
} from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("calcite-swatch", () => {
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
      accessible(() =>
        mount(<calcite-swatch color="#c0ffee" label="swatch" selected value="123" />),
      );
    });
  });
});
