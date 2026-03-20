import { h, Fragment } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { it, expect, beforeAll, afterAll, describe, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  hidden,
  renders,
  floatingUIOwner,
  topLayer,
  openClose,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { css } from "../../../support/formatting";
import {
  HOVER_OPEN_DELAY_MS,
  HOVER_CLOSE_DELAY_MS,
} from "../../controllers/useReferenceElement/manager";
import { CSS } from "./resources";
import { Tooltip } from "./tooltip";

mockConsole();

describe("pointer movement toggling", () => {
  async function dispatchPointerEvent(selector: string): Promise<void> {
    const eventOptions = { bubbles: true, cancelable: true };
    const target: EventTarget = document.querySelector(selector)!;
    target.dispatchEvent(new PointerEvent("pointermove", eventOptions));
  }

  interface PointerMoveOptions {
    delay: number;
    selector: string;
    property: string;
    value: boolean;
  }

  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should open hovered tooltip while pointer is moving", async () => {
    const { el: tooltip } = await mount<Tooltip>(
      <div>
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
      </div>,
    );

    expect(tooltip.open).toBe(false);

    const pointerMoves: PointerMoveOptions[] = [
      {
        delay: 0,
        property: "open",
        value: false,
        selector: "#ref",
      },
      {
        delay: HOVER_OPEN_DELAY_MS * 0.25,
        property: "open",
        value: false,
        selector: "#ref",
      },
      {
        delay: HOVER_OPEN_DELAY_MS * 0.25,
        property: "open",
        value: false,
        selector: "#ref",
      },
      {
        delay: HOVER_OPEN_DELAY_MS,
        property: "open",
        value: true,
        selector: "#ref",
      },
      {
        delay: HOVER_OPEN_DELAY_MS + HOVER_OPEN_DELAY_MS * 0.5,
        property: "open",
        value: true,
        selector: "#ref",
      },
    ];

    for (const pointerMove of pointerMoves) {
      const { delay, selector } = pointerMove;
      vi.advanceTimersByTime(delay);
      await dispatchPointerEvent(selector);
      expect(await tooltip[pointerMove.property]).toBe(pointerMove.value);
    }
  });

  it("should close non hovered tooltip while pointer is moving", async () => {
    const { el: tooltip } = await mount<Tooltip>(
      <div>
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <p>
          <button id="ref">Button</button>
        </p>
        <p>
          <button id="ref2">No tooltip button</button>
        </p>
      </div>,
    );

    expect(tooltip.open).toBe(false);

    const pointerMoves: PointerMoveOptions[] = [
      {
        delay: 0,
        property: "open",
        value: false,
        selector: "#ref",
      },
      {
        delay: HOVER_CLOSE_DELAY_MS,
        property: "open",
        value: true,
        selector: "#ref",
      },
      {
        delay: HOVER_CLOSE_DELAY_MS * 0.25,
        property: "open",
        value: true,
        selector: "#ref2",
      },
      {
        delay: HOVER_CLOSE_DELAY_MS * 0.5,
        property: "open",
        value: true,
        selector: "#ref2",
      },
      {
        delay: HOVER_CLOSE_DELAY_MS * 0.5,
        property: "open",
        value: false,
        selector: "#ref2",
      },
    ];

    for (const pointerMove of pointerMoves) {
      const { delay, selector } = pointerMove;
      vi.advanceTimersByTime(delay);
      await dispatchPointerEvent(selector);
      expect(await tooltip[pointerMove.property]).toBe(pointerMove.value);
    }
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-tooltip"),
    [
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "placement",
        defaultValue: "auto",
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
        propertyName: "referenceElement",
        defaultValue: undefined,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount(<calcite-tooltip open />));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <>
          <calcite-tooltip open placement="auto" reference-element="ref">
            content
          </calcite-tooltip>
          <button id="ref">referenceElement</button>
        </>,
      ),
    { display: "contents" },
  );
});

describe("floating-ui", () => {
  describe("owns a floating-ui", () => {
    floatingUIOwner(
      () =>
        mount(
          <>
            <calcite-tooltip reference-element="ref">content</calcite-tooltip>
            <div id="ref">referenceElement</div>
          </>,
        ),
      "open",
      { shadowSelector: `.${CSS.positionContainer}` },
    );
  });

  describe("openClose", () => {
    openClose(() =>
      mount(
        <>
          <calcite-tooltip placement="auto" reference-element="ref">
            content
          </calcite-tooltip>
          <button id="ref">referenceElement</button>
        </>,
      ),
    );

    describe("parent has display none", () => {
      openClose(
        () =>
          mount(
            <>
              <div class="container">
                <div class="template">
                  <calcite-tooltip placement="auto" reference-element="ref">
                    content
                  </calcite-tooltip>
                  <button id="ref">referenceElement</button>
                </div>
              </div>
              <button class="hoverOutsideContainer">some other content</button>
              <style
                ref={(el) => {
                  if (el) {
                    el.innerHTML = css`
                      .container {
                        height: 100px;
                        width: 100px;
                        border: 1px solid red;
                      }
                      .container:hover .template {
                        display: initial;
                      }
                      .template {
                        display: none;
                      }
                    `;
                  }
                }}
              />
            </>,
          ),
        {
          willUseFallback: true,
        },
      );
    });
  });
});

describe("top layer placement", () => {
  topLayer(() =>
    mount(
      <>
        <calcite-tooltip reference-element="ref">content</calcite-tooltip>
        <div id="ref">referenceElement</div>
      </>,
    ),
  );
});

describe("close-on-click", () => {
  it("should close tooltip when tooltips share the same referenceElement, closeOnClick is true and referenceElement is clicked", async () => {
    await mount(
      <>
        <calcite-tooltip close-on-click open reference-element="ref">
          Content 1
        </calcite-tooltip>
        <calcite-tooltip open reference-element="ref">
          Content 2
        </calcite-tooltip>
        <calcite-tooltip open reference-element="ref">
          Content 3
        </calcite-tooltip>
        <button id="ref">Button</button>
      </>,
    );

    const tip1 = page
      .getByText("Content 1")
      .element()
      ?.closest("calcite-tooltip") as Tooltip | null;
    const tip2 = page
      .getByText("Content 2")
      .element()
      ?.closest("calcite-tooltip") as Tooltip | null;
    const tip3 = page
      .getByText("Content 3")
      .element()
      ?.closest("calcite-tooltip") as Tooltip | null;
    const referenceElement = page.getByRole("button", { name: "Button" });

    if (!tip1 || !tip2 || !tip3) {
      throw new Error("Expected all tooltip elements to be present");
    }

    await userEvent.click(referenceElement);

    expect(tip1.open).toBe(false);
    expect(tip2.open).toBe(true);
    expect(tip3.open).toBe(true);
  });
});
