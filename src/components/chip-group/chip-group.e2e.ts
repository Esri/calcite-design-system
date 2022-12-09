import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders, hidden } from "../../tests/commonTests";

describe("calcite-chip-group", () => {
  it("renders", async () =>
    renders("<calcite-chip-group><calcite-chip></calcite-chip><calcite-chip></calcite-chip></calcite-chip-group>", {
      display: "flex"
    }));

  it("honors hidden attribute", async () => hidden("calcite-chip-group"));

  it("is accessible", async () =>
    accessible(`<calcite-chip-group><calcite-chip></calcite-chip><calcite-chip></calcite-chip></calcite-chip-group>`));

  it("selection mode single allows one or no chips to be selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-chip-group selection-mode="single">
      <calcite-chip id="chip-1"></calcite-chip>
      <calcite-chip id="chip-2"></calcite-chip>
      </calcite-chip-group>`
    );
    const element = await page.find("calcite-chip-group");
    const chip1 = await page.find("#chip-1");
    const chip2 = await page.find("#chip-2");
    const eventSpy = await element.spyOnEvent("calciteChipGroupChange");
    expect(eventSpy).toHaveReceivedEventTimes(0);

    chip1.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(chip1).toHaveAttribute("selected");
    expect(chip2).not.toHaveAttribute("selected");

    chip2.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(2);
    expect(chip1).not.toHaveAttribute("selected");
    expect(chip2).toHaveAttribute("selected");

    chip2.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(3);
    expect(chip1).not.toHaveAttribute("selected");
    expect(chip2).not.toHaveAttribute("selected");
  });

  it("selection mode single-persist allows one chip to be selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-chip-group selection-mode="single-persist">
      <calcite-chip id="chip-1"></calcite-chip>
      <calcite-chip id="chip-2"></calcite-chip>
      </calcite-chip-group>`
    );
    const element = await page.find("calcite-chip-group");
    const chip1 = await page.find("#chip-1");
    const chip2 = await page.find("#chip-2");
    const eventSpy = await element.spyOnEvent("calciteChipGroupChange");
    expect(eventSpy).toHaveReceivedEventTimes(0);

    chip1.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(chip1).toHaveAttribute("selected");
    expect(chip2).not.toHaveAttribute("selected");

    chip2.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(2);
    expect(chip1).not.toHaveAttribute("selected");
    expect(chip2).toHaveAttribute("selected");

    chip2.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(3);
    expect(chip1).not.toHaveAttribute("selected");
    expect(chip2).toHaveAttribute("selected");
  });

  it("selection mode multiple allows one or no chips to be selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-chip-group selection-mode="multiple">
      <calcite-chip id="chip-1"></calcite-chip>
      <calcite-chip id="chip-2"></calcite-chip>
      <calcite-chip id="chip-3"></calcite-chip>
      </calcite-chip-group>`
    );
    const element = await page.find("calcite-chip-group");
    const chip1 = await page.find("#chip-1");
    const chip2 = await page.find("#chip-2");
    const chip3 = await page.find("#chip-3");

    const eventSpy = await element.spyOnEvent("calciteChipGroupChange");
    expect(eventSpy).toHaveReceivedEventTimes(0);

    await chip1.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(chip1).toHaveAttribute("selected");
    expect(chip2).not.toHaveAttribute("selected");
    expect(chip3).not.toHaveAttribute("selected");

    await chip2.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(2);
    expect(chip1).toHaveAttribute("selected");
    expect(chip2).toHaveAttribute("selected");
    expect(chip3).not.toHaveAttribute("selected");

    await chip3.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(3);
    expect(chip1).toHaveAttribute("selected");
    expect(chip2).toHaveAttribute("selected");
    expect(chip3).toHaveAttribute("selected");

    await chip1.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(4);
    expect(chip1).not.toHaveAttribute("selected");
    expect(chip2).toHaveAttribute("selected");
    expect(chip3).toHaveAttribute("selected");

    await chip2.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(5);
    expect(chip1).not.toHaveAttribute("selected");
    expect(chip2).not.toHaveAttribute("selected");
    expect(chip3).toHaveAttribute("selected");

    await chip3.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(6);
    expect(chip1).not.toHaveAttribute("selected");
    expect(chip2).not.toHaveAttribute("selected");
    expect(chip3).not.toHaveAttribute("selected");
  });

  it("selection mode none (default) allows no chip to be selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-chip-group>
      <calcite-chip id="chip-1"></calcite-chip>
      <calcite-chip id="chip-2"></calcite-chip>
      </calcite-chip-group>`
    );
    const element = await page.find("calcite-chip-group");
    const chip1 = await page.find("#chip-1");
    const chip2 = await page.find("#chip-2");
    const eventSpy = await element.spyOnEvent("calciteChipGroupChange");
    expect(eventSpy).toHaveReceivedEventTimes(0);

    await chip1.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(0);
    expect(chip1).not.toHaveAttribute("selected");
    expect(chip2).not.toHaveAttribute("selected");

    await chip2.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(0);
    expect(chip1).not.toHaveAttribute("selected");
    expect(chip2).not.toHaveAttribute("selected");

    await chip2.click();
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(0);
    expect(chip1).not.toHaveAttribute("selected");
    expect(chip2).not.toHaveAttribute("selected");
  });

  it("navigation with keyboard works as expected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-chip-group selection-mode="single">
      <calcite-chip id="chip-1"></calcite-chip>
      <calcite-chip id="chip-2"></calcite-chip>
      <calcite-chip id="chip-3"></calcite-chip>
      <calcite-chip id="chip-4"></calcite-chip>
      <calcite-chip id="chip-5"></calcite-chip>
      </calcite-chip-group>`
    );

    const chip1 = await page.find("#chip-1");
    const chip2 = await page.find("#chip-2");
    const chip3 = await page.find("#chip-3");
    const chip4 = await page.find("#chip-4");
    const chip5 = await page.find("#chip-5");

    await chip1.click();
    await page.waitForChanges();
    await chip1.click();
    await page.waitForChanges();

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    await expect(document.activeElement).toEqual(chip2);
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    await expect(document.activeElement).toEqual(chip3);
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(document.activeElement).toEqual(chip5);
    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(document.activeElement).toEqual(chip4);
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(document.activeElement).toEqual(chip1);
    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(document.activeElement).toEqual(chip5);
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(document.activeElement).toEqual(chip1);
  });

  // when item is dismissed, expect event to not have that item
  // use keyboard to navigate
  // after closing, use keyboard to navigate
  // after using click on close button to dismiss button, focus is on previous item
  // after closing using click, removed from selected items (how to check event detail against e2e element?)
  /*
  const closeButton = await page.find("#chip-2 >>> button");
  await modal.setProperty("active", true);
  */
});
