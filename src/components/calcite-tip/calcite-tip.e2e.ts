import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders, defaults } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-tip", () => {
  it("renders", async () => renders("calcite-tip"));

  it("honors hidden attribute", async () => hidden("calcite-tip"));

  it("has property defaults", async () =>
    defaults("calcite-tip", [
      {
        propertyName: "headingLevel",
        defaultValue: undefined
      }
    ]));

  it("is accessible", async () => accessible(`<calcite-tip heading="sample"><p>not dismissible</p></calcite-tip>`));

  it("should remove the closeButton if nonDismissible prop is true", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tip non-dismissible><p>not dismissible</p></calcite-tip>`);

    const closeButton = await page.find(`calcite-tip >>> .${CSS.close}`);
    expect(closeButton).toBeNull();
  });

  it("should be hidden after the close button is clicked", async () => {
    const page = await newE2EPage({ html: `<calcite-tip><p>testing close button</p></calcite-tip>` });

    const eventSpy = await page.spyOnEvent("calciteTipDismiss", "window");

    const closeButton = await page.find(`calcite-tip >>> .${CSS.close}`);

    await closeButton.click();

    const tip = await page.find(`calcite-tip`);

    const isVisible = await tip.isVisible();

    expect(isVisible).toBe(false);

    expect(eventSpy).toHaveReceivedEvent();
  });

  it("header should only be visible if has a heading", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tip><p>testing</p></calcite-tip>`);

    let header = await page.find(`calcite-tip >>> .${CSS.header}`);

    expect(header).toBeNull();

    const tip = await page.find("calcite-tip");

    tip.setProperty("heading", "test");

    await page.waitForChanges();

    header = await page.find(`calcite-tip >>> .${CSS.header}`);

    expect(header).not.toBeNull();
  });
});
