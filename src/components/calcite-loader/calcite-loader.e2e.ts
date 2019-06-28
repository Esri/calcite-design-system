import { newE2EPage } from "@stencil/core/testing";

describe("calcite-loader", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-loader></calcite-loader>");
    const loader = await page.find("calcite-loader");
    expect(loader).toHaveClass("hydrated");
  });

  it("becomes visible when is-active prop is set", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-loader></calcite-loader>`);
    const loader = await page.find("calcite-loader");
    let isVisible = await loader.isIntersectingViewport();
    expect(isVisible).toBe(false);
    loader.setProperty("is-active", true);
    await page.waitForChanges();
    isVisible = await loader.isIntersectingViewport();
    expect(isVisible).toBe(false);
  });

  it("displays label from text prop", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-loader is-active text="testing"></calcite-loader>`
    );
    const elm = await page.find("calcite-loader >>> div");
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
    await page.setContent(
      `<calcite-loader type="determinate"></calcite-loader>`
    );
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
    await page.setContent(`<calcite-loader is-active inline></calcite-loader>`);
    const rect = await page.find("calcite-loader >>> rect");
    expect(rect).toEqualAttribute("width", "16");
  });
});
