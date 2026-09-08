import { h, Fragment, JsxNode } from "@arcgis/lumina";
import { beforeEach, describe, expect, it, vi } from "vitest";
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
  openClose,
  accessible,
  scalePropagates,
  themed,
} from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { FloatingCSS } from "../../utils/floating-ui";
import { CSS } from "./resources";
import { Popover } from "./popover";
import { logger } from "../../utils/logger";

mockConsole();

beforeEach(() => {
  vi.spyOn(logger, "warn");
});

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <>
          <calcite-popover label="test" referenceElement="ref" />
          <div id="ref">😄</div>
        </>,
      ),
    );
  });

  describe("when open", () => {
    accessible(() =>
      mount(
        <>
          <calcite-popover label="test" open referenceElement="ref" />
          <div id="ref">😄</div>
        </>,
      ),
    );
  });

  describe("with close button", () => {
    accessible(() =>
      mount(
        <>
          <calcite-popover closable label="test" open referenceElement="ref" />
          <div id="ref">😄</div>
        </>,
      ),
    );
  });
});

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
        propertyName: "scale",
        defaultValue: "m",
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

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-popover closable />, mountOptions), {
    targetSelector: "calcite-action",
  });
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
        mount<Popover>(
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

  describe("openClose", () => {
    openClose((mountOptions) =>
      mount(
        <>
          <calcite-popover placement="auto" reference-element="ref">
            content
          </calcite-popover>
          <div id="ref">referenceElement</div>
        </>,
        mountOptions,
      ),
    );
  });
});

describe("theme", () => {
  describe("default", () => {
    themed(
      () =>
        mount(
          <calcite-popover heading="I'm a heading in the header using the 'heading' prop!">
            Lorem Ipsum
          </calcite-popover>,
        ),
      {
        "--calcite-popover-background-color": [
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
          },
          {
            shadowSelector: `.${FloatingCSS.arrow}`,
            targetProp: "fill",
          },
        ],
        "--calcite-popover-border-color": [
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "borderColor",
          },
          {
            shadowSelector: `.${CSS.header}`,
            targetProp: "borderBlockEndColor",
          },
          {
            shadowSelector: `.${FloatingCSS.arrowStroke}`,
            targetProp: "stroke",
          },
        ],
        "--calcite-popover-corner-radius": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderRadius",
        },
        "--calcite-popover-max-size-x": {
          shadowSelector: `.${CSS.positionContainer}`,
          targetProp: "maxInlineSize",
        },
        "--calcite-popover-text-color": [
          {
            shadowSelector: `.${CSS.heading}`,
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.headerContainer}`,
            targetProp: "color",
          },
        ],
      },
    );
  });
});

describe("warning messages", () => {
  it("does not warn if reference element is present", async () => {
    await mount(
      <>
        <calcite-popover reference-element="ref">content</calcite-popover>
        <div id="ref">referenceElement</div>
      </>,
    );

    expect(logger.warn).not.toHaveBeenCalled();
  });

  it("does not warn after removal", async () => {
    const { el, reRender } = await mount(
      <>
        <calcite-popover reference-element="ref">content</calcite-popover>
        <div id="ref">referenceElement</div>
      </>,
    );

    el.remove();
    await reRender();

    expect(logger.warn).not.toHaveBeenCalled();
  });

  it("warns if reference element is not present", async () => {
    const { el } = await mount(
      <>
        <calcite-popover reference-element="non-existent-ref">content</calcite-popover>
      </>,
    );

    expect(logger.warn).toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringMatching(new RegExp(`reference-element id "non-existent-ref" was not found`)),
      { el },
    );
  });
});
