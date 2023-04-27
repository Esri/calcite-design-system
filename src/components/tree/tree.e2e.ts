import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, defaults, hidden, renders } from "../../tests/commonTests";
import { CSS } from "../tree-item/resources";
import SpyInstance = jest.SpyInstance;

describe("calcite-tree", () => {
  it("renders", () => renders("calcite-tree", { display: "block" }));

  it("honors hidden attribute", async () => hidden("calcite-tree"));

  describe("accessible", () => {
    accessible(`<calcite-tree></calcite-tree>`);
  });

  it("has property defaults", async () =>
    defaults("calcite-tree", [
      {
        propertyName: "lines",
        defaultValue: false
      },
      {
        propertyName: "scale",
        defaultValue: "m"
      },
      {
        propertyName: "selectionMode",
        defaultValue: "single"
      }
    ]));

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

  describe("accessible: with nested children", () => {
    accessible(html`
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
    `);
  });

  it("should correctly select tree in ancestors selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-tree selection-mode="ancestors">
        <calcite-tree-item id="one"><span>One</span></calcite-tree-item>
        <calcite-tree-item id="two" expanded>
          <span>Two</span>
          <calcite-tree slot="children">
            <calcite-tree-item id="child-one" expanded>
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

    // Puppeteer's element click will happen in the center of a component,
    // so we call the method to ensure it happens on the component of interest

    await two.callMethod("click");
    await page.waitForChanges();

    expect(one).not.toHaveAttribute("selected");
    expect(one).not.toHaveAttribute("indeterminate");
    expect(two).toHaveAttribute("selected");
    expect(childOne).toHaveAttribute("selected");
    expect(childTwo).toHaveAttribute("selected");
    expect(grandchildOne).toHaveAttribute("selected");
    expect(grandchildTwo).toHaveAttribute("selected");

    await childOne.callMethod("click");
    await page.waitForChanges();

    expect(one).not.toHaveAttribute("selected");
    expect(one).not.toHaveAttribute("indeterminate");
    expect(two).not.toHaveAttribute("selected");
    expect(two).toHaveAttribute("indeterminate");
    expect(childOne).not.toHaveAttribute("selected");
    expect(childTwo).toHaveAttribute("selected");
    expect(grandchildOne).not.toHaveAttribute("selected");
    expect(grandchildTwo).not.toHaveAttribute("selected");

    grandchildTwo.setProperty("disabled", true);
    await page.waitForChanges();
    await two.callMethod("click");
    await page.waitForChanges();

    expect(one).not.toHaveAttribute("selected");
    expect(one).not.toHaveAttribute("indeterminate");
    expect(two).not.toHaveAttribute("selected");
    expect(two).not.toHaveAttribute("indeterminate");
    expect(childOne).not.toHaveAttribute("selected");
    expect(childTwo).not.toHaveAttribute("selected");
    expect(grandchildOne).not.toHaveAttribute("selected");
    expect(grandchildTwo).not.toHaveAttribute("selected");

    grandchildTwo.setProperty("disabled", false);
    await page.waitForChanges();
    await two.callMethod("click");
    await page.waitForChanges();

    expect(one).not.toHaveAttribute("selected");
    expect(two).toHaveAttribute("selected");
    expect(two).not.toHaveAttribute("indeterminate");
    expect(childOne).toHaveAttribute("selected");
    expect(childTwo).toHaveAttribute("selected");
    expect(grandchildOne).toHaveAttribute("selected");
    expect(grandchildTwo).toHaveAttribute("selected");
  });

  describe("item selection", () => {
    it("allows selecting items", async () => {
      const page = await newE2EPage({
        html: html`<calcite-tree selection-mode="ancestors">
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
          <calcite-tree-item disabled id="three"><span>Three</span></calcite-tree-item>
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

      await page.click("#three");
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
      expect(selectEventSpy).toHaveReceivedEventTimes(1);
    });

    it("does not emit calciteTreeSelect on toggling the caret icon", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tree selection-mode="multichildren">
          <calcite-tree-item id="cables">
            Cables
            <calcite-tree slot="children">
              <calcite-tree-item id="xlr">XLR Cable</calcite-tree-item>
              <calcite-tree-item id="instrument">Instrument Cable</calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>
        </calcite-tree>
      `);
      const treeItemIcon = await page.find(`#cables >>> [data-test-id="icon"]`);
      await treeItemIcon.click();

      const changeSpy = await treeItemIcon.spyOnEvent("calciteTreeSelect");
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(0);
    });

    describe("has selected items in the selection event payload", () => {
      it("contains current selection when selection=multiple", async () => {
        const page = await newE2EPage({
          html: html` <calcite-tree selection-mode="multiple">
            <calcite-tree-item id="1">1</calcite-tree-item>
            <calcite-tree-item id="2">2</calcite-tree-item>
          </calcite-tree>`
        });

        const tree = await page.find("calcite-tree");

        const [item1, item2] = await page.findAll("calcite-tree-item");

        await item1.click();

        expect(await tree.getProperty("selectedItems")).toHaveLength(1);

        await item2.click();

        expect(await tree.getProperty("selectedItems")).toHaveLength(2);

        await item2.click();

        expect(await tree.getProperty("selectedItems")).toHaveLength(1);

        await item1.click();

        expect(await tree.getProperty("selectedItems")).toEqual([]);
      });

      it("contains current selection when selection=multichildren", async () => {
        const page = await newE2EPage();
        await page.setContent(
          html`<calcite-tree lines selection-mode="multichildren" scale="s">
            <calcite-tree-item id="1"> Child 1 </calcite-tree-item>
            <calcite-tree-item id="2">
              Child 2
              <calcite-tree slot="children">
                <calcite-tree-item id="3" disabled> Grandchild 1 </calcite-tree-item>
                <calcite-tree-item id="4"> Grandchild 2 </calcite-tree-item>
              </calcite-tree>
            </calcite-tree-item>
          </calcite-tree>`
        );

        const tree = await page.find("calcite-tree");

        const [item1, item2, item3, item4] = await page.findAll("calcite-tree-item");

        await item1.click();

        expect(await tree.getProperty("selectedItems")).toHaveLength(1);

        await item2.click();

        expect(await tree.getProperty("selectedItems")).toHaveLength(3);

        await item3.click();

        expect(await tree.getProperty("selectedItems")).toHaveLength(3);

        await item4.click();

        expect(await tree.getProperty("selectedItems")).toHaveLength(2);
      });
    });

    it("emits once when the tree item checkbox label is clicked", async () => {
      const page = await newE2EPage({
        html: html`<calcite-tree selection-mode="ancestors">
          <calcite-tree-item>1</calcite-tree-item>
        </calcite-tree>`
      });

      const tree = await page.find("calcite-tree");
      const selectEventSpy = await tree.spyOnEvent("calciteTreeSelect");
      const treeItemCheckboxLabel = await page.find(`calcite-tree-item >>> .${CSS.checkboxLabel}`);

      await treeItemCheckboxLabel.click();
      expect(selectEventSpy).toHaveReceivedEventTimes(1);

      await treeItemCheckboxLabel.click();
      expect(selectEventSpy).toHaveReceivedEventTimes(2);
    });

    describe(`when tree-item selection-mode is "ancestors"`, () => {
      it("should render checkbox inputs", async () => {
        const page = await newE2EPage({
          html: `
          <calcite-tree selection-mode="ancestors">
            <calcite-tree-item>1</calcite-tree-item>
            <calcite-tree-item>2</calcite-tree-item>
          </calcite-tree>
          `
        });
        const checkbox = await page.find(
          `calcite-tree-item >>> .${CSS.nodeContainer} .${CSS.checkboxLabel} .${CSS.checkbox}`
        );
        expect(checkbox).not.toBeNull();
      });
    });

    describe(`when tree-item selection-mode is "none"`, () => {
      it("allows selecting items without a selection", async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <calcite-tree selection-mode="none">
            <calcite-tree-item id="1">1</calcite-tree-item>
            <calcite-tree-item id="2">2</calcite-tree-item>
          </calcite-tree>
        `);

        const tree = await page.find(`calcite-tree`);
        const selectEventSpy = await tree.spyOnEvent("calciteTreeSelect");
        const [item1, item2] = await page.findAll(`calcite-tree-item`);

        await item1.click();
        expect(selectEventSpy).toHaveReceivedEventTimes(1);
        expect(await tree.getProperty("selectedItems")).toHaveLength(1);
        expect(await page.findAll("calcite-tree-item[selected]")).toHaveLength(0);

        await item2.click();
        expect(selectEventSpy).toHaveReceivedEventTimes(2);
        expect(await tree.getProperty("selectedItems")).toHaveLength(1);
        expect(await page.findAll("calcite-tree-item[selected]")).toHaveLength(0);
      });
    });
  });

  describe("keyboard support", () => {
    it("should allow spacebar keydown events to propagate outside the root tree", async () => {
      const page = await newE2EPage({
        html: html`<div id="container">
          <calcite-tree id="root">
            <calcite-tree-item id="one" expanded>
              <span>One</span>
              <calcite-tree slot="children">
                <calcite-tree-item id="child-one" expanded>
                  <span>Child 1</span>
                  <calcite-tree slot="children">
                    <calcite-tree-item id="grandchild-one">
                      <span>Grandchild 1</span>
                    </calcite-tree-item>
                  </calcite-tree>
                </calcite-tree-item>
              </calcite-tree>
            </calcite-tree-item>
          </calcite-tree>
        </div>`
      });

      const container = await page.find("#container");
      const grandchild = await page.find("#grandchild-one");
      const keydownSpy = await container.spyOnEvent("keydown");

      expect(keydownSpy).toHaveReceivedEventTimes(0);

      await grandchild.focus();
      await page.keyboard.press("Space");

      expect(keydownSpy).toHaveReceivedEventTimes(1);
    });

    it("should allow enter keydown events to propagate outside the root tree", async () => {
      const page = await newE2EPage({
        html: html`<div id="container">
          <calcite-tree id="root">
            <calcite-tree-item id="one" expanded>
              <span>One</span>
              <calcite-tree slot="children">
                <calcite-tree-item id="child-one" expanded>
                  <span>Child 1</span>
                  <calcite-tree slot="children">
                    <calcite-tree-item id="grandchild-one">
                      <span>Grandchild 1</span>
                    </calcite-tree-item>
                  </calcite-tree>
                </calcite-tree-item>
              </calcite-tree>
            </calcite-tree-item>
          </calcite-tree>
        </div>`
      });

      const container = await page.find("#container");
      const grandchild = await page.find("#grandchild-one");
      const keydownSpy = await container.spyOnEvent("keydown");

      expect(keydownSpy).toHaveReceivedEventTimes(0);

      await grandchild.focus();
      await page.keyboard.press("Enter");

      expect(keydownSpy).toHaveReceivedEventTimes(1);
    });

    it.skip("should allow ArrowRight and ArrowLeft keydown events to propagate outside the root tree", async () => {
      const page = await newE2EPage({
        html: html`<div id="container">
          <calcite-tree id="root">
            <calcite-tree-item id="one">
              <span>One</span>
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
          </calcite-tree>
        </div>`
      });

      const container = await page.find("#container");
      const one = await page.find("#one");
      const keydownSpy = await container.spyOnEvent("keydown");

      expect(keydownSpy).toHaveReceivedEventTimes(0);

      await one.focus();
      await page.keyboard.press("ArrowRight");

      expect(keydownSpy).toHaveReceivedEventTimes(1);

      await page.keyboard.press("ArrowRight");

      expect(keydownSpy).toHaveReceivedEventTimes(2);

      await page.keyboard.press("ArrowRight");

      expect(keydownSpy).toHaveReceivedEventTimes(3);

      await page.keyboard.press("ArrowLeft");

      expect(keydownSpy).toHaveReceivedEventTimes(4);

      await page.keyboard.press("ArrowLeft");

      expect(keydownSpy).toHaveReceivedEventTimes(5);

      await page.keyboard.press("ArrowLeft");

      expect(keydownSpy).toHaveReceivedEventTimes(6);
    });

    async function getActiveElementId(page: E2EPage): Promise<string> {
      return page.evaluate(() => document.activeElement.id);
    }

    it("ArrowRight and ArrowLeft keys expand and collapse nested trees", async () => {
      const parent = "parent";
      const child = "child";
      const grandchild = "grandchild";

      const page = await newE2EPage({
        html: html`<div id="container">
          <calcite-tree id="root">
            <calcite-tree-item id=${parent}>
              <span>Parent</span>
              <calcite-tree slot="children">
                <calcite-tree-item id=${child}>
                  <span>Child</span>
                  <calcite-tree slot="children">
                    <calcite-tree-item id=${grandchild}>
                      <span>Grandchild</span>
                    </calcite-tree-item>
                  </calcite-tree>
                </calcite-tree-item>
              </calcite-tree>
            </calcite-tree-item>
          </calcite-tree>
        </div>`
      });

      const parentEl = await page.find(`#${parent}`);
      const childEl = await page.find(`#${child}`);

      expect(await parentEl.getProperty("expanded")).toBe(false);
      expect(await childEl.getProperty("expanded")).toBe(false);

      await parentEl.focus();
      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual(parent);
      expect(await parentEl.getProperty("expanded")).toBe(true);
      expect(await childEl.getProperty("expanded")).toBe(false);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual(child);
      expect(await parentEl.getProperty("expanded")).toBe(true);
      expect(await childEl.getProperty("expanded")).toBe(false);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual(child);
      expect(await parentEl.getProperty("expanded")).toBe(true);
      expect(await childEl.getProperty("expanded")).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual(grandchild);
      expect(await parentEl.getProperty("expanded")).toBe(true);
      expect(await childEl.getProperty("expanded")).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual(grandchild);
      expect(await parentEl.getProperty("expanded")).toBe(true);
      expect(await childEl.getProperty("expanded")).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual(grandchild);
      expect(await parentEl.getProperty("expanded")).toBe(true);
      expect(await childEl.getProperty("expanded")).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual(child);
      expect(await parentEl.getProperty("expanded")).toBe(true);
      expect(await childEl.getProperty("expanded")).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual(child);
      expect(await parentEl.getProperty("expanded")).toBe(true);
      expect(await childEl.getProperty("expanded")).toBe(false);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual(parent);
      expect(await parentEl.getProperty("expanded")).toBe(true);
      expect(await childEl.getProperty("expanded")).toBe(false);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual(parent);
      expect(await parentEl.getProperty("expanded")).toBe(false);
      expect(await childEl.getProperty("expanded")).toBe(false);
    });

    it("ArrowUp and ArrowDown keys move focus between adjacent tree items at all 3 levels of depth and allow keydown events to propagate outside the tree root", async () => {
      const page = await newE2EPage({
        html: html`<div id="container">
          <calcite-tree id="root">
            <calcite-tree-item id="root-item-1">
              <span>Root Item 1</span>
            </calcite-tree-item>
            <calcite-tree-item id="parent" expanded>
              <span>Parent</span>
              <calcite-tree slot="children">
                <calcite-tree-item id="child">
                  <span>Child</span>
                </calcite-tree-item>
                <calcite-tree-item id="child2" expanded>
                  <span>Child 2</span>
                  <calcite-tree slot="children">
                    <calcite-tree-item id="grandchild">
                      <span>Grandchild</span>
                    </calcite-tree-item>
                    <calcite-tree-item id="grandchild2">
                      <span>Grandchild 2</span>
                    </calcite-tree-item>
                  </calcite-tree>
                </calcite-tree-item>
                <calcite-tree-item id="child3">
                  <span>Child 3</span>
                </calcite-tree-item>
              </calcite-tree>
            </calcite-tree-item>
            <calcite-tree-item id="root-item-3">
              <span>Root Item 3</span>
            </calcite-tree-item>
          </calcite-tree>
        </div>`
      });

      const container = await page.find("#container");
      const root = await page.find("#root");
      const keydownSpy = await container.spyOnEvent("keydown");

      expect(keydownSpy).toHaveReceivedEventTimes(0);

      await root.focus();
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("root-item-1");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("parent");
      expect(keydownSpy).toHaveReceivedEventTimes(1);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("child");
      expect(keydownSpy).toHaveReceivedEventTimes(2);

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("child2");
      expect(keydownSpy).toHaveReceivedEventTimes(3);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("grandchild");
      expect(keydownSpy).toHaveReceivedEventTimes(4);

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("grandchild2");
      expect(keydownSpy).toHaveReceivedEventTimes(5);

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("grandchild");
      expect(keydownSpy).toHaveReceivedEventTimes(6);

      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("child3");
      expect(keydownSpy).toHaveReceivedEventTimes(8);

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("child2");
      expect(keydownSpy).toHaveReceivedEventTimes(9);

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("child");
      expect(keydownSpy).toHaveReceivedEventTimes(10);

      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("root-item-3");
      expect(keydownSpy).toHaveReceivedEventTimes(12);

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("parent");
      expect(keydownSpy).toHaveReceivedEventTimes(13);

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("root-item-1");
      expect(keydownSpy).toHaveReceivedEventTimes(14);
    });

    it("does prevent space/enter keyboard event on actions with selectionMode of single", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<div id="container">
        <calcite-tree selection-mode="single">
          <calcite-tree-item>
            <button>My button</button>
          </calcite-tree-item>
        </calcite-tree>
      </div>`);

      const container = await page.find("#container");
      const button = await page.find("button");
      const keydownSpy = await container.spyOnEvent("keydown");

      expect(keydownSpy).toHaveReceivedEventTimes(0);

      await button.focus();
      await page.keyboard.press("Enter");

      expect(keydownSpy).toHaveReceivedEventTimes(1);
      expect(keydownSpy.lastEvent.defaultPrevented).toBe(true);

      await page.keyboard.press("Space");

      expect(keydownSpy).toHaveReceivedEventTimes(2);
      expect(keydownSpy.lastEvent.defaultPrevented).toBe(true);
    });

    it("does not prevent space/enter keyboard event on actions with selectionMode of none", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<div id="container">
        <calcite-tree selection-mode="none">
          <calcite-tree-item>
            <button>My button</button>
          </calcite-tree-item>
        </calcite-tree>
      </div>`);

      const container = await page.find("#container");
      const button = await page.find("button");
      const keydownSpy = await container.spyOnEvent("keydown");

      expect(keydownSpy).toHaveReceivedEventTimes(0);

      await button.focus();
      await page.keyboard.press("Enter");

      expect(keydownSpy).toHaveReceivedEventTimes(1);
      expect(keydownSpy.lastEvent.defaultPrevented).toBe(false);

      await page.keyboard.press("Space");

      expect(keydownSpy).toHaveReceivedEventTimes(2);
      expect(keydownSpy.lastEvent.defaultPrevented).toBe(false);
    });

    it("honors disabled items when navigating the tree", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-tree selection-mode="ancestors" id="root">
          <calcite-tree-item id="child-1">
            <span>Child 1</span>
          </calcite-tree-item>

          <calcite-tree-item id="child-2" disabled>
            <span>Child 2</span>
          </calcite-tree-item>

          <calcite-tree-item id="child-3">
            <span>Child 3</span>

            <calcite-tree slot="children">
              <calcite-tree-item disabled id="grandchild-1">
                <span>Grandchild 1</span>
              </calcite-tree-item>

              <calcite-tree-item id="grandchild-2">
                <span>Grandchild 2</span>

                <calcite-tree slot="children">
                  <calcite-tree-item id="great-grandchild-1">
                    <span>Great Grandchild 1</span>
                  </calcite-tree-item>

                  <calcite-tree-item id="great-grandchild-2" disabled>
                    <span>Great Grandchild 2</span>
                  </calcite-tree-item>

                  <calcite-tree-item id="great-grandchild-3">
                    <span>Great Grandchild 3</span>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>

              <calcite-tree-item id="grandchild-3">
                <span>Grandchild 3</span>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>

          <calcite-tree-item id="child-4">
            <span>Child 4</span>
          </calcite-tree-item>
        </calcite-tree>`
      );

      await page.click("#child-1");

      expect(await getActiveElementId(page)).toEqual("child-1");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("child-3");

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("grandchild-2");

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("great-grandchild-1");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("great-grandchild-3");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("great-grandchild-1");

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("grandchild-2");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("grandchild-2");

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("child-3");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await getActiveElementId(page)).toEqual("child-1");
    });
  });

  describe("not throwing if tree doesn't have a parent element on initial render (#5333)", () => {
    let consoleSpy: SpyInstance;

    beforeAll(() => (consoleSpy = jest.spyOn(console, "error")));

    afterAll(() => consoleSpy.mockRestore());

    it("does not throw when tree is the topmost element in a shadow root", async () => {
      const page = await newE2EPage();
      await page.setContent("<test-tree-element></test-tree-element>");

      await page.evaluate(async (): Promise<void> => {
        customElements.define(
          "test-tree-element",
          class extends HTMLElement {
            constructor() {
              super();

              const shadow = this.attachShadow({ mode: "open" });
              shadow.innerHTML = `<calcite-tree>
                  <calcite-tree-item>Child</calcite-tree-item>
                </calcite-tree>`;
            }
          }
        );
      });
      await page.waitForChanges();

      // Stencil swallows the expected error, so we assert on the error message instead
      expect(consoleSpy).toHaveBeenCalledTimes(0);
    });
  });
});
