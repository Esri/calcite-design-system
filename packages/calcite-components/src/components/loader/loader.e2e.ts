import { newE2EPage } from "@stencil/core/testing";
import { hidden, renders } from "../../tests/commonTests";

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
});
