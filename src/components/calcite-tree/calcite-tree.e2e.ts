import { newE2EPage } from "@stencil/core/testing";
import { accessible, HYDRATED_ATTR } from "../../tests/commonTests";
import { html } from "../../tests/utils";

describe("calcite-tree", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-tree></calcite-tree>");
    const element = await page.find("calcite-tree");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });

  it("is accessible", async () => accessible(`<calcite-tree></calcite-tree>`));

  describe("it forwards focus", () => {
    it("to first selected item", async () => {
      const page = await newE2EPage({
        html: html` <calcite-tree>
          <calcite-tree-item id="one">1</calcite-tree-item>
          <calcite-tree-item id="two" selected>2</calcite-tree-item>
          <calcite-tree-item id="three">3</calcite-tree-item>
        </calcite-tree>`
      });

      await page.keyboard.press("Tab");

      expect(await page.evaluate(() => document.activeElement.matches("calcite-tree-item#two"))).toBe(true);
    });

    it("to first item if none selected", async () => {
      const page = await newE2EPage({
        html: html` <calcite-tree>
          <calcite-tree-item id="one">1</calcite-tree-item>
          <calcite-tree-item id="two">2</calcite-tree-item>
          <calcite-tree-item id="three">3</calcite-tree-item>
        </calcite-tree>`
      });

      await page.keyboard.press("Tab");

      expect(await page.evaluate(() => document.activeElement.matches("calcite-tree-item#one"))).toBe(true);

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");

      expect(await page.evaluate(() => document.activeElement.matches("body"))).toBe(true);
    });

    it("doesn't trap focus", async () => {
      const page = await newE2EPage({
        html: html` <calcite-tree>
          <calcite-tree-item id="one">1</calcite-tree-item>
        </calcite-tree>`
      });

      await page.keyboard.press("Tab");

      expect(await page.evaluate(() => document.activeElement.matches("calcite-tree-item#one"))).toBe(true);

      await page.keyboard.press("Tab");

      expect(await page.evaluate(() => document.activeElement.matches("body"))).toBe(true);

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");

      expect(await page.evaluate(() => document.activeElement.matches("calcite-tree-item#one"))).toBe(true);

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");

      expect(await page.evaluate(() => document.activeElement.matches("body"))).toBe(true);
    });
  });

  it("is accessible: with nested children", async () =>
    accessible(`
  <calcite-tree lines>
    <calcite-tree-item>
      <a href="#">Child 2</a>
      <calcite-tree slot="children">
        <calcite-tree-item>
          <a href="http://www.google.com">Grandchild 1</a>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
</calcite-tree>
  `));

  it("should correctly select tree in ancestors selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-tree input-enabled selection-mode="ancestors">
        <calcite-tree-item id="one"><span>One</span></calcite-tree-item>
        <calcite-tree-item id="two">
          <span>Two</span>
          <calcite-tree slot="children">
            <calcite-tree-item id="child-one">
              <span>Child 1</span>
              <calcite-tree slot="children">
                <calcite-tree-item id="grandchild-one">
                  <span>Grandchild 1</span>
                </calcite-tree-item>
                <calcite-tree-item id="grandchild-two">
                  <span>Grandchild 2</span>
                </calcite-tree-item>
              </calcite-tree>
            </calcite-tree-item>
            <calcite-tree-item id="child-two"><span>Child 2</span></calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    `);
    await page.waitForChanges();

    const one = await page.find("#one");
    const two = await page.find("#two");
    const childOne = await page.find("#child-one");
    const childTwo = await page.find("#child-two");
    const grandchildOne = await page.find("#grandchild-one");
    const grandchildTwo = await page.find("#grandchild-two");

    expect(one).not.toHaveAttribute("indeterminate");
    expect(one).not.toHaveAttribute("selected");
    expect(childOne).not.toHaveAttribute("indeterminate");
    expect(childOne).not.toHaveAttribute("selected");
    expect(childOne).not.toHaveAttribute("indeterminate");
    expect(childOne).not.toHaveAttribute("selected");
    expect(grandchildOne).not.toHaveAttribute("selected");
    expect(grandchildTwo).not.toHaveAttribute("selected");

    await two.click();

    expect(one).not.toHaveAttribute("selected");
    expect(two).toHaveAttribute("selected");
    expect(childOne).toHaveAttribute("selected");
    expect(childTwo).toHaveAttribute("selected");
    expect(grandchildOne).toHaveAttribute("selected");
    expect(grandchildTwo).toHaveAttribute("selected");

    await childOne.click();

    expect(childOne).not.toHaveAttribute("selected");
    expect(childTwo).toHaveAttribute("selected");
    expect(grandchildOne).not.toHaveAttribute("selected");
    expect(grandchildTwo).not.toHaveAttribute("selected");
    expect(two).not.toHaveAttribute("selected");
    expect(two).toHaveAttribute("indeterminate");
  });
});
