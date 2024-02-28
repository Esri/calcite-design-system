import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, disabled, hidden, renders, slots } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { SLOTS } from "./resources";

describe("calcite-tree-item", () => {
  describe("renders", () => {
    renders("calcite-tree-item", { visible: false, display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden(`<calcite-tree-item expanded></calcite-tree-item>`);
  });

  describe("accessible", () => {
    accessible(`<calcite-tree-item></calcite-tree-item>`);
  });

  describe("accessible: with nested children", () => {
    accessible(
      html`<calcite-tree lines>
        <calcite-tree-item>
          <a href="#">Child 2</a>
          <calcite-tree slot="children">
            <calcite-tree-item>
              <a href="http://www.esri.com">Grandchild 1</a>
            </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>`,
    );
  });

  describe("defaults", () => {
    defaults("calcite-tree-item", [
      {
        propertyName: "selected",
        defaultValue: false,
      },
      {
        propertyName: "expanded",
        defaultValue: false,
      },
      {
        propertyName: "parentExpanded",
        defaultValue: false,
      },
      {
        propertyName: "depth",
        defaultValue: 0,
      },
      {
        propertyName: "hasChildren",
        defaultValue: false,
      },
      {
        propertyName: "indeterminate",
        defaultValue: false,
      },
    ]);
  });

  describe("slots", () => {
    slots("calcite-tree-item", SLOTS);
  });

  describe("disabled within a tree", () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(html`
        <calcite-tree expanded>
          <calcite-tree-item>😃</calcite-tree-item>
        </calcite-tree>
      `);
      await page.waitForChanges();
    });

    disabled(() => ({ tag: "calcite-tree-item", page }));
  });

  it("should expand/collapse children when the icon is clicked, but not select/deselect group", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-tree lines id="parentTree" selection-mode="ancestors">
        <calcite-tree-item id="firstItem">
          <a href="#">Child 2</a>

          <calcite-tree slot="children">
            <calcite-tree-item>
              <a href="http://www.esri.com">Grandchild 1</a>
            </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    `);

    const item = await page.find("calcite-tree-item");
    expect(item).not.toHaveAttribute("checked");

    const icon = await page.find('#firstItem >>> [data-test-id="icon"]');
    await icon.click();

    const childContainer = await page.find('#firstItem >>> [data-test-id="calcite-tree-children"]');
    const isVisible = await childContainer.isVisible();
    expect(isVisible).toBe(true);
    expect(item).not.toHaveAttribute("checked");
  });

  it("should allow starting expanded", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tree lines id="parentTree">
      <calcite-tree-item id="firstItem" expanded>
        <a href="#">Child 2</a>

        <calcite-tree slot="children">
          <calcite-tree-item>
            <a href="#" id="childLink">Grandchild 1</a>
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>`);

    const child = await page.find("#childLink");
    const isVisible = await child.isVisible();
    expect(isVisible).toBe(true);
  });

  it("should navigate when the link inside the tree item is clicked", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tree lines id="parentTree">
      <calcite-tree-item id="firstItem">
        <a href="#">Child 1</a>
      </calcite-tree-item>
    </calcite-tree>`);

    const anchor = await page.find("#firstItem a");
    await anchor.click();

    await page.waitForChanges();
    expect(page.url()).toContain("#");
  });

  it("should navigate to the link url when the item but not the link is clicked", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tree lines id="parentTree">
      <calcite-tree-item id="firstItem">
        <a href="#">Child 1</a>
      </calcite-tree-item>
    </calcite-tree>`);

    const item = await page.find("#firstItem");
    await item.click();

    await page.waitForChanges();
    expect(page.url()).toContain("#");
  });

  it("should navigate to the inner link when a child item is clicked and not the outer link", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tree lines id="parentTree">
      <calcite-tree-item expanded>
        <a href="#outer">Child 2</a>

        <calcite-tree slot="children">
          <calcite-tree-item id="secondItem">
            <a href="#inner">Grandchild 1</a>
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>`);

    await page.waitForChanges();

    const hash = await page.evaluate(() => {
      const item = document.getElementById("secondItem");
      item.click();
      return window.location.hash;
    });

    expect(hash).toEqual("#inner");
  });

  describe("when a tree-item has ancestors selection-mode and is selected", () => {
    it("should update its ancestor tree-items' indeterminate properties (ancestors are indeterminate)", async () => {
      const tree = html`
        <calcite-tree selection-mode="ancestors">
          <calcite-tree-item expanded data-id="ancestor">
            <span>Fruits</span>
            <calcite-tree slot="children">
              <calcite-tree-item>
                <calcite-link href="#go" tabindex="-1">Bananas</calcite-link>
              </calcite-tree-item>
              <calcite-tree-item expanded data-id="ancestor">
                <span>Pears</span>
                <calcite-tree slot="children">
                  <calcite-tree-item selected>
                    <calcite-link href="#go" tabindex="-1">Anjou</calcite-link>
                  </calcite-tree-item>
                  <calcite-tree-item>
                    <calcite-link href="#go" tabindex="-1">Bartlett</calcite-link>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>
        </calcite-tree>
      `;
      const page = await newE2EPage();
      await page.setContent(tree);
      await page.waitForChanges();
      const ancestors = await page.findAll(`calcite-tree-item[data-id="ancestor"]`);

      for (const node of ancestors) {
        expect(await node.getProperty("indeterminate")).toBe(true);
        expect(await node.getProperty("selected")).toBe(false);
      }
    });

    it("should update its ancestor tree-items' indeterminate properties (ancestors are selected)", async () => {
      const tree = html`
        <calcite-tree selection-mode="ancestors">
          <calcite-tree-item expanded data-id="ancestor">
            <span>Fruits</span>
            <calcite-tree slot="children">
              <calcite-tree-item>
                <calcite-link href="#go" tabindex="-1">Bananas</calcite-link>
              </calcite-tree-item>
              <calcite-tree-item expanded data-id="ancestor">
                <span>Pears</span>
                <calcite-tree slot="children">
                  <calcite-tree-item selected>
                    <calcite-link href="#go" tabindex="-1">Anjou</calcite-link>
                  </calcite-tree-item>
                  <calcite-tree-item selected>
                    <calcite-link href="#go" tabindex="-1">Bartlett</calcite-link>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>
        </calcite-tree>
      `;
      const page = await newE2EPage();
      await page.setContent(tree);
      await page.waitForChanges();
      const [indeterminateAncestor, selectedAncestor] = await page.findAll(`calcite-tree-item[data-id="ancestor"]`);

      expect(await indeterminateAncestor.getProperty("indeterminate")).toBe(true);
      expect(await indeterminateAncestor.getProperty("selected")).toBe(false);

      expect(await selectedAncestor.getProperty("indeterminate")).toBe(false);
      expect(await selectedAncestor.getProperty("selected")).toBe(true);
    });
  });

  describe("when a parent tree-item is expanded and a new item is appended into it", () => {
    it("should render the visible, keyboard navigable item", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-panel>
        <calcite-button id='add-item-btn'>Add item to tree</calcite-button>
        <calcite-tree>
          <calcite-tree-item expanded><span>Element 1</span>
            <calcite-tree slot='children' id='target-tree'>
              <calcite-tree-item>Child 1</calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>
          <calcite-tree-item>Element 2</calcite-tree-item>
        </calcite-tree>
      </calcite-panel>`);
      await page.evaluate(() => {
        const tree = document.querySelector("#target-tree");
        document.querySelector("#add-item-btn").addEventListener("click", () => {
          const newItem = document.createElement("calcite-tree-item");
          newItem.id = "newbie";
          newItem.appendChild(document.createTextNode("Child 2"));
          tree.appendChild(newItem);
        });
      });
      const btn = await page.find("calcite-button");
      await btn.click();

      const item = await page.find("#newbie");
      expect(item).toEqualAttribute("aria-hidden", "false");
      expect(item.tabIndex).toBe(0);
    });
  });

  it("clicking on node-container, label, or checkbox selects/deselects, but does not expand/collapse children", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-tree selection-mode="ancestors" scale="m">
        <calcite-tree-item>
          <span>Child 1</span>

          <calcite-tree slot="children">
            <calcite-tree-item>
              <span>Grandchild 1</span>
              <calcite-tree slot="children">
                <calcite-tree-item>
                  <span>Great Grandchild 1</span>
                </calcite-tree-item>
                <calcite-tree-item>
                  <span>Great Grandchild 2</span>
                </calcite-tree-item>
                <calcite-tree-item>
                  <span>Great Grandchild 3</span>
                </calcite-tree-item>
              </calcite-tree>
            </calcite-tree-item>
            <calcite-tree-item>
              <span>Grandchild 2</span>
            </calcite-tree-item>
            <calcite-tree-item>
              <span>Grandchild 3</span>
            </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>

        <calcite-tree-item>
          <span>Child 2</span>
        </calcite-tree-item>
        <calcite-tree-item>
          <span>Child 3</span>
        </calcite-tree-item>
      </calcite-tree>
    `);
    const container = await page.find("calcite-tree-item >>> .node-container");
    const label = await container.find("label");
    const checkbox = await label.find("calcite-checkbox");

    const icon = await container.find(`[data-test-id="icon"]`);
    await icon.click();

    const childContainer = await page.find(`calcite-tree-item >>> [data-test-id="calcite-tree-children"]`);
    const isVisible = await childContainer.isVisible();
    expect(isVisible).toBe(true);

    await container.click();
    expect(checkbox).toHaveAttribute("checked");
    expect(isVisible).toBe(true);
    await container.click();
    expect(checkbox).not.toHaveAttribute("checked");
    expect(isVisible).toBe(true);

    await label.click();
    expect(checkbox).toHaveAttribute("checked");
    expect(isVisible).toBe(true);
    await label.click();
    expect(checkbox).not.toHaveAttribute("checked");
    expect(isVisible).toBe(true);

    await checkbox.click();
    expect(checkbox).toHaveAttribute("checked");
    expect(isVisible).toBe(true);
    await checkbox.click();
    expect(checkbox).not.toHaveAttribute("checked");
    expect(isVisible).toBe(true);
  });

  it("displaying an expanded item is visible", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-tree id="root" style="display:none;">
        <calcite-tree-item expanded
          >parent
          <calcite-tree slot="children">
            <calcite-tree-item id="child">child</calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    `);

    await page.$eval("#root", (root: HTMLCalciteTreeElement) => (root.style.display = ""));
    await page.waitForChanges();

    const item = await page.$("#child");
    const itemBounds = await item.boundingBox();

    expect(itemBounds.height).not.toBe(0);
  });
});
