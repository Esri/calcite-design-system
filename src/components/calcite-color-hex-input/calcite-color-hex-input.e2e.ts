import { newE2EPage } from "@stencil/core/testing";
import { defaults, focusable, reflects, renders } from "../../tests/commonTests";

describe("calcite-color-hex-input", () => {
  it("renders", () => renders("calcite-color-hex-input"));

  it("has defaults", () =>
    defaults("calcite-color-hex-input", [
      {
        propertyName: "value",
        defaultValue: "#000000"
      }
    ]));

  it("reflects", () =>
    reflects("calcite-color-hex-input", [
      {
        propertyName: "value",
        value: "#ffffff"
      }
    ]));

  it("can be focused", async () => focusable("calcite-color-hex-input"));

  it("accepts shorthand hex", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-hex-input></calcite-color-hex-input>");

    const input = await page.find(`calcite-color-hex-input`);
    await input.setProperty("value", "#fff");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#ffffff");
  });

  it("accepts longhand hex", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-hex-input></calcite-color-hex-input>");

    const input = await page.find(`calcite-color-hex-input`);
    await input.setProperty("value", "#fafafa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#fafafa");
  });

  it("normalizes value when initialized", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-hex-input value='#f0f'></calcite-color-hex-input>");
    await page.waitForChanges();
    const input = await page.find(`calcite-color-hex-input`);

    expect(await input.getProperty("value")).toBe("#ff00ff");
  });

  it("ignores invalid hex", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-hex-input value='#b33f33'></calcite-color-hex-input>");

    const input = await page.find(`calcite-color-hex-input`);
    await input.setProperty("value", "wrong");
    await page.waitForChanges();

    await input.setProperty("value", "#");
    await page.waitForChanges();

    await input.setProperty("value", "#a");
    await page.waitForChanges();

    await input.setProperty("value", "#aa");
    await page.waitForChanges();

    await input.setProperty("value", "#aaaa");
    await page.waitForChanges();

    await input.setProperty("value", "#aaaaa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#b33f33");
  });

  it("emits event when color changes", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-hex-input value='#b33f33'></calcite-color-hex-input>");

    const input = await page.find("calcite-color-hex-input");
    const spy = await input.spyOnEvent("calciteColorHexInputChange");

    await input.setProperty("value", "#abcdef");
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
  });
});
