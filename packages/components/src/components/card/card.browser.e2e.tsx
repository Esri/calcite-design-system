import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, focusable, renders, slots, t9n } from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("calcite-card", () => {
  describe("focusable", () => {
    describe("default", () => {
      focusable(() => mount("calcite-card"));
    });

    describe("with interactive children", () => {
      focusable(() =>
        mount(
          <calcite-card id="parent">
            <div tabIndex={0}>focusable child</div>
          </calcite-card>,
        ),
      );
    });
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-card"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-card"), { display: "block" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-card"), SLOTS, true);
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-card"));
  });
});
