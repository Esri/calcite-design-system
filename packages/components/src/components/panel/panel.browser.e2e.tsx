import { h, Fragment, JsxNode } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
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
  accessible,
  scalePropagates,
  topLayer,
  themed,
} from "../../tests/commonTests/browser";
import { defaultEndMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";
import { scrolling } from "../../tests/browser/utils/content";
import type { Panel } from "./panel";
import { CSS, SLOTS } from "./resources";

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

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-panel>
        <calcite-action-bar slot={SLOTS.actionBar}>
          <calcite-action-group>
            <calcite-action icon="plus" text="Add" />
            <calcite-action icon="save" text="Save" />
            <calcite-action icon="layers" text="Layers" />
          </calcite-action-group>
        </calcite-action-bar>
        <div slot={SLOTS.headerTop}>test top</div>
        <div slot={SLOTS.headerActionsStart}>test start</div>
        <div slot={SLOTS.headerContent}>test content</div>
        <div slot={SLOTS.headerActionsEnd}>test end</div>
        <p>Content</p>
        <calcite-button slot={SLOTS.footerStart}>test button 1</calcite-button>
        <calcite-button slot={SLOTS.footerEnd}>test button 2</calcite-button>
      </calcite-panel>,
    ),
  );
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
        propertyName: "focusTrapEnabled",
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
        propertyName: "focusTrapEnabled",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-panel"));
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-panel closable />, mountOptions), {
    targetSelector: "calcite-action, calcite-action-menu",
  });
});

