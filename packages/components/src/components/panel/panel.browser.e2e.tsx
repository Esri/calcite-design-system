import { h, Fragment, JsxNode } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
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
} from "../../tests/commonTests/browser";
import { defaultEndMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";
import { scrolling } from "../../tests/browser/utils/content";
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
        <calcite-action-bar slot="${SLOTS.actionBar}">
          <calcite-action-group>
            <calcite-action icon="plus" text="Add" />
            <calcite-action icon="save" text="Save" />
            <calcite-action icon="layers" text="Layers" />
          </calcite-action-group>
        </calcite-action-bar>
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
    ],
  );
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
