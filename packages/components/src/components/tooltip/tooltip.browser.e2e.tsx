import { Fragment, h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { it, expect, beforeAll, afterAll, describe, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  reflects,
  hidden,
  renders,
  floatingUIOwner,
  topLayer,
  openClose,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { css } from "../../../support/formatting";
import {
  HOVER_OPEN_DELAY_MS,
  HOVER_CLOSE_DELAY_MS,
  HOVER_QUICK_OPEN_DELAY_MS,
} from "../../controllers/useReferenceElement/manager";
import { FloatingCSS } from "../../utils/floating-ui";
import { CSS } from "./resources";
import { Tooltip } from "./tooltip";

mockConsole();

const eventOptions = { bubbles: true, cancelable: true };

function dispatchEvent(target: EventTarget, event: Event): void {
  target.dispatchEvent(event);
}

function pointerMove(target: EventTarget): void {
  dispatchEvent(target, new PointerEvent("pointermove", eventOptions));
}

function click(target: EventTarget): void {
  dispatchEvent(target, new MouseEvent("click", eventOptions));
}

function keydown(target: EventTarget, key: string): KeyboardEvent {
  const event = new KeyboardEvent("keydown", { key, ...eventOptions });
  dispatchEvent(target, event);
  return event;
}

describe("accessible", () => {
  describe("when closed", () => {
    accessible(() =>
      mount(
        <>
          <calcite-tooltip label="hello world" referenceElement="ref">
            Hello World!
          </calcite-tooltip>
          <div id="ref">Tooltip Reference</div>
        </>,
      ),
    );
  });

  describe("when open", () => {
    accessible(() =>
      mount(
        <>
          <calcite-tooltip label="hello world" open referenceElement="ref">
            Hello World!
          </calcite-tooltip>
          <div id="ref">Tooltip Reference</div>
        </>,
      ),
    );
  });
});

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

it("should honor pointerDisabled", async () => {
  const { el, reRender } = await mount<Tooltip>(
    <div>
      <calcite-tooltip open reference-element="ref">
        Content
      </calcite-tooltip>
      <button id="ref">Button</button>
    </div>,
  );

  const arrow = page.getBySelector("calcite-tooltip .calcite-floating-ui-arrow");
  await expect.element(arrow).toBeVisible();

  el.pointerDisabled = true;
  await reRender();

  await expect.element(arrow).not.toBeInTheDocument();
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
        propertyName: "pointerDisabled",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
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

describe("reflects", () => {
  reflects(
    () => mount("calcite-tooltip"),
    [
      {
        propertyName: "pointerDisabled",
        value: true,
      },
      {
        propertyName: "scale",
        value: "l",
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
        mount<Tooltip>(
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
    openClose((mountOptions) =>
      mount(
        <>
          <calcite-tooltip placement="auto" reference-element="ref">
            content
          </calcite-tooltip>
          <button id="ref">referenceElement</button>
        </>,
        mountOptions,
      ),
    );

    describe("parent has display none", () => {
      openClose(
        (mountOptions) =>
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
            mountOptions,
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

describe("reference element", () => {
    it("positions when referenceElement is set", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip open />
          <div id="ref">referenceElement</div>
        </>,
      );
      const positionContainer = el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.positionContainer}`)!;

      expect(getComputedStyle(positionContainer).transform).toBe("none");

      el.referenceElement = document.querySelector("#ref")!;
      await reRender();

      await expect.poll(() => getComputedStyle(positionContainer).transform).not.toBe("none");
    });

    it("accepts a string id", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip open reference-element="ref">
            content
          </calcite-tooltip>
          <div id="ref">referenceElement</div>
        </>,
      );
      const positionContainer = el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.positionContainer}`)!;

      await expect.element(page.getByText("content")).toBeVisible();
      expect(getComputedStyle(positionContainer).transform).not.toBe("matrix(0, 0, 0, 0, 0, 0)");
    });

    it("accepts a virtual element", async () => {
      const { el, reRender } = await mount<Tooltip>(<calcite-tooltip open>content</calcite-tooltip>);
      el.referenceElement = {
        getBoundingClientRect: () =>
          ({
            width: 0,
            height: 0,
            top: 100,
            right: 100,
            bottom: 100,
            left: 600,
          }) as DOMRect,
      };
      await reRender();
      const positionContainer = el.shadowRoot!.querySelector<HTMLElement>(`.${CSS.positionContainer}`)!;

      await expect.element(page.getByText("content")).toBeVisible();
      expect(getComputedStyle(positionContainer).transform).not.toBe("matrix(0, 0, 0, 0, 0, 0)");
    });

    it("continues working when disconnected and reconnected", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <button id="other">other</button>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
          <div id="transfer" />
        </>,
      );
      const reference = document.querySelector<HTMLButtonElement>("#ref")!;

      reference.focus();
      await reRender();
      expect(el.open).toBe(true);

      document.querySelector<HTMLButtonElement>("#other")!.focus();
      await reRender();
      expect(el.open).toBe(false);

      document.querySelector("#transfer")!.append(el);
      await reRender();
      await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
      reference.focus();
      await reRender();
      expect(el.open).toBe(true);
    });
  });

  describe("interactions", () => {
    beforeAll(() => {
      vi.useFakeTimers();
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it("opens from a descendant of the reference element", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">content</calcite-tooltip>
          <div id="ref">
            <span>referenceElement</span>
          </div>
        </>,
      );

      pointerMove(document.querySelector("#ref span")!);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);

      expect(el.open).toBe(true);
    });

    it("does not open when pointer movement is prevented", async () => {
      const { el } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">content</calcite-tooltip>
          <div id="ref">referenceElement</div>
        </>,
      );
      const reference = document.querySelector("#ref")!;
      reference.addEventListener("pointermove", (event) => event.preventDefault());

      pointerMove(reference);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);

      expect(el.open).toBe(false);
    });

    it("closes when pointer movement is prevented by an ancestor", async () => {
      const { el } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">content</calcite-tooltip>
          <div id="container">
            <div id="ref">referenceElement</div>
          </div>
        </>,
      );
      const reference = document.querySelector("#ref")!;
      pointerMove(reference);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);
      expect(el.open).toBe(true);

      document.querySelector("#container")!.addEventListener("pointermove", (event) => event.preventDefault());
      pointerMove(reference);
      vi.advanceTimersByTime(HOVER_CLOSE_DELAY_MS);

      expect(el.open).toBe(false);
    });

    it("opens on focus and closes on blur", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <button id="other">other</button>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </>,
      );

      document.querySelector<HTMLButtonElement>("#ref")!.focus();
      await reRender();
      expect(el.open).toBe(true);

      document.querySelector<HTMLButtonElement>("#other")!.focus();
      await reRender();
      expect(el.open).toBe(false);
    });

    it("does not open when focus is prevented", async () => {
      const { el } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </>,
      );
      const reference = document.querySelector("#ref")!;
      reference.addEventListener("focusin", (event) => event.preventDefault());

      dispatchEvent(reference, new FocusEvent("focusin", eventOptions));

      expect(el.open).toBe(false);
    });

    it("handles click interactions", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <button id="other">other</button>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <div id="ref" tabIndex={0}>
            Button
          </div>
        </>,
      );
      const reference = document.querySelector("#ref")!;

      click(reference);
      await reRender();
      expect(el.open).toBe(true);

      click(reference);
      await reRender();
      expect(el.open).toBe(true);

      click(document.querySelector("#other")!);
      await reRender();
      expect(el.open).toBe(false);
    });

    it("does not open when a click is prevented", async () => {
      const { el } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </>,
      );
      const reference = document.querySelector("#ref")!;
      reference.addEventListener("click", (event) => event.preventDefault());

      click(reference);

      expect(el.open).toBe(false);
    });

    it("closes a focused tooltip with Escape and cancels the key event", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </>,
      );
      const reference = document.querySelector<HTMLButtonElement>("#ref")!;
      reference.focus();
      await reRender();

      const event = keydown(reference, "Escape");
      await reRender();

      expect(el.open).toBe(false);
      expect(event.defaultPrevented).toBe(true);
    });

    it("closes a hovered tooltip with Escape without canceling a document key event", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </>,
      );
      pointerMove(document.querySelector("#ref")!);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);
      expect(el.open).toBe(true);

      const event = keydown(document, "Escape");
      await reRender();

      expect(el.open).toBe(false);
      expect(event.defaultPrevented).toBe(false);
    });

    it("closes a hovered and focused tooltip with Escape and cancels the key event", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </>,
      );
      const reference = document.querySelector<HTMLButtonElement>("#ref")!;
      reference.focus();
      pointerMove(reference);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);

      const event = keydown(reference, "Escape");
      await reRender();

      expect(el.open).toBe(false);
      expect(event.defaultPrevented).toBe(true);
    });

    it("does not close with Escape when the event is prevented", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </>,
      );
      const reference = document.querySelector<HTMLButtonElement>("#ref")!;
      reference.focus();
      await reRender();
      document.body.addEventListener("keydown", (event) => event.preventDefault(), { capture: true, once: true });

      keydown(reference, "Escape");
      await reRender();

      expect(el.open).toBe(true);
    });

    it("only opens the most recently interacted-with tooltip", async () => {
      await mount(
        <>
          <calcite-tooltip id="tip1" reference-element="ref1">Content 1</calcite-tooltip>
          <button id="ref1">Button 1</button>
          <calcite-tooltip id="tip2" reference-element="ref2">Content 2</calcite-tooltip>
          <button id="ref2">Button 2</button>
        </>,
      );
      const tip1 = document.querySelector<Tooltip>("#tip1")!;
      const tip2 = document.querySelector<Tooltip>("#tip2")!;

      pointerMove(document.querySelector("#ref2")!);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);
      expect(tip1.open).toBe(false);
      expect(tip2.open).toBe(true);

      document.querySelector<HTMLButtonElement>("#ref1")!.focus();
      expect(tip1.open).toBe(true);
      expect(tip2.open).toBe(false);

      pointerMove(document.querySelector("#ref2")!);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);
      expect(tip1.open).toBe(false);
      expect(tip2.open).toBe(true);
    });

    it("opens the next tooltip with the quick delay", async () => {
      await mount(
        <>
          <button id="ref1">referenceElement 1</button>
          <button id="ref2">referenceElement 2</button>
          <calcite-tooltip id="tip1" reference-element="ref1">content</calcite-tooltip>
          <calcite-tooltip id="tip2" reference-element="ref2">content 2</calcite-tooltip>
        </>,
      );
      const tip1 = document.querySelector<Tooltip>("#tip1")!;
      const tip2 = document.querySelector<Tooltip>("#tip2")!;

      pointerMove(document.querySelector("#ref1")!);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);
      expect(tip1.open).toBe(true);

      pointerMove(document.querySelector("#ref2")!);
      vi.advanceTimersByTime(HOVER_QUICK_OPEN_DELAY_MS);
      expect(tip1.open).toBe(false);
      expect(tip2.open).toBe(true);
    });

    it("supports closeOnClick and stays closed until the pointer moves away", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </>,
      );
      const reference = document.querySelector("#ref")!;
      pointerMove(reference);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);
      expect(el.open).toBe(true);

      click(reference);
      await reRender();
      expect(el.open).toBe(true);

      el.closeOnClick = true;
      await reRender();
      click(reference);
      await reRender();
      expect(el.open).toBe(false);

      pointerMove(reference);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);
      expect(el.open).toBe(false);
    });

    it("does not open when the reference is clicked before the hover delay", async () => {
      const { el } = await mount<Tooltip>(
        <>
          <calcite-tooltip close-on-click reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </>,
      );
      const reference = document.querySelector("#ref")!;

      pointerMove(reference);
      click(reference);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);

      expect(el.open).toBe(false);
    });

    it("closes when the pointer leaves the document", async () => {
      const { el } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </>,
      );
      pointerMove(document.querySelector("#ref")!);
      vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS);
      expect(el.open).toBe(true);

      dispatchEvent(document, new PointerEvent("pointerleave", eventOptions));
      vi.advanceTimersByTime(HOVER_CLOSE_DELAY_MS);

      expect(el.open).toBe(false);
    });

    it("emits lifecycle events for pointer interaction", async () => {
      vi.useRealTimers();
      const { el } = await mount<Tooltip>(
        <>
          <button id="other">other</button>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </>,
      );
      const beforeOpen = vi.fn();
      const open = vi.fn();
      const beforeClose = vi.fn();
      const close = vi.fn();
      el.addEventListener("calciteTooltipBeforeOpen", beforeOpen);
      el.addEventListener("calciteTooltipOpen", open);
      el.addEventListener("calciteTooltipBeforeClose", beforeClose);
      el.addEventListener("calciteTooltipClose", close);

      const openEvent = new Promise<void>((resolve) =>
        el.addEventListener("calciteTooltipOpen", () => resolve(), { once: true }),
      );
      await userEvent.hover(page.getBySelector("#ref"));
      await openEvent;
      const closeEvent = new Promise<void>((resolve) =>
        el.addEventListener("calciteTooltipClose", () => resolve(), { once: true }),
      );
      await userEvent.hover(page.getBySelector("#other"));
      await closeEvent;

      expect(beforeOpen).toHaveBeenCalledTimes(1);
      expect(open).toHaveBeenCalledTimes(1);
      expect(beforeClose).toHaveBeenCalledTimes(1);
      expect(close).toHaveBeenCalledTimes(1);
    });
  });

  describe("within shadow roots", () => {
    function defineTestComponents(): void {
      if (customElements.get("tooltip-shadow-a")) {
        return;
      }

      customElements.define(
        "tooltip-shadow-a",
        class extends HTMLElement {
          constructor() {
            super();
            this.attachShadow({ mode: "open" }).innerHTML =
              `<button id="tooltip-button">Data disclaimer</button>
               <calcite-tooltip reference-element="tooltip-button">content</calcite-tooltip>`;
          }
        },
      );
      customElements.define(
        "tooltip-shadow-b",
        class extends HTMLElement {
          constructor() {
            super();
            this.attachShadow({ mode: "open" }).innerHTML = "<tooltip-shadow-a></tooltip-shadow-a>";
          }
        },
      );
    }

    function getElements(id: string): { button: HTMLButtonElement; tooltip: Tooltip } {
      const innerRoot = document.querySelector(id)!.shadowRoot!.querySelector("tooltip-shadow-a")!.shadowRoot!;
      return {
        button: innerRoot.querySelector("button")!,
        tooltip: innerRoot.querySelector("calcite-tooltip")!,
      };
    }

    it("opens only the most recently focused tooltip", async () => {
      defineTestComponents();
      await mount(
        <>
          <tooltip-shadow-b id="shadow-one" />
          <tooltip-shadow-b id="shadow-two" />
        </>,
      );
      const one = getElements("#shadow-one");
      const two = getElements("#shadow-two");

      dispatchEvent(one.button, new FocusEvent("focusin", eventOptions));
      expect(one.tooltip.open).toBe(true);
      expect(two.tooltip.open).toBe(false);

      dispatchEvent(two.button, new FocusEvent("focusin", eventOptions));
      expect(one.tooltip.open).toBe(false);
      expect(two.tooltip.open).toBe(true);
    });

    it("supports tabbing between nested shadow roots", async () => {
      defineTestComponents();
      await mount(
        <>
          <tooltip-shadow-b id="shadow-one" />
          <tooltip-shadow-b id="shadow-two" />
        </>,
      );
      const one = getElements("#shadow-one");
      const two = getElements("#shadow-two");

      await userEvent.tab();
      expect(one.tooltip.open).toBe(true);
      expect(two.tooltip.open).toBe(false);

      await userEvent.tab();
      expect(one.tooltip.open).toBe(false);
      expect(two.tooltip.open).toBe(true);

      await userEvent.tab();
      expect(one.tooltip.open).toBe(false);
      expect(two.tooltip.open).toBe(false);
    });
  });

  describe("lifecycle events", () => {
    it("emits events when controlled with the open property", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">content</calcite-tooltip>
          <button id="ref">referenceElement</button>
        </>,
      );
      const beforeOpen = vi.fn();
      const open = vi.fn();
      const beforeClose = vi.fn();
      const close = vi.fn();
      el.addEventListener("calciteTooltipBeforeOpen", beforeOpen);
      el.addEventListener("calciteTooltipOpen", open);
      el.addEventListener("calciteTooltipBeforeClose", beforeClose);
      el.addEventListener("calciteTooltipClose", close);

      el.open = true;
      await reRender();
      await new Promise<void>((resolve) => el.addEventListener("calciteTooltipOpen", () => resolve(), { once: true }));

      expect(beforeOpen).toHaveBeenCalledTimes(1);
      expect(open).toHaveBeenCalledTimes(1);
      expect(beforeClose).not.toHaveBeenCalled();
      expect(close).not.toHaveBeenCalled();

      el.open = false;
      await reRender();
      await new Promise<void>((resolve) => el.addEventListener("calciteTooltipClose", () => resolve(), { once: true }));

      expect(beforeOpen).toHaveBeenCalledTimes(1);
      expect(open).toHaveBeenCalledTimes(1);
      expect(beforeClose).toHaveBeenCalledTimes(1);
      expect(close).toHaveBeenCalledTimes(1);
    });

    it("emits events for keyboard interaction", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">content</calcite-tooltip>
          <button id="ref">referenceElement</button>
          <button id="other">other</button>
        </>,
      );
      const beforeOpen = vi.fn();
      const open = vi.fn();
      const beforeClose = vi.fn();
      const close = vi.fn();
      el.addEventListener("calciteTooltipBeforeOpen", beforeOpen);
      el.addEventListener("calciteTooltipOpen", open);
      el.addEventListener("calciteTooltipBeforeClose", beforeClose);
      el.addEventListener("calciteTooltipClose", close);

      const openEvent = new Promise<void>((resolve) =>
        el.addEventListener("calciteTooltipOpen", () => resolve(), { once: true }),
      );
      document.querySelector<HTMLButtonElement>("#ref")!.focus();
      await reRender();
      await openEvent;
      const closeEvent = new Promise<void>((resolve) =>
        el.addEventListener("calciteTooltipClose", () => resolve(), { once: true }),
      );
      document.querySelector<HTMLButtonElement>("#other")!.focus();
      await reRender();
      await closeEvent;

      expect(beforeOpen).toHaveBeenCalledTimes(1);
      expect(open).toHaveBeenCalledTimes(1);
      expect(beforeClose).toHaveBeenCalledTimes(1);
      expect(close).toHaveBeenCalledTimes(1);
    });

    it("emits close events when the open tooltip is no longer rendered", async () => {
      const { el } = await mount<Tooltip>(
        <>
          <div class="event-container">
            <div class="event-template">
              <button id="ref">referenceElement</button>
              <calcite-tooltip reference-element="ref">content</calcite-tooltip>
            </div>
          </div>
          <button class="outside">outside</button>
          <style
            ref={(style) => {
              if (style) {
                style.innerHTML = css`
                  .event-template {
                    display: none;
                  }
                  .event-container {
                    height: 100px;
                    width: 100px;
                  }
                  .event-container:hover .event-template {
                    display: initial;
                  }
                `;
              }
            }}
          />
        </>,
      );
      const beforeClose = vi.fn();
      const close = vi.fn();
      el.addEventListener("calciteTooltipBeforeClose", beforeClose);
      el.addEventListener("calciteTooltipClose", close);

      await userEvent.hover(page.getBySelector(".event-container"));
      const openEvent = new Promise<void>((resolve) =>
        el.addEventListener("calciteTooltipOpen", () => resolve(), { once: true }),
      );
      await userEvent.hover(page.getBySelector("#ref"));
      await openEvent;
      expect(el.open).toBe(true);

      const closeEvent = new Promise<void>((resolve) =>
        el.addEventListener("calciteTooltipClose", () => resolve(), { once: true }),
      );
      await userEvent.hover(page.getBySelector(".outside"));
      await closeEvent;

      expect(beforeClose).toHaveBeenCalledTimes(1);
      expect(close).toHaveBeenCalledTimes(1);
    });
  });

  describe("interacting with open content", () => {
    it("stays open while clicking the tooltip and closes after an outside click", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">
            content <button id="inside">inside</button>
          </calcite-tooltip>
          <button id="ref">referenceElement</button>
          <button id="other">other</button>
        </>,
      );

      click(document.querySelector("#ref")!);
      await reRender();
      expect(el.open).toBe(true);

      click(el.shadowRoot!.querySelector(`.${CSS.positionContainer}`)!);
      await reRender();
      expect(el.open).toBe(true);

      click(document.querySelector("#inside")!);
      await reRender();
      expect(el.open).toBe(true);

      click(document.querySelector("#other")!);
      await reRender();
      expect(el.open).toBe(false);
    });

    it("stays open while focus moves into the tooltip", async () => {
      const { el, reRender } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">
            content <button id="inside">inside</button>
          </calcite-tooltip>
          <button id="ref">referenceElement</button>
          <button id="other">other</button>
        </>,
      );

      document.querySelector<HTMLButtonElement>("#ref")!.focus();
      await reRender();
      expect(el.open).toBe(true);

      document.querySelector<HTMLButtonElement>("#inside")!.focus();
      await reRender();
      expect(el.open).toBe(true);

      document.querySelector<HTMLButtonElement>("#other")!.focus();
      await reRender();
      expect(el.open).toBe(false);
    });
  });

  describe("warning messages", () => {
    it("does not warn when the reference element is present", async () => {
      await mount(
        <>
          <calcite-tooltip reference-element="ref">content</calcite-tooltip>
          <div id="ref">referenceElement</div>
        </>,
      );

      expect(console.warn).not.toHaveBeenCalled();
    });

    it("does not warn after removal", async () => {
      const { el } = await mount<Tooltip>(
        <>
          <calcite-tooltip reference-element="ref">content</calcite-tooltip>
          <div id="ref">referenceElement</div>
        </>,
      );

      el.remove();

      expect(console.warn).not.toHaveBeenCalled();
    });

    it("warns when the reference element is not present", async () => {
      await mount(<calcite-tooltip reference-element="non-existent-ref">content</calcite-tooltip>);

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringMatching(new RegExp(`reference-element id "non-existent-ref" was not found`)),
        expect.anything(),
      );
    });
  });
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount(<calcite-tooltip>Lorem Ipsum</calcite-tooltip>), {
      "--calcite-tooltip-background-color": [
        {
          shadowSelector: `.${FloatingCSS.animation}`,
          targetProp: "backgroundColor",
        },
        {
          shadowSelector: `.${FloatingCSS.arrow}`,
          targetProp: "fill",
        },
      ],
      "--calcite-tooltip-border-color": [
        {
          shadowSelector: `.${FloatingCSS.animation}`,
          targetProp: "borderColor",
        },
        {
          shadowSelector: `.${FloatingCSS.arrowStroke}`,
          targetProp: "stroke",
        },
      ],
      "--calcite-tooltip-corner-radius": [
        {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderRadius",
        },
        {
          shadowSelector: `.${FloatingCSS.animation}`,
          targetProp: "borderRadius",
        },
      ],
      "--calcite-tooltip-text-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "color",
      },
      "--calcite-tooltip-max-size-x": {
        shadowSelector: `.${CSS.positionContainer}`,
        targetProp: "maxInlineSize",
      },
    });
  });
});
