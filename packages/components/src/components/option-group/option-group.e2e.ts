// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, renders } from "../../tests/commonTests";

describe("calcite-option-group", () => {
  describe("renders", () => {
    renders("calcite-option-group", { display: "block" });
  });

  describe("accessible", () => {
    accessible("calcite-option-group");
  });

  it("has a label", async () => {
    const page = await newE2EPage({
      html: `<calcite-option-group label="test-group"></calcite-option-group>`,
    });

    const group = await page.find("calcite-option-group");
    expect(group.shadowRoot.textContent).toBe("test-group");
  });
});
