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
    describe("default", () => {
      themed("calcite-loader", {
        "--calcite-loader-color": {
          targetProp: "stroke",
        },
        "--calcite-loader-size": [
          {
            targetProp: "minBlockSize",
          },
          {
            shadowSelector: ".loader__svgs",
            targetProp: "blockSize",
          },
          {
            shadowSelector: ".loader__svgs",
            targetProp: "inlineSize",
          },
          {
            shadowSelector: ".loader__svg",
            targetProp: "blockSize",
          },
          {
            shadowSelector: ".loader__svg",
            targetProp: "inlineSize",
          },
        ],
      });
    });

    describe("determinate", () => {
      themed(html` <calcite-loader text="loading..." type="determinate" value="100"></calcite-loader>`, {
        "--calcite-loader-color": {
          shadowSelector: ".loader__percentage",
          targetProp: "color",
        },
        "--calcite-loader-size": [
          {
            shadowSelector: ".loader__percentage",
            targetProp: "inlineSize",
          },
        ],
        "--calcite-loader-text-color": [
          {
            shadowSelector: ".loader__percentage",
            targetProp: "color",
          },
          {
            shadowSelector: ".loader__text",
            targetProp: "color",
          },
        ],
        "--calcite-loader-track-color": {
          targetProp: "stroke",
        },
      });
    });

    describe("inline", () => {
      themed(html`<calcite-loader inline></calcite-loader>`, {
        "--calcite-loader-size": [
          {
            targetProp: "blockSize",
          },
          {
            targetProp: "inlineSize",
          },
        ],
      });
    });

    describe("deprecated", () => {
      describe("default", () => {
        themed(`calcite-loader`, {
          "--calcite-loader-font-size": {
            targetProp: "fontSize",
          },
          "--calcite-loader-padding": {
            targetProp: "paddingBlock",
          },
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
