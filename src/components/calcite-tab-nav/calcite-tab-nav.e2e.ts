import { newE2EPage } from "@stencil/core/testing";
import { renders, accessible } from "../../tests/commonTests";

describe("calcite-tab-nav", () => {
  const tabNavHtml = "<calcite-tab-nav></calcite-tab-nav>";

  it("renders", async () => await renders(tabNavHtml));

  it("is accessible", async () => await accessible(tabNavHtml));

  it("has its active indicator positioned from left if LTR", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-tab-nav>
        <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title>Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>Tab 3 Title</calcite-tab-title>
        <calcite-tab-title>Tab 4 Title</calcite-tab-title>
      </calcite-tab-nav>`);
    const element = await page.find("calcite-tab-nav >>> .tab-nav-active-indicator");
    const style = await element.getComputedStyle();
    expect(style["left"]).toBe("0px");
    expect(style["right"]).not.toBe("0px");
  });

  it("has its active indicator positioned from right if RTL", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-tab-nav dir='rtl'>
        <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title>Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>Tab 3 Title</calcite-tab-title>
        <calcite-tab-title>Tab 4 Title</calcite-tab-title>
      </calcite-tab-nav>`);
    const element = await page.find("calcite-tab-nav >>> .tab-nav-active-indicator");
    const style = await element.getComputedStyle();
    expect(style["right"]).toBe("0px");
    expect(style["left"]).not.toBe("0px");
  });

  describe("scale property", () => {
    describe("default", () => {
      it("should render without scale", async () => {
        const page = await newE2EPage({
          html: `${tabNavHtml}`
        });
        const element = await page.find("calcite-tab-nav");
        expect(element).not.toHaveAttribute("scale");
      });
    });

    describe("when scale is small", () => {
      it("should render with small scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale='s'>
            <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
            <calcite-tab-title>Tab 3 Title</calcite-tab-title>
            <calcite-tab-title>Tab 4 Title</calcite-tab-title>
          </calcite-tab-nav>`
        });
        const element = await page.find("calcite-tab-nav");
        expect(await (await element.getComputedStyle())["minHeight"]).toEqual("24px");
        expect(element).toEqualAttribute("scale", "s");
      });
    });

    describe("when scale is medium", () => {
      it("should render with medium scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale='m'>
            <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
            <calcite-tab-title>Tab 3 Title</calcite-tab-title>
            <calcite-tab-title>Tab 4 Title</calcite-tab-title>
          </calcite-tab-nav>`
        });
        const element = await page.find("calcite-tab-nav");
        expect(await (await element.getComputedStyle())["minHeight"]).toEqual("32px");
        expect(element).toEqualAttribute("scale", "m");
      });
    });

    describe("when scale is large", () => {
      it("should render with medium scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale='l'>
            <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
            <calcite-tab-title>Tab 3 Title</calcite-tab-title>
            <calcite-tab-title>Tab 4 Title</calcite-tab-title>
          </calcite-tab-nav>`
        });
        const element = await page.find("calcite-tab-nav");
        expect(await (await element.getComputedStyle())["minHeight"]).toEqual("44px");
        expect(element).toEqualAttribute("scale", "l");
      });
    });

    describe("when nested within tabs parent", () => {
      it("should render with default medium scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs>${tabNavHtml}</calcite-tabs>`
        });
        const element = await page.find("calcite-tab-nav");
        expect(element).toEqualAttribute("scale", "m");
      });

      describe("when tabs scale is small", () => {
        it("should render with small scale", async () => {
          const page = await newE2EPage({
            html: `<calcite-tabs scale="s">${tabNavHtml}</calcite-tabs>`
          });
          const element = await page.find("calcite-tab-nav");
          expect(element).toEqualAttribute("scale", "s");
        });
      });

      describe("when tabs scale is large", () => {
        it("should render with large scale", async () => {
          const page = await newE2EPage({
            html: `<calcite-tabs scale="l">${tabNavHtml}</calcite-tabs>`
          });
          const element = await page.find("calcite-tab-nav");
          expect(element).toEqualAttribute("scale", "l");
        });
      });
    });
  });
});
