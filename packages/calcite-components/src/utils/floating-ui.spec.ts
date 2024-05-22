import { waitForAnimationFrame } from "../tests/utils";
import * as floatingUI from "./floating-ui";
import { FloatingUIComponent } from "./floating-ui";

const {
  autoUpdatingComponentMap,
  connectFloatingUI,
  defaultOffsetDistance,
  disconnectFloatingUI,
  effectivePlacements,
  filterComputedPlacements,
  getEffectivePlacement,
  placements,
  positionFloatingUI,
  reposition,
  repositionDebounceTimeout,
} = floatingUI;

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

function createFakeFloatingUiComponent(referenceEl: HTMLElement, floatingEl: HTMLElement): FloatingUIComponent {
  const fake: FloatingUIComponent = {
    open: false,
    reposition: async () => {
      await reposition(fake, {
        floatingEl,
        referenceEl,
        overlayPositioning: fake.overlayPositioning,
        placement: "top",
        flipPlacements: [],
        type: "menu",
      });
    },
    overlayPositioning: "absolute",
    placement: "auto",
  };

  return fake;
}

describe("repositioning", () => {
  let fakeFloatingUiComponent: FloatingUIComponent;
  let floatingEl: HTMLDivElement;
  let referenceEl: HTMLButtonElement;
  let positionOptions: Parameters<typeof positionFloatingUI>[1];

  beforeEach(() => {
    referenceEl = document.createElement("button");
    floatingEl = document.createElement("div");

    document.body.append(floatingEl);
    document.body.append(referenceEl);

    fakeFloatingUiComponent = createFakeFloatingUiComponent(referenceEl, floatingEl);

    positionOptions = {
      floatingEl,
      referenceEl,
      overlayPositioning: fakeFloatingUiComponent.overlayPositioning,
      placement: fakeFloatingUiComponent.placement,
      type: "popover",
    };

    connectFloatingUI(fakeFloatingUiComponent, referenceEl, floatingEl);
  });

  function assertPreOpenPositioning(floatingEl: HTMLElement): void {
    expect(floatingEl.style.transform).toBe("");
    expect(floatingEl.style.top).toBe("");
    expect(floatingEl.style.left).toBe("");
  }

  function assertOpenPositioning(floatingEl: HTMLElement): void {
    expect(floatingEl.style.transform).not.toBe("");
    expect(floatingEl.style.top).toBe("0");
    expect(floatingEl.style.left).toBe("0");
  }

  it("repositions only for open components", async () => {
    await reposition(fakeFloatingUiComponent, positionOptions);
    assertPreOpenPositioning(floatingEl);

    fakeFloatingUiComponent.open = true;

    await reposition(fakeFloatingUiComponent, positionOptions);
    assertOpenPositioning(floatingEl);
  });

  it("repositions immediately by default", async () => {
    fakeFloatingUiComponent.open = true;

    reposition(fakeFloatingUiComponent, positionOptions);

    assertPreOpenPositioning(floatingEl);

    await waitForAnimationFrame();
    assertOpenPositioning(floatingEl);
  });

  it("can reposition after a delay", async () => {
    fakeFloatingUiComponent.open = true;

    reposition(fakeFloatingUiComponent, positionOptions, true);

    assertPreOpenPositioning(floatingEl);

    await new Promise<void>((resolve) => setTimeout(resolve, repositionDebounceTimeout));
    assertOpenPositioning(floatingEl);
  });

  it("debounces positioning per instance", async () => {
    const positionSpy = jest.spyOn(floatingUI, "positionFloatingUI");
    fakeFloatingUiComponent.open = true;

    const anotherFakeFloatingUiComponent = createFakeFloatingUiComponent(referenceEl, floatingEl);
    anotherFakeFloatingUiComponent.open = true;

    floatingUI.reposition(fakeFloatingUiComponent, positionOptions, true);
    expect(positionSpy).toHaveBeenCalledTimes(1);

    floatingUI.reposition(anotherFakeFloatingUiComponent, positionOptions, true);
    expect(positionSpy).toHaveBeenCalledTimes(2);

    await new Promise<void>((resolve) => setTimeout(resolve, repositionDebounceTimeout));
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

    document.body.append(floatingEl);
    document.body.append(referenceEl);

    fakeFloatingUiComponent = createFakeFloatingUiComponent(referenceEl, floatingEl);
  });

  it("has connectedCallback and disconnectedCallback helpers", async () => {
    fakeFloatingUiComponent.open = true;
    expect(autoUpdatingComponentMap.has(fakeFloatingUiComponent)).toBe(false);
    expect(floatingEl.style.position).toBe("");
    expect(floatingEl.style.visibility).toBe("");
    expect(floatingEl.style.pointerEvents).toBe("");

    await connectFloatingUI(fakeFloatingUiComponent, referenceEl, floatingEl);

    expect(autoUpdatingComponentMap.has(fakeFloatingUiComponent)).toBe(true);
    expect(floatingEl.style.position).toBe("absolute");
    expect(floatingEl.style.visibility).toBe("hidden");
    expect(floatingEl.style.pointerEvents).toBe("none");

    disconnectFloatingUI(fakeFloatingUiComponent, referenceEl, floatingEl);

    expect(autoUpdatingComponentMap.has(fakeFloatingUiComponent)).toBe(false);
    expect(floatingEl.style.position).toBe("absolute");

    fakeFloatingUiComponent.overlayPositioning = "fixed";
    await connectFloatingUI(fakeFloatingUiComponent, referenceEl, floatingEl);

    expect(autoUpdatingComponentMap.has(fakeFloatingUiComponent)).toBe(true);
    expect(floatingEl.style.position).toBe("fixed");
    expect(floatingEl.style.visibility).toBe("hidden");
    expect(floatingEl.style.pointerEvents).toBe("none");

    disconnectFloatingUI(fakeFloatingUiComponent, referenceEl, floatingEl);

    expect(autoUpdatingComponentMap.has(fakeFloatingUiComponent)).toBe(false);
    expect(floatingEl.style.position).toBe("fixed");
  });
});

it("should have correct value for defaultOffsetDistance", () => {
  expect(defaultOffsetDistance).toBe(6);
});

it("should filter computed placements", () => {
  expect(new Set(filterComputedPlacements([...placements], document.createElement("div")))).toEqual(
    new Set(effectivePlacements),
  );
});