describe("renders", () => {
  renders(() => mount(<calcite-panel>content</calcite-panel>), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-panel"), SLOTS);
});

describe("a11y attributes", () => {
  it("should omit aria-busy when not loading and set it when loading", async () => {
    const { reRender, el } = await mount("calcite-panel");
    const container = page.getByRole("article");

    await expect.element(container).not.toHaveAttribute("aria-busy");

    el.loading = true;
    await reRender();

    await expect.element(container).toHaveAttribute("aria-busy", "true");
  });
});

describe("header slots", () => {
  it("renders one border when header-top is the only header content", async () => {
    const { component } = await mount(
      <calcite-panel>
        <div slot={SLOTS.headerTop}>Header top</div>
      </calcite-panel>,
    );

    const header = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.header}`)!;
    const headerTop = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.headerTop}`)!;

    expect(getComputedStyle(header).borderBlockEndWidth).toBe("0px");
    expect(getComputedStyle(headerTop).borderBlockEndWidth).toBe("1px");
  });

  it("renders one border when header-top is combined with action-bar", async () => {
    const { component } = await mount(
      <calcite-panel>
        <div slot={SLOTS.headerTop}>Header top</div>
        <calcite-action-bar slot={SLOTS.actionBar} />
      </calcite-panel>,
    );

    const header = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.header}`)!;
    const headerTop = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.headerTop}`)!;
    const headerContainer = component.el.shadowRoot!.querySelector<HTMLElement>(
      `.${CSS.headerContainer}`,
    )!;

    expect(getComputedStyle(header).borderBlockEndWidth).toBe("1px");
    expect(getComputedStyle(headerTop).borderBlockEndWidth).toBe("1px");
    expect(getComputedStyle(headerContainer).borderBlockEndWidth).toBe("0px");
  });

  it("renders one border when header-top is combined with content-top", async () => {
    const { component } = await mount(
      <calcite-panel>
        <div slot={SLOTS.headerTop}>Header top</div>
        <div slot={SLOTS.contentTop}>Content top</div>
      </calcite-panel>,
    );

    const header = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.header}`)!;
    const headerTop = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.headerTop}`)!;
    const contentTop = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.contentTop}`)!;

    expect(getComputedStyle(header).borderBlockEndWidth).toBe("1px");
    expect(getComputedStyle(headerTop).borderBlockEndWidth).toBe("1px");
    expect(getComputedStyle(contentTop).borderBlockStartWidth).toBe("0px");
  });

  it("preserves independent borders for action-bar and content-top without header-top", async () => {
    const { component } = await mount(
      <calcite-panel>
        <calcite-action-bar slot={SLOTS.actionBar} />
        <div slot={SLOTS.contentTop}>Content top</div>
      </calcite-panel>,
    );

    const header = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.header}`)!;
    const headerContainer = component.el.shadowRoot!.querySelector<HTMLElement>(
      `.${CSS.headerContainer}`,
    )!;
    const contentTop = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.contentTop}`)!;

    expect(getComputedStyle(header).borderBlockEndWidth).toBe("1px");
    expect(getComputedStyle(headerContainer).borderBlockEndWidth).toBe("0px");
    expect(getComputedStyle(contentTop).borderBlockStartWidth).toBe("1px");
  });

  it("keeps separate borders when header-top, action-bar, and content-top are combined", async () => {
    const { component } = await mount(
      <calcite-panel>
        <div slot={SLOTS.headerTop}>Header top</div>
        <calcite-action-bar slot={SLOTS.actionBar} />
        <div slot={SLOTS.contentTop}>Content top</div>
      </calcite-panel>,
    );

    const header = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.header}`)!;
    const headerTop = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.headerTop}`)!;
    const contentTop = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.contentTop}`)!;

    expect(getComputedStyle(header).borderBlockEndWidth).toBe("1px");
    expect(getComputedStyle(headerTop).borderBlockEndWidth).toBe("1px");
    expect(getComputedStyle(contentTop).borderBlockStartWidth).toBe("1px");
  });

  it("keeps the outer border when header-top, header row, and content-top are combined", async () => {
    const { component } = await mount(
      <calcite-panel>
        <div slot={SLOTS.headerTop}>Header top</div>
        <span slot={SLOTS.heading}>Heading</span>
        <div slot={SLOTS.contentTop}>Content top</div>
      </calcite-panel>,
    );

    const header = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.header}`)!;
    const headerTop = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.headerTop}`)!;
    const contentTop = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.contentTop}`)!;

    expect(getComputedStyle(header).borderBlockEndWidth).toBe("1px");
    expect(getComputedStyle(headerTop).borderBlockEndWidth).toBe("1px");
    expect(getComputedStyle(contentTop).borderBlockStartWidth).toBe("1px");
  });

  it("renders the header-row separator before action-bar when header-top is combined with both", async () => {
    const { component } = await mount(
      <calcite-panel>
        <div slot={SLOTS.headerTop}>Header top</div>
        <span slot={SLOTS.heading}>Heading</span>
        <calcite-action-bar slot={SLOTS.actionBar} />
      </calcite-panel>,
    );

    const header = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.header}`)!;
    const headerTop = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.headerTop}`)!;
    const headerContainer = component.el.shadowRoot!.querySelector<HTMLElement>(
      `.${CSS.headerContainer}`,
    )!;

    expect(getComputedStyle(header).borderBlockEndWidth).toBe("1px");
    expect(getComputedStyle(headerTop).borderBlockEndWidth).toBe("1px");
    expect(getComputedStyle(headerContainer).borderBlockEndWidth).toBe("1px");
  });

  it("renders header-top content above the header actions", async () => {
    const { component } = await mount(
      <calcite-panel closable>
        <div slot={SLOTS.headerTop}>Header top</div>
      </calcite-panel>,
    );

    const headerTop = component.el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.headerTop}`)!;
    const headerContainer = component.el.shadowRoot!.querySelector<HTMLElement>(
      `.${CSS.headerContainer}`,
    )!;

    await expect.element(page.getByText("Header top")).toBeVisible();

    const headerTopRect = headerTop.getBoundingClientRect();
    const headerContainerRect = headerContainer.getBoundingClientRect();
    const panelRect = component.el.getBoundingClientRect();

    expect(headerTopRect.width).toBe(panelRect.width);
    expect(headerTopRect.bottom).toBeLessThanOrEqual(headerContainerRect.top);
    expect(getComputedStyle(headerTop).borderBlockEndWidth).toBe("1px");
  });

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

