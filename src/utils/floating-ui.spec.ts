import {
  cleanupMap,
  connectFloatingUI,
  defaultOffsetDistance,
  disconnectFloatingUI,
  effectivePlacements,
  filterComputedPlacements,
  FloatingUIComponent,
  getEffectivePlacement,
  placements,
  positionFloatingUI,
  reposition,
  repositionDebounceTimeout
} from "./floating-ui";
import { waitForAnimationFrame } from "../tests/utils";

it("should set calcite placement to FloatingUI placement", () => {
  const el = document.createElement("div");

  expect(getEffectivePlacement(el, "leading")).toBe("left");
  expect(getEffectivePlacement(el, "leading-start")).toBe("left-start");
  expect(getEffectivePlacement(el, "leading-end")).toBe("left-end");
  expect(getEffectivePlacement(el, "trailing")).toBe("right");
  expect(getEffectivePlacement(el, "trailing-start")).toBe("right-start");
  expect(getEffectivePlacement(el, "trailing-end")).toBe("right-end");

  el.dir = "rtl";

  expect(getEffectivePlacement(el, "leading")).toBe("right");
  expect(getEffectivePlacement(el, "leading-start")).toBe("right-start");
  expect(getEffectivePlacement(el, "leading-end")).toBe("right-end");
  expect(getEffectivePlacement(el, "trailing")).toBe("left");
  expect(getEffectivePlacement(el, "trailing-start")).toBe("left-start");
  expect(getEffectivePlacement(el, "trailing-end")).toBe("left-end");
});

describe("repositioning", () => {
  let fakeFloatingUiComponent: FloatingUIComponent;
  let floatingEl: HTMLDivElement;
  let referenceEl: HTMLButtonElement;
  let positionOptions: Parameters<typeof positionFloatingUI>[0];

  beforeEach(() => {
    fakeFloatingUiComponent = {
      open: false,
      reposition: async () => {
        /* noop */
      },
      overlayPositioning: "absolute",
      placement: "auto"
    };

    floatingEl = document.createElement("div");
    referenceEl = document.createElement("button");

    positionOptions = {
      floatingEl,
      referenceEl,
      overlayPositioning: fakeFloatingUiComponent.overlayPositioning,
      placement: fakeFloatingUiComponent.placement,
      type: "popover"
    };
  });

  it("repositions only for open components", async () => {
    await reposition(fakeFloatingUiComponent, positionOptions);
    expect(floatingEl.style.transform).toBe("");

    fakeFloatingUiComponent.open = true;

    await reposition(fakeFloatingUiComponent, positionOptions);
    expect(floatingEl.style.transform).not.toBe("");
  });

  it("repositions immediately by default", async () => {
    fakeFloatingUiComponent.open = true;

    reposition(fakeFloatingUiComponent, positionOptions);

    expect(floatingEl.style.transform).toBe("");

    await waitForAnimationFrame();
    expect(floatingEl.style.transform).not.toBe("");
  });

  it("can reposition after a delay", async () => {
    fakeFloatingUiComponent.open = true;

    reposition(fakeFloatingUiComponent, positionOptions, true);

    expect(floatingEl.style.transform).toBe("");

    await new Promise<void>((resolve) => setTimeout(resolve, repositionDebounceTimeout));
    expect(floatingEl.style.transform).not.toBe("");
  });

  describe("connect/disconnect helpers", () => {
    it("has connectedCallback and disconnectedCallback helpers", () => {
      expect(cleanupMap.has(fakeFloatingUiComponent)).toBe(false);
      expect(floatingEl.style.position).toBe("");

      connectFloatingUI(fakeFloatingUiComponent, referenceEl, floatingEl);

      expect(cleanupMap.has(fakeFloatingUiComponent)).toBe(true);
      expect(floatingEl.style.position).toBe("absolute");

      disconnectFloatingUI(fakeFloatingUiComponent, referenceEl, floatingEl);

      expect(cleanupMap.has(fakeFloatingUiComponent)).toBe(false);
      expect(floatingEl.style.position).toBe("absolute");

      fakeFloatingUiComponent.overlayPositioning = "fixed";
      connectFloatingUI(fakeFloatingUiComponent, referenceEl, floatingEl);

      expect(cleanupMap.has(fakeFloatingUiComponent)).toBe(true);
      expect(floatingEl.style.position).toBe("fixed");

      disconnectFloatingUI(fakeFloatingUiComponent, referenceEl, floatingEl);

      expect(cleanupMap.has(fakeFloatingUiComponent)).toBe(false);
      expect(floatingEl.style.position).toBe("fixed");
    });
  });
});

it("should have correct value for defaultOffsetDistance", () => {
  expect(defaultOffsetDistance).toBe(6);
});

it("should filter computed placements", () => {
  expect(new Set(filterComputedPlacements(placements, document.createElement("div")))).toEqual(
    new Set(effectivePlacements)
  );
});
