import { newE2EPage } from "@stencil/core/testing";

describe("calcite-loader", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-loader></calcite-loader>");
    const loader = await page.find("calcite-loader");
    expect(loader).toHaveClass("hydrated");
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
    loader.setProperty('value', 24);
    await page.waitForChanges();
    expect(loader).toEqualAttribute("aria-valuenow", 24);
  });
});
