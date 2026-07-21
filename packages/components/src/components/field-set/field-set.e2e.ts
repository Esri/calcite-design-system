import { describe, expect, it } from "vitest";
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";

describe("field-set", () => {
  it("renders a fieldset with a legend", async () => {
    const page = await newE2EPage({ html: `<calcite-field-set></calcite-field-set>` });
    const container = await page.find("calcite-field-set >>> .container");
    const legend = await page.find("calcite-field-set >>> .legend");

    expect(await legend.getProperty("tagName")).toBe("LEGEND");
    expect(await container.getProperty("tagName")).toBe("FIELDSET");
  });

  it("toggles the horizontal layout class when requested", async () => {
    const page = await newE2EPage({
      html: `<calcite-field-set layout="horizontal"></calcite-field-set>`,
    });
    const fieldWrapper = await page.find("calcite-field-set >>> .field-wrapper");

    expect(await fieldWrapper.getProperty("className")).toContain("field-wrapper--horizontal");
    expect(await fieldWrapper.getProperty("className")).not.toContain("field-wrapper--vertical");
  });
});
