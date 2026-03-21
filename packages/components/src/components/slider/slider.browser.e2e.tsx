import { describe, it, expect, vi } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { commands, page, userEvent } from "vitest/browser";
import {
  defaults,
  reflects,
  hidden,
  internalLabel,
  renders,
  t9n,
  disabled,
  formAssociated,
} from "../../tests/commonTests/browser";
import { Slider } from "./slider";

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
  describe("mouse interaction", () => {
    it("range: clicking the track to the left of the min handle changes value on mousedown", async () => {
      const { el } = await mount<Slider>(<calcite-slider max-value="75" min-value="50" />);
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();
      const pixelsPerValue = trackWidth / (el.max - el.min);
      const inputEventHandler = vi.fn(() => assertSliderValues(el));
      const changeEventHandler = vi.fn(() => assertSliderValues(el));
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await commands.mouseMove(trackX + pixelsPerValue * 25, trackY);
      await commands.mouseDown();
      expect(inputEventHandler).toHaveBeenCalledTimes(1);
      expect(changeEventHandler).toHaveBeenCalledTimes(0);
      await commands.mouseUp();
      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("range: clicking the track to the right of the max handle changes value on mousedown", async () => {
      const { el } = await mount<Slider>(<calcite-slider max-value="75" min-value="50" />);
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();
      const pixelsPerValue = trackWidth / (el.max - el.min);
      const inputEventHandler = vi.fn(() => assertSliderValues(el));
      const changeEventHandler = vi.fn(() => assertSliderValues(el));
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await commands.mouseMove(trackX + pixelsPerValue * 85, trackY);
      await commands.mouseDown();
      expect(inputEventHandler).toHaveBeenCalledTimes(1);
      expect(changeEventHandler).toHaveBeenCalledTimes(0);
      await commands.mouseUp();
      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("range: clicking and dragging the track to the right of the max handle changes value", async () => {
      const { el } = await mount<Slider>(<calcite-slider max-value="75" min-value="50" />);
      const track = page.getBySelector(".track");
      const { x: trackX, y: trackY, width: trackWidth } = track.element().getBoundingClientRect();
      const pixelsPerValue = trackWidth / (el.max - el.min);
      const inputEventHandler = vi.fn(() => assertSliderValues(el));
      const changeEventHandler = vi.fn(() => assertSliderValues(el));
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await commands.mouseMove(pixelsPerValue * 85 + trackX, trackY);
      await commands.mouseDown();
      await commands.mouseMove(trackX + pixelsPerValue * 86, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 87, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 88, trackY);
      await commands.mouseMove(trackX + pixelsPerValue * 89, trackY);

      expect(inputEventHandler).toHaveBeenCalledTimes(5);
      expect(changeEventHandler).toHaveBeenCalledTimes(0);
      await commands.mouseUp();
      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("range: clicking and dragging the track to the left of the min handle changes value", async () => {
      const { el } = await mount<Slider>(<calcite-slider max-value="75" min-value="50" />);
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

      expect(inputEventHandler).toHaveBeenCalledTimes(6);
      expect(changeEventHandler).toHaveBeenCalledTimes(0);
      await commands.mouseUp();
      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("range: clicking between handles and dragging changes value", async () => {
      const { el } = await mount<Slider>(<calcite-slider max-value="75" min-value="50" />);
      const thumb = page.getByRole("slider").all();
      const minThumb = thumb[0];
      const maxThumb = thumb[1];
      const {
        x: minThumbX,
        y: minThumbY,
        width: minThumbWidth,
        height: minThumbHeight,
      } = minThumb.element().getBoundingClientRect();
      const { x: maxThumbX } = maxThumb.element().getBoundingClientRect();
      const inputEventHandler = vi.fn(() => assertSliderValues(el));
      const changeEventHandler = vi.fn(() => assertSliderValues(el));
      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", changeEventHandler);

      await commands.mouseMove(
        minThumbX + minThumbWidth + (minThumbX - maxThumbX) / 2,
        (minThumbY + minThumbHeight) / 2,
      );
      await commands.mouseDown();
      await commands.mouseMove(40, (minThumbY + minThumbHeight) / 2);
      expect(inputEventHandler).toHaveBeenCalled();
      expect(changeEventHandler).toHaveBeenCalledTimes(0);
      await commands.mouseUp();
      expect(changeEventHandler).toHaveBeenCalledTimes(1);
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

    el.value = undefined;
    expect(el.value).toBe(initialValue);

    el.value = 0;
    el.value = null;
    expect(el.value).toBe(initialValue);
  });

  it("range", async () => {
    const { el } = await mount<Slider>(<calcite-slider maxValue={100} minValue={0} />);
    const initialValue = el.value;

    el.value = undefined;
    expect(el.value).toEqual(initialValue);

    el.value = [20, 80];
    el.value = null;
    expect(el.value).toEqual(initialValue);
  });
});
