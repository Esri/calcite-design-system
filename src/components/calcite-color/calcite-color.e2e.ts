import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests";

import { CSS, DEFAULT_STORAGE_KEY_PREFIX, DIMENSIONS } from "./resources";
import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { ColorValue } from "../../interfaces/Color";
import SpyInstance = jest.SpyInstance;

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
    const page = await newE2EPage({
      html: "<calcite-color></calcite-color>"
    });
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

    const supportedStringValues = ["#beefee", "rgb(255, 0, 255)", "hsl(30, 100%, 50%)"];

    for (const value of supportedStringValues) {
      picker.setProperty("value", value);
      await page.waitForChanges();

      expect(await picker.getProperty("value")).toBe(value);
    }

    const supportedObjectValues = [
      { r: 255, g: 255, b: 0 },
      { h: 270, s: 60, l: 70 },
      { h: 202, s: 0, v: 100 }
    ];

    for (const value of supportedObjectValues) {
      picker.setProperty("value", value);
      await page.waitForChanges();

      expect(await picker.getProperty("value")).toMatchObject(value);
    }

    expect(spy).toHaveReceivedEventTimes(supportedStringValues.length + supportedObjectValues.length);
  });

  it("allows selecting colors via color field/slider", async () => {
    const page = await newE2EPage({
      html: "<calcite-color value='#000' scale='m'></calcite-color>"
    });
    const picker = await page.find(`calcite-color`);
    const spy = await picker.spyOnEvent("calciteColorChange");
    let changes = 0;
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
    expect(spy).toHaveReceivedEventTimes(++changes);

    await page.mouse.click(fieldAndSliderX, fieldAndSliderY + mediumScaleDimensions.colorField.height);
    expect(await picker.getProperty("value")).toBe("#000000");
    expect(spy).toHaveReceivedEventTimes(++changes);

    await page.mouse.click(fieldAndSliderX + mediumScaleDimensions.colorField.width - widthOffset, fieldAndSliderY);
    expect(await picker.getProperty("value")).toBe("#ff0000");
    expect(spy).toHaveReceivedEventTimes(++changes);

    await page.mouse.click(
      fieldAndSliderX + mediumScaleDimensions.colorField.width - widthOffset,
      fieldAndSliderY + mediumScaleDimensions.colorField.height
    );
    expect(await picker.getProperty("value")).toBe("#000000");
    expect(spy).toHaveReceivedEventTimes(++changes);

    // set to corner right value that's not red (first value)
    picker.setProperty("value", "#ff0");
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(++changes);

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
      expect(spy).toHaveReceivedEventTimes(++changes);

      x += offsetX;
    }
  });

  describe("unsupported value handling", () => {
    let consoleSpy: SpyInstance;

    beforeAll(() => (consoleSpy = jest.spyOn(console, "warn")));

    afterAll(() => jest.clearAllMocks());

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

      expect(consoleSpy).toBeCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching("ignoring invalid color value: unsupported-color-format")
      );
    });
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

  describe("initial value used to initialize internal color", () => {
    const initialColor = "#c0ff33";

    async function getInternalColorAsHex(page: E2EPage): Promise<string> {
      return page.$eval("calcite-color", (picker: HTMLCalciteColorElement) => picker.color.hex().toLowerCase());
    }

    it("value as attribute", async () => {
      const page = await newE2EPage({
        html: `<calcite-color value="${initialColor}"></calcite-color>`
      });

      expect(await getInternalColorAsHex(page)).toBe(initialColor);
    });

    it("value as property", async () => {
      // initialize page with calcite-color to make it available in the evaluate callback below
      const page = await newE2EPage({
        html: "<calcite-color></calcite-color>"
      });
      await page.setContent("");

      await page.evaluate(async (color) => {
        const picker = document.createElement<HTMLCalciteColorElement>("calcite-color");
        picker.value = color;
        document.body.append(picker);

        await new Promise((resolve) => requestAnimationFrame(() => resolve()));
      }, initialColor);

      expect(await getInternalColorAsHex(page)).toBe(initialColor);
    });
  });

  describe("color inputs", () => {
    const clearAndEnterValue = async (page: E2EPage, inputOrHexInput: E2EElement, value: string): Promise<void> => {
      await inputOrHexInput.callMethod("setFocus");
      await page.waitForChanges();

      const currentValue = await inputOrHexInput.getProperty("value");

      for (let i = 0; i < currentValue.length; i++) {
        await page.keyboard.press("Backspace");
        await page.waitForChanges();
      }

      await inputOrHexInput.type(value);
      await page.waitForChanges();

      await page.keyboard.press("Enter");
      await page.waitForChanges();
    };

    describe("keeps value in same format when applying updates", () => {
      let page: E2EPage;
      let picker: E2EElement;

      beforeEach(async () => {
        page = await newE2EPage({
          html: "<calcite-color></calcite-color>"
        });
        picker = await page.find("calcite-color");
      });

      const updateColorWithAllInputs = async (assertColorUpdate: (value: ColorValue) => void): Promise<void> => {
        const hexInput = await page.find(`calcite-color >>> calcite-color-hex-input`);

        await clearAndEnterValue(page, hexInput, "abc");

        assertColorUpdate(await picker.getProperty("value"));

        const [rgbModeButton, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

        await rgbModeButton.click();
        await page.waitForChanges();

        const [rInput, gInput, bInput, hInput, sInput, vInput] = await page.findAll(
          `calcite-color >>> calcite-input.${CSS.channel}`
        );

        await clearAndEnterValue(page, rInput, "128");
        await clearAndEnterValue(page, gInput, "64");
        await clearAndEnterValue(page, bInput, "32");

        assertColorUpdate(await picker.getProperty("value"));

        await hsvModeButton.click();
        await page.waitForChanges();

        await clearAndEnterValue(page, hInput, "180");
        await clearAndEnterValue(page, sInput, "90");
        await clearAndEnterValue(page, vInput, "45");

        assertColorUpdate(await picker.getProperty("value"));
      };

      // see https://jasmine.github.io/tutorials/custom_argument_matchers for more info
      function toBeInteger(): any {
        return {
          asymmetricMatch(abc): boolean {
            return Number.isInteger(abc);
          },

          jasmineToString(): string {
            return `Expected value to be an integer.`;
          }
        };
      }

      it("hex", async () => {
        const hex = "#f0f";
        picker.setProperty("value", hex);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toBe(hex);
          expect(value).toMatch(/^#[a-f0-9]{6}$/);
        });
      });

      it("rgb", async () => {
        const rgbCss = "rgb(255, 0, 255)";
        picker.setProperty("value", rgbCss);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toBe(rgbCss);
          expect(value).toMatch(/^rgb\(\d+, \d+, \d+\)/);
        });
      });

      it("hsl", async () => {
        const hslCss = "hsl(30, 100%, 50%)";
        picker.setProperty("value", hslCss);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toBe(hslCss);
          expect(value).toMatch(/^hsl\([0-9.]+, [0-9.]+%, [0-9.]+%\)/);
        });
      });

      it("rgb (object)", async () => {
        const rgbObject = { r: 255, g: 255, b: 0 };
        picker.setProperty("value", rgbObject);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toMatchObject(rgbObject);
          expect(value).toMatchObject({
            r: toBeInteger(),
            g: toBeInteger(),
            b: toBeInteger()
          });
        });
      });

      it("hsl (object)", async () => {
        const hslObject = { h: 270, s: 60, l: 70 };
        picker.setProperty("value", hslObject);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toMatchObject(hslObject);
          expect(value).toMatchObject({
            h: toBeInteger(),
            s: toBeInteger(),
            l: toBeInteger()
          });
        });
      });

      it("hsv (object)", async () => {
        const hsvObject = { h: 202, s: 0, v: 100 };
        picker.setProperty("value", hsvObject);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toMatchObject(hsvObject);
          expect(value).toMatchObject({
            h: toBeInteger(),
            s: toBeInteger(),
            v: toBeInteger()
          });
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

    it("allows nudging values", async () => {
      const assertChannelValueNudge = async (page: E2EPage, calciteInput: E2EElement): Promise<void> => {
        await calciteInput.callMethod("setFocus");
        await page.waitForTimeout(1000);

        const currentValue = await calciteInput.getProperty("value");

        await page.keyboard.press("ArrowUp");
        await page.waitForTimeout(1000);
        expect(await calciteInput.getProperty("value")).toBe(`${Number(currentValue) + 1}`);

        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();
        expect(await calciteInput.getProperty("value")).toBe(currentValue);

        await page.keyboard.down("Shift");
        await page.keyboard.press("ArrowUp");
        await page.keyboard.up("Shift");
        await page.waitForChanges();
        expect(await calciteInput.getProperty("value")).toBe(`${Number(currentValue) + 10}`);

        await page.keyboard.down("Shift");
        await page.keyboard.press("ArrowDown");
        await page.keyboard.up("Shift");
        await page.waitForChanges();
        expect(await calciteInput.getProperty("value")).toBe(currentValue);
      };

      const page = await newE2EPage({
        html: "<calcite-color value='#408048'></calcite-color>"
      });

      const [rgbModeButton, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

      await rgbModeButton.click();
      await page.waitForChanges();

      const [rInput, gInput, bInput, hInput, sInput, vInput] = await page.findAll(
        `calcite-color >>> calcite-input.${CSS.channel}`
      );

      await assertChannelValueNudge(page, rInput);
      await assertChannelValueNudge(page, gInput);
      await assertChannelValueNudge(page, bInput);

      await hsvModeButton.click();
      await page.waitForChanges();

      await assertChannelValueNudge(page, hInput);
      await assertChannelValueNudge(page, sInput);
      await assertChannelValueNudge(page, vInput);
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

    it("allows saving unique colors", async () => {
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

      const savedColors = await page.findAll(`calcite-color >>> .${CSS.savedColors} calcite-color-swatch`);
      expect(savedColors).toHaveLength(3);
    });

    it("loads saved colors", async () => {
      const page = await newE2EPage({
        html: `<calcite-color storage-id=${storageId}></calcite-color>`
      });

      const savedColors = await page.findAll(`calcite-color >>> .${CSS.savedColors} calcite-color-swatch`);
      expect(savedColors).toHaveLength(3);
    });

    it("allows removing stored colors", async () => {
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

  it("allows hiding sections", async () => {
    const page = await newE2EPage({
      html: `<calcite-color></calcite-color>`
    });

    type HiddenSection = "hex" | "channels" | "saved";

    async function assertHiddenSection(hiddenSections: HiddenSection[]): Promise<void> {
      const sectionVisibility: Record<HiddenSection, boolean> = {
        hex: true,
        channels: true,
        saved: true
      };

      hiddenSections.forEach((section) => (sectionVisibility[section] = false));

      const color = await page.find("calcite-color");
      const sections = Object.keys(sectionVisibility);

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const hideSectionProp = `hide${section.charAt(0).toUpperCase() + section.slice(1)}`;

        color.setProperty(hideSectionProp, !sectionVisibility[section]);
        await page.waitForChanges();
      }

      const [hex, channels, saved] = await Promise.all([
        page.find(`calcite-color >>> .${CSS.hexOptions}`),
        page.find(`calcite-color >>> .${CSS.colorModeContainer}`),
        page.find(`calcite-color >>> .${CSS.savedColors}`)
      ]);

      const sectionNodes: Record<HiddenSection, E2EElement> = {
        hex,
        channels,
        saved
      };

      sections.forEach((section) => {
        const node = sectionNodes[section];
        const visible = sectionVisibility[section];

        expect(node)[visible ? "toBeDefined" : "toBeNull"]();
      });
    }

    await assertHiddenSection(["hex", "channels", "saved"]);
    await assertHiddenSection(["hex", "channels"]);
    await assertHiddenSection(["hex", "saved"]);
    await assertHiddenSection(["hex"]);
    await assertHiddenSection(["channels", "saved"]);
    await assertHiddenSection(["saved"]);
    await assertHiddenSection(["channels"]);
    await assertHiddenSection([]);
  });
});
