// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";

describe("calcite-option-group", () => {
  it("has a label", async () => {
    const page = await newE2EPage({
      html: `<calcite-option-group label="test-group"></calcite-option-group>`,
    });

    const group = await page.find("calcite-option-group");
    expect(group.shadowRoot.textContent).toBe("test-group");
  });
});
