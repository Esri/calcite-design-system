import { h, Fragment } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { JsxNode } from "@arcgis/lumina";
import { defaults, reflects, hidden, renders } from "../../tests/commonTests/browser";
import type { Tabs } from "./tabs";

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

it("does not throw when adding tab and tab-title with tab ID after initialization", async () => {
  async function runTest(): Promise<void> {
    const { el: tabsEl, reRender } = await mount<Tabs>(
      <calcite-tabs>
        <calcite-tab-nav id="tab-nav" slot="title-group" />
      </calcite-tabs>,
    );

    const tabNavEl = tabsEl.querySelector("#tab-nav")!;
    const tabTitle = document.createElement("calcite-tab-title");
    const tab = document.createElement("calcite-tab");
    tabTitle.tab = "test";
    tab.tab = "test";

    tabNavEl.append(tabTitle);
    tabsEl.append(tab);

    await reRender();
  }

  await expect(runTest()).resolves.toBeUndefined();
});
