import { h, Fragment, JsxNode } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { TemplateResult } from "lit/html.js";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  focusable,
  hidden,
  renders,
  floatingUIOwner,
  t9n,
  topLayer,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";
import { Popover } from "./popover";

mockConsole();

describe("defaults", () => {
  defaults(
    () => mount("calcite-popover"),
    [
      {
        propertyName: "placement",
        defaultValue: "auto",
      },
      {
        propertyName: "referenceElement",
        defaultValue: undefined,
      },
      {
        propertyName: "offsetDistance",
        defaultValue: 6,
      },
      {
        propertyName: "offsetSkidding",
        defaultValue: 0,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "closable",
        defaultValue: false,
      },
      {
        propertyName: "flipDisabled",
        defaultValue: false,
      },
      {
        propertyName: "pointerDisabled",
        defaultValue: false,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
    ],
  );
});

describe("is focusable", () => {
  function renderPopover(content?: JsxNode, closable = false): TemplateResult {
    return (
      <>
        <calcite-popover closable={closable} open reference-element="ref">
          {content}
        </calcite-popover>
        <button id="ref">Button</button>
      </>
    );
  }

  const contentButtonClass = "my-button";

  function renderButton(): JsxNode {
    return <button class={contentButtonClass}>My Button</button>;
  }

  describe("should focus content by default", () => {
    focusable(() => mount(renderPopover(renderButton())), {
      focusTargetSelector: `.${contentButtonClass}`,
    });
  });

  describe("should focus close button", () => {
    focusable(() => mount(renderPopover("Hello World", true)), {
      shadowFocusTargetSelector: `.${CSS.closeButton}`,
    });
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount(<calcite-popover open />));
});

describe("renders", () => {
  describe("when closed", () => {
    renders(
      () =>
        mount(
          <>
            <calcite-popover label="test" reference-element="ref">
              content
            </calcite-popover>
            <div id="ref">😄</div>
          </>,
        ),
      { display: "contents", visible: false },
    );
  });

  describe("when open", () => {
    renders(
      () =>
        mount(
          <>
            <calcite-popover label="test" open reference-element="ref">
              content
            </calcite-popover>
            <div id="ref">😄</div>
          </>,
        ),
      {
        display: "contents",
      },
    );
  });
});

describe("floating-ui", () => {
  describe("owns a floating-ui", () => {
    floatingUIOwner(
      () =>
        mount(
          <>
            <calcite-popover placement="auto" reference-element="ref">
              content
            </calcite-popover>
            <div id="ref">referenceElement</div>
          </>,
        ),
      "open",
      { shadowSelector: `.${CSS.positionContainer}` },
    );
  });
});

describe("top layer placement", () => {
  topLayer(() =>
    mount(
      <>
        <calcite-popover reference-element="ref">content</calcite-popover>
        <div id="ref">referenceElement</div>
      </>,
    ),
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-popover"));
});

describe("auto-close", () => {
  it("should autoClose popovers with a shared referenceElement", async () => {
    await mount(
      <div>
        <p>
          Some text
          <button id="ref1">Button</button>
        </p>
        <p>
          Some more text
          <button id="ref2">Button</button>
        </p>
        <calcite-popover auto-close id="popover1" open reference-element="ref1">
          Content 1
        </calcite-popover>
        <calcite-popover auto-close id="popover2" open reference-element="ref1">
          Content 2
        </calcite-popover>
        <calcite-popover auto-close id="popover3" open reference-element="ref1">
          Content 3
        </calcite-popover>
      </div>,
    );

    const popover1 = page
      .getByText("Content 1")
      .element()
      ?.closest("calcite-popover") as Popover | null;
    const popover2 = page
      .getByText("Content 2")
      .element()
      ?.closest("calcite-popover") as Popover | null;
    const popover3 = page
      .getByText("Content 3")
      .element()
      ?.closest("calcite-popover") as Popover | null;
    const [ref1, ref2] = page.getByRole("button", { name: "Button" }).all();

    if (!popover1 || !popover2 || !popover3) {
      throw new Error("Expected all popover elements to be present");
    }

    expect(popover1.open).toBe(true);
    expect(popover2.open).toBe(true);
    expect(popover3.open).toBe(true);

    await userEvent.click(ref2);

    expect(popover1.open).toBe(false);
    expect(popover2.open).toBe(false);
    expect(popover3.open).toBe(false);

    await userEvent.click(ref1);

    expect(popover1.open).toBe(true);
    expect(popover2.open).toBe(true);
    expect(popover3.open).toBe(true);
  });
});
