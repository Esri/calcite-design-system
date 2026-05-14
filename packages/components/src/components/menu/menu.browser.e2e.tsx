import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { focusable, hidden, renders, t9n } from "../../tests/commonTests/browser";

describe("honors hidden attribute", () => {
  hidden(() =>
    mount(
      <calcite-menu>
        <calcite-menu-item text="calcite" />
      </calcite-menu>,
    ),
  );
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-menu>
          <calcite-menu-item text="calcite" />
        </calcite-menu>,
      ),
    {
      display: "flex",
    },
  );
});

describe("focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-menu>
          <calcite-menu-item text="calcite" />
        </calcite-menu>,
      ),
    {
      focusTargetSelector: "calcite-menu-item",
    },
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-menu"));
});
