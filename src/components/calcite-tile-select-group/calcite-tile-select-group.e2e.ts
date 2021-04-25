import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, reflects, renders } from "../../tests/commonTests";
import { html } from "../../tests/utils";

describe("calcite-tile-select-group", () => {
  it("renders", async () => renders("calcite-tile-select-group"));

  it("is accessible", async () => accessible(`<calcite-tile-select-group></calcite-tile-select-group>`));

  it("has defaults", async () =>
    defaults("calcite-tile-select-group", [{ propertyName: "layout", defaultValue: "horizontal" }]));

  it("reflects", async () => reflects("calcite-tile-select-group", [{ propertyName: "layout", value: "horizontal" }]));

  it("correctly emits on change event for checkbox tiles", async () => {
    const page = await newE2EPage({
      html: html`
        <calcite-tile-select-group>
          <calcite-tile-select name="check" type="checkbox" value="one" heading="One"></calcite-tile-select>
          <calcite-tile-select name="check" type="checkbox" value="two" heading="Two"></calcite-tile-select>
        </calcite-tile-select-group>
      `
    });
    const internalEventSpy = await page.spyOnEvent("calciteCheckboxChange");
    const eventSpy = await page.spyOnEvent("calciteTileSelectGroupChange");
    const items = await page.findAll("calcite-tile-select");
    await items[0].click();
    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(internalEventSpy).toHaveReceivedEventTimes(0);
    expect(await eventSpy.lastEvent.detail.length).toBe(1);
    await items[1].click();
    expect(eventSpy).toHaveReceivedEventTimes(2);
    expect(internalEventSpy).toHaveReceivedEventTimes(0);
    expect(await eventSpy.lastEvent.detail.length).toBe(2);
  });

  it("correctly emits on change event for radio tiles", async () => {
    const page = await newE2EPage({
      html: html`
        <calcite-tile-select-group>
          <calcite-tile-select name="check" type="radio" value="one" heading="One"></calcite-tile-select>
          <calcite-tile-select name="check" type="radio" value="two" heading="Two"></calcite-tile-select>
        </calcite-tile-select-group>
      `
    });
    const internalEventSpy = await page.spyOnEvent("calciteRadioButtonChange");
    const eventSpy = await page.spyOnEvent("calciteTileSelectGroupChange");
    const items = await page.findAll("calcite-tile-select");
    await items[0].click();
    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(internalEventSpy).toHaveReceivedEventTimes(0);
    expect(await eventSpy.lastEvent.detail.length).toBe(1);
    await items[1].click();
    expect(eventSpy).toHaveReceivedEventTimes(2);
    expect(internalEventSpy).toHaveReceivedEventTimes(0);
    expect(await eventSpy.lastEvent.detail.length).toBe(1);
  });
});
