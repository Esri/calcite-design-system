import { h } from "@arcgis/lumina";
import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import type { Tabs } from "./tabs";

/**
 * ⚠️Do not add tests to this file ⚠️
 * This test needs to run in its own iframe to ensure lazy loading remains part of the test setup.
 */
it("does not throw when adding tab and tab-title with tab ID after initialization", async () => {
  let unhandledRejection: unknown;

  function handleUnhandledRejection(event: PromiseRejectionEvent): void {
    event.preventDefault();
    unhandledRejection = event.reason;
  }

  window.addEventListener("unhandledrejection", handleUnhandledRejection);

  const { el: tabsEl } = await mount<Tabs>(
    <calcite-tabs>
      <calcite-tab-nav id="tab-nav" slot="title-group" />
    </calcite-tabs>,
  );

  const tabNavEl = tabsEl.querySelector("#tab-nav")!;
  const tabTitle = document.createElement("calcite-tab-title");
  const tab = document.createElement("calcite-tab");

  tabTitle.tab = "test";
  tab.tab = "test";

  try {
    tabNavEl.append(tabTitle);
    tabsEl.append(tab);

    await tabTitle.componentOnReady();
    await tab.componentOnReady();

    expect(unhandledRejection).toBeUndefined();
  } finally {
    window.removeEventListener("unhandledrejection", handleUnhandledRejection);
  }
});
