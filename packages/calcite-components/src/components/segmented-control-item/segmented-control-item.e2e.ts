import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { renders, hidden, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("calcite-segmented-control-item", () => {
  describe("renders", () => {
    renders("calcite-segmented-control-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-segmented-control-item");
  });

  it("is un-checked by default", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-segmented-control-item value='test-value'></calcite-segmented-control-item>");
    const element = await page.find("calcite-segmented-control-item");

    const checked = await element.getProperty("checked");
    expect(checked).toBe(false);
  });

  it("supports value, label and checked", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-segmented-control-item value='test-value' checked>test-label</calcite-segmented-control-item>",
    );
    const element = await page.find("calcite-segmented-control-item");

    expect(element).toEqualText("test-label");

    const checked = await element.getProperty("checked");
    expect(checked).toBe(true);

    const value = await element.getProperty("value");
    expect(value).toBe("test-value");
  });

  it("renders icon at start if requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-segmented-control-item icon-start="car">Content</calcite-segmented-control-item>`);
    const icon = await page.find(`calcite-segmented-control-item >>> .${CSS.icon}`);
    expect(icon).not.toBe(null);
  });

  it("does not render icon if not requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-segmented-control-item>Content</calcite-segmented-control-item>`);
    const icon = await page.find(`calcite-segmented-control-item >>> .${CSS.icon}`);
    expect(icon).toBe(null);
  });

  describe("WAI-ARIA Roles, States, and Properties", () => {
    it(`has a role of 'radio'`, async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-segmented-control-item></calcite-segmented-control-item>");
      const element = await page.find("calcite-segmented-control-item");

      const role = element.getAttribute("role");

      expect(role).toEqualText("radio");
    });

    it(`updates 'aria-checked' based on 'checked' property`, async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-segmented-control-item></calcite-segmented-control-item>");
      const element = await page.find("calcite-segmented-control-item");

      let ariaChecked = element.getAttribute("aria-checked");

      expect(ariaChecked).toEqualText("false");

      element.setProperty("checked", true);
      await page.waitForChanges();

      ariaChecked = element.getAttribute("aria-checked");

      expect(ariaChecked).toEqualText("true");

      element.setProperty("checked", false);
      await page.waitForChanges();

      ariaChecked = element.getAttribute("aria-checked");

      expect(ariaChecked).toEqualText("false");
    });

    it("content/value is wrapped by label", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-segmented-control-item></calcite-segmented-control-item>");
      const defaultSlot = await page.find("calcite-segmented-control-item >>> label slot");

      expect(defaultSlot).toBeDefined();
    });

    it("renders default prop values", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-segmented-control-item></calcite-segmented-control-item>");

      const element = await page.find("calcite-segmented-control-item");
      expect(element).not.toHaveAttribute("checked");
      expect(element).not.toHaveAttribute("icon-flip-rtl");
      expect(element).not.toHaveAttribute("value");
      expect(element).not.toHaveAttribute("icon-start");
      expect(element).not.toHaveAttribute("icon-end");
    });
  });

  describe("theme", () => {
    themed("calcite-segmented-control-item", {
      "--calcite-segmented-control-color": {
        shadowSelector: `.${CSS.label}`,
        targetProp: "color",
      },
      "--calcite-segmented-control-background-color": {
        shadowSelector: `.${CSS.label}`,
        targetProp: "backgroundColor",
      },
      "--calcite-segmented-control-border-color": {
        shadowSelector: `.${CSS.label}`,
        targetProp: "borderColor",
      },
      "--calcite-segmented-control-shadow": {
        shadowSelector: `.${CSS.label}`,
        targetProp: "boxShadow",
      },
    });
    themed(html`<calcite-segmented-control-item icon-start="car">Content</calcite-segmented-control-item>`, {
      "--calcite-segmented-control-icon-color": {
        shadowSelector: `.${CSS.icon}`,
        targetProp: "--calcite-icon-color",
      },
    });
  });
});
