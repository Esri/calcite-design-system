import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { LitElement } from "@arcgis/lumina";
import { afterNextFrame } from "../tests/utils/timing";
import { mockConsole } from "../tests/utils/logging";
import { DEBOUNCE } from "../utils/resources";
import {
  defaultOffsetDistance,
  filterValidFlipPlacements,
  flipPlacements,
  getEffectivePlacement,
  LogicalPlacement,
  OverlayPositioning,
  placements,
  ReferenceElement,
  useFloatingUi,
} from "./useFloatingUi";

class TestFloatingUi extends LitElement {
  direction: "ltr" | "rtl" = "ltr";

  floatingEl?: HTMLElement;

  open = false;

  overlayPositioning: OverlayPositioning = "absolute";

  placement: LogicalPlacement = "top";

  referenceEl?: ReferenceElement;

  floatingUi = useFloatingUi<this>(() => ({
    direction: this.direction,
    floatingEl: this.floatingEl,
    referenceEl: this.referenceEl,
    overlayPositioning: this.overlayPositioning,
    placement: this.placement,
    flipPlacements: [],
    type: "menu",
  }))(this);
}

let floatingEls: HTMLElement[] = [];
let referenceEls: HTMLElement[] = [];

beforeEach(() => {
  floatingEls = [];
  referenceEls = [];
});

afterEach(() => {
  floatingEls.forEach((el) => el.remove());
  referenceEls.forEach((el) => el.remove());
});

async function mountFloatingUi(direction: "ltr" | "rtl" = "ltr"): Promise<{
  component: TestFloatingUi;
  el: TestFloatingUi["el"];
  floatingEl: HTMLElement;
  referenceEl: HTMLElement;
}> {
  const { component, el } = await mount(TestFloatingUi);
  const referenceEl = document.createElement("button");
  const floatingEl = document.createElement("div");

  referenceEl.style.position = "absolute";
  referenceEl.style.inset = "100px auto auto 100px";
  floatingEl.style.inlineSize = "20px";
  floatingEl.style.blockSize = "20px";
  document.body.append(referenceEl, floatingEl);
  referenceEls.push(referenceEl);
  floatingEls.push(floatingEl);

  component.direction = direction;
  component.referenceEl = referenceEl;
  component.floatingEl = floatingEl;

  return { component, el, floatingEl, referenceEl };
}

function assertClosedPositioning(floatingEl: HTMLElement): void {
  expect(floatingEl.style.display).toBe("");
  expect(floatingEl.style.left).toBe("");
  expect(floatingEl.style.pointerEvents).toBe("");
  expect(floatingEl.style.position).toBe("");
  expect(floatingEl.style.top).toBe("");
  expect(floatingEl.style.transform).toBe("");
  expect(floatingEl.style.visibility).toBe("");
}

function assertPreOpenPositioning(floatingEl: HTMLElement, strategy: OverlayPositioning): void {
  expect(floatingEl.style.display).toBe("block");
  expect(floatingEl.style.left).toBe("0px");
  expect(floatingEl.style.position).toBe(strategy);
  expect(floatingEl.style.top).toBe("0px");
}

function assertOpenPositioning(floatingEl: HTMLElement, strategy: OverlayPositioning): void {
  assertPreOpenPositioning(floatingEl, strategy);
  expect(floatingEl.style.transform).not.toBe("");
  expect(floatingEl.style.visibility).toBe("");
}

it("converts logical placements to effective placements", () => {
  expect(getEffectivePlacement("leading")).toBe("left");
  expect(getEffectivePlacement("leading-start")).toBe("left-start");
  expect(getEffectivePlacement("leading-end")).toBe("left-end");
  expect(getEffectivePlacement("trailing")).toBe("right");
  expect(getEffectivePlacement("trailing-start")).toBe("right-start");
  expect(getEffectivePlacement("trailing-end")).toBe("right-end");

  expect(getEffectivePlacement("leading", true)).toBe("right");
  expect(getEffectivePlacement("leading-start", true)).toBe("right-start");
  expect(getEffectivePlacement("leading-end", true)).toBe("right-end");
  expect(getEffectivePlacement("trailing", true)).toBe("left");
  expect(getEffectivePlacement("trailing-start", true)).toBe("left-start");
  expect(getEffectivePlacement("trailing-end", true)).toBe("left-end");
});

