import { describe, expect, it, vi } from "vitest";
import { h, JsxNode } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { Locator, page, userEvent } from "vitest/browser";
import { commands } from "../../tests/browser/commands";

import {
  accessible,
  defaults,
  disabled,
  formAssociated,
  hidden,
  internalLabel,
  reflects,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests/browser";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import type { Slider } from "./slider";
import { CSS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-slider"),
    [
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
        propertyName: "fillPlacement",
        defaultValue: "start",
      },
      {
        propertyName: "labelFormatter",
        defaultValue: undefined,
      },
      {
        propertyName: "label",
        defaultValue: undefined,
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
      { propertyName: "status", defaultValue: "idle" },
      { propertyName: "validationIcon", defaultValue: undefined },
      { propertyName: "validationMessage", defaultValue: undefined },
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-slider"),
    [
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "status",
        value: "invalid",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ],
  );
});

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-slider
        label="hello world"
        max-label="Maximum"
        max-value="75"
        min-label="Minimum"
        min-value="50"
      />,
    ),
  );

  it("applies min and max labels to the corresponding thumbs", async () => {
    await mount<Slider>(
      <calcite-slider
        label="Group label"
        max-label="Maximum"
        max-value="75"
        min-label="Minimum"
        min-value="50"
      />,
    );

    const container = page.getByLabelText("Group label");
    await expect.element(container).toHaveAttribute("aria-label", "Group label");

    const [minThumb, maxThumb] = page.getByRole("slider").all();

    await expect.element(minThumb).toHaveAttribute("aria-label", "Minimum");
    await expect.element(maxThumb).toHaveAttribute("aria-label", "Maximum");
  });

  it("uses label as fallback aria-label for single-value thumb", async () => {
    await mount(<calcite-slider label="Single fallback label" value={25} />);

    const thumb = page.getByRole("slider");

    await expect.element(thumb).toHaveAttribute("aria-label", "Single fallback label");
  });

  it("uses label as fallback aria-label for range thumbs and labels container as group", async () => {
    await mount(<calcite-slider label="Range fallback label" max-value="75" min-value="50" />);

    const container = page.getByRole("group", { name: "Range fallback label" });
    const [minThumb, maxThumb] = page.getByRole("slider").all();

    await expect.element(container).toHaveAttribute("aria-label", "Range fallback label");
    await expect.element(minThumb).toHaveAttribute("aria-label", "Range fallback label");
    await expect.element(maxThumb).toHaveAttribute("aria-label", "Range fallback label");
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-slider"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-slider`));
});

describe("renders", () => {
  renders(() => mount("calcite-slider"), { display: "block" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-slider"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-slider"));
});

describe("is form-associated", () => {
  describe("single value", () => {
    formAssociated(() => mount("calcite-slider"), { testValue: 5 });
  });

  describe("range", () => {
    formAssociated(() => mount("calcite-slider"), { testValue: [5, 10] });
  });
});

