import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  disabled,
  focusable,
  hidden,
  internalLabel,
  accessible,
} from "../../tests/commonTests/browser";

describe("calcite-switch", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-switch"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-switch`));
  });

  describe("focusable", () => {
    focusable(() => mount("calcite-switch"));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-switch"));
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() => mount(<calcite-switch label="test-label" />));
    });

    describe("checked", () => {
      accessible(() => mount(<calcite-switch checked label="test-label" />));
    });
  });
});