describe.each(["ltr", "rtl"] as const)("repositioning (%s)", (direction) => {
  it("repositions only while open", async () => {
    const { component, floatingEl } = await mountFloatingUi(direction);

    await component.floatingUi.reposition();
    assertClosedPositioning(floatingEl);

    component.open = true;
    await component.floatingUi.reposition();
    assertOpenPositioning(floatingEl, "absolute");
  });

  it("sets initial positioning synchronously and positions immediately by default", async () => {
    const { component, floatingEl } = await mountFloatingUi(direction);
    component.open = true;

    const repositioning = component.floatingUi.reposition();

    assertPreOpenPositioning(floatingEl, "absolute");
    await repositioning;
    assertOpenPositioning(floatingEl, "absolute");
  });

  it("supports delayed trailing repositioning", async () => {
    const { component, floatingEl, referenceEl } = await mountFloatingUi(direction);
    component.open = true;
    await component.floatingUi.connect();

    component.floatingUi.reposition(true);
    await afterNextFrame();
    const initialTransform = floatingEl.style.transform;

    referenceEl.style.insetInlineStart = "160px";
    component.floatingUi.reposition(true);

    expect(floatingEl.style.transform).toBe(initialTransform);

    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.reposition));
    await afterNextFrame();
    expect(floatingEl.style.transform).not.toBe(initialTransform);
  });
});

it.each(["absolute", "fixed"] as const)("sets up %s positioning", async (strategy) => {
  const { component, floatingEl } = await mountFloatingUi();
  component.open = true;
  component.overlayPositioning = strategy;

  await component.floatingUi.connect();

  assertOpenPositioning(floatingEl, strategy);
});

it("debounces positioning per controller instance", async () => {
  const first = await mountFloatingUi();
  const second = await mountFloatingUi();
  first.component.open = true;
  second.component.open = true;
  await first.component.floatingUi.connect();
  await second.component.floatingUi.connect();
  const firstTransform = first.floatingEl.style.transform;
  const secondTransform = second.floatingEl.style.transform;

  first.component.placement = "bottom";
  second.component.placement = "right";

  first.component.floatingUi.reposition(true);
  second.component.floatingUi.reposition(true);
  await afterNextFrame();

  expect(first.floatingEl.style.transform).not.toBe(firstTransform);
  expect(second.floatingEl.style.transform).not.toBe(secondTransform);
  expect(second.floatingEl.style.transform).not.toBe(firstTransform);
});

it("cleans up auto-update and pending repositioning when disconnected", async () => {
  const { component, el, floatingEl, referenceEl } = await mountFloatingUi();
  component.open = true;
  await component.floatingUi.connect();
  component.floatingUi.reposition(true);
  await afterNextFrame();
  const initialTransform = floatingEl.style.transform;

  component.placement = "bottom";
  component.floatingUi.reposition(true);
  el.remove();
  referenceEl.style.insetInlineStart = "240px";
  window.dispatchEvent(new Event("scroll"));

  await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.reposition));
  await afterNextFrame();
  expect(floatingEl.style.transform).toBe(initialTransform);
});

it("clears positioning styles when hidden", async () => {
  const { component, floatingEl } = await mountFloatingUi();
  component.open = true;
  await component.floatingUi.connect();

  component.floatingUi.hide();

  assertClosedPositioning(floatingEl);
});

it("uses the expected default offset distance", () => {
  expect(defaultOffsetDistance).toBe(6);
});

describe("filterValidFlipPlacements", () => {
  mockConsole();

  it("filters invalid placements", () => {
    expect(new Set(filterValidFlipPlacements([...placements], document.createElement("div")))).toEqual(
      new Set(flipPlacements),
    );
  });
});
