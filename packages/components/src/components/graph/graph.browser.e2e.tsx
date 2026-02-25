import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders } from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(
    () => mount("calcite-graph"),
    [
      {
        propertyName: "data",
        defaultValue: [],
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-graph"));
});

describe("renders", () => {
  renders(
    () =>
      mount(`calcite-graph`, {
        afterConnect: (el) => {
          el.data = [
            [0, 0],
            [10, 80],
            [20, 20],
            [30, 30],
            [40, 42],
            [50, 50],
            [60, 55],
            [70, 48],
            [80, 30],
            [90, 10],
            [100, 0],
          ];
          el.min = 0;
          el.max = 100;
          el.style.height = "100px";
        },
      }),
    { display: "block" },
  );
});
