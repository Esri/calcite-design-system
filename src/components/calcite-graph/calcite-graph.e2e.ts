import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, renders } from "../../tests/commonTests";

describe("calcite-graph", () => {
  it("renders", async () => renders(`<calcite-graph></calcite-graph>`, { display: "block" }));

  it("is accessible", async () => accessible(`<calcite-graph></calcite-graph>`));

  it("is accessible: with data", async () => {
    const html = "<calcite-graph></calcite-graph>";
    const page = await newE2EPage({
      html
    });

    await page.$eval("calcite-graph", (elm: any) => {
      elm.data = [
        [0, 4],
        [1, 7],
        [4, 6],
        [6, 2]
      ];
    });

    await page.waitForChanges();

    await accessible(html, page);
  });

  it("has property defaults", async () =>
    defaults("calcite-graph", [
      {
        propertyName: "width",
        defaultValue: 300
      },
      {
        propertyName: "height",
        defaultValue: 100
      },
      {
        propertyName: "data",
        defaultValue: []
      }
    ]));

  it("draws an area graph", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-graph></calcite-graph>`);
    await page.$eval("calcite-graph", (elm: any) => {
      elm.data = [
        [0, 4],
        [1, 7],
        [4, 6],
        [6, 2]
      ];
    });
    await page.waitForChanges();
    const path = await page.find("calcite-graph >>> path");
    const d = path.getAttribute("d");
    expect(d).toBe(
      "M 0,60 L 0,20 L 0,20 C 16.666666666666664,-10.000000000000014 33.333333333333336,-40 50,-40 C 100,-40 150,-33.33333333333334 200,-20 C 233.33333333333334,-11.111111111111114 266.66666666666663,24.444444444444443 300,60 L 300,60 Z"
    );
  });

  it("uses color-stops when provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-graph></calcite-graph>`);
    await page.$eval("calcite-graph", (elm: any) => {
      elm.data = [
        [0, 4],
        [1, 7],
        [4, 6],
        [6, 2]
      ];
      elm.colorStops = [
        { offset: 0, color: "red" },
        { offset: 0.5, color: "green" },
        { offset: 1, color: "blue" }
      ];
    });

    await page.waitForChanges();

    const linearGradient = await page.find("calcite-graph >>> linearGradient");
    const linearGradientId = linearGradient.getAttribute("id");

    const path = await page.find("calcite-graph >>> path");
    const fill = path.getAttribute("fill");

    expect(fill).toBe(`url(#${linearGradientId})`);
  });

  it("highlights should start and end at the given min/max range", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-graph></calcite-graph>`);
    await page.$eval("calcite-graph", (elm: any) => {
      elm.data = [
        [-8, 0],
        [-3, 2],
        [1, 7],
        [4, 6],
        [6, 2],
        [10, 0]
      ];
      elm.highlightMax = 5;
      elm.highlightMin = -3;
      elm.max = 10;
      elm.min = -10;
      elm.height = 48;
    });
    await page.waitForChanges();
    const path = await page.find("calcite-graph >>> .graph-path--highlight");
    const d = path.getAttribute("d");
    expect(d).toBe(
      "M 30,48 L 30,48 L 30,48 C 55.00000000000001,45.714285714285715 80,43.42857142857143 105,34.285714285714285 C 125,26.971428571428575 144.99999999999997,0 165,0 C 180,0 195,2.2857142857142847 210,6.857142857142861 C 220.00000000000003,9.904761904761905 229.99999999999997,29.714285714285715 240,34.285714285714285 C 260,43.42857142857143 279.99999999999994,45.714285714285715 300,48 L 300,48 Z"
    );
  });
});
