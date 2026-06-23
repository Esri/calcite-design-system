import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, hidden, renders, disabled } from "../../tests/commonTests/browser";

describe("accessible", () => {
  accessible(() => mount("calcite-sortable-list"));
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-sortable-list"));
});

describe("renders", () => {
  renders(
    () =>
      mount("calcite-sortable-list", {
        afterConnect: (el) => {
          el.dragSelector = ".calcite-sortable";
          el.innerHTML = `
            <div class="calcite-sortable">
              <calcite-handle></calcite-handle>1
            </div>
          `;
        },
      }),
    { display: "flex" },
  );
});

describe("disabled", () => {
  disabled(
    () =>
      mount("calcite-sortable-list", {
        afterConnect: (el) => {
          el.innerHTML = `
            <div id="one">
              <calcite-handle></calcite-handle>1
            </div>
            <div id="two">
              <calcite-handle></calcite-handle>2
            </div>
            <div id="three">
              <calcite-handle></calcite-handle>3
            </div>
          `;
        },
      }),
    { focusTarget: "child" },
  );
});
