import { it, expect, describe } from "vitest";
import { h } from "@arcgis/lumina";
import { page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  cancelable,
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { afterNextTask } from "../../tests/utils/timing";
import { CSS, SCOPE_SIZE, STATIC_DIMENSIONS } from "./resources";
import { ColorPicker } from "./color-picker";
import { getColorFieldDimensions } from "./utils";

mockConsole();

describe("cancelable", () => {
  cancelable("calcite-color-picker");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-color-picker"),
    [
      {
        propertyName: "alphaChannel",
        defaultValue: false,
      },
      {
        propertyName: "channelsDisabled",
        defaultValue: false,
      },
      {
        propertyName: "clearable",
        defaultValue: false,
      },
      {
        propertyName: "fieldDisabled",
        defaultValue: false,
      },
      {
        propertyName: "format",
        defaultValue: "auto",
      },
      {
        propertyName: "hexDisabled",
        defaultValue: false,
      },
      {
        propertyName: "savedDisabled",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "value",
        defaultValue: "#007ac2",
      },
    ],
  );
});

describe("is focusable", () => {
  focusable(() => mount("calcite-color-picker"), {
    shadowFocusTargetSelector: `.${CSS.colorFieldScope}`,
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-color-picker"),
    [
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "fieldDisabled",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-color-picker"));
});

describe("renders", () => {
  renders(() => mount("calcite-color-picker"), { display: "inline-block" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-color-picker"));
});

const centerColorFieldColor = "#408047";
const defaultMediumWidthInPx = 240;

describe("disabled", () => {
  disabled(() => mount(<calcite-color-picker value={centerColorFieldColor} />));
});

describe("scope interaction", () => {
  describe.skip("keyboard", () => {
    it("allows editing color field via keyboard", async () => {
      const { el } = await mount<ColorPicker>(<calcite-color-picker clearable value="" />);

      await userEvent.keyboard("{Tab}");
      await expect.element(el).toHaveProperty("value", "");
      await userEvent.keyboard("{ArrowDown}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#ffffff");
      await userEvent.keyboard("{ArrowDown}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#ebebeb");
      await userEvent.keyboard("{ArrowDown}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#ebebeb");
      await userEvent.keyboard("{ArrowUp}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#ffffff");
      await userEvent.keyboard("{ArrowRight}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#e1e7eb");
      await userEvent.keyboard("{ArrowLeft}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#ebebeb");
    });

    it("allows nudging color's saturation even if it does not change RGB value", async () => {
      await mount<ColorPicker>(<calcite-color-picker value="#000" />);
      const scope = page.getBySelector(`calcite-color-picker .${CSS.colorFieldScope}`);

      const initialStyle = window.getComputedStyle(scope.element());
      expect(initialStyle.left).toBe("-0.5px");

      await userEvent.keyboard("{Tab}");

      let nudgesToTheEdge = 25;

      while (nudgesToTheEdge--) {
        await userEvent.keyboard("{ArrowRight}");
        await afterNextTask();
      }

      const finalStyle = window.getComputedStyle(scope.element());
      const mediumScaleColorFieldDimensions = await getColorFieldDimensions(defaultMediumWidthInPx);
      expect(finalStyle.left).toBe(`${mediumScaleColorFieldDimensions.width - SCOPE_SIZE / 2}px`);
    });

    it("allows nudging color's hue even if it does not change RGB value", async () => {
      await mount<ColorPicker>(<calcite-color-picker value="#000" />);
      const scope = page.getBySelector(`calcite-color-picker .${CSS.hueScope}`);

      const nudgeAThirdOfSlider = async () => {
        let totalNudgesByTen = 12;

        await userEvent.keyboard("{Shift>}");
        while (totalNudgesByTen--) {
          await userEvent.keyboard("{ArrowRight}");
          await afterNextTask();
        }
        await userEvent.keyboard("{/Shift}");
      };

      const getScopeLeftOffset = async () =>
        parseFloat(window.getComputedStyle(scope.element()).left);

      expect(await getScopeLeftOffset()).toBeCloseTo(STATIC_DIMENSIONS.m.thumb.radius - 0.5, 0);

      await userEvent.keyboard("{Tab}{Tab}");

      await nudgeAThirdOfSlider();
      await afterNextTask();
      expect(await getScopeLeftOffset()).toBeCloseTo(58.9, 0);

      await nudgeAThirdOfSlider();
      await afterNextTask();
      expect(await getScopeLeftOffset()).toBeCloseTo(118.5, 0);

      await nudgeAThirdOfSlider();
      await afterNextTask();
      // hue wraps around, so we nudge it back to assert position at the edge
      await userEvent.keyboard("{ArrowLeft}");
      await afterNextTask();
      expect(await getScopeLeftOffset()).toBeCloseTo(170.5, 0);

      // nudge it to wrap around
      await userEvent.keyboard("{ArrowRight}");
      await afterNextTask();
      expect(await getScopeLeftOffset()).toBeCloseTo(STATIC_DIMENSIONS.m.thumb.radius - 0.5, 0);
    });

    it("allows editing hue slider via keyboard", async () => {
      const { el } = await mount<ColorPicker>(<calcite-color-picker clearable value="" />);

      await userEvent.keyboard("{Tab}{Tab}");
      await userEvent.keyboard("{ArrowDown}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#007ec2");
      await userEvent.keyboard("{ArrowUp}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#007bc2");
      await userEvent.keyboard("{ArrowLeft}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#007ec2");
      await userEvent.keyboard("{ArrowRight}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#007bc2");

      await userEvent.keyboard("{Shift>}");
      await userEvent.keyboard("{ArrowDown}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#009bc2");
      await userEvent.keyboard("{ArrowUp}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#007bc2");
      await userEvent.keyboard("{ArrowLeft}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#009bc2");
      await userEvent.keyboard("{ArrowRight}");
      await afterNextTask();
      await expect.element(el).toHaveProperty("value", "#007bc2");
      await userEvent.keyboard("{Shift/}");
    });

    it("positions the scope correctly when the color is 000", async () => {
      await mount<ColorPicker>(<calcite-color-picker value="#000" />);
      const hueSliderScope = page.getBySelector(`calcite-color-picker .${CSS.hueScope}`);

      expect(window.getComputedStyle(hueSliderScope.element())).toMatchObject({
        top: "6.5px",
        left: `${STATIC_DIMENSIONS.m.thumb.radius - 0.5}px`,
      });
    });

    describe("alpha channel", () => {
      it("allows editing alpha value via keyboard", async () => {
        const { el } = await mount<ColorPicker>(
          <calcite-color-picker alpha-channel value="#ffffffff" />,
        );

        await userEvent.keyboard("{Tab}{Tab}{Tab}");
        await userEvent.keyboard("{ArrowDown}");
        await afterNextTask();
        await expect.element(el).toHaveProperty("value", "#fffffffc");

        await userEvent.keyboard("{ArrowDown}");
        await afterNextTask();
        await expect.element(el).toHaveProperty("value", "#fffffffa");

        await userEvent.keyboard("{ArrowDown}");
        await afterNextTask();
        await expect.element(el).toHaveProperty("value", "#fffffff7");

        await userEvent.keyboard("{ArrowUp}");
        await afterNextTask();
        await expect.element(el).toHaveProperty("value", "#fffffffa");

        await userEvent.keyboard("{ArrowRight}");
        await afterNextTask();
        await expect.element(el).toHaveProperty("value", "#fffffffc");

        await userEvent.keyboard("{ArrowLeft}");
        await afterNextTask();
        await expect.element(el).toHaveProperty("value", "#fffffffa");
      });
    });
  });

  describe("mouse", () => {
    const moveByInPx = 2;

    it.skip("should update value when color field scope is moved", async () => {
      const { el } = await mount<ColorPicker>(
        <calcite-color-picker value={centerColorFieldColor} />,
      );
      const colorFieldScope = page.getBySelector(`calcite-color-picker .${CSS.colorFieldScope}`);
      const initialValue = el.value;

      await userEvent.click(colorFieldScope, { position: { x: -moveByInPx, y: 0 }, force: true });
      await afterNextTask();

      await expect.element(el).not.toHaveProperty("value", initialValue);
    });

    it("should update value when hue scope is moved", async () => {
      const { el } = await mount<ColorPicker>(
        <calcite-color-picker value={centerColorFieldColor} />,
      );
      const hueScope = page.getBySelector(`calcite-color-picker .${CSS.hueScope}`);
      const initialValue = el.value;

      await userEvent.click(hueScope, { position: { x: -moveByInPx, y: 0 }, force: true });
      await afterNextTask();

      await expect.element(el).not.toHaveProperty("value", initialValue);
    });

    it("should update value when opacity scope is moved", async () => {
      const { el } = await mount<ColorPicker>(
        <calcite-color-picker alpha-channel value={centerColorFieldColor} />,
      );
      const opacityScope = page.getBySelector(`calcite-color-picker .${CSS.opacityScope}`);
      const initialValue = el.value;

      await userEvent.click(opacityScope, { position: { x: -moveByInPx, y: 0 }, force: true });
      await afterNextTask();

      await expect.element(el).not.toHaveProperty("value", initialValue);
    });
  });
});
