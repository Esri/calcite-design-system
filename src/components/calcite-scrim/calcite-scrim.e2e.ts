import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, renders } from "../../tests/commonTests";

describe("calcite-scrim", () => {
  it("renders", async () => renders("<calcite-scrim></calcite-scrim>"));

  it("honors hidden attribute", async () => hidden("calcite-scrim"));

  it("is accessible", async () => accessible("<calcite-scrim>My content</calcite-scrim>"));

  it("is accessible when loading", async () => accessible("<calcite-scrim loading>My content</calcite-scrim>"));

  it("has property defaults", async () =>
    defaults("calcite-scrim", [
      {
        propertyName: "loading",
        defaultValue: false
      }
    ]));

  it("shows loading component", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-scrim></calcite-scrim>");

    let loader = await page.find("calcite-scrim >>> calcite-loader");

    expect(loader).toBeNull();

    const scrim = await page.find("calcite-scrim");

    scrim.setProperty("loading", true);

    await page.waitForChanges();

    loader = await page.find("calcite-scrim >>> calcite-loader");

    expect(loader).toBeDefined();
  });
});
