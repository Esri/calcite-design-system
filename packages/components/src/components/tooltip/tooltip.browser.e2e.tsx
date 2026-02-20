import { h, Fragment } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { it, expect, beforeAll, afterAll, describe, vi } from "vitest";
import {
  defaults,
  hidden,
  renders,
  floatingUIOwner,
  topLayer,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import {
  HOVER_OPEN_DELAY_MS,
  HOVER_CLOSE_DELAY_MS,
} from "../../controllers/referenceElementManager";
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
