import { newE2EPage } from "@stencil/core/testing";
import { defaults, labelable, renders } from "../../tests/commonTests";

describe("calcite-slider", () => {
  it("renders", async () => renders("calcite-slider", { display: "block" }));

  it("has defaults", async () =>
    defaults("calcite-slider", [
      {
        propertyName: "mirrored",
        defaultValue: false
      }
    ]));

  it("is labelable", async () => labelable("calcite-slider"));

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

    // activation keys should not affect the value
    await handle.press(" ");
    await handle.press("Enter");
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

  it("keyboard interaction", async () => {
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
    expect(inputEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  describe("mouse interaction", () => {
    it("single handle: clicking the track changes value on mousedown, emits on mouseup", async () => {
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

    it("single handle: clicking and dragging the track changes and emits the value", async () => {
      const page = await newE2EPage({
        html: `
          <style>body { margin: 0; }</style>
          <div style="width:100px">
            <calcite-slider snap></calcite-slider>
          </div>
        `
      });
      const slider = await page.find("calcite-slider");
      const inputEvent = await slider.spyOnEvent("calciteSliderInput");

      expect(await slider.getProperty("value")).toBe(0);

      await page.mouse.move(0, 8);
      await page.mouse.down();
      await page.mouse.move(1, 8);
      await page.mouse.move(2, 8);
      await page.mouse.move(3, 8);
      await page.mouse.move(4, 8);
      await page.mouse.move(5, 8);
      await page.waitForChanges();

      expect(await slider.getProperty("value")).toBe(5);
      expect(inputEvent).toHaveReceivedEventTimes(5);
    });

    it("range: clicking the track to the left of the min handle changes minValue on mousedown, emits on mouseup", async () => {
      const page = await newE2EPage({
        html: `
          <style>body { margin: 0; }</style>
          <div style="width:100px">
            <calcite-slider min-value="50" max-value="75" snap></calcite-slider>
          </div>
        `
      });
      const slider = await page.find("calcite-slider");
      const changeEvent = await slider.spyOnEvent("calciteSliderChange");

      expect(await slider.getProperty("minValue")).toBe(50);
      expect(await slider.getProperty("maxValue")).toBe(75);

      await page.mouse.move(25, 8);
      await page.mouse.down();
      await page.waitForChanges();

      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(75);
      expect(changeEvent).toHaveReceivedEventTimes(0);

      await page.mouse.up();
      await page.waitForChanges();

      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("range: clicking and dragging the track to the left of the min handle changes minValue and emits", async () => {
      const page = await newE2EPage({
        html: `
          <style>body { margin: 0; }</style>
          <div style="width:100px">
            <calcite-slider min-value="50" max-value="75" snap></calcite-slider>
          </div>
        `
      });
      const slider = await page.find("calcite-slider");
      const inputEvent = await slider.spyOnEvent("calciteSliderInput");

      expect(await slider.getProperty("minValue")).toBe(50);
      expect(await slider.getProperty("maxValue")).toBe(75);

      await page.mouse.move(20, 8);
      await page.mouse.down();
      await page.mouse.move(21, 8);
      await page.mouse.move(22, 8);
      await page.mouse.move(23, 8);
      await page.mouse.move(24, 8);
      await page.mouse.move(25, 8);
      await page.waitForChanges();

      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(75);
      expect(inputEvent).toHaveReceivedEventTimes(5);
    });

    it("range: clicking the track to the right of the max handle changes maxValue on mousedown, emits on mouseup", async () => {
      const page = await newE2EPage({
        html: `
          <style>body { margin: 0; }</style>
          <div style="width:100px">
            <calcite-slider min-value="25" max-value="50" snap></calcite-slider>
          </div>
        `
      });
      const slider = await page.find("calcite-slider");
      const changeEvent = await slider.spyOnEvent("calciteSliderChange");

      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(50);

      await page.mouse.move(75, 8);
      await page.mouse.down();
      await page.waitForChanges();

      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(75);
      expect(changeEvent).toHaveReceivedEventTimes(0);

      await page.mouse.up();
      await page.waitForChanges();

      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("range: clicking and dragging the track to the right of the max handle changes maxValue on mousedown, emits on mouseup", async () => {
      const page = await newE2EPage({
        html: `
          <style>body { margin: 0; }</style>
          <div style="width:100px">
            <calcite-slider min-value="25" max-value="50" snap></calcite-slider>
          </div>
        `
      });
      const slider = await page.find("calcite-slider");
      const inputEvent = await slider.spyOnEvent("calciteSliderInput");
      const changeEvent = await slider.spyOnEvent("calciteSliderChange");
      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(50);

      await page.mouse.move(70, 8);
      await page.mouse.down();
      await page.mouse.move(71, 8);
      await page.mouse.move(72, 8);
      await page.mouse.move(73, 8);
      await page.mouse.move(74, 8);
      await page.mouse.move(75, 8);
      await page.waitForChanges();
      await page.mouse.up();
      expect(await slider.getProperty("minValue")).toBe(25);
      expect(await slider.getProperty("maxValue")).toBe(75);
      expect(inputEvent).toHaveReceivedEventTimes(5);
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
          [6, 2]
        ],
        histogramStops: [
          { offset: 0, color: "red" },
          { offset: 0.5, color: "green" },
          { offset: 1, color: "blue" }
        ]
      };

      await page.$eval(
        "calcite-slider",
        (elm: any, { histogram, histogramStops }) => {
          elm.histogram = histogram;
          elm.histogramStops = histogramStops;
        },
        props
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
    const slider = `<calcite-slider
      min="5"
      max="100"
      min-value="5"
      max-value="5"
      step="10"
      ticks="10"
      label-handles
      label-ticks
      snap`;

    it("click/tap should grab the max value thumb", async () => {
      const page = await newE2EPage({
        html: `
        <div style="width: 300px; margin: 1rem;">
          ${slider}></calcite-slider>
        </div>
        `
      });
      const element = await page.find("calcite-slider");
      const maxValueThumb = await page.find("calcite-slider >>> .thumb--value");
      const changeEvent = await element.spyOnEvent("calciteSliderChange");
      expect(await element.getProperty("minValue")).toBe(5);
      expect(await element.getProperty("maxValue")).toBe(5);

      await maxValueThumb.click();
      await page.waitForChanges();

      expect(await element.getProperty("minValue")).toBe(5);
      expect(await element.getProperty("maxValue")).toBe(10);
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("mirrored: click/tap should grab the max value thumb", async () => {
      const page = await newE2EPage({
        html: `
        <div style="width: 300px; margin: 1rem;">
          ${slider} mirrored></calcite-slider>
        </div>
        `
      });
      const element = await page.find("calcite-slider");
      const maxValueThumb = await page.find("calcite-slider >>> .thumb--value");
      const changeEvent = await element.spyOnEvent("calciteSliderChange");
      expect(await element.getProperty("minValue")).toBe(5);
      expect(await element.getProperty("maxValue")).toBe(5);

      await maxValueThumb.click();
      await page.waitForChanges();

      expect(await element.getProperty("minValue")).toBe(5);
      expect(await element.getProperty("maxValue")).toBe(10);
      expect(changeEvent).toHaveReceivedEventTimes(1);
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
      expect(minHandleLeft).toBe("258.172px");
      expect(maxHandleRight).toBe("25.8125px");
    });

    it("should position the minValue thumb beside the maxValue thumb when mirrored", async () => {
      const page = await newE2EPage({ html: mirroredSlider });
      const minValueThumb = await page.find("calcite-slider >>> .thumb--minValue");
      const maxValueThumb = await page.find("calcite-slider >>> .thumb--value");
      const minHandleLeft = await (await minValueThumb.getComputedStyle()).left;
      const maxHandleRight = await (await maxValueThumb.getComputedStyle()).right;
      expect(minHandleLeft).toBe("25.8125px");
      expect(maxHandleRight).toBe("258.172px");
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
          [100, 0]
        ];
      });
      await page.waitForChanges();
      const minValueThumb = await page.find("calcite-slider >>> .thumb--minValue");
      const maxValueThumb = await page.find("calcite-slider >>> .thumb--value");
      const minHandleLeft = await (await minValueThumb.getComputedStyle()).left;
      const maxHandleRight = await (await maxValueThumb.getComputedStyle()).right;
      expect(minHandleLeft).toBe("258.172px");
      expect(maxHandleRight).toBe("25.8125px");
    });
  });
});
