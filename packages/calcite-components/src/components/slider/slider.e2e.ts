import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { defaults, disabled, formAssociated, hidden, labelable, renders } from "../../tests/commonTests";
import { getElementXY } from "../../tests/utils";
import { CSS } from "./resources";

describe("calcite-slider", () => {
  const sliderWidthFor1To1PixelValueTrack = "114px";

  describe("renders", () => {
    renders("calcite-slider", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-slider");
  });

  describe("defaults", () => {
    defaults("calcite-slider", [
      {
        propertyName: "mirrored",
        defaultValue: false,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "hasHistogram",
        defaultValue: false,
      },
      {
        propertyName: "max",
        defaultValue: 100,
      },
      {
        propertyName: "min",
        defaultValue: 0,
      },
      {
        propertyName: "mirrored",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "snap",
        defaultValue: false,
      },
      {
        propertyName: "step",
        defaultValue: 1,
      },
      {
        propertyName: "value",
        defaultValue: 0,
      },
    ]);
  });

  describe("labelable", () => {
    labelable("calcite-slider");
  });

  describe("disabled", () => {
    disabled("calcite-slider");
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

    // activation keys should not affect the value
    await handle.press(" ");
    await handle.press("Enter");
    expect(await slider.getProperty("value")).toBe(100);
  });

  describe("slider taking the precision of the provided step", () => {
    it("takes the precision of the decimal step when controlled through keyboard", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-slider value="30" min="0" max="100" step="1.12"> </calcite-slider> `);
      const slider = await page.find("calcite-slider");
      const handle = await page.find("calcite-slider >>> .thumb");
      await page.waitForChanges();
      const value = await slider.getProperty("value");
      expect(value).toBe(30);

      await handle.press("ArrowRight");
      expect(await slider.getProperty("value")).toBe(31.12);
      await handle.press("ArrowLeft");
      expect(await slider.getProperty("value")).toBe(30);
      await handle.press("ArrowUp");
      expect(await slider.getProperty("value")).toBe(31.12);
      await handle.press("ArrowDown");
      expect(await slider.getProperty("value")).toBe(30);
    });

    it("single handle: takes the precision of the decimal step when clicking and dragging the track", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-slider step="1.12" snap style="width:${sliderWidthFor1To1PixelValueTrack}"></calcite-slider>
      `);
      const slider = await page.find("calcite-slider");
      expect(await slider.getProperty("value")).toBe(0);

      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");
      await page.mouse.move(trackX, trackY);
      await page.mouse.down();
      await page.mouse.move(trackX + 4, trackY);
      await page.waitForChanges();
      await page.mouse.up();

      expect(await slider.getProperty("value")).toBe(4.48);
    });
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

  it("should cap the rendered last tick label to the slider's provided max", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-slider
      min="5"
      max="100"
      step="10"
      ticks="10"
      label-handles
      label-ticks
      >
      </calcite-slider>
    `);
    const slider = await page.find("calcite-slider");
    const maxTickLabel = await page.find("calcite-slider >>> .tick:nth-of-type(11)");
    expect(parseFloat(maxTickLabel.textContent)).toBe(await slider.getProperty("max"));
  });

  it("key press should change the value and emit input and change events", async () => {
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
    const inputEvent = await slider.spyOnEvent("calciteSliderInput");
    const changeEvent = await slider.spyOnEvent("calciteSliderChange");
    expect(inputEvent).toHaveReceivedEventTimes(0);
    expect(changeEvent).toHaveReceivedEventTimes(0);

    await handle.press("ArrowRight");
    await page.waitForChanges();

    expect(await slider.getProperty("value")).toBe(24);
    expect(inputEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  describe("thumb focus for single value", () => {
    const sliderForThumbFocusTests = html`<calcite-slider
      style="width:${sliderWidthFor1To1PixelValueTrack}"
      min="0"
      max="100"
      snap
      ticks="10"
      value="50"
    ></calcite-slider>`;

    it("should focus thumb when clicked near", async () => {
      const page = await newE2EPage();
      await page.setContent(html`${sliderForThumbFocusTests}`);
      const slider = await page.find("calcite-slider");
      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");

      await page.mouse.move(trackX + 50, trackY);
      await page.mouse.down();
      await page.mouse.up();
      await page.waitForChanges();

      let isThumbFocused = await page.$eval(
        "calcite-slider",
        (slider) => slider.shadowRoot.activeElement?.classList.contains("thumb--value"),
      );

      expect(isThumbFocused).toBe(true);
      expect(await slider.getProperty("value")).toBe(50);

      await page.mouse.move(trackX + 40, trackY);
      await page.mouse.down();
      await page.mouse.up();
      await page.waitForChanges();

      isThumbFocused = await page.$eval(
        "calcite-slider",
        (slider) => slider.shadowRoot.activeElement?.classList.contains("thumb--value"),
      );

      expect(isThumbFocused).toBe(true);
      expect(await slider.getProperty("value")).toBe(40);

      await page.mouse.move(trackX + 60, trackY);
      await page.mouse.down();
      await page.mouse.up();
      await page.waitForChanges();

      isThumbFocused = await page.$eval(
        "calcite-slider",
        (slider) => slider.shadowRoot.activeElement?.classList.contains("thumb--value"),
      );

      expect(isThumbFocused).toBe(true);
      expect(await slider.getProperty("value")).toBe(60);
    });
  });

  describe("thumb focus in range", () => {
    const sliderForThumbFocusTests = html`<calcite-slider
      style="width:${sliderWidthFor1To1PixelValueTrack}"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      ticks="10"
    ></calcite-slider>`;

    it("should focus the min thumb when clicked on track close to minValue", async () => {
      const page = await newE2EPage({
        html: `${sliderForThumbFocusTests}`,
      });
      await page.waitForChanges();
      const slider = await page.find("calcite-slider");
      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");

      await page.mouse.move(trackX + 30, trackY);
      await page.mouse.down();
      await page.mouse.up();
      await page.waitForChanges();

      const isMinThumbFocused = await page.$eval(
        "calcite-slider",
        (slider) => slider.shadowRoot.activeElement?.classList.contains("thumb--minValue"),
      );

      expect(await slider.getProperty("minValue")).toBe(0);
      expect(await slider.getProperty("maxValue")).toBe(100);
      expect(isMinThumbFocused).toBe(true);
    });

    it("should focus the max thumb when clicked on track close to maxValue", async () => {
      const page = await newE2EPage({
        html: `${sliderForThumbFocusTests}`,
      });
      await page.waitForChanges();
      const slider = await page.find("calcite-slider");
      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");

      await page.mouse.move(trackX + 60, trackY);
      await page.mouse.down();
      await page.mouse.up();
      await page.waitForChanges();

      const isMaxThumbFocused = await page.$eval(
        "calcite-slider",
        (slider) => slider.shadowRoot.activeElement?.classList.contains("thumb--value"),
      );

      expect(await slider.getProperty("minValue")).toBe(0);
      expect(await slider.getProperty("maxValue")).toBe(100);
      expect(isMaxThumbFocused).toBe(true);
    });

    it("should focus the max thumb when clicked on middle of the track", async () => {
      const page = await newE2EPage({
        html: `${sliderForThumbFocusTests}`,
      });
      await page.waitForChanges();
      const slider = await page.find("calcite-slider");
      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");

      await page.mouse.move(trackX + 50, trackY);
      await page.mouse.down();
      await page.mouse.up();
      await page.waitForChanges();

      const isMaxThumbFocused = await page.$eval(
        "calcite-slider",
        (slider) => slider.shadowRoot.activeElement?.classList.contains("thumb--value"),
      );

      expect(await slider.getProperty("minValue")).toBe(0);
      expect(await slider.getProperty("maxValue")).toBe(100);
      expect(isMaxThumbFocused).toBe(true);
    });
  });

  describe("mouse interaction", () => {
    it("single handle: clicking the track changes value on mousedown, emits on mouseup", async () => {
      const page = await newE2EPage({
        html: `<calcite-slider snap style="width:${sliderWidthFor1To1PixelValueTrack}"></calcite-slider>`,
      });
      await page.waitForChanges();
      const slider = await page.find("calcite-slider");
      const changeEvent = await slider.spyOnEvent("calciteSliderChange");
      const inputEvent = await slider.spyOnEvent("calciteSliderInput");
      expect(await slider.getProperty("value")).toBe(0);

      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");

      await page.mouse.move(trackX + 50, trackY);
      await page.mouse.down();
      await page.waitForChanges();
      await page.mouse.up();

      expect(await slider.getProperty("value")).toBe(50);
      expect(inputEvent).toHaveReceivedEventTimes(1);
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("single handle: clicking and dragging the track changes and emits the value", async () => {
      const page = await newE2EPage({
        html: `<calcite-slider snap style="width:${sliderWidthFor1To1PixelValueTrack}"></calcite-slider>`,
      });
      await page.waitForChanges();
      const slider = await page.find("calcite-slider");
      const inputEvent = await slider.spyOnEvent("calciteSliderInput");
      const changeEvent = await slider.spyOnEvent("calciteSliderChange");
      expect(await slider.getProperty("value")).toBe(0);

      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");
      await page.mouse.move(trackX, trackY);
      await page.mouse.down();
      await page.mouse.move(trackX + 1, trackY);
      await page.mouse.move(trackX + 2, trackY);
      await page.mouse.move(trackX + 3, trackY);
      await page.mouse.move(trackX + 4, trackY);
      await page.mouse.move(trackX + 5, trackY);
      await page.waitForChanges();
      await page.mouse.up();

      expect(await slider.getProperty("value")).toBe(5);
      expect(inputEvent).toHaveReceivedEventTimes(5);
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("range: clicking the track to the left of the min handle changes minValue on mousedown, emits on mouseup", async () => {
      const page = await newE2EPage({
        html: `<calcite-slider min-value="50" max-value="75" snap style="width:${sliderWidthFor1To1PixelValueTrack}"></calcite-slider>`,
      });
      await page.waitForChanges();

      const slider = await page.find("calcite-slider");
      const changeEvent = await slider.spyOnEvent("calciteSliderChange");
      const inputEvent = await slider.spyOnEvent("calciteSliderInput");
      expect(await slider.getProperty("minValue")).toBe(50);
      expect(await slider.getProperty("maxValue")).toBe(75);

      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");

      await page.mouse.move(trackX + 25, trackY);
      await page.mouse.down();
      await page.waitForChanges();

      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(75);
      expect(changeEvent).toHaveReceivedEventTimes(0);

      await page.mouse.up();
      await page.waitForChanges();

      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(inputEvent).toHaveReceivedEventTimes(1);
    });

    it("range: clicking and dragging the track to the left of the min handle changes minValue and emits", async () => {
      const page = await newE2EPage({
        html: `<calcite-slider min-value="50" max-value="75" snap style="width:${sliderWidthFor1To1PixelValueTrack}"></calcite-slider>`,
      });
      await page.waitForChanges();

      const slider = await page.find("calcite-slider");
      const inputEvent = await slider.spyOnEvent("calciteSliderInput");
      const changeEvent = await slider.spyOnEvent("calciteSliderChange");
      expect(await slider.getProperty("minValue")).toBe(50);
      expect(await slider.getProperty("maxValue")).toBe(75);

      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");

      await page.mouse.move(trackX + 21, trackY);
      await page.mouse.down();
      await page.mouse.move(trackX + 22, trackY);
      await page.mouse.move(trackX + 23, trackY);
      await page.mouse.move(trackX + 24, trackY);
      await page.mouse.move(trackX + 25, trackY);
      await page.waitForChanges();
      await page.mouse.up();

      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(75);
      expect(inputEvent).toHaveReceivedEventTimes(5);
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("range: clicking the track to the right of the max handle changes maxValue on mousedown, emits on mouseup", async () => {
      const page = await newE2EPage({
        html: `<calcite-slider min-value="25" max-value="50" snap style="width:${sliderWidthFor1To1PixelValueTrack}"></calcite-slider>`,
      });
      await page.waitForChanges();

      const slider = await page.find("calcite-slider");
      const changeEvent = await slider.spyOnEvent("calciteSliderChange");
      const inputEvent = await slider.spyOnEvent("calciteSliderInput");

      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(50);

      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");

      await page.mouse.move(trackX + 75, trackY);
      await page.mouse.down();
      await page.waitForChanges();
      await page.mouse.up();

      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(75);
      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(inputEvent).toHaveReceivedEventTimes(1);
    });

    it("range: clicking and dragging the track to the right of the max handle changes maxValue on mousedown, emits on mouseup", async () => {
      const page = await newE2EPage({
        html: `<calcite-slider min-value="25" max-value="50" snap style="width:${sliderWidthFor1To1PixelValueTrack}"></calcite-slider>`,
      });
      await page.waitForChanges();
      const slider = await page.find("calcite-slider");
      const inputEvent = await slider.spyOnEvent("calciteSliderInput");
      const changeEvent = await slider.spyOnEvent("calciteSliderChange");
      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(50);

      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");

      await page.mouse.move(trackX + 71, trackY);
      await page.mouse.down();
      await page.mouse.move(trackX + 72, trackY);
      await page.mouse.move(trackX + 73, trackY);
      await page.mouse.move(trackX + 74, trackY);
      await page.mouse.move(trackX + 75, trackY);
      await page.mouse.up();
      await page.waitForChanges();

      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(75);
      expect(inputEvent).toHaveReceivedEventTimes(5);
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("range: clicking and dragging the range changes minValue and maxValue on mousedown, emits on mouseup", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-slider
          min-value="0"
          max-value="50"
          snap
          style="width:${sliderWidthFor1To1PixelValueTrack}"
        ></calcite-slider>`,
      );
      const slider = await page.find("calcite-slider");
      const inputEvent = await slider.spyOnEvent("calciteSliderInput");
      const changeEvent = await slider.spyOnEvent("calciteSliderChange");
      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");

      await page.mouse.move(trackX + 25, trackY);
      await page.mouse.down();
      await page.mouse.move(trackX + 26, trackY);
      await page.mouse.move(trackX + 27, trackY);
      await page.mouse.move(trackX + 28, trackY);
      await page.mouse.move(trackX + 29, trackY);
      await page.mouse.move(trackX + 30, trackY);
      await page.mouse.move(trackX + 31, trackY);
      await page.mouse.up();
      await page.waitForChanges();

      expect(await slider.getProperty("minValue")).toBe(5);
      expect(await slider.getProperty("maxValue")).toBe(55);
      expect(inputEvent).toHaveReceivedEventTimes(6);
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });
  });

  describe("histogram", () => {
    it("creates calcite-graph with color stops", async () => {
      const page = await newE2EPage({ html: `<calcite-slider></calcite-slider>` });

      const props = {
        histogram: [
          [0, 4],
          [1, 7],
          [4, 6],
          [6, 2],
        ],
        histogramStops: [
          { offset: 0, color: "red" },
          { offset: 0.5, color: "green" },
          { offset: 1, color: "blue" },
        ],
      };

      await page.$eval(
        "calcite-slider",
        (elm: any, { histogram, histogramStops }) => {
          elm.histogram = histogram;
          elm.histogramStops = histogramStops;
        },
        props,
      );

      await page.waitForChanges();

      const graph = await page.find("calcite-slider >>> calcite-graph");

      const linearGradient = await page.find("pierce/linearGradient");
      const linearGradientId = linearGradient.getAttribute("id");

      const path = await graph.find("pierce/path.graph-path");
      const fill = path.getAttribute("fill");
      expect(fill).toBe(`url(#${linearGradientId})`);

      for (let i = 0; i < props.histogramStops.length; i += 1) {
        const { offset, color } = props.histogramStops[i];
        const stop = await linearGradient.find(`stop[offset="${offset * 100}%"][stop-color="${color}"]`);
        expect(stop).toBeTruthy();
      }
    });
  });

  describe("when range thumbs overlap at min edge", () => {
    const commonSliderAttrs = `<calcite-slider
      min="5"
      max="100"
      min-value="5"
      max-value="5"
      step="10"
      ticks="10"
      label-handles
      label-ticks
      snap
      style="width:${sliderWidthFor1To1PixelValueTrack}"`;

    it("click/tap should grab the max value thumb", async () => {
      const page = await newE2EPage({
        html: `<calcite-slider ${commonSliderAttrs}></calcite-slider>`,
      });
      await page.waitForChanges();
      const element = await page.find("calcite-slider");
      const changeEvent = await element.spyOnEvent("calciteSliderChange");
      const inputEvent = await element.spyOnEvent("calciteSliderInput");
      expect(await element.getProperty("minValue")).toBe(5);
      expect(await element.getProperty("maxValue")).toBe(5);

      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");
      await page.mouse.click(trackX, trackY);
      await page.waitForChanges();

      const isMaxThumbFocused = await page.$eval(
        "calcite-slider",
        (slider) => slider.shadowRoot.activeElement?.classList.contains("thumb--value"),
      );

      expect(isMaxThumbFocused).toBe(true);
      expect(await element.getProperty("minValue")).toBe(5);
      expect(await element.getProperty("maxValue")).toBe(5);
      expect(changeEvent).toHaveReceivedEventTimes(0);
      expect(inputEvent).toHaveReceivedEventTimes(0);
    });

    it("mirrored: click/tap should grab the max value thumb", async () => {
      const page = await newE2EPage({
        html: `<calcite-slider ${commonSliderAttrs} mirrored></calcite-slider>`,
      });
      const element = await page.find("calcite-slider");
      const changeEvent = await element.spyOnEvent("calciteSliderChange");
      const inputEvent = await element.spyOnEvent("calciteSliderInput");
      expect(await element.getProperty("minValue")).toBe(5);
      expect(await element.getProperty("maxValue")).toBe(5);

      const [trackX, trackY] = await getElementXY(page, "calcite-slider", ".track");
      await page.mouse.click(trackX + 100, trackY);
      await page.waitForChanges();

      const isMaxThumbFocused = await page.$eval(
        "calcite-slider",
        (slider) => slider.shadowRoot.activeElement?.classList.contains("thumb--value"),
      );

      expect(isMaxThumbFocused).toBe(true);
      expect(await element.getProperty("minValue")).toBe(5);
      expect(await element.getProperty("maxValue")).toBe(5);
      expect(changeEvent).toHaveReceivedEventTimes(0);
      expect(inputEvent).toHaveReceivedEventTimes(0);
    });
  });

  describe("when a range has 0 for both minValue and maxValue", () => {
    const slider = `<calcite-slider
      min="-10"
      max="1"
      min-value="0"
      max-value="0"`;
    const nonMirroredSlider = `<div style="width: 300px; margin: 1rem;">${slider}></calcite-slider></div>`;
    const mirroredSlider = `<div style="width: 300px; margin: 1rem;">${slider} mirrored></calcite-slider></div>`;

    it("should position the minValue thumb beside the maxValue thumb", async () => {
      const page = await newE2EPage({ html: nonMirroredSlider });
      const minValueThumb = await page.find("calcite-slider >>> .thumb--minValue");
      const maxValueThumb = await page.find("calcite-slider >>> .thumb--value");
      const minHandleLeft = await (await minValueThumb.getComputedStyle()).left;
      const maxHandleRight = await (await maxValueThumb.getComputedStyle()).right;
      expect(minHandleLeft).toBe("260px");
      expect(maxHandleRight).toBe("26px");
    });

    it("should position the minValue thumb beside the maxValue thumb when mirrored", async () => {
      const page = await newE2EPage({ html: mirroredSlider });
      const minValueThumb = await page.find("calcite-slider >>> .thumb--minValue");
      const maxValueThumb = await page.find("calcite-slider >>> .thumb--value");
      const minHandleLeft = await (await minValueThumb.getComputedStyle()).left;
      const maxHandleRight = await (await maxValueThumb.getComputedStyle()).right;
      expect(minHandleLeft).toBe("26px");
      expect(maxHandleRight).toBe("260px");
    });

    it("should position the minValue thumb beside the maxValue thumb when it's a histogram range", async () => {
      const page = await newE2EPage({ html: nonMirroredSlider });
      await page.$eval("calcite-slider", (slider: HTMLCalciteSliderElement) => {
        slider.histogram = [
          [0, 0],
          [20, 12],
          [40, 25],
          [60, 55],
          [80, 10],
          [100, 0],
        ];
      });
      await page.waitForChanges();
      const minValueThumb = await page.find("calcite-slider >>> .thumb--minValue");
      const maxValueThumb = await page.find("calcite-slider >>> .thumb--value");
      const minHandleLeft = await (await minValueThumb.getComputedStyle()).left;
      const maxHandleRight = await (await maxValueThumb.getComputedStyle()).right;
      expect(minHandleLeft).toBe("260px");
      expect(maxHandleRight).toBe("26px");
    });
  });

  describe("is form-associated", () => {
    describe("single value", () => {
      formAssociated("calcite-slider", { testValue: 5 });
    });

    describe("range", () => {
      formAssociated("calcite-slider", { testValue: [5, 10] });
    });
  });

  describe("number locale support", () => {
    let page: E2EPage;
    let noSeparator: string[];
    const expectedNotSeparatedValueArray = {
      en: ["2500", "500000.5", "1000", "1000000.5"],
      fr: ["2500", "500000,5", "1000", "1000000,5"],
    };
    let withSeparator: string[];
    let getDisplayedValuesArray: () => Promise<string[]>;
    let element: E2EElement;
    const formattedValuesPerLanguageObject = {
      "de-CH": ["2’500", "500’000.5", "1’000", "1’000’000.5"],
      en: ["2,500", "500,000.5", "1,000", "1,000,000.5"],
      es: ["2.500", "500.000,5", "1.000", "1.000.000,5"],
      fr: [
        ["2", "500"].join("\u00A0"),
        ["500", "000,5"].join("\u00A0"),
        ["1", "000"].join("\u00A0"),
        ["1", "000", "000,5"].join("\u00A0"),
      ],
      hi: ["2,500", "5,00,000.5", "1,000", "10,00,000.5"],
    };

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(
        html`<calcite-slider
          group-separator
          lang="en"
          min="1000"
          max="1000000.50"
          min-value="2500"
          max-value="500000.50"
          step="1000"
          ticks="1000"
          label-handles
          label-ticks
          style="width:${sliderWidthFor1To1PixelValueTrack}"
        >
        </calcite-slider>`,
      );
      element = await page.find("calcite-slider");

      getDisplayedValuesArray = async (): Promise<string[]> => {
        const labelMinVal = (await element.shadowRoot.querySelector(`.${CSS.handleLabelMinValue}`)) as HTMLElement;
        const labelVal = (await element.shadowRoot.querySelector(`.${CSS.handleLabelValue}`)) as HTMLElement;

        const tickMin = (await element.shadowRoot.querySelector(`.${CSS.tickMin}`)) as HTMLElement;
        const tickMax = (await element.shadowRoot.querySelector(`.${CSS.tickMax}`)) as HTMLElement;

        return [labelMinVal.innerText, labelVal.innerText, tickMin.innerText, tickMax.innerText];
      };
      await page.exposeFunction("getDisplayedValuesArray", getDisplayedValuesArray);
    });

    it("does not render separated when groupSeparator prop is false", async () => {
      element.setProperty("groupSeparator", false);
      await page.waitForChanges();

      noSeparator = await page.$eval("calcite-slider", async (): Promise<string[]> => {
        return await getDisplayedValuesArray();
      });
      expect(await element.getProperty("groupSeparator")).toBe(false);
      expect(noSeparator).toEqual(expectedNotSeparatedValueArray.en);

      element.setProperty("lang", "fr");
      await page.waitForChanges();

      noSeparator = await page.$eval("calcite-slider", async (): Promise<string[]> => {
        return await getDisplayedValuesArray();
      });
      expect(noSeparator).toEqual(expectedNotSeparatedValueArray.fr);
    });

    it("displays group separator for multiple locales", async () => {
      const testLocalizedGroupSeparator = async (lang: string, formattedValuesArr: string[]): Promise<void> => {
        element.setProperty("lang", lang);
        await page.waitForChanges();

        withSeparator = await page.$eval("calcite-slider", async (): Promise<string[]> => {
          return await getDisplayedValuesArray();
        });
        expect(withSeparator).toEqual(formattedValuesArr);
      };

      for (const lang in formattedValuesPerLanguageObject) {
        await testLocalizedGroupSeparator(lang, formattedValuesPerLanguageObject[lang]);
      }
    });
  });
});
