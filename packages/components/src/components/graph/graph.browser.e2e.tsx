import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import type { Graph } from "./graph";
import type { Point } from "./interfaces";
import { accessible, defaults, hidden, renders, themed } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

const data: Point[] = [
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

describe("accessible", () => {
  accessible(() => mount("calcite-graph"));
});

describe("accessible: with data", () => {
  accessible(() => mount<Graph>(<calcite-graph data={data} highlightMax={75} highlightMin={25} />));
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

describe("theme", () => {
  themed(
    async () => {
      const rendered = await mount("calcite-graph");

      Object.assign(rendered.el, {
        data: [
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
        ],
        highlightMax: 75,
        highlightMin: 25,
      });

      await rendered.component.updateComplete;

      return rendered;
    },
    {
      "--calcite-graph-highlight-fill-color": {
        shadowSelector: `.${CSS.graphPathHighlight}`,
        targetProp: "fill",
      },
    },
  );
});
