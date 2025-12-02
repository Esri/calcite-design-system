import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

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
});
