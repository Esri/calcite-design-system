import { h, Fragment, JsxNode } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  handlesActionMenuPlacements,
  delegatesToFloatingUiOwningComponent,
  focusable,
  t9n,
  disabled,
} from "../../tests/commonTests/browser";
import { defaultEndMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";
import { scrolling } from "../../tests/browser/utils/content";
import { CSS, IDS, SLOTS } from "./resources";
import type { Panel } from "./panel";

export const scrollingHeightStyle = "height: 200px;";

export function renderScrollingContent(): JsxNode {
  return (
    <>
      <p>
        Ipsum nostra tempus etiam augue ullamcorper scelerisque sapien potenti erat nisi gravida.
        Vehicula sem tristique sed. Nullam, sociis imperdiet ullamcorper? Dapibus fames primis
        ridiculus vulputate, habitant inceptos! Nunc torquent lorem urna vehicula volutpat donec
        nec. Orci massa eu nec donec enim fames, faucibus quam aenean. Laoreet tellus tempor quisque
        ornare lobortis praesent erat senectus natoque consectetur donec imperdiet. Quis sem cum
        gravida dictumst a pretium purus aptent amet id. Orci habitasse, praesent facilisis
        condimentum. Nec elit turpis leo.
      </p>
      <p>
        Tempus per volutpat diam tempor mauris parturient vulputate leo id libero quisque. Mattis
        aliquam dictum venenatis fringilla. Taciti venenatis, ultrices sollicitudin consequat.
        Sapien fusce est iaculis potenti ut auctor potenti. Nisi malesuada feugiat vulputate vitae
        porttitor. Nullam nullam nullam accumsan quis magna in. Elementum, nascetur gravida cras
        scelerisque inceptos aenean inceptos potenti. Lobortis condimentum accumsan posuere
        curabitur fermentum diam, natoque quisque. Eget placerat sed aptent orci urna fusce magnis.
        Vel lacus magnis nunc.
      </p>
      <p>
        Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh
        morbi massa curae; leo semper diam aenean congue taciti eu porta. Varius faucibus ridiculus
        donec. Montes sit ligula purus porta ante lacus habitasse libero cubilia purus! In quis
        congue arcu maecenas felis cursus pellentesque nascetur porta donec non. Quisque, rutrum
        ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst
        taciti consectetur. Non porttitor tempor orci dictumst magna porta vitae.
      </p>
      <p>
        Ipsum nostra tempus etiam augue ullamcorper scelerisque sapien potenti erat nisi gravida.
        Vehicula sem tristique sed. Nullam, sociis imperdiet ullamcorper? Dapibus fames primis
        ridiculus vulputate, habitant inceptos! Nunc torquent lorem urna vehicula volutpat donec
        nec. Orci massa eu nec donec enim fames, faucibus quam aenean. Laoreet tellus tempor quisque
        ornare lobortis praesent erat senectus natoque consectetur donec imperdiet. Quis sem cum
        gravida dictumst a pretium purus aptent amet id. Orci habitasse, praesent facilisis
        condimentum. Nec elit turpis leo.
      </p>
      <p>
        Tempus per volutpat diam tempor mauris parturient vulputate leo id libero quisque. Mattis
        aliquam dictum venenatis fringilla. Taciti venenatis, ultrices sollicitudin consequat.
        Sapien fusce est iaculis potenti ut auctor potenti. Nisi malesuada feugiat vulputate vitae
        porttitor. Nullam nullam nullam accumsan quis magna in. Elementum, nascetur gravida cras
        scelerisque inceptos aenean inceptos potenti. Lobortis condimentum accumsan posuere
        curabitur fermentum diam, natoque quisque. Eget placerat sed aptent orci urna fusce magnis.
        Vel lacus magnis nunc.
      </p>
    </>
  );
}

mockConsole();

describe("focusTrap", () => {
  const getOutsideBefore = () => page.getByTestId("outside-before");
  const getOutsideAfter = () => page.getByTestId("outside-after");
  const getOutside = () => page.getByTestId("outside");
  const getInsideOne = () => page.getByTestId("inside-1");
  const getInsideTwo = () => page.getByTestId("inside-2");
  const getPanel = () => page.getByTestId("panel");

  async function setPanelProperty(property: "closable" | "closed", value: boolean): Promise<void> {
    const panel = getPanel().element() as HTMLElement & {
      closable?: boolean;
      closed?: boolean;
      updateComplete?: Promise<void>;
    };

    panel[property] = value;
    await panel.updateComplete;
  }

  function expectFocusWithinPanel(): void {
    const panel = getPanel().element() as HTMLElement;
    const activeElement = document.activeElement;

    expect(activeElement === panel || panel.contains(activeElement)).toBe(true);
  }

  it("traps focus when focusTrap=true", async () => {
    await mount(
      <div>
        <button data-testid="outside-before">outside-before</button>
        <calcite-panel closable data-testid="panel" focusTrap>
          <button data-testid="inside-1">inside-1</button>
          <button data-testid="inside-2">inside-2</button>
        </calcite-panel>
        <button data-testid="outside-after">outside-after</button>
      </div>,
    );

    await (getPanel().element() as HTMLElement & { setFocus: () => Promise<void> }).setFocus();

    for (let i = 0; i < 5; i++) {
      await userEvent.keyboard("{Tab}");

      await expect.element(getOutsideBefore()).not.toHaveFocus();
      await expect.element(getOutsideAfter()).not.toHaveFocus();
      expectFocusWithinPanel();
    }
  });

  it("allows outside click when focusTrap=true", async () => {
    await mount(
      <div>
        <calcite-panel closable data-testid="panel" focusTrap>
          <button data-testid="inside-1">inside-1</button>
        </calcite-panel>
        <button data-testid="outside">outside</button>
      </div>,
    );

    await userEvent.click(getInsideOne());
    await userEvent.click(getOutside());

    await expect.element(getOutside()).toHaveFocus();
  });

  it("deactivates focusTrap when panel becomes not closable", async () => {
    await mount(
      <div>
        <button data-testid="outside-before">outside-before</button>
        <calcite-panel closable data-testid="panel" focusTrap>
          <button data-testid="inside-1">inside-1</button>
          <button data-testid="inside-2">inside-2</button>
        </calcite-panel>
        <button data-testid="outside-after">outside-after</button>
      </div>,
    );

    await userEvent.click(getInsideTwo());
    await setPanelProperty("closable", false);

    await userEvent.keyboard("{Tab}");

    await expect.element(getOutsideAfter()).toHaveFocus();
  });

  it("reactivates focusTrap when panel becomes closable again", async () => {
    await mount(
      <div>
        <button data-testid="outside-before">outside-before</button>
        <calcite-panel closable data-testid="panel" focusTrap>
          <button data-testid="inside-1">inside-1</button>
          <button data-testid="inside-2">inside-2</button>
        </calcite-panel>
        <button data-testid="outside-after">outside-after</button>
      </div>,
    );

    await userEvent.click(getInsideTwo());
    await setPanelProperty("closable", false);

    await userEvent.keyboard("{Tab}");
    await expect.element(getOutsideAfter()).toHaveFocus();

    await setPanelProperty("closable", true);
    await userEvent.click(getInsideTwo());
    await userEvent.keyboard("{Tab}");

    await expect.element(getOutsideAfter()).not.toHaveFocus();
    expectFocusWithinPanel();
  });

  it("deactivates focusTrap when panel becomes closed", async () => {
    await mount(
      <div>
        <button data-testid="outside-before">outside-before</button>
        <calcite-panel closable data-testid="panel" focusTrap>
          <button data-testid="inside-1">inside-1</button>
          <button data-testid="inside-2">inside-2</button>
        </calcite-panel>
        <button data-testid="outside-after">outside-after</button>
      </div>,
    );

    await userEvent.click(getInsideTwo());
    await setPanelProperty("closed", true);

    await userEvent.keyboard("{Tab}");

    await expect.element(getOutsideAfter()).toHaveFocus();
  });

  it("reactivates focusTrap when panel is reopened", async () => {
    await mount(
      <div>
        <button data-testid="outside-before">outside-before</button>
        <calcite-panel closable data-testid="panel" focusTrap>
          <button data-testid="inside-1">inside-1</button>
          <button data-testid="inside-2">inside-2</button>
        </calcite-panel>
        <button data-testid="outside-after">outside-after</button>
      </div>,
    );

    await userEvent.click(getInsideTwo());
    await setPanelProperty("closed", true);

    await userEvent.keyboard("{Tab}");
    await expect.element(getOutsideAfter()).toHaveFocus();

    await setPanelProperty("closed", false);
    await userEvent.click(getInsideTwo());
    await userEvent.keyboard("{Tab}");

    await expect.element(getOutsideAfter()).not.toHaveFocus();
    expectFocusWithinPanel();
  });

  it("does not trap focus when focusTrapDisabled=true", async () => {
    await mount(
      <div>
        <button data-testid="outside-before">outside-before</button>
        <calcite-panel closable data-testid="panel" focusTrap focusTrapDisabled>
          <button data-testid="inside-1">inside-1</button>
          <button data-testid="inside-2">inside-2</button>
        </calcite-panel>
        <button data-testid="outside-after">outside-after</button>
      </div>,
    );

    await userEvent.click(getInsideTwo());
    await userEvent.keyboard("{Tab}");

    await expect.element(getOutsideAfter()).toHaveFocus();
  });
});

describe("closable Escape behavior", () => {
  function getPanelEl(): HTMLElement & {
    closed: boolean;
    updateComplete?: Promise<void>;
  } {
    return page.getByTestId("panel").element() as HTMLElement & {
      closed: boolean;
      updateComplete?: Promise<void>;
    };
  }

  function getContainerEl(): HTMLElement {
    return getPanelEl().shadowRoot.querySelector(`.${CSS.container}`) as HTMLElement;
  }

  function getContentWrapperEl(): HTMLElement {
    return getPanelEl().shadowRoot.querySelector(`.${CSS.contentWrapper}`) as HTMLElement;
  }

  function getCloseButtonEl(): HTMLElement {
    return getPanelEl().shadowRoot.querySelector(`#${IDS.close}`) as HTMLElement;
  }

  it("closes on Escape when closable is true and focusTrap is false (scrollable)", async () => {
    await mount(
      <calcite-panel closable data-testid="panel" style={scrollingHeightStyle}>
        {renderScrollingContent()}
      </calcite-panel>,
    );

    const panel = getPanelEl();
    const container = getContainerEl();
    const contentWrapper = getContentWrapperEl();
    let closeEventTimes = 0;

    panel.addEventListener("calcitePanelClose", () => closeEventTimes++);

    expect(panel.closed).toBe(false);
    expect(container.hidden).toBe(false);

    contentWrapper.focus();
    await userEvent.keyboard("{Escape}");
    await panel.updateComplete;

    expect(panel.closed).toBe(true);
    expect(container.hidden).toBe(true);
    expect(closeEventTimes).toBe(1);
  });

  it("closes on Escape when closable and focusTrap are true (scrollable)", async () => {
    await mount(
      <calcite-panel closable data-testid="panel" focusTrap style={scrollingHeightStyle}>
        {renderScrollingContent()}
      </calcite-panel>,
    );

    const panel = getPanelEl();
    const container = getContainerEl();
    const contentWrapper = getContentWrapperEl();
    let closeEventTimes = 0;

    panel.addEventListener("calcitePanelClose", () => closeEventTimes++);

    expect(panel.closed).toBe(false);
    expect(container.hidden).toBe(false);

    contentWrapper.focus();
    await userEvent.keyboard("{Escape}");
    await panel.updateComplete;

    expect(panel.closed).toBe(true);
    expect(container.hidden).toBe(true);
    expect(closeEventTimes).toBe(1);
  });

  it("does not close on prevented Escape when closable is true and focusTrap is false", async () => {
    await mount(
      <calcite-panel closable data-testid="panel" style={scrollingHeightStyle}>
        {renderScrollingContent()}
      </calcite-panel>,
    );

    const panel = getPanelEl();
    const container = getContainerEl();
    const contentWrapper = getContentWrapperEl();
    let closeEventTimes = 0;

    panel.addEventListener("calcitePanelClose", () => closeEventTimes++);
    panel.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
        }
      },
      { capture: true },
    );

    contentWrapper.focus();
    await userEvent.keyboard("{Escape}");
    await panel.updateComplete;

    expect(panel.closed).toBe(false);
    expect(container.hidden).toBe(false);
    expect(closeEventTimes).toBe(0);
  });

  it("does not close on prevented Escape when closable and focusTrap are true", async () => {
    await mount(
      <calcite-panel closable data-testid="panel" focusTrap style={scrollingHeightStyle}>
        {renderScrollingContent()}
      </calcite-panel>,
    );

    const panel = getPanelEl();
    const container = getContainerEl();
    const contentWrapper = getContentWrapperEl();
    let closeEventTimes = 0;

    panel.addEventListener("calcitePanelClose", () => closeEventTimes++);
    panel.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
        }
      },
      { capture: true },
    );

    contentWrapper.focus();
    await userEvent.keyboard("{Escape}");
    await panel.updateComplete;

    expect(panel.closed).toBe(false);
    expect(container.hidden).toBe(false);
    expect(closeEventTimes).toBe(0);
  });

  it("closes on Escape when closable is true and focusTrap is false (non-scrollable)", async () => {
    await mount(
      <calcite-panel closable data-testid="panel">
        non-scrolling content
      </calcite-panel>,
    );

    const panel = getPanelEl();
    const container = getContainerEl();
    const closeButton = getCloseButtonEl();
    const closeAction = closeButton as HTMLElement & { setFocus?: () => Promise<void> };
    let closeEventTimes = 0;

    panel.addEventListener("calcitePanelClose", () => closeEventTimes++);

    expect(panel.closed).toBe(false);
    expect(container.hidden).toBe(false);
    expect(closeEventTimes).toBe(0);

    await closeAction.setFocus?.();
    await userEvent.keyboard("{Escape}");
    await panel.updateComplete;

    expect(panel.closed).toBe(true);
    expect(container.hidden).toBe(true);
    expect(closeEventTimes).toBe(1);
  });

  it("closes on Escape when closable and focusTrap are true (non-scrollable)", async () => {
    await mount(
      <calcite-panel closable data-testid="panel" focusTrap>
        non-scrolling content
      </calcite-panel>,
    );

    const panel = getPanelEl();
    const container = getContainerEl();
    const closeButton = getCloseButtonEl();
    const closeAction = closeButton as HTMLElement & { setFocus?: () => Promise<void> };
    let closeEventTimes = 0;

    panel.addEventListener("calcitePanelClose", () => closeEventTimes++);

    expect(panel.closed).toBe(false);
    expect(container.hidden).toBe(false);
    expect(closeEventTimes).toBe(0);

    await closeAction.setFocus?.();
    await userEvent.keyboard("{Escape}");
    await panel.updateComplete;

    expect(panel.closed).toBe(true);
    expect(container.hidden).toBe(true);
    expect(closeEventTimes).toBe(1);
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-panel"),
    [
      {
        propertyName: "beforeClose",
        defaultValue: undefined,
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
      {
        propertyName: "collapsible",
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
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "menuPlacement",
        defaultValue: defaultEndMenuPlacement,
      },
      {
        propertyName: "menuFlipPlacements",
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
        propertyName: "focusTrap",
        defaultValue: false,
      },
      {
        propertyName: "focusTrapDisabled",
        defaultValue: false,
      },
    ],
  );
});

