import { newE2EPage, E2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, renders, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-graph", () => {
  describe("renders", () => {
    renders(`<calcite-graph></calcite-graph>`, { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-graph");
  });

  describe("accessible", () => {
    accessible("calcite-graph");
  });

  describe("accessible: with data", () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent("<calcite-graph></calcite-graph>");
      await page.$eval("calcite-graph", (el: HTMLCalciteGraphElement) => {
        el.data = [
          [0, 4],
          [1, 7],
          [4, 6],
          [6, 2],
        ];
      });

      await page.waitForChanges();
    });

    accessible(() => ({ tag: "calcite-graph", page }));
  });

  describe("defaults", () => {
    defaults("calcite-graph", [
      {
        propertyName: "data",
        defaultValue: [],
      },
    ]);
  });

  it("draws an area graph", async () => {
    const dimensionsStyle = `style="height:100px; width:300px;"`;
    const page = await newE2EPage();
    await page.setContent(`<calcite-graph ${dimensionsStyle}></calcite-graph>`);
    await page.$eval("calcite-graph", (el: HTMLCalciteGraphElement) => {
      el.data = [
        [0, 4],
        [1, 7],
        [4, 6],
        [6, 2],
      ];
    });
    await page.waitForChanges();
    const path = await page.find("calcite-graph >>> path");
    const d = path.getAttribute("d");
    expect(d).toBe(
      "M 0,60 L 0,20 L 0,20 C 16.666666666666664,-10.000000000000014 33.333333333333336,-40 50,-40 C 100,-40 150,-33.33333333333334 200,-20 C 233.33333333333334,-11.111111111111114 266.66666666666663,24.444444444444443 300,60 L 300,60 Z",
    );
  });

  it("uses color-stops when provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-graph></calcite-graph>`);
    await page.$eval("calcite-graph", (el: HTMLCalciteGraphElement) => {
      el.data = [
        [0, 4],
        [1, 7],
        [4, 6],
        [6, 2],
      ];
      el.colorStops = [
        { offset: 0, color: "red" },
        { offset: 0.5, color: "green" },
        { offset: 1, color: "blue" },
      ];
    });

    await page.waitForChanges();

    const linearGradient = await page.find("calcite-graph >>> linearGradient");
    const linearGradientId = linearGradient.getAttribute("id");

    const path = await page.find("calcite-graph >>> path");
    const fill = path.getAttribute("fill");

    expect(fill).toBe(`url(#${linearGradientId})`);
  });

  describe("theme", () => {
    describe("default", () => {
      themed(
        async () => {
          const page = await newE2EPage();
          await page.setContent(html`<calcite-graph></calcite-graph>`);
          await page.$eval("calcite-graph", (graph: HTMLCalciteGraphElement) => {
            graph.data = [
              [0, 4],
              [1, 7],
              [4, 6],
              [6, 2],
            ];
            graph.colorStops = [
              { offset: 0, color: "red" },
              { offset: 0.5, color: "green" },
              { offset: 1, color: "blue" },
            ];
          });
          await page.waitForChanges();

          return { tag: "calcite-graph", page };
        },
        {
          "--calcite-graph-background-color": {
            shadowSelector: ".svg",
            targetProp: "fill",
          },
        },
      );
    });
  });

  describe("highlight", () => {
    themed(
      async () => {
        const page = await newE2EPage();
        await page.setContent(html` <calcite-graph></calcite-graph>`);
        await page.$eval("calcite-graph", (graph: HTMLCalciteGraphElement) => {
          graph.data = [
            [0, 4],
            [1, 7],
            [4, 6],
            [6, 2],
          ];
          graph.colorStops = [
            { offset: 0, color: "red" },
            { offset: 0.5, color: "green" },
            { offset: 1, color: "blue" },
          ];
          graph.highlightMin = 1;
          graph.highlightMax = 5;
        });
        await page.waitForChanges();

        return { tag: "calcite-graph", page };
      },
      {
        "--calcite-graph-accent-color": {
          shadowSelector: ".graph-path--highlight",
          targetProp: "fill",
        },
      },
    );
  });
});
