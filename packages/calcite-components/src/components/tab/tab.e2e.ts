import { newE2EPage } from "@stencil/core/testing";
import { defaults, renders, hidden } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "../tab-title/resources";

const tabBlockPadding = html`
  <calcite-tabs>
    <calcite-tabs>
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title selected>Sandwiches</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab style="--calcite-block-padding: 0;">
        <div>Chicken with Pesto</div>
      </calcite-tab>
    </calcite-tabs>
  </calcite-tabs>
`;

describe("calcite-tab", () => {
  const tabHtml = "<calcite-tab>A tab</calcite-tab>";
  const tabHtmlSelected = "<calcite-tab selected>A tab</calcite-tab>";

  describe("renders", () => {
    renders(tabHtml, { display: "none", visible: false });
    renders(tabHtmlSelected, { display: "block", visible: true });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tab");
  });

  describe("defaults", () => {
    defaults("calcite-tab", [
      { propertyName: "tab", defaultValue: undefined },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  it("should allow the CSS custom property to be overridden when applied to :root", async () => {
    const overrideStyle = "0px";
    const page = await newE2EPage();
    await page.setContent(html`
      <style>
        :root {
          --calcite-block-padding: ${overrideStyle};
        }
      </style>
      ${tabBlockPadding}
    `);
    const content = await page.find(`calcite-tab >>> .${CSS.content}`);
    const contentStyles = await content.getComputedStyle();
    const contentPadding = contentStyles.getPropertyValue("padding");
    expect(contentPadding).toEqual(overrideStyle);
  });

  it("should allow the CSS custom property to be overridden when applied to element", async () => {
    const overrideStyle = "0px";
    const page = await newE2EPage();
    await page.setContent(tabBlockPadding);

    const content = await page.find(`calcite-tab >>> .${CSS.content}`);
    const contentStyles = await content.getComputedStyle();
    const contentPadding = await contentStyles.getPropertyValue("padding");
    expect(contentPadding).toEqual(overrideStyle);
  });
});