describe("top layer placement", () => {
  topLayer(
    () =>
      mount(
        <calcite-panel>
          <calcite-action icon="plus" slot={SLOTS.headerMenuActions} text="Add" />
        </calcite-panel>,
      ),
    {
      delegatedTopLayer: true,
      openProp: "menuOpen",
      topLayerTarget: page.getBySelector("calcite-panel [popover]"),
    },
  );
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

describe("theme", () => {
  themed(
    () =>
      mount(
        <calcite-panel
          closable
          collapsible
          description="Something great about this"
          heading="Terms and conditions"
          icon="banana"
        >
          <calcite-action icon="banana" slot="header-menu-actions" text="banana" text-enabled />
          <calcite-action icon="measure" slot="header-menu-actions" text="measure" text-enabled />
          <calcite-action icon="question" slot="header-actions-end" text="Layers" />
          <div slot="header-top">Header top</div>
          <div slot="content-top">To continue), you must agree to the terms</div>
          <calcite-label
            layout="inline-space-between"
            slot="content-bottom"
            style="--calcite-label-margin-bottom: 0"
          >
            <calcite-checkbox />I agree to the terms
          </calcite-label>
          <p>
            Curabitur mauris quam, tempor sit amet massa sed, mattis blandit diam. Proin dignissim
            leo vitae quam fringilla viverra. Ut eget gravida magna, et tincidunt dui. Nullam a
            finibus ante, eu dignissim eros. Aenean sodales sollicitudin dui in fermentum. Fusce
            egestas erat nec eros sodales ornare. Ut malesuada est tortor, vitae semper turpis
            rutrum at. Donec suscipit, nulla in euismod luctus, nulla sapien interdum tortor, a
            iaculis elit mi sed lectus. Morbi in congue metus, non imperdiet ex. Nunc et neque
            tempor, porttitor est sed, vestibulum risus. Integer non erat libero.
          </p>
          <p>
            Cras sagittis vel neque sed efficitur. Vestibulum mattis diam eget urna condimentum
            tempus. Donec malesuada velit sit amet metus faucibus pharetra. Sed sit amet massa
            facilisis, porttitor nunc vitae, sollicitudin mauris. Nullam nec rhoncus augue. Praesent
            rhoncus varius sapien, sit amet porttitor nisl varius eu. Pellentesque at eros eget
            metus dignissim lacinia. Sed sed justo eget sapien ultrices commodo. Donec eget pretium
            urna. Vestibulum ut tortor ut quam viverra dictum. Morbi ut turpis velit. Phasellus
            maximus lacus nunc, ac consequat est varius in. Nullam facilisis, purus ut aliquet
            condimentum, est tortor accumsan justo, at sagittis urna dolor eget lacus. Interdum et
            malesuada fames ac ante ipsum primis in faucibus.
          </p>
          <p>
            Curabitur mauris quam, tempor sit amet massa sed, mattis blandit diam. Proin dignissim
            leo vitae quam fringilla viverra. Ut eget gravida magna, et tincidunt dui. Nullam a
            finibus ante, eu dignissim eros. Aenean sodales sollicitudin dui in fermentum. Fusce
            egestas erat nec eros sodales ornare. Ut malesuada est tortor, vitae semper turpis
            rutrum at. Donec suscipit, nulla in euismod luctus, nulla sapien interdum tortor, a
            iaculis elit mi sed lectus. Morbi in congue metus, non imperdiet ex. Nunc et neque
            tempor, porttitor est sed, vestibulum risus. Integer non erat libero.
          </p>
          <calcite-button slot="footer-end"> I'm done </calcite-button>
        </calcite-panel>,
      ),
    {
      "--calcite-panel-corner-radius": {
        targetProp: "borderRadius",
      },
      "--calcite-panel-heading-text-color": {
        shadowSelector: `.${CSS.heading}`,
        targetProp: "color",
      },
      "--calcite-panel-description-text-color": {
        shadowSelector: `.${CSS.description}`,
        targetProp: "color",
      },
      "--calcite-panel-icon-color": {
        shadowSelector: `.${CSS.icon}`,
        targetProp: "--calcite-icon-color",
      },
      "--calcite-panel-background-color": {
        shadowSelector: `.${CSS.contentWrapper}`,
        targetProp: "backgroundColor",
      },
      "--calcite-panel-header-action-background-color": {
        shadowSelector: `.${CSS.menuAction}`,
        targetProp: "--calcite-action-background-color",
      },
      "--calcite-panel-header-action-background-color-hover": {
        shadowSelector: `.${CSS.menuAction}`,
        targetProp: "--calcite-action-background-color-hover",
        state: "hover",
      },
      "--calcite-panel-header-action-background-color-press": {
        shadowSelector: `.${CSS.menuAction}`,
        targetProp: "--calcite-action-background-color-press",
        state: { press: `calcite-panel >>> .${CSS.menuAction}` },
      },
      "--calcite-panel-header-action-text-color": {
        shadowSelector: `.${CSS.menuAction}`,
        targetProp: "--calcite-action-text-color",
      },
      "--calcite-panel-header-action-text-color-press": {
        shadowSelector: `.${CSS.menuAction}`,
        targetProp: "--calcite-action-text-color-press",
        state: { press: `calcite-panel >>> .${CSS.menuAction}` },
      },
      "--calcite-panel-header-background-color": {
        shadowSelector: `.${CSS.header}`,
        targetProp: "backgroundColor",
      },
      "--calcite-panel-footer-background-color": {
        shadowSelector: `.${CSS.footer}`,
        targetProp: "backgroundColor",
      },
      "--calcite-panel-border-color": [
        {
          shadowSelector: `.${CSS.header}`,
          targetProp: "borderBlockEndColor",
        },
        {
          shadowSelector: `.${CSS.contentTop}`,
          targetProp: "borderBlockStartColor",
        },
        {
          shadowSelector: `.${CSS.contentBottom}`,
          targetProp: "borderBlockStartColor",
        },
        {
          shadowSelector: `.${CSS.footer}`,
          targetProp: "borderBlockStartColor",
        },
      ],
      "--calcite-panel-space": {
        shadowSelector: `.${CSS.contentWrapper}`,
        targetProp: "padding",
      },
      "--calcite-panel-footer-space": {
        shadowSelector: `.${CSS.footer}`,
        targetProp: "padding",
      },
      "--calcite-panel-content-space": {
        shadowSelector: `.${CSS.contentWrapper}`,
        targetProp: "padding",
      },
      "--calcite-panel-content-top-space": {
        shadowSelector: `.${CSS.contentTop}`,
        targetProp: "padding",
      },
      "--calcite-panel-content-bottom-space": {
        shadowSelector: `.${CSS.contentBottom}`,
        targetProp: "padding",
      },
      "--calcite-panel-header-top-space": {
        shadowSelector: `.${CSS.headerTop}`,
        targetProp: "padding",
      },
    },
  );
  themed(
    () =>
      mount(
        <calcite-panel
          closable
          collapsible
          description="Something great about this"
          heading="Terms and conditions"
        >
          <div slot="header-content">Custom header content</div>
          <p>
            Curabitur mauris quam), tempor sit amet massa sed, mattis blandit diam. Proin dignissim
            leo vitae quam fringilla viverra. Ut eget gravida magna, et tincidunt dui. Nullam a
            finibus ante, eu dignissim eros. Aenean sodales sollicitudin dui in fermentum. Fusce
            egestas erat nec eros sodales ornare. Ut malesuada est tortor, vitae semper turpis
            rutrum at. Donec suscipit, nulla in euismod luctus, nulla sapien interdum tortor, a
            iaculis elit mi sed lectus. Morbi in congue metus, non imperdiet ex. Nunc et neque
            tempor, porttitor est sed, vestibulum risus. Integer non erat libero.
          </p>
          <calcite-button slot="footer-end"> I'm done </calcite-button>
        </calcite-panel>,
      ),
    {
      "--calcite-panel-header-content-space": {
        shadowSelector: `.${CSS.headerSlottedContent}`,
        targetProp: "padding",
      },
    },
  );
});

