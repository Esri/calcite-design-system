import { describe, expect, it } from "vitest";
import { Fragment, h } from "@arcgis/lumina";
import { page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { commands } from "../../tests/browser/commands";

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
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { Dir } from "../interfaces";
import { CSS, IDS } from "./resources";
import { Sheet } from "./sheet";
import { waitForEvent } from "../../tests/commonTests/browser/utils";

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
          <calcite-panel closable heading="Ultrices neque">
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

describe("is focusable", () => {
  const focusableContentTargetClass = "test";

  describe("focuses content by default", () => {
    focusable(
      () =>
        mount(
          <calcite-sheet open>
            <button class={focusableContentTargetClass} type="button">
              test
            </button>
          </calcite-sheet>,
        ),
      {
        focusTargetSelector: `.${focusableContentTargetClass}`,
      },
    );
  });
});

describe("focus-trap", () => {
  focusTrap(
    () =>
      mount(
        <calcite-sheet>
          <input id="focusable-content" />
        </calcite-sheet>,
      ),
    {
      toggleProp: "open",
      focusTarget: () => page.getBySelector("#focusable-content"),
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

    const outsideButton = page.getByRole("button", { name: "outside" });
    await userEvent.click(outsideButton);

    await expect.element(outsideButton).toHaveFocus();
    expect(el.open).toBe(true);
  });

  it("allows focus to leave when focusTrapDisabled is true", async () => {
    const openEvent = waitForEvent(document, "calciteSheetOpen");
    await mount<Sheet>(
      <>
        <calcite-sheet focusTrapDisabled label="Non-modal sheet" modalDisabled open>
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
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-sheet"),
    [
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

  async function setUpSheet({ axis, dir, changeDirAfterMount }: TestCase) {
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

      await userEvent.keyboard(`{Tab}${keyboardKey}`);
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
  topLayer(() => mount("calcite-sheet"));
});

describe("themed", () => {
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
