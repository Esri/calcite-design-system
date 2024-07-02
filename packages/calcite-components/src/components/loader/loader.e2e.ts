import { newE2EPage } from "@stencil/core/testing";
import { hidden, renders, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-loader", () => {
  describe("renders", () => {
    renders(`<calcite-loader></calcite-loader>`, { display: "flex", visible: true });
    renders(`<calcite-loader inline></calcite-loader>`, { display: "flex", visible: true });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-loader");
  });

  it("displays label from text prop", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-loader text="testing"></calcite-loader>`);
    const elm = await page.find("calcite-loader >>> .loader__text");
    expect(elm).toEqualText("testing");
  });

  it("sets aria attributes properly for indeterminate loader", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-loader></calcite-loader>`);
    const loader = await page.find("calcite-loader");
    expect(loader).toEqualAttribute("role", "progressbar");
    expect(loader).not.toHaveAttribute("aria-valuemin");
    expect(loader).not.toHaveAttribute("aria-valuemax");
    expect(loader).not.toHaveAttribute("aria-valuenow");
  });

  it("sets aria attributes properly for determinate loader", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-loader type="determinate"></calcite-loader>`);
    const loader = await page.find("calcite-loader");
    expect(loader).toHaveAttribute("aria-valuenow");
    expect(loader).toEqualAttribute("aria-valuenow", 0);
    expect(loader).toEqualAttribute("aria-valuemin", 0);
    expect(loader).toEqualAttribute("aria-valuemax", 100);
    loader.setProperty("value", 24);
    await page.waitForChanges();
    expect(loader).toEqualAttribute("aria-valuenow", 24);
  });

  it("displays inline with text from inline prop", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-loader inline></calcite-loader>`);
    const rect = await page.find("calcite-loader >>> circle");
    expect(rect).toEqualAttribute("r", "7.2");
  });

  it("sets a default id when none is provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-loader></calcite-loader>`);
    const loader = await page.find("calcite-loader");
    expect(loader).toHaveAttribute("id");
    expect(loader.getAttribute("id").length).toEqual(36);
  });

  describe("theme", () => {
    describe("loader colors", () => {
      function buildStylesToFreezeAnimationAt(delayInSeconds: number): string {
        return html`
          :root { --calcite-duration-factor: 0; } calcite-loader { animation-play-state: paused; animation-duration:
          10s; animation-direction: initial; animation-iteration-count: 1; animation-delay: -${delayInSeconds}s;
          stroke-width: 10px; /* providing initial values for loader color segments to ensure true negatives */
          --calcite-loader-color-start: black; --calcite-loader-color-middle: black; --calcite-loader-color-end: black;
          }
        `;
      }

      describe("start", () => {
        themed(
          async () => {
            const page = await newE2EPage();
            await page.setContent(html`<calcite-loader></calcite-loader>`);
            await page.addStyleTag({
              content: buildStylesToFreezeAnimationAt(1),
            });

            return { page, tag: "calcite-loader" };
          },
          {
            "--calcite-loader-color-start": {
              targetProp: "stroke",
            },
          },
        );
      });

      describe("middle", () => {
        themed(
          async () => {
            const page = await newE2EPage();
            await page.setContent(html`<calcite-loader></calcite-loader>`);
            await page.addStyleTag({
              content: buildStylesToFreezeAnimationAt(4),
            });

            return { page, tag: "calcite-loader" };
          },
          {
            "--calcite-loader-color-middle": {
              targetProp: "stroke",
            },
          },
        );
      });

      describe("end", () => {
        themed(
          async () => {
            const page = await newE2EPage();
            await page.setContent(html`<calcite-loader></calcite-loader>`);
            await page.addStyleTag({
              content: buildStylesToFreezeAnimationAt(7),
            });

            return { page, tag: "calcite-loader" };
          },
          {
            "--calcite-loader-color-end": {
              targetProp: "stroke",
            },
          },
        );
      });
    });

    describe("determinate", () => {
      themed(html`<calcite-loader type="determinate" value="10"></calcite-loader>`, {
        "--calcite-loader-track-color-determinate": {
          targetProp: "stroke",
        },
      });
    });

    describe("deprecated", () => {
      describe("default", () => {
        themed(`calcite-loader`, {
          "--calcite-loader-bar-width": {
            targetProp: "strokeWidth",
          },
          "--calcite-loader-font-size": {
            targetProp: "fontSize",
          },
          "--calcite-loader-padding": {
            targetProp: "paddingBlock",
          },
          "--calcite-loader-size": [
            {
              targetProp: "blockSize",
            },
            {
              targetProp: "minBlockSize",
            },
            {
              targetProp: "inlineSize",
            },
          ],
        });

        describe("inline", () => {
          themed(html`<calcite-loader inline></calcite-loader>`, {
            "--calcite-loader-size-inline": [
              {
                targetProp: "blockSize",
              },
              {
                targetProp: "minBlockSize",
              },
              {
                targetProp: "inlineSize",
              },
            ],
          });
        });

        describe("determinate", () => {
          themed(html`<calcite-loader type="determinate" value="10"></calcite-loader>`, {
            "--calcite-loader-font-size": {
              shadowSelector: ".loader__percentage",
              targetProp: "fontSize",
            },
          });
        });
      });
    });
  });
});
