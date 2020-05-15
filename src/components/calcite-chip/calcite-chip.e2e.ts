import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders } from "../../tests/commonTests";

import { CSS } from "./resources";

describe("calcite-chip", () => {
  it("renders", async () => renders("<calcite-chip>doritos</calcite-chip>"));

  it("is accessible", async () =>
    accessible(`<calcite-chip>doritos</calcite-chip>`));

  it("should emit event after the close button is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip dismissible>cheetos</calcite-chip>`);

    const eventSpy = await page.spyOnEvent("calciteChipDismiss", "window");

    const closeButton = await page.find(`calcite-chip >>> .${CSS.close}`);

    await closeButton.click();

    expect(eventSpy).toHaveReceivedEvent();
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip>Chip content</calcite-chip>`);

    const element = await page.find("calcite-chip");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("color", "grey");
    expect(element).toEqualAttribute("scale", "m");
  });

  it("renders default props when invalid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-chip appearance="zip" color="zat" scale="zop">Chip content</calcite-chip>`
    );

    const element = await page.find("calcite-chip");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("color", "grey");
    expect(element).toEqualAttribute("scale", "m");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-chip appearance="outline" color="blue" scale="l">Chip content</calcite-chip>`
    );

    const element = await page.find("calcite-chip");
    expect(element).toEqualAttribute("appearance", "outline");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("scale", "l");
  });

  it("renders a close button when requested", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-chip dismissible>Chip content</calcite-chip>`
    );

    const close = await page.find("calcite-chip >>> button.close");
    expect(close).not.toBeNull();
  });

  it("does not render a close button when not requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip>Chip content</calcite-chip>`);

    const close = await page.find("calcite-chip >>> button.close");
    expect(close).toBeNull();
  });
});
