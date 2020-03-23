import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders } from "../../tests/commonTests";

import { CSS } from "./resources";

describe("calcite-chip", () => {
  it("renders", async () => renders("<calcite-chip>doritos</calcite-chip>"));
  it("honors hidden attribute", async () => hidden("calcite-chip"));

  it("is accessible", async () =>
    accessible(`<calcite-chip>doritos</calcite-chip>`));

  it("should emit event after the close button is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip>cheetos</calcite-chip>`);

    const eventSpy = await page.spyOnEvent("calciteChipDismiss", "window");

    const closeButton = await page.find(`calcite-chip >>> .${CSS.close}`);

    await closeButton.click();

    expect(eventSpy).toHaveReceivedEvent();
  });
});
