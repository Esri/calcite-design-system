import { describe, expect, it, vi } from "vitest";
import { Fragment, h } from "@arcgis/lumina";
import { page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { commands } from "../../tests/utils/commands";

import {
  defaults,
  focusable,
  focusTrap,
  hidden,
  openClose,
  reflects,
  renders,
  topLayer,
  accessible,
  themed,
} from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { Dir } from "../types";
import { CSS, IDS } from "./resources";
import { Sheet } from "./sheet";
import { waitForEvent } from "../../tests/common/utils";

mockConsole();

describe("accessible", () => {
  describe("default", () => {
    accessible(async () => {
      const openEvent = waitForEvent(document.body, "calciteSheetOpen");
      const renderResult = await mount(
        <calcite-sheet label="hello world" open>
          Hello everyone!
        </calcite-sheet>,
      );
      await openEvent;
      return renderResult;
    });
  });

  describe("with content", () => {
    accessible(async () => {
      const openEvent = waitForEvent(document, "calciteSheetOpen");
      const renderResult = await mount(
        <calcite-sheet label="hello world" open>
          <calcite-panel closable heading="Ultrices neque" slot="custom-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <calcite-button appearance="outline" slot="footer" width="half">
              tincidunt lobortis
            </calcite-button>
            <calcite-button appearance="outline" slot="footer" width="half">
              amet porttitor
            </calcite-button>
          </calcite-panel>
        </calcite-sheet>,
      );
      await openEvent;
      return renderResult;
    });
  });

  describe("with modalDisabled", () => {
    accessible(async () => {
      const openEvent = waitForEvent(document, "calciteSheetOpen");
      const renderResult = await mount(
        <>
          <calcite-sheet label="Non-modal sheet" modalDisabled open>
            <button type="button">inside</button>
          </calcite-sheet>
          <button type="button">outside</button>
        </>,
      );
      await openEvent;
      return renderResult;
    });
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-sheet"),
    [
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "collapseDirection",
        defaultValue: "down",
      },
      {
        propertyName: "collapsed",
        defaultValue: false,
      },
      {
        propertyName: "collapsible",
        defaultValue: false,
      },
      {
        propertyName: "menuFlipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "menuPlacement",
        defaultValue: "bottom-end",
      },
      {
        propertyName: "topLayerDisabled",
        defaultValue: false,
      },
      {
        propertyName: "embedded",
        defaultValue: false,
      },
      {
        propertyName: "displayMode",
        defaultValue: "overlay",
      },
      {
        propertyName: "focusTrapDisabled",
        defaultValue: false,
      },
      {
        propertyName: "modalDisabled",
        defaultValue: false,
      },
      {
        propertyName: "outsideCloseDisabled",
        defaultValue: false,
      },
      {
        propertyName: "position",
        defaultValue: "inline-start",
      },
      {
        propertyName: "escapeDisabled",
        defaultValue: false,
      },
      {
        propertyName: "opened",
        defaultValue: false,
      },
      {
        propertyName: "resizable",
        defaultValue: false,
      },
      {
        propertyName: "widthScale",
        defaultValue: "m",
      },
      {
        propertyName: "heightScale",
        defaultValue: "m",
      },
    ],
  );
});

describe("internal panel", () => {
  async function mountSheet(beforeClose: Sheet["beforeClose"]) {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    const renderResult = await mount<Sheet>(
      <calcite-sheet beforeClose={beforeClose} heading="Tools" open>
        <button type="button">Sheet content</button>
      </calcite-sheet>,
    );
    await openEvent;
    return renderResult;
  }

  it("scrolls internal panel content via scrollContentTo", async () => {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    const { el } = await mount<Sheet>(
      <calcite-sheet
        label="Sheet"
        open
        position="block-start"
        style="--calcite-sheet-height: 200px; --calcite-sheet-max-height: 200px"
      >
        <div style="block-size: 1000px; flex-shrink: 0">Scrollable content</div>
      </calcite-sheet>,
    );
    await openEvent;
    const content = page.getByText("Scrollable content", { exact: true }).element();
    const initialTop = content.getBoundingClientRect().top;

    await el.scrollContentTo({ behavior: "instant", top: 100 });

    await expect.poll(() => content.getBoundingClientRect().top).toBe(initialTop - 100);
  });

  it("accepts omitted scrollContentTo options", async () => {
    const { el } = await mountSheet(undefined);

    await expect(el.scrollContentTo()).resolves.toBeUndefined();
  });

  it("ignores collapse toggles from nested panels", async () => {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    const { el } = await mount<Sheet>(
      <calcite-sheet collapsible heading="Tools" label="Sheet" open>
        <calcite-panel collapsible heading="Nested panel" id="nested-panel">
          <button type="button">Nested content</button>
        </calcite-panel>
      </calcite-sheet>,
    );
    await openEvent;

    await userEvent.click(
      page.getBySelector("#nested-panel").getByRole("button", { name: "Collapse", exact: true }),
    );

    await expect
      .element(page.getByRole("button", { name: "Nested content", includeHidden: true }))
      .not.toBeVisible();
    expect(el.collapsed).toBe(false);
    expect(el.open).toBe(true);
  });

  it("syncs collapsed state when the internal panel is toggled", async () => {
    const { el } = await mountSheet(undefined);
    el.collapsible = true;
    const toggle = page.getByRole("button", { name: "Collapse", exact: true });
    const content = page.getByRole("button", { name: "Sheet content", includeHidden: true });

    await expect.element(content).toBeVisible();
    await userEvent.click(toggle);

    await expect.element(el).toHaveProperty("collapsed", true);
    await expect.element(content).not.toBeVisible();
    await expect.element(page.getByText("Tools", { exact: true })).toBeVisible();
    expect(el.open).toBe(true);

    await userEvent.click(toggle);

    await expect.element(el).toHaveProperty("collapsed", false);
    await expect.element(content).toBeVisible();
  });

  it("forwards collapseDirection updates to the internal panel", async () => {
    const { el } = await mountSheet(undefined);
    const panel = page.getBySelector("calcite-panel");

    el.collapseDirection = "up";

    await expect.element(panel).toHaveProperty("collapseDirection", "up");

    el.collapseDirection = "down";

    await expect.element(panel).toHaveProperty("collapseDirection", "down");
  });

  it("forwards collapsible updates to the internal panel", async () => {
    const { el } = await mountSheet(undefined);
    const toggle = page.getByRole("button", { name: "Collapse", exact: true });

    el.collapsible = true;

    await expect.element(toggle).toBeVisible();

    el.collapsible = false;

    await expect.element(toggle).not.toBeInTheDocument();
  });

  it("forwards collapsed updates to the internal panel", async () => {
    const { el } = await mountSheet(undefined);
    el.collapsible = true;
    const panel = page.getBySelector("calcite-panel");
    const content = page.getByRole("button", { name: "Sheet content", includeHidden: true });

    el.collapsed = true;

    await expect.element(panel).toHaveProperty("collapsed", true);
    await expect.element(content).not.toBeVisible();
    await expect.element(page.getByText("Tools", { exact: true })).toBeVisible();

    el.collapsed = false;

    await expect.element(panel).toHaveProperty("collapsed", false);
    await expect.element(content).toBeVisible();
  });

  it("forwards disabled updates to the internal panel", async () => {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    const { el } = await mount<Sheet>(
      <calcite-sheet disabled heading="Tools" label="Sheet" open>
        <button type="button">Sheet content</button>
      </calcite-sheet>,
    );
    await openEvent;
    const panel = page.getBySelector("calcite-panel");

    await expect.element(panel).toHaveProperty("disabled", true);

    el.disabled = false;

    await expect.element(panel).toHaveProperty("disabled", false);
  });

  it("forwards menuFlipPlacements updates to the internal panel", async () => {
    const { el } = await mountSheet(undefined);
    const panel = page.getBySelector("calcite-panel");

    el.menuFlipPlacements = ["top", "right"];

    await expect.element(panel).toHaveProperty("menuFlipPlacements", ["top", "right"]);

    el.menuFlipPlacements = ["bottom"];

    await expect.element(panel).toHaveProperty("menuFlipPlacements", ["bottom"]);

    el.menuFlipPlacements = undefined;

    await expect.element(panel).toHaveProperty("menuFlipPlacements", undefined);
  });

  it("forwards topLayerDisabled updates to the internal panel", async () => {
    const { el } = await mountSheet(undefined);
    const panel = page.getBySelector("calcite-panel");

    el.topLayerDisabled = true;

    await expect.element(panel).toHaveProperty("topLayerDisabled", true);

    el.topLayerDisabled = false;

    await expect.element(panel).toHaveProperty("topLayerDisabled", false);
  });

  it("forwards menuPlacement updates to the internal panel", async () => {
    const { el } = await mountSheet(undefined);
    const panel = page.getBySelector("calcite-panel");

    el.menuPlacement = "top-start";

    await expect.element(panel).toHaveProperty("menuPlacement", "top-start");

    el.menuPlacement = "right";

    await expect.element(panel).toHaveProperty("menuPlacement", "right");
  });

  it("closes through beforeClose and can be reopened", async () => {
    const beforeClose = vi.fn<NonNullable<Sheet["beforeClose"]>>().mockResolvedValue(undefined);
    const { component } = await mountSheet(beforeClose);
    const closeButton = page.getByRole("button", { name: "Close", exact: true });
    const content = page.getByRole("button", { name: "Sheet content", includeHidden: true });
    const closeEvent = waitForEvent(component.el, "calciteSheetClose");

    await closeButton.click();
    await closeEvent;

    expect(beforeClose).toHaveBeenCalledExactlyOnceWith(component.el);
    await expect.element(content).not.toBeVisible();

    const openEvent = waitForEvent(component.el, "calciteSheetOpen");
    component.el.open = true;
    await openEvent;
    await expect.element(content).toBeVisible();

    const secondCloseEvent = waitForEvent(component.el, "calciteSheetClose");
    await closeButton.click();
    await secondCloseEvent;

    expect(beforeClose).toHaveBeenCalledTimes(2);
    await expect.element(content).not.toBeVisible();
  });

  it("keeps content visible when beforeClose rejects a close button request", async () => {
    const beforeClose = vi
      .fn<NonNullable<Sheet["beforeClose"]>>()
      .mockRejectedValue(new Error("Prevent close"));
    const { component } = await mountSheet(beforeClose);
    const closeButton = page.getByRole("button", { name: "Close", exact: true });

    await closeButton.click();

    expect(beforeClose).toHaveBeenCalledExactlyOnceWith(component.el);
    expect(component.el.open).toBe(true);
    await expect.element(page.getByRole("button", { name: "Sheet content" })).toBeVisible();
    await expect.element(closeButton).toBeVisible();
  });

  it("keeps content visible when beforeClose rejects an Escape request", async () => {
    const beforeClose = vi
      .fn<NonNullable<Sheet["beforeClose"]>>()
      .mockRejectedValue(new Error("Prevent close"));
    const { component } = await mountSheet(beforeClose);
    const content = page.getByRole("button", { name: "Sheet content" });

    await content.click();
    await userEvent.keyboard("{Escape}");

    expect(beforeClose).toHaveBeenCalledExactlyOnceWith(component.el);
    expect(component.el.open).toBe(true);
    await expect.element(content).toBeVisible();
  });
});

describe("slots", () => {
  it("forwards heading content to the internal panel", async () => {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    await mount(
      <calcite-sheet heading="Property heading" headingLevel={2} label="Sheet" open>
        <span slot="heading">Slotted heading</span>
      </calcite-sheet>,
    );
    await openEvent;

    await expect.element(page.getByRole("heading", { name: "Slotted heading" })).toBeVisible();
    await expect.element(page.getByText("Property heading")).not.toBeInTheDocument();
  });

  it("forwards description content to the internal panel", async () => {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    await mount(
      <calcite-sheet description="Property description" heading="Tools" label="Sheet" open>
        <span slot="description">Slotted description</span>
      </calcite-sheet>,
    );
    await openEvent;

    await expect.element(page.getByText("Slotted description")).toBeVisible();
    await expect.element(page.getByText("Property description")).not.toBeInTheDocument();
  });

  it("forwards header-top content to the internal panel", async () => {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    await mount(
      <calcite-sheet heading="Tools" label="Sheet" open>
        <div slot="header-top">Header top</div>
      </calcite-sheet>,
    );
    await openEvent;

    await expect.element(page.getByText("Header top")).toBeVisible();
  });
});

describe("is focusable", () => {
  const focusableContentTargetClass = "test";

  function renderSheet(closeDisabled = false) {
    return (
      <calcite-sheet closeDisabled={closeDisabled} open>
        <button class={focusableContentTargetClass} type="button">
          test
        </button>
      </calcite-sheet>
    );
  }

  describe("focuses internal panel by default", () => {
    focusable(() => mount(renderSheet), {
      shadowFocusTargetSelector: `.${CSS.panel}`,
    });
  });

  describe("focuses content if there is no close button", () => {
    focusable(() => mount(renderSheet(true)), {
      focusTargetSelector: `.${focusableContentTargetClass}`,
    });
  });
});

describe("focus-trap", () => {
  describe("default", () => {
    focusTrap(() => mount(<calcite-sheet>Content</calcite-sheet>), {
      toggleProp: "open",
    });
  });

  describe("without a close button", () => {
    focusTrap(
      () =>
        mount(
          <calcite-sheet closeDisabled>
            <input id="focusable-content" />
          </calcite-sheet>,
        ),
      {
        toggleProp: "open",
        focusTarget: () => page.getBySelector("#focusable-content"),
      },
    );
  });
});

describe("Escape key closing", () => {
  type EscapeCloseCase = {
    focusTrapDisabled: boolean;
    modalDisabled: boolean;
    outsideCloseDisabled: boolean;
    testName: string;
  };

  const defaultCases: EscapeCloseCase[] = [
    {
      focusTrapDisabled: false,
      modalDisabled: false,
      outsideCloseDisabled: false,
      testName: "modal sheet with focus trap enabled",
    },
    {
      focusTrapDisabled: true,
      modalDisabled: false,
      outsideCloseDisabled: false,
      testName: "modal sheet with focus trap disabled",
    },
    {
      focusTrapDisabled: false,
      modalDisabled: true,
      outsideCloseDisabled: false,
      testName: "non-modal sheet with focus trap enabled",
    },
    {
      focusTrapDisabled: true,
      modalDisabled: true,
      outsideCloseDisabled: false,
      testName: "non-modal sheet with focus trap disabled",
    },
  ];

  const modalOutsideClickCases: EscapeCloseCase[] = [
    {
      focusTrapDisabled: false,
      modalDisabled: false,
      outsideCloseDisabled: true,
      testName: "modal sheet with focus trap enabled",
    },
    {
      focusTrapDisabled: true,
      modalDisabled: false,
      outsideCloseDisabled: true,
      testName: "modal sheet with focus trap disabled",
    },
  ];

  const nonModalOutsideClickCases: EscapeCloseCase[] = [
    {
      focusTrapDisabled: false,
      modalDisabled: true,
      outsideCloseDisabled: false,
      testName: "non-modal sheet with focus trap enabled",
    },
    {
      focusTrapDisabled: true,
      modalDisabled: true,
      outsideCloseDisabled: false,
      testName: "non-modal sheet with focus trap disabled",
    },
  ];

  async function setUpEscapeCloseTest({
    focusTrapDisabled,
    modalDisabled,
    outsideCloseDisabled,
  }: EscapeCloseCase) {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    const { el } = await mount<Sheet>(
      <>
        <calcite-sheet
          focusTrapDisabled={focusTrapDisabled}
          label="Sheet"
          modalDisabled={modalDisabled}
          open
          outsideCloseDisabled={outsideCloseDisabled}
        >
          <button type="button">inside</button>
        </calcite-sheet>
        <button style={{ insetInlineEnd: 0, position: "fixed" }} type="button">
          outside
        </button>
      </>,
    );
    await openEvent;

    return {
      el,
      insideButton: page.getByRole("button", { name: "inside" }),
      outsideButton: page.getByRole("button", { name: "outside" }),
    };
  }

  async function expectEscapeClosesFromInside({
    el,
    insideButton,
  }: Awaited<ReturnType<typeof setUpEscapeCloseTest>>) {
    expect(el.open).toBe(true);

    await userEvent.click(insideButton);
    await expect.element(insideButton).toHaveFocus();

    await userEvent.keyboard("{Escape}");

    expect(el.open).toBe(false);
  }

  it.each(defaultCases)("closes from inside for $testName", async (testCase) => {
    await expectEscapeClosesFromInside(await setUpEscapeCloseTest(testCase));
  });

  it.each(modalOutsideClickCases)(
    "closes from inside after prevented outside close for $testName",
    async (testCase) => {
      const testSetup = await setUpEscapeCloseTest(testCase);
      const { el } = testSetup;
      const content = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.content}`)!;
      const { height, right, top } = content.getBoundingClientRect();

      await commands.mouseMove(right + 10, top + height / 2);
      await commands.mouseDown();
      await commands.mouseUp();

      await expectEscapeClosesFromInside(testSetup);
    },
  );

  it.each(nonModalOutsideClickCases)(
    "closes from inside after focus leaves and returns for $testName",
    async (testCase) => {
      const testSetup = await setUpEscapeCloseTest(testCase);
      const { outsideButton } = testSetup;

      await userEvent.click(outsideButton);
      await expect.element(outsideButton).toHaveFocus();

      await expectEscapeClosesFromInside(testSetup);
    },
  );
});

describe("modalDisabled", () => {
  it("updates modal behavior when toggled while open", async () => {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    const { el } = await mount<Sheet>(<calcite-sheet label="Sheet" open />);
    await openEvent;

    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(el.ariaModal).toBe("true");
    expect(el.shadowRoot.querySelector("calcite-scrim")).not.toBeNull();

    el.modalDisabled = true;

    await expect.poll(() => document.documentElement.style.overflow).not.toBe("hidden");
    expect(el.ariaModal).toBe("false");
    expect(el.shadowRoot.querySelector("calcite-scrim")).toBeNull();

    el.modalDisabled = false;

    await expect.poll(() => document.documentElement.style.overflow).toBe("hidden");
    expect(el.ariaModal).toBe("true");
    expect(el.shadowRoot.querySelector("calcite-scrim")).not.toBeNull();

    el.open = false;

    await expect.poll(() => document.documentElement.style.overflow).not.toBe("hidden");
  });

  it("allows interaction outside without rendering a scrim or blocking document scroll", async () => {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    const { el } = await mount<Sheet>(
      <>
        <calcite-sheet label="Non-modal sheet" modalDisabled open>
          <button type="button">inside</button>
        </calcite-sheet>
        <button style={{ insetInlineEnd: 0, position: "fixed" }} type="button">
          outside
        </button>
      </>,
    );
    await openEvent;

    expect(el.ariaModal).toBe("false");
    expect(el.shadowRoot.querySelector("calcite-scrim")).toBeNull();
    expect(document.documentElement.style.overflow).not.toBe("hidden");
    expect(getComputedStyle(el).pointerEvents).toBe("none");
    const content = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.content}`)!;
    expect(getComputedStyle(content).pointerEvents).toBe("auto");

    const outsideButton = page.getByRole("button", { name: "outside" });
    await userEvent.click(outsideButton);

    await expect.element(outsideButton).toHaveFocus();
    expect(el.open).toBe(true);
  });

  it("allows focus to leave when focusTrapDisabled is true", async () => {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    await mount<Sheet>(
      <>
        <calcite-sheet focus-trap-disabled label="Non-modal sheet" modalDisabled open>
          <button type="button">inside</button>
        </calcite-sheet>
        <button type="button">outside</button>
      </>,
    );
    await openEvent;

    const insideButton = page.getByRole("button", { name: "inside" });
    const outsideButton = page.getByRole("button", { name: "outside" });
    await userEvent.click(insideButton);

    await userEvent.tab();

    await expect.element(outsideButton).toHaveFocus();
  });

  it("allows focus to leave when focusTrapDisabled is true for a modal sheet", async () => {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    const { el } = await mount<Sheet>(
      <>
        <calcite-sheet focus-trap-disabled label="Modal sheet" open>
          <button type="button">inside</button>
        </calcite-sheet>
        <button type="button">outside</button>
      </>,
    );
    await openEvent;

    expect(el.ariaModal).toBe("true");
    const insideButton = page.getByRole("button", { name: "inside" });
    const outsideButton = page.getByRole("button", { name: "outside" });
    await userEvent.click(insideButton);

    await userEvent.tab();

    await expect.element(outsideButton).toHaveFocus();
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-sheet"),
    [
      {
        propertyName: "collapsed",
        value: true,
      },
      {
        propertyName: "collapsible",
        value: true,
      },
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "menuPlacement",
        value: "top-start",
      },
      {
        propertyName: "topLayerDisabled",
        value: true,
      },
      {
        propertyName: "height",
        value: "m",
      },
      {
        propertyName: "heightScale",
        value: "m",
      },
      {
        propertyName: "modalDisabled",
        value: true,
      },
      {
        propertyName: "resizable",
        value: true,
      },
      {
        propertyName: "width",
        value: "m",
      },
      {
        propertyName: "widthScale",
        value: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-sheet"));
});

describe("openClose", () => {
  openClose((mountOptions) => mount("calcite-sheet", mountOptions));
});

describe("renders", () => {
  renders(() => mount("calcite-sheet"), { display: "flex", visible: false });
});

describe("sheet updateSize public method", () => {
  mockConsole();

  type Axis = "inline" | "block";
  type TestCase = {
    axis: Axis;
    dir: Dir;
    changeDirAfterMount: boolean;
  };

  const testCases: TestCase[] = [
    { axis: "inline", dir: "ltr", changeDirAfterMount: true },
    { axis: "inline", dir: "ltr", changeDirAfterMount: false },
    { axis: "inline", dir: "rtl", changeDirAfterMount: true },
    { axis: "inline", dir: "rtl", changeDirAfterMount: false },
    { axis: "block", dir: "ltr", changeDirAfterMount: true },
    { axis: "block", dir: "ltr", changeDirAfterMount: false },
    { axis: "block", dir: "rtl", changeDirAfterMount: true },
    { axis: "block", dir: "rtl", changeDirAfterMount: false },
  ] as const;

  async function setUpSheet({ axis, dir, changeDirAfterMount }: TestCase): Promise<{
    sheet: Sheet["el"];
    content: HTMLElement;
    resizeHandle: HTMLElement;
    component: Sheet;
    sizeProp: "inlineSize" | "blockSize";
    keyboardKey: "{ArrowRight}" | "{ArrowDown}";
    mouseDelta: { dx: number; dy: number };
  }> {
    const position = axis === "inline" ? "inline-start" : "block-start";
    const sizeProp = axis === "inline" ? "inlineSize" : "blockSize";
    const keyboardKey = axis === "inline" ? "{ArrowRight}" : "{ArrowDown}";
    const mouseDelta = axis === "inline" ? { dx: 10, dy: 0 } : { dx: 0, dy: 10 };

    const { el, component } = await mount<Sheet>(
      <calcite-sheet
        dir={changeDirAfterMount ? undefined : dir}
        embedded
        open
        position={position}
        resizable
      >
        <calcite-panel>Content</calcite-panel>
      </calcite-sheet>,
    );

    if (changeDirAfterMount) {
      el.dir = dir;
      await component.updateComplete;
    }

    const content = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.content}`)!;
    const resizeHandle = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.resizeHandle}`)!;

    return { sheet: el, content, resizeHandle, component, sizeProp, keyboardKey, mouseDelta };
  }

  testCases.forEach(({ axis, dir, changeDirAfterMount }) => {
    it(`default size → token resize → KEYBOARD resize → method resize → clear method override [axis=${axis}, dir=${dir}, changeDirAfterMount=${changeDirAfterMount}]`, async () => {
      const initialSize = axis === "inline" ? 320 : 200;
      const overrideSize = axis === "inline" ? 400 : 250;
      const cssProp = axis === "inline" ? "--calcite-sheet-width" : "--calcite-sheet-height";
      const { sheet, content, component, sizeProp, keyboardKey } = await setUpSheet({
        axis,
        dir,
        changeDirAfterMount,
      });

      sheet.style.setProperty(cssProp, `${initialSize}px`);
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${initialSize}px`);

      await page.getByRole("separator").click();
      await userEvent.keyboard(keyboardKey);
      const afterUserResize = parseFloat(getComputedStyle(content)[sizeProp]);
      expect(afterUserResize).not.toBe(initialSize);

      if (dir === "rtl" && axis === "inline") {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeLessThan(initialSize);
      } else {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeGreaterThan(initialSize);
      }

      await sheet.updateSize(
        axis === "inline" ? { inline: overrideSize } : { block: overrideSize },
      );
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${overrideSize}px`);

      await expect
        .element(page.getByRole("separator"))
        .toHaveAttribute("aria-valuenow", `${overrideSize}`);

      await sheet.updateSize(axis === "inline" ? { block: 250 } : { inline: 400 });
      await expect
        .element(page.getByRole("separator"))
        .toHaveAttribute("aria-valuenow", `${overrideSize}`);

      await sheet.updateSize(axis === "inline" ? { inline: null } : { block: null });
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${initialSize}px`);
      await expect
        .element(page.getByRole("separator"))
        .toHaveAttribute("aria-valuenow", `${initialSize}`);
    });

    it(`default size → token resize → MOUSE resize → method resize → clear method override [axis=${axis}, dir=${dir}, changeDirAfterMount=${changeDirAfterMount}]`, async () => {
      const initialSize = axis === "inline" ? 320 : 200;
      const overrideSize = axis === "inline" ? 400 : 250;
      const cssProp = axis === "inline" ? "--calcite-sheet-width" : "--calcite-sheet-height";
      const { sheet, content, resizeHandle, component, sizeProp, mouseDelta } = await setUpSheet({
        axis,
        dir,
        changeDirAfterMount,
      });

      sheet.style.setProperty(cssProp, `${initialSize}px`);
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${initialSize}px`);

      const handleRect = resizeHandle.getBoundingClientRect();
      const startX = handleRect.left + handleRect.width / 2;
      const startY = handleRect.top + handleRect.height / 2;

      await userEvent.hover(resizeHandle);
      await commands.mouseDown();
      await commands.mouseMove(startX + mouseDelta.dx, startY + mouseDelta.dy);
      await commands.mouseUp();

      const afterUserResize = parseFloat(getComputedStyle(content)[sizeProp]);
      expect(afterUserResize).not.toBe(initialSize);

      if (dir === "rtl" && axis === "inline") {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeLessThan(initialSize);
      } else {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeGreaterThan(initialSize);
      }

      await sheet.updateSize(
        axis === "inline" ? { inline: overrideSize } : { block: overrideSize },
      );
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${overrideSize}px`);

      await sheet.updateSize(axis === "inline" ? { inline: null } : { block: null });
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${initialSize}px`);
    });
  });
});

