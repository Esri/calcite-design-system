import { describe, it, expect, vi } from "vitest";
import { h, ToElement } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { commands } from "vitest/browser";
import {
  defaults,
  reflects,
  hidden,
  internalLabel,
  renders,
  t9n,
  disabled,
} from "../../tests/commonTests/browser";
import { Slider } from "./slider";

describe("calcite-slider", () => {
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

  describe("mouse interaction", () => {
    function assertSliderValues(
      el: ToElement<Slider>,
      value: { minValue: number; maxValue: number },
    ) {
      expect(el.minValue).toBe(value.minValue);
      expect(el.maxValue).toBe(value.maxValue);
      expect(el.value).toEqual([value.minValue, value.maxValue]);
    }
    it("range: clicking the track to the left of the min handle changes minValue and value on mousedown", async () => {
      const { el } = await mount<Slider>(
        <calcite-slider max-value="75" min-value="50" style="width:126px" />,
      );

      const track = el.shadowRoot.querySelector(".track");
      const { x: trackX, y: trackY } = track.getBoundingClientRect();

      el.addEventListener("calciteSliderInput", () => {
        assertSliderValues(el, { minValue: 25, maxValue: 75 });
      });

      el.addEventListener("calciteSliderChange", () => {
        assertSliderValues(el, { minValue: 25, maxValue: 75 });
      });

      await commands.mouseMove(trackX + 25, trackY);
      await commands.mouseDown();
      await commands.mouseUp();
    });

    it("range: clicking the track to the right of the max handle changes maxValue and value on mousedown", async () => {
      const { el } = await mount<Slider>(
        <calcite-slider max-value="75" min-value="50" style="width:126px" />,
      );

      const track = el.shadowRoot.querySelector(".track");
      const { x: trackX, y: trackY } = track.getBoundingClientRect();

      el.addEventListener("calciteSliderInput", () => {
        assertSliderValues(el, { minValue: 50, maxValue: 85 });
      });
      el.addEventListener("calciteSliderChange", () => {
        assertSliderValues(el, { minValue: 50, maxValue: 85 });
      });

      await commands.mouseMove(trackX + 85, trackY);
      await commands.mouseDown();
      await commands.mouseUp();
    });

    it("range: clicking and dragging the track to the right of the max handle changes maxValue and value", async () => {
      const { el } = await mount<Slider>(
        <calcite-slider max-value="75" min-value="50" style="width:126px" />,
      );

      const track = el.shadowRoot.querySelector(".track");
      const { x: trackX, y: trackY } = track.getBoundingClientRect();

      const inputEventHandler = vi.fn();

      el.addEventListener("calciteSliderInput", inputEventHandler);
      el.addEventListener("calciteSliderChange", () => {
        assertSliderValues(el, { minValue: 50, maxValue: 89 });
      });

      await commands.mouseMove(trackX + 85, trackY);
      await commands.mouseDown();
      await commands.mouseMove(trackX + 86, trackY);
      await commands.mouseMove(trackX + 87, trackY);
      await commands.mouseMove(trackX + 88, trackY);
      await commands.mouseMove(trackX + 89, trackY);

      expect(inputEventHandler).toHaveBeenCalledTimes(5);
      await commands.mouseUp();
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
});
