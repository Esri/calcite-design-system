import { describe } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, slots, accessible } from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("calcite-shell", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-shell"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-shell"), { display: "flex" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-shell"), SLOTS);
  });

  describe("accessible", () => {
    accessible(() =>
      mount(
        <calcite-shell>
          <calcite-shell-panel position="start" slot="${SLOTS.panelStart}">
            <p>Primary Content</p>
          </calcite-shell-panel>
          <calcite-shell-panel position="end" slot="${SLOTS.panelEnd}">
            <p>Primary Content</p>
          </calcite-shell-panel>
        </calcite-shell>,
      ),
    );
  });
});
