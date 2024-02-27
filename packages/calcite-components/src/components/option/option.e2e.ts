import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, reflects, renders, hidden } from "../../tests/commonTests";

describe("calcite-option", () => {
  describe("renders", () => {
    renders("calcite-option", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-option");
  });

  describe("accessible", () => {
    accessible("calcite-option");
  });

  describe("defaults", () => {
    defaults("calcite-option", [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-option", [
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "selected",
        value: true,
      },
    ]);
  });

  it("falls back to the text content when value/label is not specified", async () => {
    const optionText = "one";
    const page = await newE2EPage({
      html: `<calcite-option>${optionText}</calcite-option>`,
    });
    const option = await page.find("calcite-option");

    expect(await option.getProperty("label")).toBe(optionText);
    expect(await option.getProperty("value")).toBe(optionText);

    option.setProperty("label", "two");
    option.setProperty("value", 2);
    await page.waitForChanges();

    expect(await option.getProperty("label")).toBe("two");
    expect(await option.getProperty("value")).toBe(2);

    option.setProperty("label", undefined);
    option.setProperty("value", undefined);
    await page.waitForChanges();

    expect(await option.getProperty("label")).toBe(optionText);
    expect(await option.getProperty("value")).toBe(optionText);

    option.setProperty("label", "");
    option.setProperty("value", "");
    await page.waitForChanges();

    expect(await option.getProperty("label")).toBe(optionText);
    expect(await option.getProperty("value")).toBe("");

    option.setProperty("label", null);
    option.setProperty("value", null);
    await page.waitForChanges();

    expect(await option.getProperty("label")).toBe(optionText);
    expect(await option.getProperty("value")).toBe(optionText);

    const alternateLabel = "dos";
    await option.setProperty("innerText", alternateLabel);
    await page.waitForChanges();

    expect(await option.getProperty("label")).toBe(alternateLabel);
    expect(await option.getProperty("value")).toBe(alternateLabel);

    const charDataUpdateLabel = "tres";
    await page.evaluate((updatedText: string): void => {
      // Ember and possibly other frameworks use Text node APIs to update contents
      const option = document.querySelector<HTMLCalciteOptionElement>("calcite-option");
      const textNode = option.childNodes[0] as Text;
      textNode.replaceData(0, textNode.length, updatedText);
    }, charDataUpdateLabel);

    expect(await option.getProperty("label")).toBe(charDataUpdateLabel);
    expect(await option.getProperty("value")).toBe(charDataUpdateLabel);
  });
});
