import { describe, expect, it, beforeEach, vi } from "vitest";
import { afterNextFrame } from "../tests/utils/timing";
import { mockConsole } from "../tests/utils/logging";
import { DEBOUNCE } from "./resources";
import * as floatingUI from "./floating-ui";
import type { positionFloatingUI } from "./floating-ui";
import { FloatingUIComponent } from "./floating-ui";

const {
  autoUpdatingComponentMap,
  connectFloatingUI,
  defaultOffsetDistance,
  disconnectFloatingUI,
  flipPlacements,
  filterValidFlipPlacements,
  getEffectivePlacement,
  getMiddleware,
  placements,
  reposition,
} = floatingUI;

it("should set calcite placement to FloatingUI placement", () => {
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

function createFakeFloatingUiComponent(referenceEl: HTMLElement, floatingEl: HTMLElement): FloatingUIComponent {
  const fake: FloatingUIComponent = {
    open: false,
    reposition: async () => {
      await reposition(fake, {
        direction: "ltr",
        floatingEl,
        referenceEl,
        overlayPositioning: fake.overlayPositioning,
        placement: "top",
        flipPlacements: [],
        type: "menu",
      });
    },
    floatingEl,
    referenceEl,
    overlayPositioning: "absolute",
    placement: "auto",
  };

  return fake;
}

describe.each(["ltr", "rtl"] as const)("repositioning (%s)", (direction) => {
  let fakeFloatingUiComponent: FloatingUIComponent;
  let floatingEl: HTMLDivElement;
  let referenceEl: HTMLButtonElement;
  let positionOptions: Parameters<typeof positionFloatingUI>[1];

  beforeEach(() => {
    referenceEl = document.createElement("button");
    floatingEl = document.createElement("div");

    document.body.append(floatingEl, referenceEl);

    fakeFloatingUiComponent = createFakeFloatingUiComponent(referenceEl, floatingEl);

    positionOptions = {
      direction,
      floatingEl,
      referenceEl,
      overlayPositioning: fakeFloatingUiComponent.overlayPositioning,
      placement: fakeFloatingUiComponent.placement,
      type: "popover",
    };

    connectFloatingUI(fakeFloatingUiComponent);
  });

  function assertClosedPositioning(floatingEl: HTMLElement): void {
    expect(floatingEl.style.display).toBe("");
    expect(floatingEl.style.inset).toBe("");
    expect(floatingEl.style.left).toBe("");
    expect(floatingEl.style.pointerEvents).toBe("");
    expect(floatingEl.style.position).toBe("");
    expect(floatingEl.style.top).toBe("");
    expect(floatingEl.style.transform).toBe("");
    expect(floatingEl.style.visibility).toBe("");
  }

  function assertPreOpenPositioning(floatingEl: HTMLElement): void {
    expect(floatingEl.style.display).toBe("block");
    expect(floatingEl.style.inset).toBe("");
    expect(floatingEl.style.left).toBe("0px");
    expect(floatingEl.style.pointerEvents).toBe("");
    expect(floatingEl.style.position).toBe("absolute");
    expect(floatingEl.style.top).toBe("0px");
    expect(floatingEl.style.transform).toBe("");
    expect(floatingEl.style.visibility).toBe("");
  }

  function assertOpenPositioning(floatingEl: HTMLElement): void {
    expect(floatingEl.style.display).toBe("block");
    expect(floatingEl.style.inset).toBe("");
    expect(floatingEl.style.left).toBe("0px");
    expect(floatingEl.style.pointerEvents).toBe("");
    expect(floatingEl.style.top).toBe("0px");

    expect(floatingEl.style.position).not.toBe("");
    expect(floatingEl.style.transform).not.toBe("");
    expect(floatingEl.style.visibility).toBe("");
  }

  it("repositions only for open components", async () => {
    await reposition(fakeFloatingUiComponent, positionOptions);
    assertClosedPositioning(floatingEl);

    fakeFloatingUiComponent.open = true;

    await reposition(fakeFloatingUiComponent, positionOptions);
    assertOpenPositioning(floatingEl);
  });

  it("repositions immediately by default", async () => {
    assertClosedPositioning(floatingEl);

    fakeFloatingUiComponent.open = true;

    reposition(fakeFloatingUiComponent, positionOptions);

    assertPreOpenPositioning(floatingEl);

    await afterNextFrame();
    assertOpenPositioning(floatingEl);
  });

  it("can reposition after a delay", async () => {
    assertClosedPositioning(floatingEl);

    fakeFloatingUiComponent.open = true;

    reposition(fakeFloatingUiComponent, positionOptions, true);

    assertPreOpenPositioning(floatingEl);

    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.reposition));
    assertOpenPositioning(floatingEl);
  });

  it.skip("debounces positioning per instance", async () => {
    const positionSpy = vi.spyOn(floatingUI, "positionFloatingUI");
    fakeFloatingUiComponent.open = true;

    const anotherFakeFloatingUiComponent = createFakeFloatingUiComponent(referenceEl, floatingEl);
    anotherFakeFloatingUiComponent.open = true;

    floatingUI.reposition(fakeFloatingUiComponent, positionOptions, true);
    expect(positionSpy).toHaveBeenCalledTimes(1);

    floatingUI.reposition(anotherFakeFloatingUiComponent, positionOptions, true);
    expect(positionSpy).toHaveBeenCalledTimes(2);

    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.reposition));
    expect(positionSpy).toHaveBeenCalledTimes(2);
  });
});