describe("top layer placement", () => {
  topLayer(() => mount("calcite-sheet"), {
    topLayerTarget: page.getBySelector(`calcite-sheet .${CSS.container}[popover]`),
  });
});

describe("themed", () => {
  describe("internal panel", () => {
    themed(
      async () => {
        const openEvent = waitForEvent(document, "calciteSheetOpen");
        const renderResult = await mount(
          <calcite-sheet heading="Panel heading" label="Sheet" open>
            Panel content
          </calcite-sheet>,
        );
        await openEvent;
        return renderResult;
      },
      {
        "--calcite-sheet-corner-radius": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-corner-radius",
        },
        "--calcite-sheet-heading-text-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-heading-text-color",
        },
        "--calcite-sheet-icon-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-icon-color",
        },
        "--calcite-sheet-description-text-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-description-text-color",
        },
        "--calcite-sheet-border-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-border-color",
        },
        "--calcite-sheet-background-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-background-color",
        },
        "--calcite-sheet-content-top-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-content-top-space",
        },
        "--calcite-sheet-content-bottom-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-content-bottom-space",
        },
        "--calcite-sheet-header-top-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-top-space",
        },
        "--calcite-sheet-header-background-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-background-color",
        },
        "--calcite-sheet-header-action-background-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-action-background-color",
        },
        "--calcite-sheet-header-action-background-color-hover": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-action-background-color-hover",
        },
        "--calcite-sheet-header-action-background-color-press": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-action-background-color-press",
        },
        "--calcite-sheet-header-action-text-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-action-text-color",
        },
        "--calcite-sheet-header-action-text-color-press": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-action-text-color-press",
        },
        "--calcite-sheet-footer-background-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-footer-background-color",
        },
        "--calcite-sheet-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-space",
        },
        "--calcite-sheet-header-content-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-content-space",
        },
        "--calcite-sheet-footer-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-footer-space",
        },
        "--calcite-sheet-action-menu-border-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-popover-border-color",
        },
      },
    );
  });

  describe("default", () => {
    themed(
      () =>
        mount(
          <calcite-sheet
            display-mode="float"
            height="m"
            open
            position="inline-start"
            resizable
            width="l"
          >
            <calcite-panel heading="hello world">test!</calcite-panel>
          </calcite-sheet>,
        ),
      {
        "--calcite-sheet-background-color": {
          shadowSelector: `#${IDS.sheetContent}.${CSS.content}`,
          targetProp: "backgroundColor",
        },
        "--calcite-sheet-border-color": {
          shadowSelector: `.${CSS.resizeHandleBar}`,
          targetProp: "borderInlineStartColor",
        },
        "--calcite-sheet-corner-radius": [
          {
            shadowSelector: `#${IDS.sheetContent}.${CSS.content}`,
            targetProp: "borderRadius",
          },
          {
            shadowSelector: `.${CSS.contentContainer}`,
            targetProp: "borderRadius",
          },
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "borderRadius",
          },
          {
            shadowSelector: `.${CSS.resizeHandleBar}`,
            targetProp: "borderStartEndRadius",
          },
        ],
        "--calcite-sheet-text-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "color",
        },
        "--calcite-sheet-shadow": {
          shadowSelector: `#${IDS.sheetContent}.${CSS.content}`,
          targetProp: "boxShadow",
        },
        "--calcite-sheet-resize-background-color": {
          shadowSelector: `.${CSS.resizeHandleBar}`,
          targetProp: "backgroundColor",
        },
        "--calcite-sheet-resize-icon-color": {
          shadowSelector: `.${CSS.resizeHandleBar}`,
          targetProp: "color",
        },
      },
    );
  });
});
