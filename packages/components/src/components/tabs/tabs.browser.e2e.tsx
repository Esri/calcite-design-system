import { Fragment, h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { JsxNode } from "@arcgis/lumina";
import { page, userEvent } from "vitest/browser";
import { accessible, defaults, reflects, hidden, renders, themed } from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { afterNextFrame } from "../../tests/utils/timing";
import type { TabTitle } from "../tab-title/tab-title";
import type { Tab } from "../tab/tab";
import type { Tabs } from "./tabs";
import { CSS } from "./resources";

mockConsole("error");

async function closeTitleById(
  component: { updateComplete: Promise<unknown> },
  titleId?: string,
): Promise<void> {
  const closeButton = titleId
    ? page.getBySelector(`#${titleId}`).getByRole("button", { name: "Close" })
    : page.getByRole("button", { name: "Close" }).first();

  await userEvent.click(closeButton);
  await component.updateComplete;
}

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

describe("accessible", () => {
  accessible(() => mount(<calcite-tabs>{createTabsContent()}</calcite-tabs>));
});

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
      { propertyName: "bordered", value: true },
      { propertyName: "layout", value: "inline", reflect: false },
      { propertyName: "position", value: "top" },
      { propertyName: "scale", value: "m" },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-tabs"));
});

describe("renders", () => {
  renders(() => mount(<calcite-tabs>{createTabsContent()}</calcite-tabs>), { display: "flex" });
});

describe("closing tabs", () => {
  async function setupClosableTabs() {
    const { el: tabsEl, component } = await mount<Tabs>(
      <calcite-tabs last-tab-closable>
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

    return { tabsEl, component };
  }

  it("renders no tab-nav UI after dismissing the last closable tab", async () => {
    const { tabsEl, component } = await setupClosableTabs();

    for (let i = 1; i <= 4; i++) {
      await closeTitleById(component);
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
      await closeTitleById(component);
    }

    const reopenedTitle = tabsEl.querySelector<TabTitle["el"]>("#tab-title-4")!;

    expect(reopenedTitle).not.toBeNull();

    reopenedTitle.closed = false;
    await component.updateComplete;

    const reopenedTab = tabsEl.querySelector<Tab["el"]>("#tab-4")!;

    expect(reopenedTab).not.toBeNull();

    await expect.element(reopenedTitle).toHaveProperty("closed", false);
    await expect.element(reopenedTitle).toHaveProperty("hidden", false);
    await expect.element(reopenedTab).toHaveProperty("hidden", false);
    await expect.element(reopenedTab).toHaveProperty("selected", true);
    await expect.element(reopenedTitle).toHaveProperty("tabIndex", 0);
  });

  it("removes the close button again when lastTabClosable is set back to false", async () => {
    const { tabsEl, component } = await setupClosableTabs();
    const closeButtons = page.getByRole("button", { name: "Close" }).first();
    tabsEl.lastTabClosable = true;
    await component.updateComplete;
    await afterNextFrame();
    await expect.element(tabsEl).toHaveProperty("lastTabClosable", true);

    for (let i = 1; i <= 3; i++) {
      await closeTitleById(component);
    }

    const lastVisibleTitle = tabsEl.querySelector<TabTitle["el"]>("#tab-title-4")!;

    expect(lastVisibleTitle).not.toBeNull();

    await expect.element(lastVisibleTitle).toHaveProperty("closable", true);
    expect(closeButtons).toHaveLength(1);

    tabsEl.lastTabClosable = false;
    await component.updateComplete;
    await afterNextFrame();
    await expect.element(tabsEl).toHaveProperty("lastTabClosable", false);
    await expect.element(lastVisibleTitle).toHaveProperty("closable", false);
    expect(closeButtons).toHaveLength(0);
  });

  it("restores the lone tab's close button when another tab is reopened", async () => {
    const { tabsEl, component } = await setupClosableTabs();

    tabsEl.lastTabClosable = false;
    await component.updateComplete;

    for (let i = 1; i <= 3; i++) {
      await closeTitleById(component);
    }

    const loneTitle = tabsEl.querySelector<TabTitle["el"]>("#tab-title-4")!;
    const reopenedTitle = tabsEl.querySelector<TabTitle["el"]>("#tab-title-3")!;

    await expect.element(loneTitle).toHaveProperty("closable", false);

    reopenedTitle.closed = false;
    await component.updateComplete;
    await afterNextFrame();

    await expect.element(loneTitle).toHaveProperty("closable", true);
  });
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-tabs"), {
      "--calcite-tab-border-color": {
        shadowSelector: `.${CSS.section}`,
        targetProp: "borderBlockStartColor",
      },
      "--calcite-tab-background-color": {
        targetProp: "backgroundColor",
      },
    });
  });

  describe("bordered", () => {
    themed(() => mount(<calcite-tabs bordered />), {
      "--calcite-tab-background-color": {
        targetProp: "backgroundColor",
      },
      "--calcite-tab-border-color": [
        {
          targetProp: "boxShadow",
        },
        {
          shadowSelector: `.${CSS.section}`,
          targetProp: "borderColor",
        },
      ],
    });

    describe("bottom position", () => {
      themed(() => mount(<calcite-tabs bordered position="bottom" />), {
        "--calcite-tab-border-color": {
          targetProp: "boxShadow",
        },
      });
    });
  });
});
