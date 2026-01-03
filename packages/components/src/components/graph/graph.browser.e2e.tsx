import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, accessible } from "../../tests/commonTests/browser";
import { Graph } from "./graph";

describe("calcite-graph", () => {
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

  function setUpData(el: Graph["el"]): void {
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
  }

  describe("renders", () => {
    renders(
      () =>
        mount(`calcite-graph`, {
          afterConnect: setUpData,
        }),
      { display: "block" },
    );
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() => mount("calcite-graph"));
    });

    describe("with data", () => {
      accessible(() =>
        mount(`calcite-graph`, {
          afterConnect: setUpData,
        }),
      );
    });
  });
});
