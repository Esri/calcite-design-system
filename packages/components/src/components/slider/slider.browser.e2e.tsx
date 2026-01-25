import { describe, expect, it } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
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

  describe("resetting value", () => {
    it("single value", async () => {
      const { el } = await mount("calcite-slider");
      const initialValue = el.value;

      // @ts-expect-error - intentionally using unsupported type
      el.value = undefined;
      expect(el.value).toBe(initialValue);

      el.value = 0;

      // @ts-expect-error - intentionally using unsupported type
      el.value = null;
      expect(el.value).toBe(initialValue);

      el.value = 100;

      // @ts-expect-error - intentionally using unsupported type
      el.value = "";
      expect(el.value).toBe(initialValue);
    });

    it("range", async () => {
      const { el } = await mount<Slider>(<calcite-slider maxValue={100} minValue={0} />);
      const initialValue = el.value;

      // @ts-expect-error - intentionally using unsupported type
      el.value = undefined;
      expect(el.value).toEqual(initialValue);

      el.value = [20, 80];

      // @ts-expect-error - intentionally using unsupported type
      el.value = null;
      expect(el.value).toEqual(initialValue);

      el.value = [25, 75];

      // @ts-expect-error - intentionally using unsupported type
      el.value = "";
      expect(el.value).toEqual(initialValue);
    });
  });
});
