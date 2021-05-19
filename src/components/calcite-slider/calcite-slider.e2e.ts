import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-slider", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-slider></calcite-slider>");
    const element = await page.find("calcite-slider");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });

  it("becomes inactive from disabled prop", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-slider disabled></calcite-slider>`);
    const slider = await page.find("calcite-slider");
    expect(slider).toHaveAttribute("disabled");
  });

  it("sets aria attributes properly for single value", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-slider
        value="23"
        min="0"
        max="100"
        min-label="Yeah! Slider!"
      >
      </calcite-slider>
    `);
    const button = await page.find("calcite-slider >>> .thumb");
    expect(button).toEqualAttribute("role", "slider");
    expect(button).toEqualAttribute("aria-label", "Yeah! Slider!");
    expect(button).toEqualAttribute("aria-valuenow", "23");
    expect(button).toEqualAttribute("aria-valuemin", "0");
    expect(button).toEqualAttribute("aria-valuemax", "100");
    expect(button).toEqualAttribute("aria-orientation", "horizontal");
  });

  it("sets aria attributes properly for range values", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-slider
        min-value="23"
        max-value="47"
        min="0"
        max="100"
        min-label="Min Label"
        max-label="Max Label"
      >
      </calcite-slider>
    `);
    const maxButton = await page.find("calcite-slider >>> .thumb--value");
    const minButton = await page.find("calcite-slider >>> .thumb--minValue");
    expect(minButton).toEqualAttribute("role", "slider");
    expect(maxButton).toEqualAttribute("role", "slider");
    expect(minButton).toEqualAttribute("aria-label", "Min Label");
    expect(maxButton).toEqualAttribute("aria-label", "Max Label");
    expect(minButton).toEqualAttribute("aria-valuenow", "23");
    expect(maxButton).toEqualAttribute("aria-valuenow", "47");
    expect(minButton).toEqualAttribute("aria-valuemin", "0");
    expect(maxButton).toEqualAttribute("aria-valuemin", "0");
    expect(minButton).toEqualAttribute("aria-valuemax", "100");
    expect(maxButton).toEqualAttribute("aria-valuemax", "100");
    expect(minButton).toEqualAttribute("aria-orientation", "horizontal");
    expect(maxButton).toEqualAttribute("aria-orientation", "horizontal");
  });

  it("can be controlled via keyboard", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-slider
        value="30"
        min="0"
        max="100"
        step="1"
        page-step="10"
      >
      </calcite-slider>
    `);
    const slider = await page.find("calcite-slider");
    const handle = await page.find("calcite-slider >>> .thumb");
    await page.waitForChanges();
    const value = await slider.getProperty("value");
    expect(value).toBe(30);
    await handle.press("ArrowRight");
    expect(await slider.getProperty("value")).toBe(31);
    await handle.press("ArrowLeft");
    expect(await slider.getProperty("value")).toBe(30);
    await handle.press("ArrowUp");
    expect(await slider.getProperty("value")).toBe(31);
    await handle.press("ArrowDown");
    expect(await slider.getProperty("value")).toBe(30);
    await handle.press("PageUp");
    expect(await slider.getProperty("value")).toBe(40);
    await handle.press("PageDown");
    expect(await slider.getProperty("value")).toBe(30);
    await handle.press("Home");
    expect(await slider.getProperty("value")).toBe(0);
    await handle.press("End");
    expect(await slider.getProperty("value")).toBe(100);
  });

  it("only selects values on step interval when snap prop is passed", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-slider
        value="23"
        min="0"
        max="100"
        step="10"
        snap
      >
      </calcite-slider>
    `);
    const slider = await page.find("calcite-slider");
    const handle = await page.find("calcite-slider >>> .thumb--value");
    await page.waitForChanges();
    let value = await slider.getProperty("value");
    expect(value).toBe(20);
    await handle.press("ArrowRight");
    value = await slider.getProperty("value");
    expect(value).toBe(30);
  });

  it("displays tick marks when ticks prop is passed", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-slider
        value="23"
        min="0"
        max="100"
        step="1"
        ticks="10"
      >
      </calcite-slider>
    `);
    const ticks = await page.findAll("calcite-slider >>> .tick");
    expect(ticks.length).toBe(11);
  });

  it("fires calciteSliderChange event on changes", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-slider
        value="23"
        min="0"
        max="100"
        step="1"
        ticks="10"
      >
      </calcite-slider>
    `);
    const slider = await page.find("calcite-slider");
    const handle = await page.find("calcite-slider >>> .thumb");
    const changeEvent = await slider.spyOnEvent("calciteSliderChange");
    expect(changeEvent).toHaveReceivedEventTimes(0);
    await handle.press("ArrowRight");
    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("changes handle position on mousedown, emits on mouseup", async () => {
    const page = await newE2EPage({
      html: `
        <style>body { margin: 0; }</style>
        <div style="width:100px">
          <calcite-slider snap></calcite-slider>
        </div>
      `
    });
    const slider = await page.find("calcite-slider");
    const changeEvent = await slider.spyOnEvent("calciteSliderChange");

    expect(await slider.getProperty("value")).toBe(0);

    await page.mouse.move(50, 8);
    await page.mouse.down();
    await page.waitForChanges();

    expect(await slider.getProperty("value")).toBe(50);
    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.mouse.up();
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });
});
