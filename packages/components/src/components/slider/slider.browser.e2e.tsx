import { describe, it, expect } from "vitest";
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

  it("range: clicking the track to the left of the min handle changes minValue and value on mousedown", async () => {
    const { el } = await mount<Slider>(
      <calcite-slider max-value="75" min-value="50" style="width:126px" />,
    );

    const track = el.shadowRoot.querySelector(".track");
    const { x: trackX, y: trackY } = track.getBoundingClientRect();

    function assertSliderValues(el: ToElement<Slider>) {
      expect(el.minValue).toBe(25);
      expect(el.maxValue).toBe(75);
      expect(el.value).toEqual([25, 75]);
    }

    el.addEventListener("calciteSliderInput", () => {
      assertSliderValues(el);
    });

    await commands.mouseMove(trackX + 25, trackY);
    await commands.mouseDown();
    await commands.mouseUp();

    el.addEventListener("calciteSliderChange", () => {
      assertSliderValues(el);
    });
  });

  it("range: clicking the track to the right of the max handle changes maxValue and value on mousedown", async () => {
    const { el } = await mount<Slider>(
      <calcite-slider max-value="75" min-value="50" style="width:126px" />,
    );

    const track = el.shadowRoot.querySelector(".track");
    const { x: trackX, y: trackY } = track.getBoundingClientRect();

    function assertSliderValues(el: ToElement<Slider>) {
      expect(el.minValue).toBe(50);
      expect(el.maxValue).toBe(85);
      expect(el.value).toEqual([50, 85]);
    }

    el.addEventListener("calciteSliderInput", () => {
      assertSliderValues(el);
    });

    await commands.mouseMove(trackX + 85, trackY);
    await commands.mouseDown();
    await commands.mouseUp();

    el.addEventListener("calciteSliderChange", () => {
      assertSliderValues(el);
    });
  });
});
