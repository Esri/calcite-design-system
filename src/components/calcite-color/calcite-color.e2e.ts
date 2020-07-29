import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests";

import { CSS, DEFAULT_STORAGE_KEY_PREFIX, DIMENSIONS } from "./resources";
import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { ColorValue } from "../../interfaces/Color";

describe("calcite-color", () => {
  it("is accessible", async () => accessible("calcite-color"));

  it("can be hidden", async () => hidden("calcite-color"));

  it("reflects", async () =>
    reflects("calcite-color", [
      {
        propertyName: "appearance",
        value: "minimal"
      },
      {
        propertyName: "scale",
        value: "m"
      },
      {
        propertyName: "theme",
        value: "light"
      }
    ]));

  it("renders", async () => renders("calcite-color"));

  it("has defaults", async () =>
    defaults("calcite-color", [
      {
        propertyName: "appearance",
        defaultValue: "default"
      },
      {
        propertyName: "scale",
        defaultValue: "m"
      },
      {
        propertyName: "theme",
        defaultValue: "light"
      },
      {
        propertyName: "value",
        defaultValue: "#007ac2"
      }
    ]));

  it("emits color selection change", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color></calcite-color>");
    const picker = await page.find("calcite-color");

    const spy = await picker.spyOnEvent("calciteColorChange");

    picker.setProperty("value", "#FF00FF");
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
  });

  it("accepts multiple color value types", async () => {
    const page = await newE2EPage({
      html: "<calcite-color></calcite-color>"
    });
    const picker = await page.find("calcite-color");
    const spy = await picker.spyOnEvent("calciteColorChange");

    const supportedValues = [
      "#beefee",
      "rgb(255, 0, 255)",
      "hsl(30, 100%, 50%)",
      { r: 255, g: 255, b: 0 },
      { h: 270, s: 60, l: 70 },
      { h: 202, s: 0, v: 100 }
    ];

    for (let i = 0; i < supportedValues.length; i++) {
      const value = supportedValues[i];

      picker.setProperty("value", value);
      await page.waitForChanges();

      if (typeof value === "string") {
        expect(await picker.getProperty("value")).toBe(value);
      } else {
        expect(await picker.getProperty("value")).toMatchObject(value);
      }
    }

    expect(spy).toHaveReceivedEventTimes(supportedValues.length);
  });

  it("allows selecting colors via color field/slider", async () => {
    const page = await newE2EPage({
      html: "<calcite-color value='#000' scale='m'></calcite-color>"
    });
    const picker = await page.find(`calcite-color`);
    const mediumScaleDimensions = DIMENSIONS.m;
    const widthOffset = 0.5;
    const [fieldAndSliderX, fieldAndSliderY] = await page.evaluate(() => {
      const color = document.querySelector("calcite-color");
      const fieldAndSliderArea = color.shadowRoot.querySelector("canvas");
      const { x, y } = fieldAndSliderArea.getBoundingClientRect();

      return [x, y];
    });

    // clicking color field colors to pick a color
    await page.mouse.click(fieldAndSliderX, fieldAndSliderY);
    expect(await picker.getProperty("value")).toBe("#ffffff");

    await page.mouse.click(fieldAndSliderX, fieldAndSliderY + mediumScaleDimensions.colorField.height);
    expect(await picker.getProperty("value")).toBe("#000000");

    await page.mouse.click(fieldAndSliderX + mediumScaleDimensions.colorField.width - widthOffset, fieldAndSliderY);
    expect(await picker.getProperty("value")).toBe("#ff0000");

    await page.mouse.click(
      fieldAndSliderX + mediumScaleDimensions.colorField.width - widthOffset,
      fieldAndSliderY + mediumScaleDimensions.colorField.height
    );
    expect(await picker.getProperty("value")).toBe("#000000");

    // set to corner right value that's not red (first value)
    picker.setProperty("value", "#ff0");
    await page.waitForChanges();

    // clicking on color slider to set hue
    const colorsToSample = 7;
    const offsetX = (mediumScaleDimensions.slider.width - widthOffset) / colorsToSample;
    let x = fieldAndSliderX;

    const sliderHeight =
      fieldAndSliderY + mediumScaleDimensions.colorField.height + mediumScaleDimensions.slider.height;

    const expectedColorSamples = [
      "#ff0000",
      "#ffdb00",
      "#47ff00",
      "#00ff8e",
      "#0094ff",
      "#4700ff",
      "#ff00db",
      "#ff0000"
    ];

    for (let i = 0; i < expectedColorSamples.length; i++) {
      const expectedColor = expectedColorSamples[i];

      await page.mouse.click(x, sliderHeight);
      expect(await picker.getProperty("value")).toBe(expectedColor);

      x += offsetX;
    }
  });

  it("ignores unsupported value types", async () => {
    const page = await newE2EPage({
      html: "<calcite-color></calcite-color>"
    });
    const picker = await page.find("calcite-color");
    const spy = await picker.spyOnEvent("calciteColorChange");
    const currentValue = await picker.getProperty("value");

    picker.setProperty("value", "unsupported-color-format");
    await page.waitForChanges();

    expect(await picker.getProperty("value")).toBe(currentValue);
    expect(spy).toHaveReceivedEventTimes(0);
  });

  it("normalizes shorthand CSS hex", async () => {
    const page = await newE2EPage({
      html: "<calcite-color></calcite-color>"
    });
    const picker = await page.find("calcite-color");

    picker.setProperty("value", "#ABC");
    await page.waitForChanges();

    expect(await picker.getProperty("value")).toBe("#aabbcc");
  });

  it("has backdoor color prop for advanced use cases", async () => {
    const page = await newE2EPage({
      html: "<calcite-color></calcite-color>"
    });
    const picker = await page.find("calcite-color");

    expect(await picker.getProperty("color")).toBeTruthy();
  });

  describe("color inputs", () => {
    const clearAndEnterValue = async (page: E2EPage, inputOrHexInput: E2EElement, value: string) => {
      await inputOrHexInput.callMethod("setFocus");

      const currentValue = await inputOrHexInput.getProperty("value");

      for (let i = 0; i < currentValue.length; i++) {
        await page.keyboard.press("Backspace");
      }

      await inputOrHexInput.type(value);
      await page.keyboard.press("Enter");

      await page.waitForChanges();
    };

    it("keeps value in same format when applying updates", async () => {
      const page = await newE2EPage({
        html: "<calcite-color></calcite-color>"
      });
      const picker = await page.find("calcite-color");

      const updateColorWithAllInputs = async (assertColorUpdate: (value: ColorValue) => void) => {
        const hexInput = await page.find(`calcite-color >>> calcite-color-hex-input`);

        await clearAndEnterValue(page, hexInput, "abc");

        assertColorUpdate(await picker.getProperty("value"));

        const [rgbModeButton, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

        await rgbModeButton.click();
        const [rInput, gInput, bInput] = await page.findAll(`calcite-color >>> calcite-input.${CSS.channel}`);

        await clearAndEnterValue(page, rInput, "128");
        await clearAndEnterValue(page, gInput, "64");
        await clearAndEnterValue(page, bInput, "32");

        assertColorUpdate(await picker.getProperty("value"));

        await hsvModeButton.click();
        const [hInput, sInput, vInput] = await page.findAll(`calcite-color >>> calcite-input.${CSS.channel}`);

        await clearAndEnterValue(page, hInput, "180");
        await clearAndEnterValue(page, sInput, "90");
        await clearAndEnterValue(page, vInput, "45");

        assertColorUpdate(await picker.getProperty("value"));
      };

      const hex = "#ff00ff";
      picker.setProperty("value", hex);
      await page.waitForChanges();

      await updateColorWithAllInputs((value: ColorValue) => {
        expect(value).not.toBe(hex);
        expect(value).toMatch(/^#[a-f0-9]{6}$/);
      });

      const rgbCss = "rgb(255, 0, 255)";
      picker.setProperty("value", rgbCss);
      await page.waitForChanges();

      await updateColorWithAllInputs((value: ColorValue) => {
        expect(value).not.toBe(rgbCss);
        expect(value).toMatch(/^rgb\(\d+, \d+, \d+\)/);
      });

      const hslCss = "hsl(30, 100%, 50%)";
      picker.setProperty("value", hslCss);
      await page.waitForChanges();

      await updateColorWithAllInputs((value: ColorValue) => {
        expect(value).not.toBe(hslCss);
        expect(value).toMatch(/^hsl\([0-9.]+, [0-9.]+%, [0-9.]+%\)/);
      });

      const rgbObject = { r: 255, g: 255, b: 0 };
      picker.setProperty("value", rgbObject);
      await page.waitForChanges();

      await updateColorWithAllInputs((value: ColorValue) => {
        expect(value).not.toMatchObject(rgbObject);
        expect(value).toMatchObject({
          r: expect.any(Number),
          g: expect.any(Number),
          b: expect.any(Number)
        });
      });

      const hslObject = { h: 270, s: 60, l: 70 };
      picker.setProperty("value", hslObject);
      await page.waitForChanges();

      await updateColorWithAllInputs((value: ColorValue) => {
        expect(value).not.toMatchObject(hslObject);
        expect(value).toMatchObject({
          h: expect.any(Number),
          s: expect.any(Number),
          l: expect.any(Number)
        });
      });

      const hsvObject = { h: 202, s: 0, v: 100 };
      picker.setProperty("value", hsvObject);
      await page.waitForChanges();

      await updateColorWithAllInputs((value: ColorValue) => {
        expect(value).not.toMatchObject(hsvObject);
        expect(value).toMatchObject({
          h: expect.any(Number),
          s: expect.any(Number),
          v: expect.any(Number)
        });
      });
    });

    it("color gets propagated to hex, RGB & HSV inputs", async () => {
      const page = await newE2EPage({
        html: "<calcite-color value='#fff000'></calcite-color>"
      });

      const hexInput = await page.find(`calcite-color >>> calcite-color-hex-input`);

      expect(await hexInput.getProperty("value")).toBe("#fff000");

      const [rgbModeButton, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

      await rgbModeButton.click();
      const [rInput, gInput, bInput] = await page.findAll(`calcite-color >>> calcite-input.${CSS.channel}`);

      expect(await rInput.getProperty("value")).toBe("255");
      expect(await gInput.getProperty("value")).toBe("240");
      expect(await bInput.getProperty("value")).toBe("0");

      await hsvModeButton.click();
      const [hInput, sInput, vInput] = await page.findAll(`calcite-color >>> calcite-input.${CSS.channel}`);

      expect(await hInput.getProperty("value")).toBe("56");
      expect(await sInput.getProperty("value")).toBe("100");
      expect(await vInput.getProperty("value")).toBe("100");
    });

    it("allows modifying color via hex, RGB, HSV inputs", async () => {
      const page = await newE2EPage({
        html: "<calcite-color value='#fff'></calcite-color>"
      });
      const picker = await page.find("calcite-color");

      const hexInput = await page.find(`calcite-color >>> calcite-color-hex-input`);
      await clearAndEnterValue(page, hexInput, "abc");

      expect(await picker.getProperty("value")).toBe("#aabbcc");

      const [rgbModeButton, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

      await rgbModeButton.click();

      const [rInput, gInput, bInput, hInput, sInput, vInput] = await page.findAll(
        `calcite-color >>> calcite-input.${CSS.channel}`
      );

      await clearAndEnterValue(page, rInput, "128");
      await clearAndEnterValue(page, gInput, "64");
      await clearAndEnterValue(page, bInput, "32");

      expect(await picker.getProperty("value")).toBe("#804020");

      await hsvModeButton.click();

      await clearAndEnterValue(page, hInput, "180");
      await clearAndEnterValue(page, sInput, "90");
      await clearAndEnterValue(page, vInput, "45");

      expect(await picker.getProperty("value")).toBe("#0b7373");
    });
  });

  describe("saving colors", () => {
    const storageId = "test-storage-id";

    async function clearStorage(): Promise<void> {
      const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${storageId}`;
      const page = await newE2EPage({
        html: `<calcite-color></calcite-color>`
      });
      await page.evaluate((storageKey) => localStorage.removeItem(storageKey), [storageKey]);
    }

    beforeAll(clearStorage);
    afterAll(clearStorage);

    it("it allows saving unique colors", async () => {
      const page = await newE2EPage({
        html: `<calcite-color storage-id=${storageId}></calcite-color>`
      });

      const picker = await page.find("calcite-color");
      const saveColor = await page.find(`calcite-color >>> .${CSS.saveColor}`);
      await saveColor.click();

      const color1 = "#ff00ff";
      const color2 = "#beefee";

      picker.setProperty("value", color1);
      await page.waitForChanges();
      await saveColor.click();

      picker.setProperty("value", color2);
      await page.waitForChanges();
      await saveColor.click();

      picker.setProperty("value", color1);
      await page.waitForChanges();
      await saveColor.click();

      picker.setProperty("value", color2);
      await page.waitForChanges();
      await saveColor.click();

      let savedColors = await page.findAll(`calcite-color >>> .${CSS.savedColors} calcite-color-swatch`);
      expect(savedColors).toHaveLength(3);
    });

    it("it loads saved colors", async () => {
      const page = await newE2EPage({
        html: `<calcite-color storage-id=${storageId}></calcite-color>`
      });

      const savedColors = await page.findAll(`calcite-color >>> .${CSS.savedColors} calcite-color-swatch`);
      expect(savedColors).toHaveLength(3);
    });

    it("it allows removing stored colors", async () => {
      const page = await newE2EPage({
        html: `<calcite-color></calcite-color>`
      });

      const picker = await page.find("calcite-color");
      const saveColor = await page.find(`calcite-color >>> .${CSS.saveColor}`);
      await saveColor.click();

      const color1 = "#ff00ff";
      const color2 = "#beefee";

      picker.setProperty("value", color1);
      await page.waitForChanges();
      await saveColor.click();

      picker.setProperty("value", color2);
      await page.waitForChanges();
      await saveColor.click();

      expect(await page.findAll(`calcite-color >>> .${CSS.savedColors} calcite-color-swatch`)).toHaveLength(3);

      const removeColor = await page.find(`calcite-color >>> .${CSS.deleteColor}`);

      await removeColor.click();
      await removeColor.click();
      await removeColor.click();

      expect(await page.findAll(`calcite-color >>> .${CSS.savedColors} calcite-color-swatchs`)).toHaveLength(0);
    });
  });
});
