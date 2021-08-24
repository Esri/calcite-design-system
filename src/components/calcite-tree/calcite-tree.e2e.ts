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

  describe("item selection", () => {
    it("allows selecting items", async () => {
      const page = await newE2EPage({
        html: html`<calcite-tree input-enabled selection-mode="ancestors">
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
                </calcite-tree>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>
        </calcite-tree>`
      });

      const tree = await page.find("calcite-tree");
      const selectEventSpy = await tree.spyOnEvent("calciteTreeSelect");
      const one = await page.find("#one");
      const childOne = await page.find("#child-one");
      const grandchildOne = await page.find("#grandchild-one");

      await one.click();
      expect(selectEventSpy).toHaveReceivedEventTimes(1);

      await childOne.press(" ");
      expect(selectEventSpy).toHaveReceivedEventTimes(2);

      await grandchildOne.press("Enter");

      expect(selectEventSpy).toHaveReceivedEventTimes(3);
    });

    it("should only emit one event on grandchildren click", async () => {
      const page = await newE2EPage({
        html: html`<calcite-tree selection-mode="single">
          <calcite-tree-item id="one"><span>One</span></calcite-tree-item>
          <calcite-tree-item id="two" expanded>
            <span>Two</span>
            <calcite-tree slot="children">
              <calcite-tree-item id="child-one" expanded>
                <span>Child 1</span>
                <calcite-tree slot="children">
                  <calcite-tree-item id="grandchild-one" expanded>
                    <span>Grandchild 1</span>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>
        </calcite-tree>`
      });

      await page.waitForChanges();
      const tree = await page.find("calcite-tree");
      const selectEventSpy = await tree.spyOnEvent("calciteTreeSelect");
      const grandchildOne = await page.find("#grandchild-one");
      await grandchildOne.click();
      await page.waitForChanges();
      expect(selectEventSpy).toHaveReceivedEventTimes(1);
    });

    describe("has selected items in the selection event payload", () => {
      it("contains current selection when selection=multi + input-enabled", async () => {
        const page = await newE2EPage({
          html: html` <calcite-tree selection-mode="multi" input-enabled>
            <calcite-tree-item id="1">1</calcite-tree-item>
            <calcite-tree-item id="2">2</calcite-tree-item>
          </calcite-tree>`
        });

        const [item1, item2] = await page.findAll("calcite-tree-item");

        type TestWindow = {
          selectedIds: string[];
        } & Window &
          typeof globalThis;

        await page.evaluateHandle(() =>
          document.addEventListener("calciteTreeSelect", ({ detail }: CustomEvent) => {
            (window as TestWindow).selectedIds = detail.selected.map((item) => item.id);
          })
        );

        const getSelectedIds = async (): Promise<any> => page.evaluate(() => (window as TestWindow).selectedIds);

        await item1.click();

        expect(await getSelectedIds()).toEqual(["1"]);

        await item2.click();

        expect(await getSelectedIds()).toEqual(["1", "2"]);

        await item2.click();

        expect(await getSelectedIds()).toEqual(["1"]);

        await item1.click();

        expect(await getSelectedIds()).toEqual([]);
      });
    });

    it("emits once when the tree item checkbox label is clicked", async () => {
      const page = await newE2EPage({
        html: html`<calcite-tree input-enabled selection-mode="ancestors">
          <calcite-tree-item>1</calcite-tree-item>
        </calcite-tree>`
      });

      const tree = await page.find("calcite-tree");
      const selectEventSpy = await tree.spyOnEvent("calciteTreeSelect");
      const treeItemCheckboxLabel = await page.find("calcite-tree-item >>> .calcite-tree-label");

      await treeItemCheckboxLabel.click();
      expect(selectEventSpy).toHaveReceivedEventTimes(1);

      await treeItemCheckboxLabel.click();
      expect(selectEventSpy).toHaveReceivedEventTimes(2);
    });
  });
});
