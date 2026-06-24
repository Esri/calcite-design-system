import { h, Fragment } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { JsxNode } from "@arcgis/lumina";
import { defaults, reflects, hidden, renders } from "../../tests/commonTests/browser";
import type { TabTitle } from "../tab-title/tab-title";
import type { Tab } from "../tab/tab";
import type { Tabs } from "./tabs";

async function closeTitleById(tabsEl: Tabs["el"], tabTitleId: string): Promise<void> {
  const tabTitle = tabsEl.querySelector(`#${tabTitleId}`) as TabTitle["el"];
  tabTitle.closed = true;
}

describe("defaults", () => {
  defaults(
    () => mount("calcite-tabs"),
    [
      { propertyName: "layout", defaultValue: "inline" },
      { propertyName: "position", defaultValue: "top" },
      { propertyName: "scale", defaultValue: "m" },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-tabs"),
    [
      { propertyName: "layout", value: "inline" },
      { propertyName: "position", value: "top" },
      { propertyName: "scale", value: "m" },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-tabs"));
});

function createTabsContent(): JsxNode {
  return (
    <>
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title>Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>Tab 3 Title</calcite-tab-title>
        <calcite-tab-title>Tab 4 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab selected>Tab 1 Content</calcite-tab>
      <calcite-tab>Tab 2 Content</calcite-tab>
      <calcite-tab>Tab 3 Content</calcite-tab>
      <calcite-tab>Tab 4 Content</calcite-tab>
    </>
  );
}

describe("renders", () => {
  renders(() => mount(<calcite-tabs>{createTabsContent()}</calcite-tabs>), { display: "flex" });
});

describe("closing tabs", () => {
  async function setupClosableTabs() {
    const { el: tabsEl, component } = await mount<Tabs>(
      <calcite-tabs>
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title closable id="tab-title-1">
            Tab 1 Title
          </calcite-tab-title>
          <calcite-tab-title closable id="tab-title-2">
            Tab 2 Title
          </calcite-tab-title>
          <calcite-tab-title closable id="tab-title-3">
            Tab 3 Title
          </calcite-tab-title>
          <calcite-tab-title closable id="tab-title-4" selected>
            Tab 4 Title
          </calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab id="tab-1">Tab 1 Content</calcite-tab>
        <calcite-tab id="tab-2">Tab 2 Content</calcite-tab>
        <calcite-tab id="tab-3">Tab 3 Content</calcite-tab>
        <calcite-tab id="tab-4" selected>
          Tab 4 Content
        </calcite-tab>
      </calcite-tabs>,
    );

    tabsEl.lastTabClosable = true;
    await component.updateComplete;

    return { tabsEl, component };
  }

  it("renders no tab-nav UI after dismissing the last closable tab", async () => {
    const { tabsEl, component } = await setupClosableTabs();

    for (let i = 1; i <= 4; i++) {
      await closeTitleById(tabsEl, `tab-title-${i}`);
      await component.updateComplete;
    }

    const allTabTitles = Array.from<TabTitle["el"]>(tabsEl.querySelectorAll("calcite-tab-title"));
    const visibleTabTitles = allTabTitles.filter(
      (tabTitle) => !tabTitle.closed && !tabTitle.hidden,
    );

    expect(visibleTabTitles).toHaveLength(0);
  });

  it("re-adds the last closed tab and keeps it visible", async () => {
    const { tabsEl, component } = await setupClosableTabs();

    for (let i = 1; i <= 4; i++) {
      await closeTitleById(tabsEl, `tab-title-${i}`);
      await component.updateComplete;
    }

    const reopenedTitle = tabsEl.querySelector("#tab-title-4") as TabTitle["el"];
    reopenedTitle.closed = false;
    await component.updateComplete;

    const reopenedTab = tabsEl.querySelector("#tab-4") as Tab["el"];

    expect(reopenedTitle.closed).toBe(false);
    expect(reopenedTitle.hidden).toBe(false);
    expect(reopenedTab.selected).toBe(true);
  });
});
