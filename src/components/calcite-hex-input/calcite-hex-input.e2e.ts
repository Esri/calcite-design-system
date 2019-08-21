import { newE2EPage } from "@stencil/core/testing";
import { defaults, reflects, renders } from "../../tests/commonTests";

describe("calcite-hex-input", () => {
  it("renders", () => renders("calcite-hex-input"));

  it("has defaults", () => defaults("calcite-hex-input", [
    {
      propertyName: "value",
      defaultValue: "#000000"
    }
  ]));

  it("reflects", () => reflects("calcite-hex-input", [
    {
      propertyName: "value",
      value: "#ffffff"
    }
  ]));

  it("accepts shorthand hex", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-hex-input></calcite-hex-input>");

    const input = await page.find(`calcite-hex-input`);
    await input.setProperty("value", "#fff");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#ffffff")
  });

  it("accepts longhand hex", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-hex-input></calcite-hex-input>");

    const input = await page.find(`calcite-hex-input`);
    await input.setProperty("value", "#fafafa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#fafafa")
  });

  it("normalizes value when initialized", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-hex-input value='#f0f'></calcite-hex-input>");
    await page.waitForChanges();
    const input = await page.find(`calcite-hex-input`);

    expect(await input.getProperty("value")).toBe("#ff00ff")
  });

  it("ignores invalid hex", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-hex-input value='#b33f33'></calcite-hex-input>");

    const input = await page.find(`calcite-hex-input`);
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

    expect(await input.getProperty("value")).toBe("#b33f33")
  });

  it("emits event when color changes", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-hex-input value='#b33f33'></calcite-hex-input>");

    const input = await page.find("calcite-hex-input");
    const spy = await input.spyOnEvent("calciteHexInputChange");

    await input.setProperty("value", "#abcdef");
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
  });
});
