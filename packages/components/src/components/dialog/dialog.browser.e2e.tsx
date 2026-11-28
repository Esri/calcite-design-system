import { h, Fragment } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { TemplateResult } from "lit/html.js";
import { page, userEvent } from "vitest/browser";

import {
  defaults,
  focusable,
  focusTrap,
  reflects,
  hidden,
  renders,
  slots,
  t9n,
  topLayer,
  openClose,
  accessible,
  scalePropagates,
  themed,
} from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";
import { waitForEvent } from "../../tests/common/utils";
import { CSS_UTILITY } from "../../utils/resources";
import type { Dialog } from "./dialog";

mockConsole();

describe("accessible", () => {
  accessible(async () => {
    const openEvent = waitForEvent(document, "calciteDialogOpen");
    const renderResult = await mount(
      <calcite-dialog description="My description" heading="My dialog" open={true} />,
    );
    await openEvent;
    return renderResult;
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-dialog"),
    [
      {
        propertyName: "aria",
        defaultValue: undefined,
      },
      {
        propertyName: "beforeClose",
        defaultValue: undefined,
      },
      {
        propertyName: "description",
        defaultValue: undefined,
      },
      {
        propertyName: "dragEnabled",
        defaultValue: false,
      },
      {
        propertyName: "escapeDisabled",
        defaultValue: false,
      },
      {
        propertyName: "closeDisabled",
        defaultValue: false,
      },
      {
        propertyName: "placement",
        defaultValue: "center",
      },
      {
        propertyName: "heading",
        defaultValue: undefined,
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
      {
        propertyName: "icon",
        defaultValue: undefined,
      },
      {
        propertyName: "iconFlipRtl",
        defaultValue: false,
      },
      {
        propertyName: "kind",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "menuOpen",
        defaultValue: false,
      },
      {
        propertyName: "messageOverrides",
        defaultValue: undefined,
      },
      {
        propertyName: "modal",
        defaultValue: false,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "outsideCloseDisabled",
        defaultValue: false,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "resizable",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "width",
        defaultValue: "m",
      },
      {
        propertyName: "fullscreenDisabled",
        defaultValue: false,
      },
    ],
  );
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-dialog />, mountOptions), {
    targetSelector: "calcite-panel",
  });
});

describe("is focusable", () => {
  const focusableContentTargetClass = "test";
  const shadowFocusTargetSelector = `.${CSS.panel}`;
  const focusTargetSelector = `.${focusableContentTargetClass}`;

  function renderDialog(closeDisabled = false): TemplateResult {
    return (
      <calcite-dialog closeDisabled={closeDisabled} heading="Title" open>
        This is the content
        <button class={focusableContentTargetClass} type="button">
          test
        </button>
      </calcite-dialog>
    );
  }

  describe("focuses internal panel by default", () => {
    focusable(() => mount(renderDialog), {
      shadowFocusTargetSelector,
    });
  });

  describe("focuses content if there is no close button", () => {
    focusable(() => mount(renderDialog(true)), {
      focusTargetSelector,
    });
  });
});