describe("is focusable", () => {
  describe("with scrolling content", () => {
    describe("closable", () => {
      focusable(
        () =>
          mount(
            <calcite-panel closable style={scrollingHeightStyle}>
              {renderScrollingContent()}
            </calcite-panel>,
          ),
        {
          shadowFocusTargetSelector: "calcite-action",
        },
      );
    });

    describe("should focus on container", () => {
      focusable(
        () =>
          mount(
            <calcite-panel style={scrollingHeightStyle}>{renderScrollingContent()}</calcite-panel>,
          ),
        {
          shadowFocusTargetSelector: `.${CSS.contentWrapper}`,
        },
      );
    });
  });

  describe("without scrolling content", () => {
    describe("closable", () => {
      focusable(() => mount(<calcite-panel closable>non-scrolling content</calcite-panel>), {
        shadowFocusTargetSelector: "calcite-action",
      });
    });

    describe("should not focus on container", () => {
      focusable(() => mount(<calcite-panel>non-scrolling-content</calcite-panel>), {
        focusTargetSelector: "body",
      });
    });
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-panel"),
    [
      {
        propertyName: "headingLevel",
        value: 2,
      },
      {
        propertyName: "collapsible",
        value: true,
      },
      {
        propertyName: "collapsed",
        value: true,
      },
      {
        propertyName: "overlayPositioning",
        value: "fixed",
      },
      {
        propertyName: "menuPlacement",
        value: "bottom",
      },
      {
        propertyName: "icon",
        value: "x",
      },
      {
        propertyName: "iconFlipRtl",
        value: "true",
      },
      {
        propertyName: "focusTrap",
        value: true,
      },
      {
        propertyName: "focusTrapDisabled",
        value: true,
      },
    ],
  );
});

describe("role", () => {
  function getContainerRole(el: HTMLElement): string | null {
    return (
      el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)?.getAttribute("role") ?? null
    );
  }

  it("sets container role to dialog when closable", async () => {
    const { el } = await mount(<calcite-panel closable>content</calcite-panel>);

    expect(getContainerRole(el)).toBe("dialog");
    expect(el.getAttribute("role")).toBeNull();
  });

  it("sets container role to article when not closable", async () => {
    const { el } = await mount(<calcite-panel>content</calcite-panel>);

    expect(getContainerRole(el)).toBe("article");
    expect(el.getAttribute("role")).toBeNull();
  });

  it("updates container role when closable changes", async () => {
    const { el, component } = await mount(<calcite-panel>content</calcite-panel>);

    expect(getContainerRole(el)).toBe("article");

    el.setAttribute("closable", "");
    await component.updateComplete;
    expect(getContainerRole(el)).toBe("dialog");

    el.removeAttribute("closable");
    await component.updateComplete;
    expect(getContainerRole(el)).toBe("article");
  });

  it("uses article role when disableDialogRole is true", async () => {
    const { el, component } = await mount(<calcite-panel closable>content</calcite-panel>);
    const panel = el as Panel["el"];

    expect(getContainerRole(el)).toBe("dialog");

    panel.disableDialogRole = true;
    await component.updateComplete;
    expect(getContainerRole(el)).toBe("article");

    panel.disableDialogRole = false;
    await component.updateComplete;
    expect(getContainerRole(el)).toBe("dialog");
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-panel"));
});

describe("renders", () => {
  renders(() => mount(<calcite-panel>content</calcite-panel>), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-panel"), SLOTS);
});

describe("header slots", () => {
  it("renders heading and description properties when heading/description slots are empty", async () => {
    await mount(
      <calcite-panel description="test description" heading="test heading">
        <span slot="heading" />
        <span slot="description" />
      </calcite-panel>,
    );

    await expect.element(page.getByText("test heading")).toBeVisible();
    await expect.element(page.getByText("test description")).toBeVisible();
  });

  it("renders slotted header heading and description in the default header with precedence over properties", async () => {
    await mount(
      <calcite-panel description="Property description" heading="Property heading">
        <span slot="heading">
          <strong>HTML heading</strong>
        </span>
        <span slot="description">
          <em>HTML description</em>
        </span>
      </calcite-panel>,
    );

    const slottedHeading = page.getByText("HTML heading");
    const slottedDescription = page.getByText("HTML description");

    await expect.element(slottedHeading).toBeVisible();
    await expect.element(slottedDescription).toBeVisible();
    await expect.element(page.getByText("Property heading")).not.toBeInTheDocument();
    await expect.element(page.getByText("Property description")).not.toBeInTheDocument();
  });

  it("renders non-empty slotted heading and description content over properties", async () => {
    await mount(
      <calcite-panel description="test description" heading="test heading">
        <span slot="heading">slotted heading</span>
        <span slot="description">slotted description</span>
      </calcite-panel>,
    );

    await expect.element(page.getByText("slotted heading")).toBeVisible();
    await expect.element(page.getByText("slotted description")).toBeVisible();
    await expect.element(page.getByText("test heading")).not.toBeInTheDocument();
    await expect.element(page.getByText("test description")).not.toBeInTheDocument();
  });

  it("conditionally renders heading/description wrappers and updates when slotted content changes", async () => {
    const { component, el } = await mount(<calcite-panel heading="Property heading" />);

    await expect.element(page.getByText("Property heading")).toBeVisible();
    el.innerHTML = "<span slot='description'>Slotted description</span>";

    await component.updateComplete;

    await expect.element(page.getByText("Slotted description")).toBeVisible();
  });
});

describe("floating-ui", () => {
  describe("handles action-menu placement and flipPlacements", () => {
    handlesActionMenuPlacements(() =>
      mount(
        <calcite-panel>
          <calcite-action icon="banana" slot={SLOTS.headerMenuActions} text="test" />
        </calcite-panel>,
      ),
    );
  });

  describe("delegates to floating-ui-owner component", () => {
    delegatesToFloatingUiOwningComponent(
      () =>
        mount(
          <calcite-panel>
            <calcite-action icon="measure" slot="header-menu-actions" text="measure" text-enabled />
          </calcite-panel>,
        ),
      "calcite-action-menu",
    );
  });
});

describe("translation support", () => {
  t9n(() => mount("calcite-panel"));
});

describe("disabled", () => {
  describe("with scrolling content", () => {
    disabled(
      () => mount(<calcite-panel style={scrolling.style}>{scrolling.render()}</calcite-panel>),
      {
        focusTarget: {
          tab: "calcite-panel",
          click: "calcite-panel",
        },
      },
    );

    describe("closable", () => {
      disabled(
        () =>
          mount(
            <calcite-panel closable style={scrolling.style}>
              {scrolling.render()}
            </calcite-panel>,
          ),
        {
          focusTarget: {
            tab: "calcite-panel",
            click: "body",
          },
        },
      );
    });
  });

  describe("without scrolling content", () => {
    disabled(() => mount(<calcite-panel>non-scrolling content</calcite-panel>), {
      focusTarget: "none",
    });

    describe("closable", () => {
      disabled(() => mount(<calcite-panel closable>non-scrolling content</calcite-panel>), {
        focusTarget: "none",
      });
    });
  });
});