describe("connect/disconnect helpers", () => {
  let fakeFloatingUiComponent: FloatingUIComponent;
  let floatingEl: HTMLDivElement;
  let referenceEl: HTMLButtonElement;

  beforeEach(() => {
    referenceEl = document.createElement("button");
    floatingEl = document.createElement("div");

    document.body.append(floatingEl, referenceEl);

    fakeFloatingUiComponent = createFakeFloatingUiComponent(referenceEl, floatingEl);
  });

  it("has connectedCallback and disconnectedCallback helpers", async () => {
    fakeFloatingUiComponent.open = true;
    expect(autoUpdatingComponentMap.has(fakeFloatingUiComponent)).toBe(false);
    expect(floatingEl.style.position).toBe("");
    expect(floatingEl.style.visibility).toBe("");
    expect(floatingEl.style.pointerEvents).toBe("");

    await connectFloatingUI(fakeFloatingUiComponent);

    expect(autoUpdatingComponentMap.has(fakeFloatingUiComponent)).toBe(true);
    expect(floatingEl.style.position).toBe("absolute");
    expect(floatingEl.style.visibility).toBe("");
    expect(floatingEl.style.pointerEvents).toBe("");

    disconnectFloatingUI(fakeFloatingUiComponent);

    expect(autoUpdatingComponentMap.has(fakeFloatingUiComponent)).toBe(false);
    expect(floatingEl.style.position).toBe("absolute");
    expect(floatingEl.style.visibility).toBe("");
    expect(floatingEl.style.pointerEvents).toBe("");

    fakeFloatingUiComponent.overlayPositioning = "fixed";
    await connectFloatingUI(fakeFloatingUiComponent);

    expect(autoUpdatingComponentMap.has(fakeFloatingUiComponent)).toBe(true);
    expect(floatingEl.style.position).toBe("fixed");
    expect(floatingEl.style.visibility).toBe("");
    expect(floatingEl.style.pointerEvents).toBe("");

    disconnectFloatingUI(fakeFloatingUiComponent);

    expect(autoUpdatingComponentMap.has(fakeFloatingUiComponent)).toBe(false);
    expect(floatingEl.style.position).toBe("fixed");
    expect(floatingEl.style.visibility).toBe("");
    expect(floatingEl.style.pointerEvents).toBe("");
  });
});

it("should have correct value for defaultOffsetDistance", () => {
  expect(defaultOffsetDistance).toBe(6);
});

it("should use layoutViewport rootBoundary in viewport-aware middleware", () => {
  const middleware = getMiddleware({
    placement: "auto",
    type: "menu",
  });

  const viewportAwareMiddleware = middleware.filter(({ name }) =>
    ["shift", "flip", "autoPlacement", "hide"].includes(name),
  );

  expect(viewportAwareMiddleware).toHaveLength(4);

  viewportAwareMiddleware.forEach((middleware) => {
    expect(middleware.options?.rootBoundary).toBe("layoutViewport");
  });
});

it("should use layoutViewport rootBoundary in non-auto flip middleware", () => {
  const middleware = getMiddleware({
    placement: "top",
    type: "popover",
  });

  const viewportAwareMiddleware = middleware.filter(({ name }) => ["shift", "flip", "hide"].includes(name));

  expect(viewportAwareMiddleware).toHaveLength(3);

  viewportAwareMiddleware.forEach((middleware) => {
    expect(middleware.options?.rootBoundary).toBe("layoutViewport");
  });
});

it("should only add one flip middleware for non-auto menu placements", () => {
  const middleware = getMiddleware({
    placement: "top",
    type: "menu",
  });

  expect(middleware.filter(({ name }) => name === "flip")).toHaveLength(1);
});

it("should not add menu flip middleware when flipDisabled is true", () => {
  const middleware = getMiddleware({
    flipDisabled: true,
    placement: "top",
    type: "menu",
  });

  expect(middleware.filter(({ name }) => name === "flip")).toHaveLength(0);
});

it("should not add menu flip middleware for auto placements when flipDisabled is true", () => {
  const middleware = getMiddleware({
    flipDisabled: true,
    placement: "auto",
    type: "menu",
  });

  expect(middleware.filter(({ name }) => name === "flip")).toHaveLength(0);
});

describe("filterValidFlipPlacements", () => {
  mockConsole();

  it("should filter valid placements", () => {
    expect(new Set(filterValidFlipPlacements([...placements], document.createElement("div")))).toEqual(
      new Set(flipPlacements),
    );
  });
});