describe("focus-trap", () => {
  describe("default", () => {
    focusTrap(() => mount(<calcite-dialog heading="Title">Content</calcite-dialog>), {
      toggleProp: "open",
    });
  });

  describe("modal", () => {
    focusTrap(
      () =>
        mount(
          <calcite-dialog heading="Title" modal>
            Content
          </calcite-dialog>,
        ),
      {
        toggleProp: "open",
      },
    );
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-dialog"),
    [
      {
        propertyName: "closeDisabled",
        value: true,
      },
      {
        propertyName: "dragEnabled",
        value: true,
      },
      {
        propertyName: "escapeDisabled",
        value: true,
      },
      {
        propertyName: "placement",
        value: "center",
      },
      {
        propertyName: "headingLevel",
        value: 1,
      },
      {
        propertyName: "kind",
        value: "brand",
      },
      {
        propertyName: "icon",
        value: "x",
      },
      {
        propertyName: "iconFlipRtl",
        value: true,
      },
      {
        propertyName: "loading",
        value: true,
      },
      {
        propertyName: "menuOpen",
        value: true,
      },
      {
        propertyName: "modal",
        value: true,
      },
      {
        propertyName: "open",
        value: true,
      },
      {
        propertyName: "outsideCloseDisabled",
        value: true,
      },
      {
        propertyName: "overlayPositioning",
        value: "fixed",
      },
      {
        propertyName: "resizable",
        value: true,
      },
      {
        propertyName: "scale",
        value: "s",
      },
      {
        propertyName: "width",
        value: "s",
      },
      {
        propertyName: "fullscreenDisabled",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-dialog"));
});

describe("openClose", () => {
  openClose((mountOptions) => mount("calcite-dialog", mountOptions));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-dialog open>
          <div slot="custom-content">content</div>
        </calcite-dialog>,
      ),
    {
      display: "flex",
      visible: {
        value: true,
        locator: page.getByRole("dialog"),
      },
    },
  );
});

describe("slots", () => {
  slots(() => mount("calcite-dialog"), SLOTS);

  it("omits the leading separator for an Action Bar without header content", async () => {
    await mount(
      <calcite-dialog closeDisabled open style="--calcite-dialog-content-top-space: 0;">
        <calcite-action-bar layout="horizontal" slot={SLOTS.contentTop}>
          <calcite-action icon="plus" text="Add" />
        </calcite-action-bar>
      </calcite-dialog>,
    );
    const panel = page.getBySelector("calcite-panel");
    const actionBar = page.getBySelector("calcite-action-bar");

    await expect.element(page.getByRole("button", { name: "Add" })).toBeVisible();
    expect(actionBar.element().getBoundingClientRect().top).toBe(
      panel.element().getBoundingClientRect().top,
    );
  });

  it.each([
    { slot: SLOTS.actionBar, space: 0 },
    { slot: SLOTS.actionBar, space: 12 },
    { slot: SLOTS.contentTop, space: 0 },
    { slot: SLOTS.contentTop, space: 12 },
  ])(
    "renders an interactive horizontal Action Bar in $slot with $space px content-top padding",
    async ({ slot, space }) => {
      const onAction = vi.fn();
      await mount(
        <calcite-dialog
          heading="Dialog"
          open
          style={`--calcite-dialog-content-top-space: ${space}px; --calcite-dialog-space: 0;`}
        >
          <calcite-action-bar
            layout={slot === SLOTS.contentTop ? "horizontal" : undefined}
            slot={slot}
          >
            <calcite-action icon="plus" onClick={onAction} text="Add" />
          </calcite-action-bar>
          <div>Content</div>
        </calcite-dialog>,
      );
      const actionBar = page.getBySelector("calcite-action-bar");
      const content = page.getByText("Content");

      await expect.element(page.getByRole("button", { name: "Add" })).toBeVisible();
      await expect.element(actionBar).toHaveAttribute("layout", "horizontal");
      expect(actionBar.element().getBoundingClientRect().width).toBe(
        content.element().getBoundingClientRect().width -
          (slot === SLOTS.contentTop ? space * 2 : 0),
      );
      await page.getByRole("button", { name: "Add" }).click();
      expect(onAction).toHaveBeenCalledOnce();
    },
  );

  it("forwards header-top content to the internal panel", async () => {
    await mount(
      <calcite-dialog open>
        <div slot={SLOTS.headerTop}>Header top</div>
      </calcite-dialog>,
    );

    await expect.element(page.getByText("Header top")).toBeVisible();
  });
});

describe("top layer placement", () => {
  topLayer(() => mount(<calcite-dialog heading="heading" />), {
    topLayerTarget: page.getByLabelText("heading"),
  });
});

describe("translation support", () => {
  t9n(() => mount("calcite-dialog"));
});

describe("fullscreen disabled", () => {
  it.for([
    { width: 400, height: 400 },
    { width: 300, height: 300 },
  ])(
    "does not go fullscreen at smaller viewports (at its default scale) when fullscreenDisabled is true",
    async ({ width, height }) => {
      await page.viewport(width, height);
      await mount(
        <calcite-dialog fullscreenDisabled={true} open={true}>
          <div>Dialog content</div>
        </calcite-dialog>,
      );
      const dialogLocator = page.getBySelector(`.${CSS.dialog}`);
      const dialog = dialogLocator.element();

      const computedStyle = window.getComputedStyle(dialog);

      expect(parseInt(computedStyle.width, 10)).toBeLessThan(width);
      expect(parseInt(computedStyle.height, 10)).toBeLessThan(height);
    },
  );

  it("allows resizing when fullscreenDisabled is true", async () => {
    await page.viewport(400, 400);

    const { el, component } = await mount<"calcite-dialog">(
      <calcite-dialog fullscreenDisabled={true} open={true} resizable={true}>
        <div>Dialog content</div>
      </calcite-dialog>,
    );

    const minimumDialogWidthForMediumScale = 288;
    const viewportWidth = 400;

    const dialogLocator = page.getBySelector(`.${CSS.dialog}`);
    const dialog = dialogLocator.element();

    await el.setFocus();
    await userEvent.keyboard("{Shift>}{ArrowRight}{/Shift}");
    await component.updateComplete;

    const resizedStyle = window.getComputedStyle(dialog);
    expect(parseInt(resizedStyle.width, 10)).toBeGreaterThanOrEqual(
      minimumDialogWidthForMediumScale,
    );
    expect(parseInt(resizedStyle.width, 10)).toBeLessThan(viewportWidth);
  });
});

describe("dialog updateSize public method", () => {
  mockConsole();

  async function setupDialogWithInitialSize(initialInlineSize: number, initialBlockSize: number) {
    await page.viewport(1024, 768);

    const { el, component } = await mount(
      <calcite-shell>
        <calcite-dialog heading="test" open resizable>
          <div>Dialog Content</div>
        </calcite-dialog>
      </calcite-shell>,
    );

    const dialogElement = el.querySelector("calcite-dialog")!;
    const dialogContentElement = dialogElement.shadowRoot!.querySelector<HTMLElement>(
      `.${CSS.dialog}`,
    )!;

    dialogElement.style.setProperty("--calcite-dialog-size-x", `${initialInlineSize}px`);
    dialogElement.style.setProperty("--calcite-dialog-size-y", `${initialBlockSize}px`);

    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(getComputedStyle(dialogContentElement).inlineSize).toBe(`${initialInlineSize}px`);
    expect(getComputedStyle(dialogContentElement).blockSize).toBe(`${initialBlockSize}px`);

    return { dialogElement, dialogContentElement, component };
  }

  it("default size → KEYBOARD resize → method resize → clear method override", async () => {
    const initialInlineSize = 320;
    const initialBlockSize = 250;
    const overrideInlineSize = 400;
    const overrideBlockSize = 280;

    const { dialogElement, dialogContentElement, component } = await setupDialogWithInitialSize(
      initialInlineSize,
      initialBlockSize,
    );

    dialogElement.focus();

    await userEvent.keyboard("{Shift>}{ArrowLeft}{/Shift}");
    expect(getComputedStyle(dialogContentElement).inlineSize).not.toBe(`${initialInlineSize}px`);

    await userEvent.keyboard("{Shift>}{ArrowDown}{/Shift}");
    expect(getComputedStyle(dialogContentElement).blockSize).not.toBe(`${initialBlockSize}px`);

    await dialogElement.updateSize({ inline: overrideInlineSize, block: overrideBlockSize });
    await component.updateComplete;
    expect(getComputedStyle(dialogContentElement).inlineSize).toBe(`${overrideInlineSize}px`);
    expect(getComputedStyle(dialogContentElement).blockSize).toBe(`${overrideBlockSize}px`);

    await dialogElement.updateSize({ inline: null, block: null });
    await component.updateComplete;
    expect(getComputedStyle(dialogContentElement).inlineSize).toBe(`${initialInlineSize}px`);
    expect(getComputedStyle(dialogContentElement).blockSize).toBe(`${initialBlockSize}px`);
  });
});

describe("a11y attributes", () => {
  it("does not announce assistive text unless a live region is configured", async () => {
    await mount(<calcite-dialog drag-enabled />);
    const assistiveText = page.getBySelector(
      `calcite-dialog .${CSS.dialog} > .${CSS_UTILITY.screenReaderText}`,
    );

    await expect.element(assistiveText).not.toHaveAttribute("aria-live");
  });

  it("uses the configured live region setting", async () => {
    await mount(<calcite-dialog aria={{ live: "polite" }} drag-enabled />);
    const assistiveText = page.getBySelector(
      `calcite-dialog .${CSS.dialog} > .${CSS_UTILITY.screenReaderText}`,
    );

    await expect.element(assistiveText).toHaveAttribute("aria-live", "polite");
  });
});

describe("themed", () => {
  it.each([
    { name: "defaults", style: "" },
    {
      name: "custom Dialog tokens",
      style:
        "--calcite-dialog-space: 24px; --calcite-dialog-header-background-color: rgb(255, 0, 0);",
    },
  ])("keeps nested Panels independent of $name", async ({ style }) => {
    await mount(
      <>
        <calcite-dialog embedded heading="Dialog" open style={style}>
          <div>
            <calcite-panel heading="Nested Panel" id="nested-panel">
              Content
            </calcite-panel>
          </div>
        </calcite-dialog>
        <calcite-panel heading="Standalone Panel" id="standalone-panel">
          Content
        </calcite-panel>
      </>,
    );

    const standaloneContent = page.getBySelector("#standalone-panel .content-wrapper");
    const standaloneHeader = page.getBySelector("#standalone-panel .header");
    await expect
      .poll(
        () =>
          getComputedStyle(page.getBySelector("#nested-panel .content-wrapper").element()).padding,
      )
      .toBe(getComputedStyle(standaloneContent.element()).padding);
    await expect.element(page.getBySelector("#nested-panel .header")).toHaveStyle({
      backgroundColor: getComputedStyle(standaloneHeader.element()).backgroundColor,
    });
  });

  it("updates the owned Panel's icon for kind changes without changing nested Panels", async () => {
    const { el } = await mount<Dialog>(
      <calcite-dialog embedded heading="Dialog" icon="information" open>
        <calcite-panel heading="Nested Panel" icon="information" id="nested-kind-panel" />
      </calcite-dialog>,
    );
    const ownedIcon = page.getBySelector("calcite-dialog .panel .icon").first();
    const nestedIcon = page.getBySelector("#nested-kind-panel .icon");
    const nestedColor = getComputedStyle(nestedIcon.element()).getPropertyValue(
      "--calcite-icon-color",
    );

    for (const [kind, token] of [
      ["warning", "--calcite-color-status-warning"],
      ["info", "--calcite-color-status-info"],
      [undefined, "--calcite-color-text-1"],
    ] as const) {
      el.kind = kind;
      await expect
        .poll(() => getComputedStyle(ownedIcon.element()).getPropertyValue("--calcite-icon-color"))
        .toBe(getComputedStyle(el).getPropertyValue(token));
      expect(getComputedStyle(nestedIcon.element()).getPropertyValue("--calcite-icon-color")).toBe(
        nestedColor,
      );
    }
  });

  const dialogTemplate = async () => {
    await page.viewport(1440, 1440);

    return mount(
      <calcite-dialog
        description="Themed"
        heading="Information"
        icon="information"
        kind="info"
        modal
        open
        scale="s"
      >
        <calcite-action icon="banana" slot="header-menu-actions" text="banana" text-enabled />
        <calcite-action icon="measure" slot="header-menu-actions" text="measure" text-enabled />
        <calcite-action icon="question" slot="header-actions-end" text="Layers" />
        <div slot="header-top">Header top</div>
        <div slot="content-top">To continue, you must agree to the terms</div>
        <calcite-label
          layout="inline-space-between"
          slot="content-bottom"
          style="--calcite-label-margin-bottom: 0"
        >
          <calcite-checkbox />I agree to the terms
        </calcite-label>
        <p>
          Curabitur mauris quam, tempor sit amet massa sed, mattis blandit diam. Proin dignissim leo
          vitae quam fringilla viverra. Ut eget gravida magna, et tincidunt dui. Nullam a finibus
          ante, eu dignissim eros. Aenean sodales sollicitudin dui in fermentum.
        </p>

        <calcite-button scale="s" slot="footer-end" width="auto">
          Add members now
        </calcite-button>
      </calcite-dialog>,
    );
  };

  describe("theme sizing", () => {
    themed(
      () =>
        mount(
          <calcite-dialog fullscreen-disabled icon="banana" modal open width="s">
            <p>Hello world!</p>
          </calcite-dialog>,
        ),
      {
        "--calcite-dialog-size-x": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "inlineSize",
        },
        "--calcite-dialog-min-size-x": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "minInlineSize",
        },
        "--calcite-dialog-max-size-x": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "maxInlineSize",
        },
        "--calcite-dialog-size-y": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "blockSize",
        },
        "--calcite-dialog-min-size-y": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "minBlockSize",
        },
        "--calcite-dialog-max-size-y": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "maxBlockSize",
        },
        "--calcite-dialog-offset-x": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "insetInlineStart",
        },
        "--calcite-dialog-offset-y": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "insetBlockStart",
        },
      },
    );
  });

  describe("appearance", async () => {
    themed(dialogTemplate, {
      "--calcite-dialog-scrim-background-color": {
        shadowSelector: `.${CSS.scrim}`,
        targetProp: "--calcite-scrim-background",
      },
      "--calcite-dialog-content-top-space": {
        shadowSelector: "calcite-panel .content-top",
        targetProp: "paddingTop",
      },
      "--calcite-dialog-content-bottom-space": {
        shadowSelector: "calcite-panel .content-bottom",
        targetProp: "paddingTop",
      },
      "--calcite-dialog-header-top-space": {
        shadowSelector: "calcite-panel .header-top",
        targetProp: "paddingTop",
      },
      "--calcite-dialog-footer-space": {
        shadowSelector: "calcite-panel .footer",
        targetProp: "paddingTop",
      },
      "--calcite-dialog-background-color": {
        shadowSelector: "calcite-panel .content-wrapper",
        targetProp: "backgroundColor",
      },
      "--calcite-dialog-icon-color": {
        shadowSelector: "calcite-panel .icon",
        targetProp: "--calcite-icon-color",
      },
      "--calcite-dialog-heading-text-color": {
        shadowSelector: "calcite-panel .heading",
        targetProp: "color",
      },
      "--calcite-dialog-description-text-color": {
        shadowSelector: "calcite-panel .description",
        targetProp: "color",
      },
      "--calcite-dialog-header-action-background-color": {
        shadowSelector: "calcite-panel #close",
        targetProp: "--calcite-action-background-color",
      },
      "--calcite-dialog-header-action-text-color": {
        shadowSelector: "calcite-panel #close",
        targetProp: "--calcite-action-text-color",
      },
      "--calcite-dialog-header-action-background-color-hover": {
        shadowSelector: "calcite-panel #close",
        targetProp: "--calcite-action-background-color-hover",
      },
      "--calcite-dialog-header-action-background-color-press": {
        shadowSelector: "calcite-panel #close",
        targetProp: "--calcite-action-background-color-press",
      },
      "--calcite-dialog-header-action-text-color-press": {
        shadowSelector: "calcite-panel #close",
        targetProp: "--calcite-action-text-color-press",
      },
      "--calcite-dialog-action-menu-border-color": {
        shadowSelector: "calcite-panel calcite-action-menu",
        targetProp: "--calcite-popover-border-color",
      },
      "--calcite-dialog-header-background-color": {
        shadowSelector: "calcite-panel .header",
        targetProp: "backgroundColor",
      },
      "--calcite-dialog-footer-background-color": {
        shadowSelector: "calcite-panel .footer",
        targetProp: "backgroundColor",
      },
      "--calcite-dialog-border-color": [
        {
          shadowSelector: "calcite-panel .header",
          targetProp: "borderBottomColor",
        },
        {
          shadowSelector: "calcite-panel .content-top",
          targetProp: "borderTopColor",
        },
        {
          shadowSelector: "calcite-panel .content-bottom",
          targetProp: "borderTopColor",
        },
        {
          shadowSelector: "calcite-panel .footer",
          targetProp: "borderTopColor",
        },
      ],
      "--calcite-dialog-accent-color": {
        shadowSelector: `.${CSS.dialog}`,
        targetProp: "borderColor",
      },
      "--calcite-dialog-space": {
        shadowSelector: "calcite-panel .content-wrapper",
        targetProp: "paddingTop",
      },
      "--calcite-dialog-corner-radius": {
        shadowSelector: `.${CSS.panel}`,
        targetProp: "borderEndEndRadius",
      },
    });
  });

  describe("fallback space", () => {
    themed(dialogTemplate, {
      "--calcite-dialog-content-space": [
        {
          shadowSelector: "calcite-panel .content-wrapper",
          targetProp: "paddingTop",
        },
        {
          shadowSelector: "calcite-panel .content-top",
          targetProp: "paddingTop",
        },
        {
          shadowSelector: "calcite-panel .content-bottom",
          targetProp: "paddingTop",
        },
      ],
    });
  });

  describe.each([
    "--calcite-dialog-content-space",
    "--calcite-dialog-header-content-space",
  ] as const)("slotted header spacing with %s", (token) => {
    themed(
      () =>
        mount(
          <calcite-dialog embedded open>
            <div slot="header-content">Custom header</div>
          </calcite-dialog>,
        ),
      {
        [token]: {
          shadowSelector: "calcite-panel .header--slotted-content",
          targetProp: "paddingTop",
        },
      },
    );
  });
});
