import { newE2EPage } from "@stencil/core/testing";
import { defaults, HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-tab", () => {
  const tabHtml = "<calcite-tab>A tab</calcite-tab>";

  it("renders", async () => {
    const page = await newE2EPage({ html: tabHtml });
    const element = await page.find("calcite-tab");
    const styles = await element.getComputedStyle();
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(styles["display"]).toEqual("none");
    expect(styles["visibility"]).toEqual("visible");
  });

  it("has defaults", async () =>
    defaults("calcite-tab", [
      { propertyName: "tab", defaultValue: undefined },
      { propertyName: "active", defaultValue: false },
      { propertyName: "scale", defaultValue: undefined }
    ]));

  it("has block display when active", async () => {
    const page = await newE2EPage({ html: "<calcite-tab active></calcite-tab>" });
    const element = await page.find("calcite-tab");
    const styles = await element.getComputedStyle();
    expect(styles["display"]).toEqual("block");
  });

  describe("when nested within calcite-tabs component", () => {
    it("should render with medium scale", async () => {
      const page = await newE2EPage({
        html: `<calcite-tabs>${tabHtml}</calcite-tabs>`
      });
      const element = await page.find("calcite-tab");
      expect(element).toEqualAttribute("scale", "m");
      expect(await (await element.getComputedStyle())["font-size"]).toEqual("14px");
      expect(await (await element.getComputedStyle())["line-height"]).toEqual("16px"); // 1rem
    });

    describe("when tabs scale is small", () => {
      it("should render with small scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs scale="s">${tabHtml}</calcite-tabs>`
        });
        const element = await page.find("calcite-tab");
        expect(element).toEqualAttribute("scale", "s");
        expect(await (await element.getComputedStyle())["font-size"]).toEqual("12px");
        expect(await (await element.getComputedStyle())["line-height"]).toEqual("16px"); // 1rem
      });
    });

    describe("when tabs scale is large", () => {
      it("should render with large scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs scale="l">${tabHtml}</calcite-tabs>`
        });
        const element = await page.find("calcite-tab");
        expect(element).toEqualAttribute("scale", "l");
        expect(await (await element.getComputedStyle())["font-size"]).toEqual("16px");
        expect(await (await element.getComputedStyle())["line-height"]).toEqual("20px"); // 1.25rem
      });
    });
  });
});
