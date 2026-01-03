import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, disabled, accessible } from "../../tests/commonTests/browser";

describe("calcite-sortable-list", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-sortable-list"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-sortable-list drag-selector=".calcite-sortable">
            <div>
              <calcite-handle />1
            </div>
          </calcite-sortable-list>,
        ),
      { display: "flex" },
    );
  });

  describe("disabled", () => {
    disabled(
      () =>
        mount(
          <calcite-sortable-list>
            <div id="one">
              <calcite-handle />1
            </div>
            <div id="two">
              <calcite-handle />2
            </div>
            <div id="three">
              <calcite-handle />3
            </div>
          </calcite-sortable-list>,
        ),
      { focusTarget: "child" },
    );
  });

  describe("accessible", () => {
    accessible(() => mount("calcite-sortable-list"));
  });
});