describe("interactions", () => {
  function assertSliderValues(el: Slider["el"]) {
    expect(el.value).toEqual([el.minValue, el.maxValue]);
  }

  describe("slider taking the precision of the provided step", () => {
    it("takes the precision of the decimal step when controlled through keyboard", async () => {
      await mount(<calcite-slider max={100} min={0} step={1.12} value={30} />);

      const thumb = page.getByRole("slider");

      await userEvent.click(thumb);
      await userEvent.keyboard("{ArrowRight}");
      await expect.element(thumb).toHaveAttribute("aria-valuenow", "31.12");
      await userEvent.keyboard("{ArrowLeft}");
      await expect.element(thumb).toHaveAttribute("aria-valuenow", "30");
      await userEvent.keyboard("{ArrowUp}");
      await expect.element(thumb).toHaveAttribute("aria-valuenow", "31.12");
      await userEvent.keyboard("{ArrowDown}");
      await expect.element(thumb).toHaveAttribute("aria-valuenow", "30");
    });

    it("takes the precision of the decimal step when clicking and dragging the track", async () => {
      const { el } = await mount<Slider>(<calcite-slider snap step={1.12} />);
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();
      const dragTargetValue = 5;
      const dragTargetX = trackX + ((dragTargetValue - el.min) / (el.max - el.min)) * trackWidth;

      await commands.mouseMove(trackX, trackY);
      await commands.mouseDown();
      await commands.mouseMove(dragTargetX, trackY);
      await commands.mouseUp();

      expect(el.value).toBe(4.48);
    });
  });

  describe("thumb focus for single value", () => {
    it("focuses the thumb when clicked near", async () => {
      const { el } = await mount<Slider>(
        <calcite-slider max={100} min={0} snap ticks={10} value={50} />,
      );
      const thumb = page.getByRole("slider");
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();

      async function clickTrackAtValue(value: number): Promise<void> {
        const x = trackX + ((value - el.min) / (el.max - el.min)) * trackWidth;

        await commands.mouseMove(x, trackY);
        await commands.mouseDown();
        await commands.mouseUp();
      }

      await clickTrackAtValue(50);
      await expect.element(thumb).toBe(el.shadowRoot.activeElement);
      expect(el.value).toBe(50);

      await clickTrackAtValue(40);
      await expect.element(thumb).toBe(el.shadowRoot.activeElement);
      expect(el.value).toBe(40);

      await clickTrackAtValue(60);
      await expect.element(thumb).toBe(el.shadowRoot.activeElement);
      expect(el.value).toBe(60);
    });
  });

  describe("thumb focus in range", () => {
    async function setup(): Promise<{
      el: Slider["el"];
      maxThumb: Locator;
      minThumb: Locator;
      trackX: number;
      trackY: number;
      trackWidth: number;
    }> {
      const { el } = await mount<Slider>(
        <calcite-slider max={100} max-value="100" min={0} min-value="0" ticks={10} />,
      );
      const [minThumb, maxThumb] = page.getByRole("slider").all();
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();

      return { el, maxThumb, minThumb, trackWidth, trackX, trackY };
    }

    async function clickTrackAtValue(
      value: number,
      min: number,
      max: number,
      trackX: number,
      trackY: number,
      trackWidth: number,
    ): Promise<void> {
      const x = trackX + ((value - min) / (max - min)) * trackWidth;

      await commands.mouseMove(x, trackY);
      await commands.mouseDown();
      await commands.mouseUp();
    }

    it("focuses the min thumb when clicked on the track close to minValue", async () => {
      const { el, minThumb, trackWidth, trackX, trackY } = await setup();

      await clickTrackAtValue(30, el.min, el.max, trackX, trackY, trackWidth);

      await expect.element(minThumb).toBe(el.shadowRoot!.activeElement);
      expect(el.minValue).toBe(0);
      expect(el.maxValue).toBe(100);
    });

    it("focuses the max thumb when clicked on the track close to maxValue", async () => {
      const { el, maxThumb, trackWidth, trackX, trackY } = await setup();

      await clickTrackAtValue(60, el.min, el.max, trackX, trackY, trackWidth);

      await expect.element(maxThumb).toBe(el.shadowRoot!.activeElement);
      expect(el.minValue).toBe(0);
      expect(el.maxValue).toBe(100);
    });

    it("focuses the max thumb when clicked in the middle of the track", async () => {
      const { el, maxThumb, trackWidth, trackX, trackY } = await setup();

      await clickTrackAtValue(50, el.min, el.max, trackX, trackY, trackWidth);

      await expect.element(maxThumb).toBe(el.shadowRoot!.activeElement);
      expect(el.minValue).toBe(0);
      expect(el.maxValue).toBe(100);
    });
  });

  describe("mouse interaction", () => {
    it("single handle: clicking the track changes value on mousedown, emits on mouseup", async () => {
      const { el } = await mount<Slider>(<calcite-slider snap />);
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();
      const pixelsPerValue = trackWidth / (el.max - el.min);
      const inputEventHandler = vi.fn();
      const changeEventHandler = vi.fn();
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await commands.mouseMove(trackX + pixelsPerValue * 50, trackY);
      await commands.mouseDown();

      expect(el.value).toBe(50);
      expect(inputEventHandler).toHaveBeenCalledTimes(1);
      expect(changeEventHandler).toHaveBeenCalledTimes(0);

      await commands.mouseUp();

      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("single handle: clicking and dragging the track changes and emits the value", async () => {
      const { el } = await mount<Slider>(<calcite-slider snap />);
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();
      const pixelsPerValue = trackWidth / (el.max - el.min);
      const inputEventHandler = vi.fn();
      const changeEventHandler = vi.fn();
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await commands.mouseMove(trackX, trackY);
      await commands.mouseDown();
      await commands.mouseMove(trackX + pixelsPerValue * 1, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 2, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 3, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 4, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 5, trackY);

      expect(el.value).toBe(5);
      expect(inputEventHandler).toHaveBeenCalledTimes(5);
      expect(changeEventHandler).toHaveBeenCalledTimes(0);

      await commands.mouseUp();

      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("range: clicking the track to the left of the min handle changes value on mousedown", async () => {
      const { el } = await mount<Slider>(<calcite-slider max-value="75" min-value="50" snap />);
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();
      const pixelsPerValue = trackWidth / (el.max - el.min);
      const inputEventHandler = vi.fn(() => assertSliderValues(el));
      const changeEventHandler = vi.fn(() => assertSliderValues(el));
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await commands.mouseMove(trackX + pixelsPerValue * 25, trackY);
      await commands.mouseDown();

      expect(el.minValue).toBe(25);
      expect(el.maxValue).toBe(75);
      expect(inputEventHandler).toHaveBeenCalledTimes(1);
      expect(changeEventHandler).toHaveBeenCalledTimes(0);
      await commands.mouseUp();
      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("range: clicking the track to the right of the max handle changes value on mousedown", async () => {
      const { el } = await mount<Slider>(<calcite-slider max-value="50" min-value="25" snap />);
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();
      const pixelsPerValue = trackWidth / (el.max - el.min);
      const inputEventHandler = vi.fn(() => assertSliderValues(el));
      const changeEventHandler = vi.fn(() => assertSliderValues(el));
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await commands.mouseMove(trackX + pixelsPerValue * 75, trackY);
      await commands.mouseDown();

      expect(el.minValue).toBe(25);
      expect(el.maxValue).toBe(75);
      expect(inputEventHandler).toHaveBeenCalledTimes(1);
      expect(changeEventHandler).toHaveBeenCalledTimes(0);
      await commands.mouseUp();
      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("range: clicking and dragging the track to the right of the max handle changes value", async () => {
      const { el } = await mount<Slider>(<calcite-slider max-value="50" min-value="25" snap />);
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();
      const pixelsPerValue = trackWidth / (el.max - el.min);
      const inputEventHandler = vi.fn(() => assertSliderValues(el));
      const changeEventHandler = vi.fn(() => assertSliderValues(el));
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await commands.mouseMove(pixelsPerValue * 71 + trackX, trackY);
      await commands.mouseDown();
      await commands.mouseMove(trackX + pixelsPerValue * 72, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 73, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 74, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 75, trackY);

      expect(el.minValue).toBe(25);
      expect(el.maxValue).toBe(75);
      expect(inputEventHandler).toHaveBeenCalledTimes(5);
      expect(changeEventHandler).toHaveBeenCalledTimes(0);
      await commands.mouseUp();
      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("range: clicking and dragging the track to the left of the min handle changes value", async () => {
      const { el } = await mount<Slider>(<calcite-slider max-value="75" min-value="50" snap />);
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();
      const pixelsPerValue = trackWidth / (el.max - el.min);
      const inputEventHandler = vi.fn(() => assertSliderValues(el));
      const changeEventHandler = vi.fn(() => assertSliderValues(el));
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await commands.mouseMove(trackX + pixelsPerValue * 21, trackY);
      await commands.mouseDown();
      await commands.mouseMove(trackX + pixelsPerValue * 22, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 23, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 24, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 25, trackY);

      expect(el.minValue).toBe(25);
      expect(el.maxValue).toBe(75);
      expect(inputEventHandler).toHaveBeenCalledTimes(5);
      expect(changeEventHandler).toHaveBeenCalledTimes(0);
      await commands.mouseUp();
      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("range: clicking between handles and dragging changes value", async () => {
      const { el } = await mount<Slider>(<calcite-slider max-value="50" min-value="0" snap />);
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();
      const pixelsPerValue = trackWidth / (el.max - el.min);
      const inputEventHandler = vi.fn(() => assertSliderValues(el));
      const changeEventHandler = vi.fn(() => assertSliderValues(el));
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await commands.mouseMove(trackX + pixelsPerValue * 25, trackY);
      await commands.mouseDown();
      await commands.mouseMove(trackX + pixelsPerValue * 26, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 27, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 28, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 29, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 30, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 31, trackY);

      expect(el.minValue).toBe(5);
      expect(el.maxValue).toBe(55);
      expect(inputEventHandler).toHaveBeenCalledTimes(6);
      expect(changeEventHandler).toHaveBeenCalledTimes(0);
      await commands.mouseUp();
      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("does not allow text selection when slider is used", async () => {
      await mount(
        <calcite-slider
          label-handles
          label-ticks
          max={100}
          max-label="100"
          min={0}
          step={1}
          ticks={10}
          value={50}
        />,
      );
      const thumb = page.getByRole("slider");
      const { x, y } = thumb.element().getBoundingClientRect();

      await commands.mouseMove(x, y);
      await commands.mouseDown();
      await commands.mouseMove(x + 500, y + 200);
      await commands.mouseUp();

      expect(window.getSelection()?.type).toBe("None");
    });
  });

  describe("keyboard interaction", () => {
    it("range: arrow keys increment and decrement min and max values by step", async () => {
      const { el } = await mount<Slider>(<calcite-slider max-value="75" min-value="50" />);
      const inputEventHandler = vi.fn(() => assertSliderValues(el));
      const changeEventHandler = vi.fn(() => assertSliderValues(el));
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await userEvent.tab();
      await userEvent.keyboard("{ArrowLeft>3}");
      expect(inputEventHandler).toHaveBeenCalledTimes(3);
      expect(changeEventHandler).toHaveBeenCalledTimes(3);
      await userEvent.tab();
      await userEvent.keyboard("{ArrowRight>3}");
      expect(inputEventHandler).toHaveBeenCalledTimes(6);
      expect(changeEventHandler).toHaveBeenCalledTimes(6);
    });
  });
});

describe("resetting value", () => {
  it("single value", async () => {
    const { el } = await mount("calcite-slider");
    const initialValue = el.value;

    // @ts-expect-error -- assigning unsupported type; will be fixed by https://github.com/Esri/calcite-design-system/issues/14582
    el.value = undefined;
    expect(el.value).toBe(initialValue);

    el.value = 0;
    // @ts-expect-error -- assigning unsupported type; will be fixed by https://github.com/Esri/calcite-design-system/issues/14582
    el.value = null;
    expect(el.value).toBe(initialValue);
  });

  it("range", async () => {
    const { el } = await mount<Slider>(<calcite-slider maxValue={100} minValue={0} />);
    const initialValue = el.value;

    // @ts-expect-error -- assigning unsupported type; will be fixed by https://github.com/Esri/calcite-design-system/issues/14582
    el.value = undefined;
    expect(el.value).toEqual(initialValue);

    el.value = [20, 80];
    // @ts-expect-error -- assigning unsupported type; will be fixed by https://github.com/Esri/calcite-design-system/issues/14582
    el.value = null;
    expect(el.value).toEqual(initialValue);
  });
});

describe("number locale support", () => {
  const expectedNotSeparatedValueArray = {
    en: ["2500", "500000.5", "1000", "1000000.5"],
    fr: ["2500", "500000,5", "1000", "1000000,5"],
  };

  const formattedValuesPerLanguageObject = {
    "de-CH": ["2'500", "500'000.5", "1'000", "1'000'000.5"],
    en: ["2,500", "500,000.5", "1,000", "1,000,000.5"],
    es: ["2.500", "500.000,5", "1.000", "1.000.000,5"],
    fr: ["2 500", "500 000,5", "1 000", "1 000 000,5"],
    hi: ["2,500", "5,00,000.5", "1,000", "10,00,000.5"],
  };

  function renderSlider(): JsxNode {
    return (
      <calcite-slider
        group-separator
        label-handles
        label-ticks
        lang="en"
        max={1000000.5}
        max-value="500000.50"
        min={1000}
        min-value="2500"
        step={1000}
        ticks={1000}
      />
    );
  }

  async function getValueDisplayElements(): Promise<{
    labelMinVal: Locator;
    labelVal: Locator;
    tickMin: Locator;
    tickMax: Locator;
  }> {
    const labelMinVal = page.getBySelector(`calcite-slider .${CSS.handleLabelMinValue}`).first();
    const labelVal = page.getBySelector(`calcite-slider .${CSS.handleLabelValue}`).first();

    const tickMin = page.getBySelector(`calcite-slider .${CSS.tickMin}`).first();
    const tickMax = page.getBySelector(`calcite-slider .${CSS.tickMax}`).first();

    return {
      labelMinVal,
      labelVal,
      tickMin,
      tickMax,
    };
  }

  it("does not render separated when groupSeparator prop is false", async () => {
    const { el, reRender } = await mount<Slider>(renderSlider);
    el.groupSeparator = false;
    await reRender();
    const valueDisplayEls = await getValueDisplayElements();

    expect(el).toHaveProperty("groupSeparator", false);

    await expect
      .element(valueDisplayEls.labelMinVal)
      .toHaveTextContent(expectedNotSeparatedValueArray.en[0]);
    await expect
      .element(valueDisplayEls.labelVal)
      .toHaveTextContent(expectedNotSeparatedValueArray.en[1]);
    await expect
      .element(valueDisplayEls.tickMin)
      .toHaveTextContent(expectedNotSeparatedValueArray.en[2]);
    await expect
      .element(valueDisplayEls.tickMax)
      .toHaveTextContent(expectedNotSeparatedValueArray.en[3]);

    el.lang = "fr";
    await reRender();

    await expect
      .element(valueDisplayEls.labelMinVal)
      .toHaveTextContent(expectedNotSeparatedValueArray.fr[0]);
    await expect
      .element(valueDisplayEls.labelVal)
      .toHaveTextContent(expectedNotSeparatedValueArray.fr[1]);
    await expect
      .element(valueDisplayEls.tickMin)
      .toHaveTextContent(expectedNotSeparatedValueArray.fr[2]);
    await expect
      .element(valueDisplayEls.tickMax)
      .toHaveTextContent(expectedNotSeparatedValueArray.fr[3]);
  });

  it("displays group separator for multiple locales", async () => {
    const { el, reRender } = await mount<Slider>(renderSlider);
    const valueDisplayEls = await getValueDisplayElements();

    for (const lang in formattedValuesPerLanguageObject) {
      el.lang = lang;
      await reRender();

      await expect
        .element(valueDisplayEls.labelMinVal)
        .toHaveTextContent(formattedValuesPerLanguageObject[lang][0]);
      await expect
        .element(valueDisplayEls.labelVal)
        .toHaveTextContent(formattedValuesPerLanguageObject[lang][1]);
      await expect
        .element(valueDisplayEls.tickMin)
        .toHaveTextContent(formattedValuesPerLanguageObject[lang][2]);
      await expect
        .element(valueDisplayEls.tickMax)
        .toHaveTextContent(formattedValuesPerLanguageObject[lang][3]);
    }
  });
});

describe("themed", () => {
  describe("default", () => {
    themed(() => mount(<calcite-slider value={30} />), {
      "--calcite-slider-track-color": {
        shadowSelector: `.${CSS.track}`,
        targetProp: "backgroundColor",
      },
      "--calcite-slider-track-fill-color": {
        shadowSelector: `.${CSS.trackRange}`,
        targetProp: "backgroundColor",
      },
      "--calcite-slider-handle-fill-color": {
        shadowSelector: `.${CSS.handle}`,
        targetProp: "backgroundColor",
      },
    });
  });

  describe("text color", () => {
    describe("should apply handle label", () => {
      themed(
        () => mount(<calcite-slider label-handles max-label="100" min-label="0" value={30} />),
        {
          "--calcite-slider-text-color": {
            shadowSelector: `.${CSS.handleLabel}`,
            targetProp: "color",
          },
        },
      );
    });
    describe("should apply tick labels", () => {
      themed(
        () =>
          mount(<calcite-slider label-ticks max-label="100" min-label="0" ticks={20} value={30} />),
        {
          "--calcite-slider-text-color": {
            shadowSelector: `.${CSS.tickLabel}`,
            targetProp: "color",
          },
        },
      );
    });
  });

  describe("handle extension", () => {
    describe("should apply handle extension", () => {
      themed(() => mount(<calcite-slider precise value={30} />), {
        "--calcite-slider-handle-extension-color": {
          shadowSelector: `.${CSS.handleExtension}`,
          targetProp: "backgroundColor",
        },
      });
    });
  });

  describe("ticks", () => {
    describe("should apply ticks", () => {
      themed(
        () =>
          mount(<calcite-slider label-ticks max-label="100" min-label="0" ticks={20} value={30} />),
        {
          "--calcite-slider-tick-color": {
            shadowSelector: `.${CSS.tick}:not(.${CSS.tickActive})`,
            targetProp: "backgroundColor",
          },
        },
      );
    });
    describe("should apply ticks border", () => {
      themed(
        () =>
          mount(<calcite-slider label-ticks max-label="100" min-label="0" ticks={20} value={30} />),
        {
          "--calcite-slider-tick-border-color": {
            shadowSelector: `.${CSS.tick}`,
            targetProp: "borderColor",
          },
        },
      );
    });
    describe("should apply ticks in selected range", () => {
      themed(
        () =>
          mount(<calcite-slider label-ticks max-label="100" min-label="0" ticks={20} value={30} />),
        {
          "--calcite-slider-tick-selected-color": {
            shadowSelector: `.${CSS.tickActive}`,
            targetProp: "backgroundColor",
          },
        },
      );
    });
  });

  describe("--calcite-slider-graph-color", () => {
    describe("should apply graph", () => {
      themed(
        () =>
          mount(
            <calcite-slider
              histogram={[
                [0, 0],
                [20, 12],
                [40, 35],
                [60, 65],
                [80, 25],
                [90, 10],
                [100, 0],
              ]}
              id="basicHistogram"
              label-handles
              max={100}
              min={0}
              scale="m"
              step={1}
              value={60}
            />,
          ),
        {
          "--calcite-slider-graph-color": {
            shadowSelector: `.${CSS.graph}`,
            targetProp: "color",
          },
        },
      );
    });
  });
});
