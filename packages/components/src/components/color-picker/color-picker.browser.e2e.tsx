import { h } from "@arcgis/lumina";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  onTestFinished,
  vi,
} from "vitest";
import { type Locator, page, userEvent } from "vitest/browser";
import { mount, type RenderResult } from "@arcgis/lumina-compiler/testing";
import * as esToolkit from "es-toolkit";
import { commands } from "../../tests/browser/commands";
import {
  accessible,
  cancelable,
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests/browser";
import { toBeInteger, toBeNumber } from "../../tests/utils/matchers";
import { mockConsole } from "../../tests/utils/logging";
import type { ColorValue, HSV } from "./interfaces";
import {
  CSS,
  DEFAULT_COLOR,
  DEFAULT_STORAGE_KEY_PREFIX,
  SCOPE_SIZE,
  STATIC_DIMENSIONS,
} from "./resources";
import type { ColorPicker } from "./color-picker";
import { type Format, getColorFieldDimensions, getSliderWidth } from "./utils";
import type { InputNumber } from "../input-number/input-number";
import { isInputNumber } from "../input-number/resources";
import type { ColorPickerHexInput } from "../color-picker-hex-input/color-picker-hex-input";
import type { Slider } from "../slider/slider";
import type { Button } from "../button/button";
import type { TabTitle } from "../tab-title/tab-title";
import { afterNextFrame } from "../../tests/utils/timing";
import { focusElement } from "../../utils/dom";

vi.mock("es-toolkit", { spy: true });

mockConsole();

const storageId = "test-storage-id";

function clearStorage(): void {
  const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${storageId}`;
  localStorage.removeItem(storageKey);
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount("calcite-color-picker"));
  });

  describe("clearable + cleared", () => {
    accessible(() => mount(<calcite-color-picker clearable value="" />));
  });
});

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
  beforeEach(() => {
    vi.mocked(esToolkit.throttle).mockImplementation((toThrottle) => {
      const fakeThrottled = (...args: any[]) => toThrottle(...args);
      // eslint-disable-next-line no-restricted-properties -- test mock requires throttle-compatible cancel API
      fakeThrottled.cancel = vi.fn();
      fakeThrottled.flush = vi.fn();
      return fakeThrottled;
    });
  });

  describe("keyboard", () => {
    it("allows editing color field via keyboard", async () => {
      const { el } = await mount<ColorPicker>(<calcite-color-picker clearable value="" />);

      await userEvent.keyboard("{Tab}");
      expect(el.value).toBeUndefined();
      await userEvent.keyboard("{ArrowDown}");
      expect(el.value).toBe("#ffffff");
      await userEvent.keyboard("{ArrowDown}");
      expect(el.value).toBe("#ebebeb");
      await userEvent.keyboard("{ArrowDown}");
      expect(el.value).toBe("#d6d6d6");
      await userEvent.keyboard("{ArrowUp}");
      expect(el.value).toBe("#ebebeb");
      await userEvent.keyboard("{ArrowRight}");
      expect(el.value).toBe("#e1e7eb");
      await userEvent.keyboard("{ArrowLeft}");
      expect(el.value).toBe("#ebebeb");
    });

    it("allows nudging color's saturation even if it does not change RGB value", async () => {
      await mount<ColorPicker>(<calcite-color-picker value="#000" />);
      await afterNextFrame(); // scope visual updates are delayed by a frame
      const scope = page.getByRole("slider", { name: "Saturation" });

      const initialStyle = window.getComputedStyle(scope.element());
      expect(initialStyle.left).toBe("-0.5px");

      let nudgesToTheEdge = 25;
      await userEvent.keyboard("{Tab}");
      while (nudgesToTheEdge--) {
        await userEvent.keyboard("{ArrowRight}");
        await afterNextFrame();
      }

      const finalStyle = window.getComputedStyle(scope.element());
      const mediumScaleColorFieldDimensions = getColorFieldDimensions(defaultMediumWidthInPx);
      expect(finalStyle.left).toBe(`${mediumScaleColorFieldDimensions.width - SCOPE_SIZE / 2}px`);
    });

    it("allows nudging color's hue even if it does not change RGB value", async () => {
      await mount<ColorPicker>(<calcite-color-picker value="#000" />);
      await afterNextFrame(); // scope visual updates are delayed by a frame
      const scope = page.getByRole("slider", { name: "Hue" });

      const nudgeAThirdOfSlider = async () => {
        const totalNudgesByTen = 12;
        await userEvent.keyboard(`{Shift>}{ArrowRight>${totalNudgesByTen}/}{/Shift}`);
        await afterNextFrame();
      };

      const getScopeLeftOffset = async () =>
        parseFloat(window.getComputedStyle(scope.element()).left);

      expect(await getScopeLeftOffset()).toBeCloseTo(STATIC_DIMENSIONS.m.thumb.radius - 0.5, 0);

      await userEvent.keyboard("{Tab}{Tab}");

      await nudgeAThirdOfSlider();
      expect(await getScopeLeftOffset()).toBeCloseTo(58.9, 0);

      await nudgeAThirdOfSlider();
      expect(await getScopeLeftOffset()).toBeCloseTo(118.5, 0);

      await nudgeAThirdOfSlider();
      // hue wraps around, so we nudge it back to assert position at the edge
      await userEvent.keyboard("{ArrowLeft}");
      expect(await getScopeLeftOffset()).toBeCloseTo(170.5, 0);

      // nudge it to wrap around
      await userEvent.keyboard("{ArrowRight}");
      expect(await getScopeLeftOffset()).toBeCloseTo(STATIC_DIMENSIONS.m.thumb.radius - 0.5, 0);
    });

    it("allows editing hue slider via keyboard", async () => {
      const { el } = await mount<ColorPicker>(<calcite-color-picker clearable value="" />);

      await userEvent.keyboard("{Tab}{Tab}");
      await userEvent.keyboard("{ArrowDown}");
      await expect.element(el).toHaveProperty("value", "#007ec2");
      await userEvent.keyboard("{ArrowUp}");
      await expect.element(el).toHaveProperty("value", "#007bc2");
      await userEvent.keyboard("{ArrowLeft}");
      await expect.element(el).toHaveProperty("value", "#007ec2");
      await userEvent.keyboard("{ArrowRight}");
      await expect.element(el).toHaveProperty("value", "#007bc2");

      await userEvent.keyboard("{Shift>}");
      await userEvent.keyboard("{ArrowDown}");
      await expect.element(el).toHaveProperty("value", "#009bc2");
      await userEvent.keyboard("{ArrowUp}");
      await expect.element(el).toHaveProperty("value", "#007bc2");
      await userEvent.keyboard("{ArrowLeft}");
      await expect.element(el).toHaveProperty("value", "#009bc2");
      await userEvent.keyboard("{ArrowRight}");
      await expect.element(el).toHaveProperty("value", "#007bc2");
      await userEvent.keyboard("{/Shift}");
    });

    it("positions the scope correctly when the color is #000", async () => {
      await mount<ColorPicker>(<calcite-color-picker value="#000" />);
      await afterNextFrame(); // scope visual updates are delayed by a frame
      const hueSliderScope = page.getByRole("slider", { name: "Hue" });

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
        await expect.element(el).toHaveProperty("value", "#fffffffc");

        await userEvent.keyboard("{ArrowDown}");
        await expect.element(el).toHaveProperty("value", "#fffffffa");

        await userEvent.keyboard("{ArrowDown}");
        await expect.element(el).toHaveProperty("value", "#fffffff7");

        await userEvent.keyboard("{ArrowUp}");
        await expect.element(el).toHaveProperty("value", "#fffffffa");

        await userEvent.keyboard("{ArrowRight}");
        await expect.element(el).toHaveProperty("value", "#fffffffc");

        await userEvent.keyboard("{ArrowLeft}");
        await expect.element(el).toHaveProperty("value", "#fffffffa");
      });
    });
  });

  describe("mouse", () => {
    const moveByInPx = 2;

    it("should update value when color field scope is moved", async () => {
      const { el } = await mount<ColorPicker>(
        <calcite-color-picker value={centerColorFieldColor} />,
      );
      const colorFieldScope = page.getByRole("slider", { name: "Saturation" });
      const initialValue = el.value;

      await userEvent.click(colorFieldScope, { position: { x: -moveByInPx, y: 0 }, force: true });

      await expect.element(el).not.toHaveProperty("value", initialValue);
    });

    it("should update value when hue scope is moved", async () => {
      const { el } = await mount<ColorPicker>(
        <calcite-color-picker value={centerColorFieldColor} />,
      );
      const hueScope = page.getByRole("slider", { name: "Hue" });
      const initialValue = el.value;

      await userEvent.click(hueScope, { position: { x: -moveByInPx, y: 0 }, force: true });

      await expect.element(el).not.toHaveProperty("value", initialValue);
    });

    it("should update value when opacity scope is moved", async () => {
      const { el } = await mount<ColorPicker>(
        <calcite-color-picker alpha-channel value={centerColorFieldColor} />,
      );
      const opacityScope = page.getByRole("slider", { name: "Opacity" });
      const initialValue = el.value;

      await userEvent.click(opacityScope, { position: { x: -moveByInPx, y: 0 }, force: true });

      await expect.element(el).not.toHaveProperty("value", initialValue);
    });
  });
});

async function typeElement(target: HTMLElement, value: string): Promise<void> {
  if (!value) {
    return;
  }

  await focusElement(target);
  await userEvent.keyboard(value);
}

function getElementRect(hostSelector: string, shadowSelector: string): DOMRect {
  const target = page.getBySelector(`${hostSelector} ${shadowSelector}`).element();
  return target.getBoundingClientRect();
}

function getElementXY(hostSelector: string, shadowSelector: string): [number, number] {
  const rect = getElementRect(hostSelector, shadowSelector);

  return [rect.x, rect.y];
}

async function selectText(element: HTMLElement): Promise<void> {
  const input = page.elementLocator(element).getByRole("textbox").first().element() as
    | HTMLInputElement
    | HTMLTextAreaElement
    | null;

  if (input) {
    input.focus();
    input.select();
    return;
  }

  await focusElement(element);

  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection?.removeAllRanges();
  selection?.addRange(range);
}

function getScopeCenter(X: number, Y: number): [number, number] {
  return [X + SCOPE_SIZE / 2, Y + SCOPE_SIZE / 2];
}

it(`should set all internal calcite-button types to 'button'`, async () => {
  await mount("calcite-color-picker");

  const buttons = page
    .getBySelector(`calcite-color-picker .${CSS.container} calcite-button`)
    .elements() as Button["el"][];

  expect(buttons).toHaveLength(4);
  buttons.forEach((button) => expect(button.type).toBe("button"));
});

it("emits event when value changes via user interaction and not programmatically", async () => {
  const { el, reRender } = await mount("calcite-color-picker");

  const changeSpy = vi.fn();
  const inputSpy = vi.fn();
  el.addEventListener("calciteColorPickerChange", changeSpy);
  el.addEventListener("calciteColorPickerInput", inputSpy);
  try {
    const colorFieldCenterValueHex = "#408048";

    el.value = colorFieldCenterValueHex;
    await reRender();

    expect(changeSpy).toHaveBeenCalledTimes(0);
    expect(inputSpy).toHaveBeenCalledTimes(0);

    // save for future test/assertion
    await userEvent.click(page.getBySelector(`calcite-color-picker .${CSS.saveColor}`));

    // change by clicking on field
    const [centerColorFieldScopeX, centerColorFieldScopeY] = getElementXY(
      "calcite-color-picker",
      `.${CSS.colorFieldScope}`,
    );
    await userEvent.click(document.body, {
      position: { x: centerColorFieldScopeX + 10, y: centerColorFieldScopeY },
    });

    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(inputSpy).toHaveBeenCalledTimes(1);

    // change by clicking on hue
    let [hueScopeX, hueScopeY] = getElementXY("calcite-color-picker", `.${CSS.hueScope}`);
    await userEvent.click(document.body, { position: { x: hueScopeX + 10, y: hueScopeY } });

    expect(changeSpy).toHaveBeenCalledTimes(2);
    expect(inputSpy).toHaveBeenCalledTimes(2);

    // change by changing hex value
    const hexInput = page
      .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
      .element() as ColorPickerHexInput["el"];
    await selectText(hexInput);
    await typeElement(hexInput, "fff{Enter}");

    expect(changeSpy).toHaveBeenCalledTimes(3);
    expect(inputSpy).toHaveBeenCalledTimes(3);

    // change by changing color channels (we only test R and assume the same holds for G/B & H/S/V channels)
    const channelInput = page
      .getBySelector(`calcite-color-picker .${CSS.channel}`)
      .first()
      .element() as InputNumber["el"];
    await selectText(channelInput);
    await typeElement(channelInput, "254");

    expect(changeSpy).toHaveBeenCalledTimes(6);
    expect(inputSpy).toHaveBeenCalledTimes(6);

    // change by clicking stored color
    await userEvent.click(
      page.elementLocator(
        page.getBySelector(`calcite-color-picker .${CSS.savedColor}`).element() as HTMLElement,
      ),
    );
    expect(changeSpy).toHaveBeenCalledTimes(7);
    expect(inputSpy).toHaveBeenCalledTimes(7);

    // change by dragging color field thumb
    const mouseDragSteps = 10;
    const [draggedColorFieldScopeX, draggedColorFieldScopeY] = getElementXY(
      "calcite-color-picker",
      `.${CSS.colorFieldScope}`,
    );

    await commands.mouseMove(draggedColorFieldScopeX, draggedColorFieldScopeY);
    await commands.mouseDown();
    await commands.mouseMove(draggedColorFieldScopeX + 10, draggedColorFieldScopeY, {
      steps: mouseDragSteps,
    });
    await commands.mouseUp();

    expect(changeSpy).toHaveBeenCalledTimes(8);
    expect(inputSpy.mock.calls.length).toBeGreaterThan(8); // input event fires more than once

    // change by dragging hue slider thumb
    [hueScopeX, hueScopeY] = getElementXY("calcite-color-picker", `.${CSS.hueScope}`);
    let previousInputEventLength = inputSpy.mock.calls.length;

    await commands.mouseMove(hueScopeX, hueScopeY);
    await commands.mouseDown();
    await commands.mouseMove(hueScopeX + 10, hueScopeY, { steps: mouseDragSteps });
    await commands.mouseUp();

    expect(changeSpy).toHaveBeenCalledTimes(9);
    expect(inputSpy.mock.calls.length).toBeGreaterThan(previousInputEventLength + 1); // input event fires more than once

    previousInputEventLength = inputSpy.mock.calls.length;

    // this portion covers an odd scenario where setting twice would cause the component to emit
    el.value = colorFieldCenterValueHex;
    await reRender();

    el.value = "#fff";
    await reRender();

    expect(changeSpy).toHaveBeenCalledTimes(9);
    expect(inputSpy.mock.calls.length).toBe(previousInputEventLength);
  } finally {
    el.removeEventListener("calciteColorPickerChange", changeSpy);
    el.removeEventListener("calciteColorPickerInput", inputSpy);
  }
});

it("allows setting color object on initialization", async () => {
  const { el } = await mount<ColorPicker>(
    <calcite-color-picker alphaChannel={true} value={supportedAlphaFormatToSampleValue.rgba} />,
  );
  expect(el.value).toEqual(supportedAlphaFormatToSampleValue.rgba);
});

it("increments channel's value by 1 when clearing input and pressing ArrowUp. Same should apply to other channel inputs", async () => {
  await mount("calcite-color-picker");
  const channelInput = page
    .getBySelector(`calcite-color-picker .${CSS.channel}`)
    .first()
    .element() as InputNumber["el"];
  const currentValue = channelInput.value;

  await selectText(channelInput);
  await userEvent.keyboard("{Backspace}");
  await userEvent.keyboard("{ArrowUp}");

  expect(channelInput.value).toBe(`${Number(currentValue) + 1}`);
});

it("decrements channel's value by 1 when clearing input and pressing ArrowDown. Same should apply to other channel inputs", async () => {
  await mount<ColorPicker>(<calcite-color-picker value="#b33f33" />);
  const channelInput = page
    .getBySelector(`calcite-color-picker .${CSS.channel}`)
    .first()
    .element() as InputNumber["el"];
  const currentValue = channelInput.value;

  await selectText(channelInput);
  await userEvent.keyboard("{Backspace}");
  await userEvent.keyboard("{ArrowDown}");

  expect(channelInput.value).toBe(`${Number(currentValue) - 1}`);
});

it("prevents channel's value from going over its limit when clearing input and pressing ArrowUp. Same should apply to other channel inputs", async () => {
  await mount<ColorPicker>(<calcite-color-picker value="#ffffff" />);
  const channelInput = page
    .getBySelector(`calcite-color-picker .${CSS.channel}`)
    .first()
    .element() as InputNumber["el"];

  await selectText(channelInput);
  await userEvent.keyboard("{Backspace}");
  await userEvent.keyboard("{ArrowUp}");

  expect(channelInput.value).toBe("255");
});

it("prevents channel's value from being less than 0 when clearing input and pressing ArrowDown. Same should apply to other channel inputs", async () => {
  await mount("calcite-color-picker");
  const channelInput = page
    .getBySelector(`calcite-color-picker .${CSS.channel}`)
    .first()
    .element() as InputNumber["el"];

  await selectText(channelInput);
  await userEvent.keyboard("{Backspace}");
  await userEvent.keyboard("{ArrowDown}");

  expect(channelInput.value).toBe("0");
});

it("restores original channel value when input is cleared and blur is triggered. Same should apply to other channel inputs", async () => {
  await mount("calcite-color-picker");
  const channelInput = page
    .getBySelector(`calcite-color-picker .${CSS.channel}`)
    .first()
    .element() as InputNumber["el"];
  const currentValue = channelInput.value;

  await selectText(channelInput);
  await userEvent.keyboard("{Backspace}");
  await userEvent.keyboard("{Tab}");

  expect(channelInput.value).toBe(currentValue);
});

it("auto commits channel value when typing. Same should apply to other channel inputs", async () => {
  const { el } = await mount("calcite-color-picker");

  const channelInput = page
    .getBySelector(`calcite-color-picker .${CSS.channel}`)
    .first()
    .element() as InputNumber["el"];

  const changeSpy = vi.fn();
  el.addEventListener("calciteColorPickerChange", changeSpy);

  try {
    await selectText(channelInput);
    await userEvent.keyboard("123");

    expect(changeSpy).toHaveBeenCalledTimes(3);
    expect(channelInput.value).toBe("123");
  } finally {
    el.removeEventListener("calciteColorPickerChange", changeSpy);
  }
});

it("blurs focused input when clicking anywhere within the component. It should apply to all inputs", async () => {
  const { el } = await mount("calcite-color-picker");

  const channelInput = page
    .getBySelector(`calcite-color-picker .${CSS.channel}`)
    .first()
    .element() as InputNumber["el"];
  const currentValue = channelInput.value;

  const blurSpy = vi.fn();
  el.addEventListener("calciteInternalInputNumberBlur", blurSpy);

  try {
    await selectText(channelInput);
    await userEvent.keyboard("{Backspace}");
    await userEvent.click(document.body, { position: { x: 0, y: 0 } });

    expect(blurSpy).toHaveBeenCalledTimes(1);
    expect(channelInput.value).toBe(currentValue);
  } finally {
    el.removeEventListener("calciteInternalInputNumberBlur", blurSpy);
  }
});

it("does not emit on initialization", async () => {
  const inputAndChangeHandler = vi.fn();
  document.addEventListener("calciteColorPickerInput", inputAndChangeHandler);
  document.addEventListener("calciteColorPickerChange", inputAndChangeHandler);

  onTestFinished(() => {
    document.removeEventListener("calciteColorPickerInput", inputAndChangeHandler);
    document.removeEventListener("calciteColorPickerChange", inputAndChangeHandler);
  });

  await mount<ColorPicker>(
    <calcite-color-picker value="rgb(255, 255, 255)" /> /*{ parent: container }*/,
  );

  expect(inputAndChangeHandler).not.toHaveBeenCalled();
});

const supportedFormatToSampleValue: Record<
  Extract<Format, "hex" | "rgb-css" | "hsl-css" | "rgb" | "hsl" | "hsv">,
  ColorValue
> = {
  hex: "#ffffff",
  "rgb-css": "rgb(255, 255, 255)",
  "hsl-css": "hsl(0, 0%, 100%)",
  rgb: { r: 255, g: 255, b: 255 },
  hsl: { h: 0, s: 0, l: 100 },
  hsv: { h: 0, s: 0, v: 100 },
};

const supportedAlphaFormatToSampleValue: Record<
  Extract<Format, "hexa" | "rgba-css" | "hsla-css" | "rgba" | "hsla" | "hsva">,
  ColorValue
> = {
  hexa: "#ffffffff",
  "rgba-css": "rgba(255, 255, 255, 1)",
  "hsla-css": "hsla(0, 0%, 100%, 1)",
  rgba: { r: 255, g: 255, b: 255, a: 1 },
  hsla: { h: 0, s: 0, l: 100, a: 1 },
  hsva: { h: 0, s: 0, v: 100, a: 1 },
};

const allSupportedFormatToSampleValue = {
  ...supportedFormatToSampleValue,
  ...supportedAlphaFormatToSampleValue,
} as const;

const clearAndEnterHexOrChannelValue = async (
  channelInputOrHexInput: InputNumber["el"] | ColorPickerHexInput["el"],
  value: ColorValue,
): Promise<void> => {
  await channelInputOrHexInput.setFocus();

  await selectText(channelInputOrHexInput);
  await typeElement(channelInputOrHexInput, `{Backspace}${value}{Enter}`);
};

function assertUnsupportedValueMessage(value: string | object | undefined, format: string): void {
  expect(console.warn).toHaveBeenCalledTimes(1);
  expect(console.warn).toHaveBeenCalledWith(
    expect.stringMatching(
      new RegExp(
        `\\s*ignoring color value \\(${value}\\) as it is not compatible with the current format \\(${format}\\)\\s*`,
      ),
    ),
  );
}

describe("color format", () => {
  describe("when set initially", () => {
    let changeHandler: ReturnType<typeof vi.fn<() => void>>;

    beforeEach(() => {
      changeHandler = vi.fn();
    });

    function assertNoChangeEvents(): void {
      expect(changeHandler).toHaveBeenCalledTimes(0);
    }

    // this suite uses a subset of supported formats as other tests cover the rest

    it("changes the default value to the format", async () => {
      const { el } = await mount<ColorPicker>(<calcite-color-picker format="rgb" />);
      el.addEventListener("calciteColorPickerChange", changeHandler);

      expect(el.value).toEqual(DEFAULT_COLOR.rgb().round().object());
      assertNoChangeEvents();
    });

    it("initial value and format are both set if compatible", async () => {
      const initialValue = "rgb(255, 128, 255)";
      const { el } = await mount<ColorPicker>(
        <calcite-color-picker format="rgb-css" value={initialValue} />,
      );
      el.addEventListener("calciteColorPickerChange", changeHandler);

      const initialValueIsRendered =
        // color prop is used to render the active color
        el.color!.string() === initialValue;

      expect(el.value).toEqual(initialValue);
      expect(initialValueIsRendered).toBe(true);
      assertNoChangeEvents();
    });

    it("falls back to format-compliant default if initial value is not compatible with initial format", async () => {
      const { el } = await mount<ColorPicker>(
        <calcite-color-picker format="hsl-css" value="#f00f00" />,
      );
      el.addEventListener("calciteColorPickerChange", changeHandler);

      expect(el.value).toEqual(DEFAULT_COLOR.hsl().round().string());
      assertNoChangeEvents();
    });
  });

  it("allows specifying the color value format", async () => {
    const { el, reRender } = await mount("calcite-color-picker");

    for (const format in supportedFormatToSampleValue) {
      const expectedValue = supportedFormatToSampleValue[format];

      // set base format and value to test setting different format values
      el.format = format as ColorPicker["format"];
      await reRender();
      el.value = expectedValue;
      await reRender();

      for (const format in supportedFormatToSampleValue) {
        el.value = supportedFormatToSampleValue[format];
        await reRender();

        // non-matching formats are ignored
        expect(el.value).toEqual(expectedValue);
      }
    }
  });

  it("changing format updates value", async () => {
    const { el, reRender } = await mount<ColorPicker>(
      <calcite-color-picker value={supportedFormatToSampleValue["hex"]} />,
    );

    for (const format in supportedFormatToSampleValue) {
      el.format = format as ColorPicker["format"];
      await reRender();

      expect(el.value).toEqual(supportedFormatToSampleValue[format]);
    }
  });
});

describe("accepts multiple color value formats", () => {
  it("default", async () => {
    const { el, reRender } = await mount("calcite-color-picker");

    const supportedStringFormats = [
      supportedFormatToSampleValue.hex,
      supportedFormatToSampleValue["rgb-css"],
      supportedFormatToSampleValue["hsl-css"],
    ];

    for (const value of supportedStringFormats) {
      el.value = value;
      await reRender();

      expect(el.value).toBe(value);
    }

    const supportedObjectFormats = [
      supportedFormatToSampleValue.rgb,
      supportedFormatToSampleValue.hsl,
      supportedFormatToSampleValue.hsv,
    ] as const;

    for (const value of supportedObjectFormats) {
      el.value = value;
      await reRender();

      expect(el.value).toMatchObject(value as any);
    }
  });

  it("keeps value in alpha-compatible format when applying updates", async () => {
    const { el, reRender } = await mount<ColorPicker>(<calcite-color-picker alpha-channel />);

    const supportedStringFormats: [ColorValue, ColorValue][] = [
      [allSupportedFormatToSampleValue.hex, allSupportedFormatToSampleValue.hexa],
      [allSupportedFormatToSampleValue.hexa, allSupportedFormatToSampleValue.hexa],
      [allSupportedFormatToSampleValue["rgb-css"], allSupportedFormatToSampleValue["rgba-css"]],
      [allSupportedFormatToSampleValue["rgba-css"], allSupportedFormatToSampleValue["rgba-css"]],
      [allSupportedFormatToSampleValue["hsl-css"], allSupportedFormatToSampleValue["hsla-css"]],
      [allSupportedFormatToSampleValue["hsla-css"], allSupportedFormatToSampleValue["hsla-css"]],
    ];

    for (const [value, expected] of supportedStringFormats) {
      el.value = value;
      await reRender();

      expect(el.value).toBe(expected);
    }

    const supportedObjectFormats: [any, any][] = [
      [allSupportedFormatToSampleValue.rgb, allSupportedFormatToSampleValue.rgba],
      [allSupportedFormatToSampleValue.rgba, allSupportedFormatToSampleValue.rgba],
      [allSupportedFormatToSampleValue.hsl, allSupportedFormatToSampleValue.hsla],
      [allSupportedFormatToSampleValue.hsla, allSupportedFormatToSampleValue.hsla],
      [allSupportedFormatToSampleValue.hsv, allSupportedFormatToSampleValue.hsva],
      [allSupportedFormatToSampleValue.hsva, allSupportedFormatToSampleValue.hsva],
    ];

    for (const [value, expected] of supportedObjectFormats) {
      el.value = value;
      await reRender();

      expect(el.value).toMatchObject(expected);
    }
  });
});

it("allows selecting colors via color field/slider", async () => {
  const { el, reRender } = await mount<ColorPicker>(
    <calcite-color-picker scale="m" value="#000" />,
  );

  const spy = vi.fn();
  el.addEventListener("calciteColorPickerChange", spy);
  try {
    let changes = 0;
    const mediumScaleDimensions = STATIC_DIMENSIONS.m;
    const widthOffset = 0.5;
    const [colorFieldX, colorFieldY] = getElementXY("calcite-color-picker", `.${CSS.colorField}`);
    const mediumScaleColorFieldDimensions = getColorFieldDimensions(defaultMediumWidthInPx);

    // clicking color field colors to pick a color
    await userEvent.click(document.body, { position: { x: colorFieldX, y: colorFieldY } });

    expect(el.value).toBe("#ffffff");
    expect(spy).toHaveBeenCalledTimes(++changes);

    await userEvent.click(document.body, {
      position: { x: colorFieldX, y: colorFieldY + mediumScaleColorFieldDimensions.height - 0.1 },
    });

    expect(el.value).toBe("#000000");
    expect(spy).toHaveBeenCalledTimes(++changes);

    await userEvent.click(document.body, {
      position: {
        x: colorFieldX + mediumScaleColorFieldDimensions.width - widthOffset,
        y: colorFieldY,
      },
    });

    expect(el.value).toBe("#ff0000");
    expect(spy).toHaveBeenCalledTimes(++changes);

    await userEvent.click(document.body, {
      position: {
        x: colorFieldX + mediumScaleColorFieldDimensions.width - widthOffset,
        y: colorFieldY + mediumScaleColorFieldDimensions.height - 0.1,
      },
    });

    expect(el.value).toBe("#000000");
    expect(spy).toHaveBeenCalledTimes(++changes);

    // set to corner right value that's not red (first value)
    el.value = "#ff0";
    await reRender();

    expect(spy).toHaveBeenCalledTimes(changes);

    // clicking on color slider to set hue
    const colorsToSample = 7;
    const offsetX =
      (getSliderWidth(defaultMediumWidthInPx, mediumScaleDimensions, false) - widthOffset) /
      colorsToSample;
    const [hueSliderX, hueSliderY] = getElementXY("calcite-color-picker", `.${CSS.hueSlider}`);

    let x = hueSliderX;

    const sliderHeight = hueSliderY + mediumScaleDimensions.slider.height / 2;

    const expectedColorSamples = [
      "#ff0000",
      "#ffd900",
      "#4cff00",
      "#00ff8c",
      "#0095ff",
      "#4400ff",
      "#ff00e1",
      "#ff0008",
    ];

    for (let i = 0; i < expectedColorSamples.length; i++) {
      const expectedColor = expectedColorSamples[i];

      await userEvent.click(document.body, { position: { x, y: sliderHeight } });

      expect(el.value).toBe(expectedColor);
      expect(spy).toHaveBeenCalledTimes(++changes);

      x += offsetX;
    }

    // clicking on the slider when the color won't change by hue adjustments

    el.value = "#000";
    await reRender();

    expect(spy).toHaveBeenCalledTimes(changes);

    x = 0;

    const internalColor = el.color;

    const middleOfSlider = getSliderWidth(defaultMediumWidthInPx, mediumScaleDimensions, false) / 2;
    await userEvent.click(document.body, {
      position: { x: x + middleOfSlider, y: sliderHeight },
    });

    const internalColorChanged = internalColor !== el.color;

    expect(internalColorChanged).toBe(true);
    expect(spy).toHaveBeenCalledTimes(++changes);
  } finally {
    el.removeEventListener("calciteColorPickerChange", spy);
  }
});

it("keeps tracking mouse movement when a thumb is actively dragged", async () => {
  const { el } = await mount("calcite-color-picker");

  const colorFieldAndSlider = page
    .getBySelector(`calcite-color-picker .${CSS.colorField}`)
    .element() as HTMLElement;

  await userEvent.click(page.elementLocator(colorFieldAndSlider)); // click middle color

  let lastColor = el.value;

  await commands.mouseDown();
  await commands.mouseMove(1000, -1000); // top-right

  // note that we move the mouse in this order to guarantee value changes (bottom row is #000)

  let currentColor = el.value;
  expect(currentColor).not.toEqual(lastColor);
  lastColor = currentColor;

  await commands.mouseMove(-1000, 1000); // bottom-left
  currentColor = el.value;
  expect(currentColor).not.toEqual(lastColor);
  lastColor = currentColor;

  await commands.mouseMove(-1000, -1000); // top-left
  currentColor = el.value;
  expect(currentColor).not.toEqual(lastColor);
  lastColor = currentColor;

  await commands.mouseMove(1000, 1000); // bottom-right
  currentColor = el.value;
  expect(currentColor).not.toEqual(lastColor);
  lastColor = currentColor;

  // no longer tracks
  await commands.mouseUp();

  await commands.mouseMove(1000, -1000); // top-right

  currentColor = el.value;
  expect(currentColor).toEqual(lastColor);
  lastColor = currentColor;

  await commands.mouseMove(-1000, 1000); // bottom-left
  currentColor = el.value;
  expect(currentColor).toEqual(lastColor);
  lastColor = currentColor;

  await commands.mouseMove(-1000, -1000); // top-left
  currentColor = el.value;
  expect(currentColor).toEqual(lastColor);
  lastColor = currentColor;

  await commands.mouseMove(1000, 1000); // bottom-right
  currentColor = el.value;
  expect(currentColor).toEqual(lastColor);
});

it(`mouse movement tracking is not offset by the component's padding (mimics issue from #3041 when the component was placed within another component's shadow DOM)`, async () => {
  const colorFieldCenterValueHsv = { h: 127, s: 50, v: 50 };

  const { el } = await mount<ColorPicker>(
    <calcite-color-picker style="padding: 10px;" value={colorFieldCenterValueHsv} />,
  );

  // change by dragging color field thumb
  const [colorFieldScopeX, colorFieldScopeY] = getElementXY(
    "calcite-color-picker",
    `.${CSS.colorFieldScope}`,
  );

  await commands.mouseMove(colorFieldScopeX, colorFieldScopeY);
  await commands.mouseDown();
  await commands.mouseUp();

  const beforeDragHsv = el.value as HSV;

  await commands.mouseDown();
  await commands.mouseMove(colorFieldScopeX + 10, colorFieldScopeY);
  await commands.mouseUp();

  const afterDragHsv = el.value as HSV;

  expect(afterDragHsv.h).toBe(beforeDragHsv.h);
  expect(afterDragHsv.s).toBeGreaterThan(beforeDragHsv.s);
  expect(afterDragHsv.v).toBe(beforeDragHsv.v);
});

it("does not wrap the hue slider thumb when dragging past the edge", async () => {
  await mount("calcite-color-picker");
  const [hueSliderX] = getElementXY("calcite-color-picker", `.${CSS.hueSlider}`);
  const sliderWidth = getSliderWidth(defaultMediumWidthInPx, STATIC_DIMENSIONS.m, false);

  let [hueScopeX, hueScopeY] = getElementXY("calcite-color-picker", `.${CSS.hueScope}`);
  let [hueScopeCenterX, hueScopeCenterY] = getScopeCenter(hueScopeX, hueScopeY);

  await commands.mouseMove(hueScopeCenterX, hueScopeCenterY);
  await commands.mouseDown();
  await commands.mouseMove(0, hueScopeCenterY);
  await commands.mouseUp();

  [hueScopeX, hueScopeY] = getElementXY("calcite-color-picker", `.${CSS.hueScope}`);
  [hueScopeCenterX, hueScopeCenterY] = getScopeCenter(hueScopeX, hueScopeY);

  expect(hueScopeCenterX).toBe(hueSliderX + STATIC_DIMENSIONS.m.thumb.radius);

  await commands.mouseMove(hueScopeCenterX, hueScopeCenterY);
  await commands.mouseDown();
  await commands.mouseMove(hueScopeCenterX + sliderWidth, hueScopeCenterY);
  await commands.mouseUp();

  [hueScopeX] = getElementXY("calcite-color-picker", `.${CSS.hueScope}`);
  [hueScopeCenterX] = getScopeCenter(hueScopeX, hueScopeY);

  expect(hueScopeCenterX).toBe(hueSliderX + sliderWidth - STATIC_DIMENSIONS.m.thumb.radius);
});

it("does not allow text selection when color field/sliders are used", async () => {
  await mount<ColorPicker>(<calcite-color-picker alpha-channel />);
  const { x: hueSliderX, y: hueSliderY } = getElementRect(
    "calcite-color-picker",
    `.${CSS.hueSlider}`,
  );
  const { x: opacitySliderX, y: opacitySliderY } = getElementRect(
    "calcite-color-picker",
    `.${CSS.opacitySlider}`,
  );
  const { x: colorFieldX, y: colorFieldY } = getElementRect(
    "calcite-color-picker",
    `.${CSS.colorField}`,
  );

  const dragStartPoints = [
    [colorFieldX, colorFieldY],
    [hueSliderX, hueSliderY],
    [opacitySliderX, opacitySliderY],
  ];

  for (const [startingX, startingY] of dragStartPoints) {
    await commands.mouseMove(startingX, startingY);
    await commands.mouseDown();
    await commands.mouseMove(1000, 1000);
    await commands.mouseUp();

    expect(window.getSelection()!.type).toBe("None");
  }
});

describe("unsupported value handling", () => {
  let el: ColorPicker["el"];
  let reRender: RenderResult<ColorPicker>["reRender"];

  async function assertUnsupportedValue(unsupportedValue: string | undefined): Promise<void> {
    const spy = vi.fn();
    el.addEventListener("calciteColorPickerChange", spy);

    const currentValue = el.value;
    const { format } = el;
    el.value = unsupportedValue;
    await reRender();

    expect(el.value).toBe(currentValue);
    expect(spy).toHaveBeenCalledTimes(0);

    assertUnsupportedValueMessage(unsupportedValue, format);
  }

  beforeEach(async () => {
    const result = await mount("calcite-color-picker");
    el = result.el;
    reRender = result.reRender;
  });

  it("ignores unsupported value types", () => assertUnsupportedValue("unsupported-color-format"));

  it("ignores null when not allowed", () => assertUnsupportedValue(undefined));
});

describe("normalizes shorthand CSS hex", () => {
  it("normal", async () => {
    const { el, reRender } = await mount("calcite-color-picker");

    el.value = "#ABC";
    await reRender();

    expect(el.value).toBe("#aabbcc");
  });

  it("alpha channel", async () => {
    const { el, reRender } = await mount<ColorPicker>(<calcite-color-picker alpha-channel />);

    el.value = "#ABCD";
    await reRender();

    expect(el.value).toBe("#aabbccdd");
  });
});

it("has backdoor color prop for advanced use cases", async () => {
  const { el } = await mount("calcite-color-picker");
  expect(el.color).toBeTruthy();
});

describe("initial value used to initialize internal color", () => {
  const initialColor = supportedFormatToSampleValue.hex;

  it("value as attribute", async () => {
    const { el } = await mount<ColorPicker>(<calcite-color-picker value={initialColor} />);

    expect(el.color!.hex().toLowerCase()).toBe(initialColor);
  });

  it("value as property", async () => {
    const { el } = await mount<ColorPicker>(<calcite-color-picker value={initialColor} />);

    expect(el.color!.hex().toLowerCase()).toBe(initialColor);
  });
});

describe("color inputs", () => {
  it("numbering system does not revert to latn when clamping RGB channels", async () => {
    await mount<ColorPicker>(<calcite-color-picker numbering-system="arab" value="#fff000" />);

    const firstChannel = page.getBySelector(`calcite-color-picker .${CSS.channel}`).first();
    const calciteInputNumber = firstChannel.element() as HTMLElement;

    await selectText(calciteInputNumber);
    await typeElement(calciteInputNumber, "25555{Enter}");

    const nativeInputValue = firstChannel.getBySelector("input");

    await expect.element(nativeInputValue).toHaveValue("٢٥٥");
  });

  describe("default", () => {
    describe("keeps value in same format when applying updates", () => {
      let el: ColorPicker["el"];
      let reRender: RenderResult<ColorPicker>["reRender"];

      beforeEach(async () => {
        const result = await mount("calcite-color-picker");
        el = result.el;
        reRender = result.reRender;
      });

      const updateColorWithAllInputs = async (
        assertColorUpdate: (value: ColorValue) => void,
      ): Promise<void> => {
        const hexInput = page
          .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
          .element() as ColorPickerHexInput["el"];

        await clearAndEnterHexOrChannelValue(hexInput, "abc");

        assertColorUpdate(el.value!);

        const [rgbModeButton, hsvModeButton] = page
          .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
          .elements() as TabTitle["el"][];
        const [rInput, gInput, bInput, hInput, sInput, vInput] = page
          .getBySelector(`calcite-color-picker .${CSS.channel}`)
          .elements() as InputNumber["el"][];

        await userEvent.click(page.elementLocator(rgbModeButton));

        await clearAndEnterHexOrChannelValue(rInput, "128");
        await clearAndEnterHexOrChannelValue(gInput, "64");
        await clearAndEnterHexOrChannelValue(bInput, "32");

        assertColorUpdate(el.value!);

        await userEvent.click(page.elementLocator(hsvModeButton));

        // modifying value channel first to ensure other channel changes affect the underlying color
        await clearAndEnterHexOrChannelValue(vInput, "45");

        await clearAndEnterHexOrChannelValue(hInput, "180");
        await clearAndEnterHexOrChannelValue(sInput, "90");

        assertColorUpdate(el.value!);
      };

      it("supports hex", async () => {
        const hex = supportedFormatToSampleValue.hex;
        el.value = hex;
        await reRender();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toBe(hex);
          expect(value).toMatch(/^#[a-f0-9]{6}$/);
        });

        expect(() => assertUnsupportedValueMessage(hex, "auto")).toThrow();
      });

      it("supports rgb", async () => {
        const rgbCss = supportedFormatToSampleValue["rgb-css"];
        el.value = rgbCss;
        await reRender();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toBe(rgbCss);
          expect(value).toMatch(/^rgb\(\d+, \d+, \d+\)/);
        });

        expect(() => assertUnsupportedValueMessage(rgbCss, "auto")).toThrow();
      });

      it("supports hsl", async () => {
        const hslCss = supportedFormatToSampleValue["hsl-css"];
        el.value = hslCss;
        await reRender();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toBe(hslCss);
          expect(value).toMatch(/^hsl\([0-9.]+, [0-9.]+%, [0-9.]+%\)/);
        });

        expect(() => assertUnsupportedValueMessage(hslCss, "auto")).toThrow();
      });

      it("supports rgb (object)", async () => {
        const rgbObject = supportedFormatToSampleValue.rgb;
        el.value = rgbObject;
        await reRender();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toMatchObject(rgbObject as object);
          expect(value).toMatchObject({
            r: toBeInteger(),
            g: toBeInteger(),
            b: toBeInteger(),
          });
        });

        expect(() => assertUnsupportedValueMessage(rgbObject, "auto")).toThrow();
      });

      it("supports hsl (object)", async () => {
        const hslObject = supportedFormatToSampleValue.hsl;
        el.value = hslObject;
        await reRender();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toMatchObject(hslObject as object);
          expect(value).toMatchObject({
            h: toBeInteger(),
            s: toBeInteger(),
            l: toBeInteger(),
          });
        });

        expect(() => assertUnsupportedValueMessage(hslObject, "auto")).toThrow();
      });

      it("supports hsv (object)", async () => {
        const hsvObject = supportedFormatToSampleValue.hsv;
        el.value = hsvObject;
        await reRender();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toMatchObject(hsvObject as object);
          expect(value).toMatchObject({
            h: toBeInteger(),
            s: toBeInteger(),
            v: toBeInteger(),
          });
        });

        expect(() => assertUnsupportedValueMessage(hsvObject, "auto")).toThrow();
      });
    });

    describe("color gets propagated to support inputs", () => {
      describe("valid color", () => {
        it("color gets propagated to hex, RGB (rounded) & HSV (rounded) inputs", async () => {
          await mount<ColorPicker>(<calcite-color-picker value="#ff1500" />);

          const hexInput = page
            .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
            .element() as ColorPickerHexInput["el"];

          expect(hexInput.value).toBe("#ff1500");

          const [rgbModeButton, hsvModeButton] = page
            .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
            .elements() as TabTitle["el"][];
          const [rInput, gInput, bInput, hInput, sInput, vInput] = page
            .getBySelector(`calcite-color-picker .${CSS.channel}`)
            .elements() as InputNumber["el"][];

          await userEvent.click(page.elementLocator(rgbModeButton));

          expect(rInput.value).toBe("255");
          expect(gInput.value).toBe("21");
          expect(bInput.value).toBe("0");

          await userEvent.click(page.elementLocator(hsvModeButton));

          expect(hInput.value).toBe("5");
          expect(sInput.value).toBe("100");
          expect(vInput.value).toBe("100");
        });

        describe("allows modifying color via hex, RGB, HSV inputs", () => {
          let el: ColorPicker["el"];

          beforeEach(async () => {
            const result = await mount<ColorPicker>(<calcite-color-picker value="#fff" />);
            el = result.el;
          });

          it("allows modifying color via hex input", async () => {
            const hexInput = page
              .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
              .element() as ColorPickerHexInput["el"];
            await clearAndEnterHexOrChannelValue(hexInput, "abc");

            expect(el.value).toBe("#aabbcc");
          });

          it("allows modifying color via RGB inputs", async () => {
            const [rgbModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            const [rInput, gInput, bInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];
            await userEvent.click(page.elementLocator(rgbModeButton));

            await clearAndEnterHexOrChannelValue(rInput, "128");
            await clearAndEnterHexOrChannelValue(gInput, "64");
            await clearAndEnterHexOrChannelValue(bInput, "32");

            expect(el.value).toBe("#804020");
          });

          it("allows modifying color via HSV inputs", async () => {
            const [, hsvModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            const [, , , hInput, sInput, vInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];
            await userEvent.click(page.elementLocator(hsvModeButton));

            // modifying value channel first to ensure other channel changes affect the underlying color
            await clearAndEnterHexOrChannelValue(vInput, "45");

            await clearAndEnterHexOrChannelValue(hInput, "180");
            await clearAndEnterHexOrChannelValue(sInput, "90");

            expect(el.value).toBe("#730b0b");
          });
        });

        describe("allows nudging values", () => {
          let changeHandler: ReturnType<typeof vi.fn<() => void>>;

          beforeEach(async () => {
            const { el } = await mount<ColorPicker>(<calcite-color-picker value="#408048" />);
            changeHandler = vi.fn();
            el.addEventListener("calciteColorPickerChange", changeHandler);
          });

          it("allows nudging RGB values", async () => {
            const [rgbModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            const [rInput, gInput, bInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];
            await userEvent.click(page.elementLocator(rgbModeButton));

            await assertChannelValueNudge(rInput);
            await assertChannelValueNudge(bInput);
            await assertChannelValueNudge(gInput);

            expect(changeHandler).toHaveBeenCalledTimes(12);
          });

          it("allows nudging HSV values", async () => {
            const [, hsvModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];

            const [, , , hInput, sInput, vInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];
            await userEvent.click(page.elementLocator(hsvModeButton));

            // asserting out of HSV order to avoid event not emitting due to nudged color being equal internally to previous color
            await assertChannelValueNudge(vInput);
            await assertChannelValueNudge(hInput);
            await assertChannelValueNudge(sInput);

            expect(changeHandler).toHaveBeenCalledTimes(12);
          });

          const assertChannelValueNudge = async (
            calciteInput: InputNumber["el"],
          ): Promise<void> => {
            await calciteInput.setFocus();

            const currentValue = calciteInput.value;

            await userEvent.keyboard("{ArrowUp}");

            expect(calciteInput.value).toBe(`${Number(currentValue) + 1}`);

            await userEvent.keyboard("{ArrowDown}");

            expect(calciteInput.value).toBe(currentValue);

            await userEvent.keyboard("{Shift>}{ArrowUp}{/Shift}");

            expect(calciteInput.value).toBe(`${Number(currentValue) + 10}`);

            await userEvent.keyboard("{Shift>}{ArrowDown}{/Shift}");

            expect(calciteInput.value).toBe(currentValue);
          };
        });
      });

      describe("when no-color", () => {
        it("color gets propagated to hex, RGB & HSV inputs", async () => {
          await mount<ColorPicker>(<calcite-color-picker clearable value="" />);

          const hexInput = page
            .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
            .element() as ColorPickerHexInput["el"];

          expect(hexInput.value).toBe(undefined);

          const [rgbModeButton, hsvModeButton] = page
            .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
            .elements() as TabTitle["el"][];
          const [rInput, gInput, bInput, hInput, sInput, vInput] = page
            .getBySelector(`calcite-color-picker .${CSS.channel}`)
            .elements() as InputNumber["el"][];

          await userEvent.click(page.elementLocator(rgbModeButton));

          expect(rInput.value).toBe("");
          expect(gInput.value).toBe("");
          expect(bInput.value).toBe("");

          await userEvent.click(page.elementLocator(hsvModeButton));

          expect(hInput.value).toBe("");
          expect(sInput.value).toBe("");
          expect(vInput.value).toBe("");
        });

        describe("restores previous color value when a nudge key is pressed", () => {
          const consistentRgbHsvChannelValue = "0";
          const initialValue = "#".padEnd(7, consistentRgbHsvChannelValue);

          beforeEach(async () => {
            await mount<ColorPicker>(<calcite-color-picker clearable value={initialValue} />);
          });

          it("restores previous color to RGB inputs", async () => {
            const [rgbModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            const [rInput, gInput, bInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];
            await userEvent.click(page.elementLocator(rgbModeButton));

            await assertChannelValueNudge(rInput);
            await assertChannelValueNudge(gInput);
            await assertChannelValueNudge(bInput);
          });

          it("restores previous color to HSV inputs", async () => {
            const [, hsvModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            const [, , , hInput, sInput, vInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];
            await userEvent.click(page.elementLocator(hsvModeButton));

            await assertChannelValueNudge(hInput);
            await assertChannelValueNudge(sInput);
            await assertChannelValueNudge(vInput);
          });

          const assertChannelValueNudge = async (
            calciteInput: InputNumber["el"],
          ): Promise<void> => {
            await clearAndEnterHexOrChannelValue(calciteInput, "");

            // using waitForUpdate as keyboard nudges occur in the next frame

            await userEvent.keyboard("{ArrowUp}");

            expect(calciteInput.value).toBe(consistentRgbHsvChannelValue);

            await clearAndEnterHexOrChannelValue(calciteInput, "");

            await userEvent.keyboard("{ArrowDown}");

            expect(calciteInput.value).toBe(consistentRgbHsvChannelValue);

            await clearAndEnterHexOrChannelValue(calciteInput, "");

            await userEvent.keyboard("{Shift>}{ArrowUp}{/Shift}");

            expect(calciteInput.value).toBe(consistentRgbHsvChannelValue);

            await clearAndEnterHexOrChannelValue(calciteInput, "");

            await userEvent.keyboard("{Shift>}{ArrowDown}{/Shift}");

            expect(calciteInput.value).toBe(consistentRgbHsvChannelValue);
          };
        });

        it("changes the value to the specified format after being empty", async () => {
          const { el } = await mount<ColorPicker>(
            <calcite-color-picker clearable format="rgb" value="" />,
          );

          const hexInput = page
            .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
            .element() as ColorPickerHexInput["el"];
          await clearAndEnterHexOrChannelValue(hexInput, supportedFormatToSampleValue.hex);

          expect(el.value).toEqual(supportedFormatToSampleValue.rgb);
        });

        describe("clearing color via supporting inputs", () => {
          it("clears color via hex input", async () => {
            const { el } = await mount<ColorPicker>(
              <calcite-color-picker clearable value="#c0ff33" />,
            );

            const hexInput = page
              .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
              .element() as ColorPickerHexInput["el"];

            await clearAndEnterHexOrChannelValue(hexInput, "");

            expect(el.value).toBe(undefined);
          });

          it("clears color via RGB channel inputs", async () => {
            const { el } = await mount<ColorPicker>(
              <calcite-color-picker clearable value="#c0ff33" />,
            );

            const [rgbModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            const [rInput, gInput, bInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];

            await userEvent.click(page.elementLocator(rgbModeButton));

            await clearAndEnterHexOrChannelValue(rInput, "");

            // clearing one clears the rest
            expect(gInput.value).toBe("");
            expect(bInput.value).toBe("");

            expect(el.value).toBeUndefined();
          });

          it("clears color via HSV channel inputs", async () => {
            const { el } = await mount<ColorPicker>(
              <calcite-color-picker clearable value="#c0ff33" />,
            );

            const [, hsvModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];

            const [, , , hInput, sInput, vInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];

            await userEvent.click(page.elementLocator(hsvModeButton));

            await clearAndEnterHexOrChannelValue(hInput, "");

            // clearing one clears the rest
            expect(sInput.value).toBe("");
            expect(vInput.value).toBe("");

            expect(el.value).toBeUndefined();
          });
        });
      });
    });
  });

  describe("alpha channel", () => {
    describe("keeps value in alpha-compatible format when applying updates", () => {
      let el: ColorPicker["el"];
      let reRender: RenderResult<ColorPicker>["reRender"];

      beforeEach(async () => {
        const result = await mount<ColorPicker>(<calcite-color-picker alpha-channel />);
        el = result.el;
        reRender = result.reRender;
      });

      const updateColorWithAllInputs = async (
        assertColorUpdate: (value: ColorValue) => Promise<void>,
      ): Promise<void> => {
        const hexInput = page
          .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
          .element() as ColorPickerHexInput["el"];

        await clearAndEnterHexOrChannelValue(hexInput, "abc0");

        await assertColorUpdate(el.value!);

        const [rgbModeButton, hsvModeButton] = page
          .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
          .elements() as TabTitle["el"][];
        const [rInput, gInput, bInput, rgbAInput, hInput, sInput, vInput, hsvAInput] = page
          .getBySelector(`calcite-color-picker .${CSS.channel}`)
          .elements() as InputNumber["el"][];

        await userEvent.click(page.elementLocator(rgbModeButton));

        await clearAndEnterHexOrChannelValue(rInput, "128");
        await clearAndEnterHexOrChannelValue(gInput, "64");
        await clearAndEnterHexOrChannelValue(bInput, "32");
        await clearAndEnterHexOrChannelValue(rgbAInput, "75");

        await assertColorUpdate(el.value!);

        await userEvent.click(page.elementLocator(hsvModeButton));

        // modifying value channel first to ensure other channel changes affect the underlying color
        await clearAndEnterHexOrChannelValue(vInput, "45");

        await clearAndEnterHexOrChannelValue(hInput, "180");
        await clearAndEnterHexOrChannelValue(sInput, "90");
        await clearAndEnterHexOrChannelValue(hsvAInput, "75");

        await assertColorUpdate(el.value!);
      };

      it("supports hex", async () => {
        const hex = supportedFormatToSampleValue.hex;
        el.value = hex;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toBe(hex);
          expect(value).toMatch(/^#[a-f0-9]{8}$/);
        });

        expect(() => assertUnsupportedValueMessage(hex, "auto")).toThrow();
      });

      it("supports hexa", async () => {
        const hexa = supportedAlphaFormatToSampleValue.hexa;
        el.value = hexa;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toBe(hexa);
          expect(value).toMatch(/^#[a-f0-9]{8}$/);
        });

        expect(() => assertUnsupportedValueMessage(hexa, "auto")).toThrow();
      });

      it("supports rgb", async () => {
        const rgbCss = supportedFormatToSampleValue["rgb-css"];
        el.value = rgbCss;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toBe(rgbCss);
          expect(value).toMatch(/^rgba\(\d+, \d+, \d+, [0-9.]+\)/);
        });

        expect(() => assertUnsupportedValueMessage(rgbCss, "auto")).toThrow();
      });

      it("supports rgba", async () => {
        const rgbaCss = supportedAlphaFormatToSampleValue["rgba-css"];
        el.value = rgbaCss;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toBe(rgbaCss);
          expect(value).toMatch(/^rgba\(\d+, \d+, \d+, [0-9.]+\)/);
        });

        expect(() => assertUnsupportedValueMessage(rgbaCss, "auto")).toThrow();
      });

      it("supports hsl", async () => {
        const hslCss = supportedFormatToSampleValue["hsl-css"];
        el.value = hslCss;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toBe(hslCss);
          expect(value).toMatch(/^hsla\([0-9.]+, [0-9.]+%, [0-9.]+%, [0-9.]+\)/);
        });

        expect(() => assertUnsupportedValueMessage(hslCss, "auto")).toThrow();
      });

      it("supports hsla", async () => {
        const hslaCss = supportedAlphaFormatToSampleValue["hsla-css"];
        el.value = hslaCss;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toBe(hslaCss);
          expect(value).toMatch(/^hsla\([0-9.]+, [0-9.]+%, [0-9.]+%, [0-9.]+\)/);
        });

        expect(() => assertUnsupportedValueMessage(hslaCss, "auto")).toThrow();
      });

      it("supports rgb (object)", async () => {
        const rgbObject = supportedFormatToSampleValue.rgb;
        el.value = rgbObject;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toMatchObject(rgbObject as object);
          expect(value).toMatchObject({
            r: toBeInteger(),
            g: toBeInteger(),
            b: toBeInteger(),
            a: toBeNumber(),
          });
        });

        expect(() => assertUnsupportedValueMessage(rgbObject, "auto")).toThrow();
      });

      it("supports rgba (object)", async () => {
        const rgbaObject = supportedAlphaFormatToSampleValue.rgba;
        el.value = rgbaObject;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toMatchObject(rgbaObject as object);
          expect(value).toMatchObject({
            r: toBeInteger(),
            g: toBeInteger(),
            b: toBeInteger(),
            a: toBeNumber(),
          });
        });

        expect(() => assertUnsupportedValueMessage(rgbaObject, "auto")).toThrow();
      });

      it("supports hsl (object)", async () => {
        const hslObject = supportedFormatToSampleValue.hsl;
        el.value = hslObject;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toMatchObject(hslObject as object);
          expect(value).toMatchObject({
            h: toBeInteger(),
            s: toBeInteger(),
            l: toBeInteger(),
            a: toBeNumber(),
          });
        });

        expect(() => assertUnsupportedValueMessage(hslObject, "auto")).toThrow();
      });

      it("supports hsla (object)", async () => {
        const hslaObject = supportedAlphaFormatToSampleValue.hsla;
        el.value = hslaObject;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toMatchObject(hslaObject as object);
          expect(value).toMatchObject({
            h: toBeInteger(),
            s: toBeInteger(),
            l: toBeInteger(),
            a: toBeNumber(),
          });
        });

        expect(() => assertUnsupportedValueMessage(hslaObject, "auto")).toThrow();
      });

      it("supports hsv (object)", async () => {
        const hsvObject = supportedFormatToSampleValue.hsv;
        el.value = hsvObject;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toMatchObject(hsvObject as object);
          expect(value).toMatchObject({
            h: toBeInteger(),
            s: toBeInteger(),
            v: toBeInteger(),
          });
        });

        expect(() => assertUnsupportedValueMessage(hsvObject, "auto")).toThrow();
      });

      it("supports hsva (object)", async () => {
        const hsvaObject = supportedAlphaFormatToSampleValue.hsva;
        el.value = hsvaObject;
        await reRender();

        await updateColorWithAllInputs(async (value: ColorValue) => {
          expect(value).not.toMatchObject(hsvaObject as object);
          expect(value).toMatchObject({
            h: toBeInteger(),
            s: toBeInteger(),
            v: toBeInteger(),
            a: toBeNumber(),
          });
        });

        expect(() => assertUnsupportedValueMessage(hsvaObject, "auto")).toThrow();
      });
    });

    describe("color gets propagated to support inputs", () => {
      describe("valid color", () => {
        it("color gets propagated to hex, RGB (rounded), HSV (rounded)", async () => {
          await mount<ColorPicker>(<calcite-color-picker alpha-channel value="#ff150000" />);

          const hexInput = page
            .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
            .element() as ColorPickerHexInput["el"];

          expect(hexInput.value).toBe("#ff150000");

          const [rgbModeButton, hsvModeButton] = page
            .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
            .elements() as TabTitle["el"][];
          const [rInput, gInput, bInput, rgbAInput, hInput, sInput, vInput, hsvAInput] = page
            .getBySelector(`calcite-color-picker .${CSS.channel}`)
            .elements() as InputNumber["el"][];

          await userEvent.click(page.elementLocator(rgbModeButton));

          expect(rInput.value).toBe("255");
          expect(gInput.value).toBe("21");
          expect(bInput.value).toBe("0");
          expect(rgbAInput.value).toBe("0");

          await userEvent.click(page.elementLocator(hsvModeButton));

          expect(hInput.value).toBe("5");
          expect(sInput.value).toBe("100");
          expect(vInput.value).toBe("100");
          expect(hsvAInput.value).toBe("0");
        });

        describe("allows modifying color via hex, RGBA, HSVA inputs", () => {
          let el: ColorPicker["el"];

          beforeEach(async () => {
            const result = await mount<ColorPicker>(
              <calcite-color-picker alpha-channel value="#ffff" />,
            );
            el = result.el;
          });

          it("allows modifying color via hex input", async () => {
            const hexInput = page
              .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
              .element() as ColorPickerHexInput["el"];
            // eslint-disable-next-line @cspell/spellchecker -- testing hex code
            await clearAndEnterHexOrChannelValue(hexInput, "abcf");

            expect(el.value).toBe("#aabbccff");
          });

          it("allows modifying color via RGBA inputs", async () => {
            const [rgbModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            const [rInput, gInput, bInput, rgbAInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];
            await userEvent.click(page.elementLocator(rgbModeButton));

            await clearAndEnterHexOrChannelValue(rInput, "128");
            await clearAndEnterHexOrChannelValue(gInput, "64");
            await clearAndEnterHexOrChannelValue(bInput, "32");
            await clearAndEnterHexOrChannelValue(rgbAInput, "50");

            expect(el.value).toBe("#80402080");
          });

          it("allows modifying color via HSVA inputs", async () => {
            const [, hsvModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            const [, , , , hInput, sInput, vInput, hsvAInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];
            await userEvent.click(page.elementLocator(hsvModeButton));

            // modifying value channel first to ensure other channel changes affect the underlying color
            await clearAndEnterHexOrChannelValue(vInput, "45");

            await clearAndEnterHexOrChannelValue(hInput, "180");
            await clearAndEnterHexOrChannelValue(sInput, "90");
            await clearAndEnterHexOrChannelValue(hsvAInput, "50");

            expect(el.value).toBe("#730b0b80");
          });
        });

        describe("allows nudging values", () => {
          let changeHandler: ReturnType<typeof vi.fn<() => void>>;

          beforeEach(async () => {
            const { el } = await mount<ColorPicker>(
              <calcite-color-picker alpha-channel value="#40804880" />,
            );
            changeHandler = vi.fn();
            el.addEventListener("calciteColorPickerChange", changeHandler);
          });

          it("allows nudging RGBA values", async () => {
            const [rgbModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            const [rInput, gInput, bInput, rgbAInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];
            await userEvent.click(page.elementLocator(rgbModeButton));

            await assertChannelValueNudge(rInput);
            await assertChannelValueNudge(gInput);
            await assertChannelValueNudge(bInput);
            await assertChannelValueNudge(rgbAInput);

            expect(changeHandler).toHaveBeenCalledTimes(16);
          });

          it("allows nudging HSVA values", async () => {
            const [, hsvModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            const [, , , , hInput, sInput, vInput, hsvAInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];
            await userEvent.click(page.elementLocator(hsvModeButton));

            // asserting out of HSV order to avoid event not emitting due to nudged color being equal internally to previous color
            await assertChannelValueNudge(vInput);
            await assertChannelValueNudge(hInput);
            await assertChannelValueNudge(sInput);
            await assertChannelValueNudge(hsvAInput);

            expect(changeHandler).toHaveBeenCalledTimes(16);
          });
        });

        const assertChannelValueNudge = async (
          calciteInputOrSlider: InputNumber["el"] | Slider["el"],
        ): Promise<void> => {
          await calciteInputOrSlider.setFocus();

          const currentValue = calciteInputOrSlider.value as string | number;

          function ensureValueType(value: string | number): number | string {
            return typeof currentValue === "string" ? `${value}` : value;
          }

          function nudgeValue(value: string | number, amount: number): number | string {
            return Number(value) + amount;
          }

          await userEvent.keyboard("{ArrowUp}");

          expect(calciteInputOrSlider.value).toBe(ensureValueType(nudgeValue(currentValue, 1)));

          await userEvent.keyboard("{ArrowDown}");

          expect(calciteInputOrSlider.value).toBe(ensureValueType(currentValue));

          await userEvent.keyboard("{Shift>}{ArrowUp}{/Shift}");

          expect(calciteInputOrSlider.value).toBe(ensureValueType(nudgeValue(currentValue, 10)));

          await userEvent.keyboard("{Shift>}{ArrowDown}{/Shift}");

          expect(calciteInputOrSlider.value).toBe(ensureValueType(currentValue));
        };
      });

      describe("when no-color", () => {
        it("color gets propagated to hex, RGB, HSV & opacity inputs", async () => {
          await mount<ColorPicker>(<calcite-color-picker alpha-channel clearable value="" />);

          const hexInput = page
            .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
            .element() as ColorPickerHexInput["el"];

          expect(hexInput.value).toBe(undefined);

          const [rgbModeButton, hsvModeButton] = page
            .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
            .elements() as TabTitle["el"][];
          const [rInput, gInput, bInput, rgbAInput, hInput, sInput, vInput, hsvAInput] = page
            .getBySelector(`calcite-color-picker .${CSS.channel}`)
            .elements() as InputNumber["el"][];

          await userEvent.click(page.elementLocator(rgbModeButton));

          expect(rInput.value).toBe("");
          expect(gInput.value).toBe("");
          expect(bInput.value).toBe("");
          expect(rgbAInput.value).toBe("");

          await userEvent.click(page.elementLocator(hsvModeButton));

          expect(hInput.value).toBe("");
          expect(sInput.value).toBe("");
          expect(vInput.value).toBe("");
          expect(hsvAInput.value).toBe("");
        });

        describe("restores previous color value when a nudge key is pressed", () => {
          const consistentRgbHsvChannelValue = "0";
          const initialValue = "#".padEnd(9, consistentRgbHsvChannelValue);

          beforeEach(async () => {
            await mount<ColorPicker>(
              <calcite-color-picker alpha-channel clearable value={initialValue} />,
            );
          });

          it("restores color to RGBA inputs", async () => {
            const [rgbModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            await userEvent.click(page.elementLocator(rgbModeButton));
            await afterNextFrame();
            const [rInput, gInput, bInput, rgbAInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];

            await assertChannelValueNudge(rInput);
            await assertChannelValueNudge(gInput);
            await assertChannelValueNudge(bInput);
            await assertChannelValueNudge(rgbAInput);
          });

          it("restores color to HSVA inputs", async () => {
            const [, hsvModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            await userEvent.click(page.elementLocator(hsvModeButton));
            await afterNextFrame();
            const [, , , , hInput, sInput, vInput, hsvAInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];

            await assertChannelValueNudge(hInput);
            await assertChannelValueNudge(sInput);
            await assertChannelValueNudge(vInput);
            await assertChannelValueNudge(hsvAInput);
          });

          const assertChannelValueNudge = async (
            calciteInputOrSlider: InputNumber["el"] | Slider["el"],
          ): Promise<void> => {
            async function clearValue(): Promise<void> {
              if (isInputNumber(calciteInputOrSlider)) {
                await clearAndEnterHexOrChannelValue(calciteInputOrSlider, "");
              }
            }

            const initialInputValue = calciteInputOrSlider.value;

            function ensureValueType(value: string | number): number | string {
              return typeof initialInputValue === "string" ? `${value}` : Number(value);
            }

            await calciteInputOrSlider.setFocus();

            await clearValue();

            // using waitForUpdate as keyboard nudges occur in the next frame

            await userEvent.keyboard("{ArrowUp}");

            expect(calciteInputOrSlider.value).toBe(ensureValueType(consistentRgbHsvChannelValue));

            await clearValue();

            await userEvent.keyboard("{ArrowDown}");

            expect(calciteInputOrSlider.value).toBe(ensureValueType(consistentRgbHsvChannelValue));

            await clearValue();
            await userEvent.keyboard("{Shift>}{ArrowUp}{/Shift}");

            expect(calciteInputOrSlider.value).toBe(ensureValueType(consistentRgbHsvChannelValue));

            await clearValue();
            await userEvent.keyboard("{Shift>}{ArrowDown}{/Shift}");

            expect(calciteInputOrSlider.value).toBe(ensureValueType(consistentRgbHsvChannelValue));
          };
        });

        it("changes the value to the specified format after being empty", async () => {
          const { el } = await mount<ColorPicker>(
            <calcite-color-picker alpha-channel clearable format="rgba" value="" />,
          );

          const hexInput = page
            .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
            .element() as ColorPickerHexInput["el"];
          await clearAndEnterHexOrChannelValue(hexInput, supportedAlphaFormatToSampleValue.hexa);

          expect(el.value).toEqual(supportedAlphaFormatToSampleValue.rgba);
        });

        describe("clearing color via supporting inputs", () => {
          it("clears color via hex input", async () => {
            const { el } = await mount<ColorPicker>(
              <calcite-color-picker alpha-channel clearable value="#c0ff3333" />,
            );

            const hexInput = page
              .getBySelector(`calcite-color-picker calcite-color-picker-hex-input`)
              .element() as ColorPickerHexInput["el"];
            await clearAndEnterHexOrChannelValue(hexInput, "");

            expect(el.value).toBe(undefined);
          });

          it("clears color via RGB channel inputs", async () => {
            const { el } = await mount<ColorPicker>(
              <calcite-color-picker alpha-channel clearable value="#c0ff3333" />,
            );

            const [rgbModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];
            const [rInput, gInput, bInput, rgbAInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];

            await userEvent.click(page.elementLocator(rgbModeButton));

            await clearAndEnterHexOrChannelValue(rInput, "");

            // clearing one clears the rest
            expect(gInput.value).toBe("");
            expect(bInput.value).toBe("");
            expect(rgbAInput.value).toBe("");

            expect(el.value).toBeUndefined();
          });

          it("clears color via HSV channel inputs", async () => {
            const { el } = await mount<ColorPicker>(
              <calcite-color-picker alpha-channel clearable value="#c0ff3333" />,
            );

            const [, hsvModeButton] = page
              .getBySelector(`calcite-color-picker .${CSS.colorMode}`)
              .elements() as TabTitle["el"][];

            const [, , , , hInput, sInput, vInput, hsvAInput] = page
              .getBySelector(`calcite-color-picker .${CSS.channel}`)
              .elements() as InputNumber["el"][];

            await userEvent.click(page.elementLocator(hsvModeButton));

            await clearAndEnterHexOrChannelValue(hInput, "");

            // clearing one clears the rest
            expect(sInput.value).toBe("");
            expect(vInput.value).toBe("");
            expect(hsvAInput.value).toBe("");

            expect(el.value).toBeUndefined();
          });
        });
      });
    });

    it("updates value when alphaChannel is toggled", async () => {
      const { el, reRender } = await mount<ColorPicker>(
        <calcite-color-picker value={supportedFormatToSampleValue.hex} />,
      );

      el.alphaChannel = true;
      await reRender();

      expect(el.value).toEqual(supportedAlphaFormatToSampleValue.hexa);

      el.alphaChannel = false;
      await reRender();

      expect(el.value).toEqual(supportedFormatToSampleValue.hex);
    });
  });
});

describe("color storage", () => {
  describe("default", () => {
    const color1 = "#ff00ff";
    const color2 = "#beefee";

    beforeAll(clearStorage);
    afterAll(clearStorage);

    it("allows saving unique colors", async () => {
      const { el, reRender } = await mount<ColorPicker>(
        <calcite-color-picker storage-id={storageId} />,
      );
      const saveColor = page.getBySelector(`calcite-color-picker .${CSS.saveColor}`);
      await userEvent.click(saveColor);

      el.value = color1;
      await reRender();

      await userEvent.click(saveColor);

      el.value = color2;
      await reRender();

      await userEvent.click(saveColor);

      el.value = color1;
      await reRender();

      await userEvent.click(saveColor);

      el.value = color2;
      await reRender();

      await userEvent.click(saveColor);

      const savedColors = page
        .getBySelector(`calcite-color-picker calcite-swatch-group calcite-swatch`)
        .elements() as HTMLElement[];
      expect(savedColors).toHaveLength(3);
    });

    it("loads saved colors", async () => {
      await mount<ColorPicker>(<calcite-color-picker storage-id={storageId} />);

      const savedColors = page
        .getBySelector(`calcite-color-picker calcite-swatch-group calcite-swatch`)
        .elements() as HTMLElement[];
      expect(savedColors).toHaveLength(3);
    });

    it("allows removing stored colors", async () => {
      const { el, reRender } = await mount<ColorPicker>(
        <calcite-color-picker storage-id={storageId} />,
      );
      const saveColor = page.getBySelector(`calcite-color-picker .${CSS.saveColor}`);
      const saved = page.getBySelector(`calcite-color-picker calcite-swatch-group calcite-swatch`);
      const removeColor = page.getBySelector(`calcite-color-picker .${CSS.deleteColor}`);
      let expectedSaved = 3;

      await userEvent.click(saveColor);

      el.value = color1;
      await reRender();

      await userEvent.click(saveColor);

      el.value = color2;
      await reRender();

      await userEvent.click(saveColor);

      for (const swatch of saved.elements()) {
        await userEvent.click(swatch);
        await userEvent.click(removeColor);

        expect(saved).toHaveLength(--expectedSaved);
      }
    });

    it("does not allow saving/removing when no-color is set", async () => {
      await mount<ColorPicker>(<calcite-color-picker clearable value="" />);

      const saveColor = page
        .getBySelector(`calcite-color-picker .${CSS.saveColor}`)
        .element() as Button["el"];
      const removeColor = page
        .getBySelector(`calcite-color-picker .${CSS.deleteColor}`)
        .element() as Button["el"];

      expect(saveColor.disabled).toBe(true);
      expect(removeColor.disabled).toBe(true);
    });
  });

  describe("alpha channel", () => {
    const color1 = "#ff00ff00";
    const color2 = "#beefeeff";

    beforeAll(clearStorage);
    afterAll(clearStorage);

    it("allows saving unique colors", async () => {
      const { el, reRender } = await mount<ColorPicker>(
        <calcite-color-picker alpha-channel storage-id={storageId} />,
      );

      const saveColor = page.getBySelector(`calcite-color-picker .${CSS.saveColor}`);
      await userEvent.click(saveColor);

      el.value = color1;
      await reRender();

      await userEvent.click(saveColor);

      el.value = color2;
      await reRender();

      await userEvent.click(saveColor);

      el.value = color1;
      await reRender();

      await userEvent.click(saveColor);

      el.value = color2;
      await reRender();

      await userEvent.click(saveColor);

      const savedColors = page
        .getBySelector(`calcite-color-picker calcite-swatch-group calcite-swatch`)
        .elements() as HTMLElement[];
      expect(savedColors).toHaveLength(3);
    });

    it("loads saved colors", async () => {
      await mount<ColorPicker>(<calcite-color-picker alpha-channel storage-id={storageId} />);

      const savedColors = page
        .getBySelector(`calcite-color-picker calcite-swatch-group calcite-swatch`)
        .elements() as HTMLElement[];
      expect(savedColors).toHaveLength(3);
    });

    it("allows removing stored colors", async () => {
      const { el, reRender } = await mount<ColorPicker>(
        <calcite-color-picker alpha-channel storage-id={storageId} />,
      );
      const saveColor = page.getBySelector(`calcite-color-picker .${CSS.saveColor}`);
      const saved = page.getBySelector(`calcite-color-picker calcite-swatch-group calcite-swatch`);
      let expectedSaved = 3;
      const removeColor = page.getBySelector(`calcite-color-picker .${CSS.deleteColor}`);

      await userEvent.click(saveColor);

      el.value = color1;
      await reRender();

      await userEvent.click(saveColor);

      el.value = color2;
      await reRender();

      await userEvent.click(saveColor);

      for (const swatch of saved.elements()) {
        await userEvent.click(swatch);
        await userEvent.click(removeColor);

        expect(saved).toHaveLength(--expectedSaved);
      }
    });

    it("does not allow saving/removing when no-color is set", async () => {
      await mount<ColorPicker>(<calcite-color-picker alpha-channel clearable value="" />);

      const saveColor = page
        .getBySelector(`calcite-color-picker .${CSS.saveColor}`)
        .element() as Button["el"];
      const removeColor = page
        .getBySelector(`calcite-color-picker .${CSS.deleteColor}`)
        .element() as Button["el"];

      expect(saveColor.disabled).toBe(true);
      expect(removeColor.disabled).toBe(true);
    });
  });
});

it("allows setting no-color", async () => {
  const { el, reRender } = await mount<ColorPicker>(<calcite-color-picker clearable />);

  expect(el.value).not.toBe(undefined);
  expect(el.color).not.toBe(undefined);

  el.value = undefined;
  await reRender();

  expect(el.value).toBe(undefined);
  expect(el.color).toBe(undefined);

  expect(() => assertUnsupportedValueMessage(undefined, "auto")).toThrow();
});

it("allows hiding sections", async () => {
  const { el, reRender } = await mount("calcite-color-picker");

  type HiddenSection = "hex" | "channels" | "saved" | "field";

  async function assertHiddenSection(hiddenSections: HiddenSection[]): Promise<void> {
    const sectionVisibility: Record<HiddenSection, boolean> = {
      hex: true,
      channels: true,
      saved: true,
      field: true,
    };

    hiddenSections.forEach((section) => (sectionVisibility[section] = false));

    const sections = Object.keys(sectionVisibility);

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const hideSectionProp = `${section.charAt(0) + section.slice(1)}Disabled`;

      Reflect.set(el, hideSectionProp, !sectionVisibility[section]);
      await reRender();
    }

    const [hex, channels, saved, field] = [
      page.getBySelector(`calcite-color-picker .${CSS.hexOptions}`),
      page.getBySelector(`calcite-color-picker .${CSS.colorModeContainer}`),
      page.getBySelector(`calcite-color-picker .${CSS.savedColorsSection}`),
      page.getBySelector(`calcite-color-picker .${CSS.colorField}`),
    ];

    const sectionNodes: Record<HiddenSection, Locator> = {
      hex,
      channels,
      saved,
      field,
    };

    for (const section of sections) {
      const node = sectionNodes[section];
      const visible = sectionVisibility[section];

      await (visible
        ? // eslint-disable-next-line vitest/no-conditional-expect
          expect.element(node).toBeInTheDocument()
        : // eslint-disable-next-line vitest/no-conditional-expect
          expect.element(node).not.toBeInTheDocument());
    }
  }

  await assertHiddenSection(["hex", "channels", "saved", "field"]);
  await assertHiddenSection(["hex", "channels"]);
  await assertHiddenSection(["hex", "saved"]);
  await assertHiddenSection(["hex"]);
  await assertHiddenSection(["channels", "saved"]);
  await assertHiddenSection(["saved"]);
  await assertHiddenSection(["channels"]);
  await assertHiddenSection(["field"]);
  await assertHiddenSection([]);
});

it("does not throw when initialized with different format value (format='auto')", async () => {
  async function doTest(): Promise<void> {
    await mount<ColorPicker>(<calcite-color-picker value="rgb(89, 77, 77)" />);
  }

  await expect(doTest()).resolves.toBeUndefined();
});

describe("themed", () => {
  describe("default", () => {
    themed(() => mount(<calcite-color-picker alpha-channel />), {
      "--calcite-color-picker-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-color-picker-border-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "borderColor",
      },
      "--calcite-color-picker-corner-radius": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "borderRadius",
      },
      "--calcite-color-picker-shadow": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "boxShadow",
      },
      "--calcite-color-picker-text-color": {
        shadowSelector: `.${CSS.header}`,
        targetProp: "color",
      },
      "--calcite-color-picker-input-background-color": {
        shadowSelector: `.${CSS.container} >>> calcite-input-number`,
        targetProp: "--calcite-input-number-background-color",
      },
      "--calcite-color-picker-input-border-color": {
        shadowSelector: `.${CSS.container} >>> calcite-input-number`,
        targetProp: "--calcite-input-number-border-color",
      },
      "--calcite-color-picker-input-text-color": {
        shadowSelector: `.${CSS.container} >>> calcite-input-number`,
        targetProp: "--calcite-input-number-text-color",
      },
      "--calcite-color-picker-input-prefix-text-color": {
        shadowSelector: `.${CSS.container} >>> calcite-input-text`,
        targetProp: "--calcite-input-prefix-text-color",
      },
      "--calcite-color-picker-input-suffix-text-color": {
        shadowSelector: `.${CSS.container} >>> calcite-input-number`,
        targetProp: "--calcite-input-suffix-text-color",
      },
      "--calcite-color-picker-tab-border-color": {
        shadowSelector: `.${CSS.container} >>> calcite-tabs`,
        targetProp: "--calcite-tab-border-color",
      },
      "--calcite-color-picker-tab-text-color": {
        shadowSelector: `.${CSS.container} >>> calcite-tabs`,
        targetProp: "--calcite-tab-text-color",
      },
      "--calcite-color-picker-swatch-corner-radius": {
        shadowSelector: `.${CSS.container} >>> calcite-swatch`,
        targetProp: "--calcite-swatch-corner-radius",
      },
      "--calcite-color-picker-action-text-color": {
        shadowSelector: `.${CSS.container} >>> calcite-button`,
        targetProp: "--calcite-button-text-color",
      },
    });
  });
});