describe("deprecated", () => {
  themed(() => mount(<calcite-panel heading="Hello World" icon="smile" />), {
    "--calcite-ui-icon-color": {
      shadowSelector: `.${CSS.icon}`,
      targetProp: "--calcite-icon-color",
    },
  });
});

describe("focus trap", () => {
  it("applies dialog semantics only when focus trap is enabled", async () => {
    const { component } = await mount<Panel>(<calcite-panel closable heading="Panel heading" />);

    await expect
      .element(page.getByRole("dialog", { name: "Panel heading" }))
      .not.toBeInTheDocument();

    component.el.focusTrapEnabled = true;

    await expect.element(page.getByRole("dialog", { name: "Panel heading" })).toBeInTheDocument();
  });

  it("does not apply dialog semantics when not closable", async () => {
    await mount<Panel>(<calcite-panel heading="Panel heading" />);

    await expect
      .element(page.getByRole("dialog", { name: "Panel heading" }))
      .not.toBeInTheDocument();
    await expect.element(page.getByRole("article")).toBeInTheDocument();
  });

  it("does not close or emit close on Escape when not closable", async () => {
    const { component } = await mount<Panel>(
      <calcite-panel heading="Panel heading">
        <button type="button">inside one</button>
      </calcite-panel>,
    );

    let closeEventCount = 0;
    component.el.addEventListener("calcitePanelClose", () => closeEventCount++);

    await expect(component.el.setFocus()).resolves.toBeUndefined();
    await expect.element(page.getByRole("article")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    expect(component.el.closed).toBe(false);
    expect(closeEventCount).toBe(0);
  });

  it("deactivates focus trap and dialog semantics when focusTrapEnabled is set to false", async () => {
    const { component } = await mount<Panel>(
      <>
        <calcite-panel closable focusTrapEnabled heading="Panel heading">
          <button type="button">inside one</button>
          <button type="button">inside two</button>
        </calcite-panel>
        <button type="button">outside control</button>
      </>,
    );

    const insideTwo = page.getByText("inside two", { exact: true });
    const outsideControl = page.getByText("outside control", { exact: true });

    await expect.element(page.getByRole("dialog", { name: "Panel heading" })).toBeInTheDocument();

    component.el.focusTrapEnabled = false;

    await expect
      .element(page.getByRole("dialog", { name: "Panel heading" }))
      .not.toBeInTheDocument();
    await expect.element(page.getByRole("article")).toBeInTheDocument();

    await expect(component.el.setFocus()).resolves.toBeUndefined();

    await userEvent.tab();
    await userEvent.tab();
    await expect.element(insideTwo).toHaveFocus();

    await userEvent.tab();
    await expect.element(outsideControl).toHaveFocus();
  });

  it("accepts focusTrapOptions.extraContainers when updateFocusTrapElements is called", async () => {
    const { component } = await mount<Panel>(
      <>
        <calcite-panel closable focusTrapEnabled heading="Panel heading">
          <button type="button">inside one</button>
          <button type="button">inside two</button>
        </calcite-panel>
        <button id="panel-outside-control" type="button">
          outside control
        </button>
      </>,
    );

    const outsideControl = page.getByText("outside control", { exact: true });
    const outsideControlEl = component.el.ownerDocument.getElementById(
      "panel-outside-control",
    ) as HTMLButtonElement;

    component.el.focusTrapOptions = { extraContainers: [outsideControlEl] };
    await expect(component.el.updateFocusTrapElements()).resolves.toBeUndefined();
    await expect(outsideControl).toBeInTheDocument();
  });
});

it("closes on Escape through keyboard interaction when closable", async () => {
  const { el } = await mount<Panel>(
    <calcite-panel closable heading="Panel heading">
      <button type="button">inside one</button>
    </calcite-panel>,
  );

  const closeHandler = vi.fn();
  el.addEventListener("calcitePanelClose", closeHandler);

  await expect(el.setFocus()).resolves.toBeUndefined();

  await userEvent.keyboard("{Escape}");

  expect(el.closed).toBe(true);
  expect(closeHandler).toHaveBeenCalledTimes(1);
});
