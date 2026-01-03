import { newE2EPage, E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe } from "vitest";
import { themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import type { Graph } from "./graph";
import { CSS } from "./resources";

async function createGraphWithData(): Promise<E2EPage> {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-graph highlight-min="25" highlight-max="75"></calcite-graph>`);
  await page.$eval("calcite-graph", (el: Graph["el"]) => {
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
  });
  await page.waitForChanges();
  return page;
}

describe("calcite-graph", () => {
  describe("theme", () => {
    themed(
      async () => {
        return { tag: "calcite-graph", page: await createGraphWithData() };
      },
      {
        "--calcite-graph-highlight-fill-color": {
          shadowSelector: `.${CSS.graphPathHighlight}`,
          targetProp: "fill",
        },
      },
    );
  });
});
