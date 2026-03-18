import { describe, it, expect, vi } from "vitest";
import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { createRef } from "lit/directives/ref.js";
import { afterNextFrame } from "../tests/utils/timing";
import { createControlledPromise } from "../tests/utils/promises";
import { useOpenClose } from "./useOpenClose";

describe("useOpenClose", () => {
  it("emits beforeOpen/open and beforeClose/close for expanded", async () => {
    const emitted: string[] = [];

    class Test extends LitElement {
      @property() expanded = false;

      transitionProp = "opacity" as const;
      transitionEl!: HTMLDivElement;

      openCloseController = useOpenClose<this>({
        lifecycle: {
          onBeforeOpen: () => this.onBeforeOpen(),
          onOpen: () => this.onOpen(),
          onBeforeClose: () => this.onBeforeClose(),
          onClose: () => this.onClose(),
        },
        visibilityProps: ["expanded"],
      })(this);

      onBeforeOpen(): void {
        emitted.push("beforeOpen");
      }

      onOpen(): void {
        emitted.push("open");
      }

      onBeforeClose(): void {
        emitted.push("beforeClose");
      }

      onClose(): void {
        emitted.push("close");
      }

      override render(): JsxNode {
        return (
          <div
            ref={(el) => {
              if (el) {
                this.transitionEl = el;
              }
            }}
          />
        );
      }
    }

    const { component } = await mount(Test);
    await component.updateComplete;

    const openingControlledPromise = createControlledPromise<void>();
    const getAnimationsSpy = vi.spyOn(component.transitionEl, "getAnimations");
    getAnimationsSpy.mockImplementation(() => [
      {
        transitionProperty: "opacity",
        finished: openingControlledPromise.promise,
      } as unknown as CSSTransition,
    ]);

    component.expanded = true;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeOpen"]);

    openingControlledPromise.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeOpen", "open"]);

    const closingControlledPromise = createControlledPromise<void>();
    getAnimationsSpy.mockImplementation(() => [
      {
        transitionProperty: "opacity",
        finished: closingControlledPromise.promise,
      } as unknown as CSSTransition,
    ]);

    component.expanded = false;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeOpen", "open", "beforeClose"]);

    closingControlledPromise.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeOpen", "open", "beforeClose", "close"]);
  });

  it("treats closed=true as closed and closed=false as open", async () => {
    const emitted: string[] = [];

    class Test extends LitElement {
      @property() closed = false;

      transitionProp = "opacity" as const;
      transitionEl!: HTMLDivElement;

      openCloseController = useOpenClose<this>({
        lifecycle: {
          onBeforeOpen: () => this.onBeforeOpen(),
          onOpen: () => this.onOpen(),
          onBeforeClose: () => this.onBeforeClose(),
          onClose: () => this.onClose(),
        },
        visibilityProps: ["closed"],
      })(this);

      onBeforeOpen(): void {
        emitted.push("beforeOpen");
      }

      onOpen(): void {
        emitted.push("open");
      }

      onBeforeClose(): void {
        emitted.push("beforeClose");
      }

      onClose(): void {
        emitted.push("close");
      }

      override render(): JsxNode {
        return (
          <div
            ref={(el) => {
              if (el) {
                this.transitionEl = el;
              }
            }}
          />
        );
      }
    }

    const { component } = await mount(Test);
    await component.updateComplete;

    const openingControlledPromise = createControlledPromise<void>();
    const getAnimationsSpy = vi.spyOn(component.transitionEl, "getAnimations");
    getAnimationsSpy.mockImplementation(() => [
      {
        transitionProperty: "opacity",
        finished: openingControlledPromise.promise,
      } as unknown as CSSTransition,
    ]);

    component.closed = true;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose"]);

    openingControlledPromise.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose", "close"]);

    const closingControlledPromise = createControlledPromise<void>();
    getAnimationsSpy.mockImplementation(() => [
      {
        transitionProperty: "opacity",
        finished: closingControlledPromise.promise,
      } as unknown as CSSTransition,
    ]);

    component.closed = false;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose", "close", "beforeOpen"]);

    closingControlledPromise.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose", "close", "beforeOpen", "open"]);
  });

  it("emits lifecycle events for open", async () => {
    const emitted: string[] = [];

    class Test extends LitElement {
      @property() open = false;

      transitionProp = "opacity" as const;
      transitionEl!: HTMLDivElement;

      openCloseController = useOpenClose<this>({
        lifecycle: {
          onBeforeOpen: () => this.onBeforeOpen(),
          onOpen: () => this.onOpen(),
          onBeforeClose: () => this.onBeforeClose(),
          onClose: () => this.onClose(),
        },
        visibilityProps: ["open"],
      })(this);

      onBeforeOpen(): void {
        emitted.push("beforeOpen");
      }

      onOpen(): void {
        emitted.push("open");
      }

      onBeforeClose(): void {
        emitted.push("beforeClose");
      }

      onClose(): void {
        emitted.push("close");
      }

      override render(): JsxNode {
        return (
          <div
            ref={(el) => {
              if (el) {
                this.transitionEl = el;
              }
            }}
          />
        );
      }
    }

    const { component } = await mount(Test);
    await component.updateComplete;

    const getAnimationsSpy = vi.spyOn(component.transitionEl, "getAnimations");

    const opening = createControlledPromise<void>();
    getAnimationsSpy.mockImplementation(() => [
      { transitionProperty: "opacity", finished: opening.promise } as unknown as CSSTransition,
    ]);

    component.open = true;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeOpen"]);

    opening.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeOpen", "open"]);

    const closing = createControlledPromise<void>();
    getAnimationsSpy.mockImplementation(() => [
      { transitionProperty: "opacity", finished: closing.promise } as unknown as CSSTransition,
    ]);

    component.open = false;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeOpen", "open", "beforeClose"]);

    closing.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeOpen", "open", "beforeClose", "close"]);
  });

  it("treats collapsed=true as closed and collapsed=false as open", async () => {
    const emitted: string[] = [];

    class Test extends LitElement {
      @property() collapsed = false;

      transitionProp = "opacity" as const;
      transitionEl!: HTMLDivElement;

      openCloseController = useOpenClose<this>({
        lifecycle: {
          onBeforeOpen: () => this.onBeforeOpen(),
          onOpen: () => this.onOpen(),
          onBeforeClose: () => this.onBeforeClose(),
          onClose: () => this.onClose(),
        },
        visibilityProps: ["collapsed"],
      })(this);

      onBeforeOpen(): void {
        emitted.push("beforeOpen");
      }

      onOpen(): void {
        emitted.push("open");
      }

      onBeforeClose(): void {
        emitted.push("beforeClose");
      }

      onClose(): void {
        emitted.push("close");
      }

      override render(): JsxNode {
        return (
          <div
            ref={(el) => {
              if (el) {
                this.transitionEl = el;
              }
            }}
          />
        );
      }
    }

    const { component } = await mount(Test);
    await component.updateComplete;

    const getAnimationsSpy = vi.spyOn(component.transitionEl, "getAnimations");

    const closing = createControlledPromise<void>();
    getAnimationsSpy.mockImplementation(() => [
      { transitionProperty: "opacity", finished: closing.promise } as unknown as CSSTransition,
    ]);

    component.collapsed = true;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose"]);

    closing.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose", "close"]);

    const opening = createControlledPromise<void>();
    getAnimationsSpy.mockImplementation(() => [
      { transitionProperty: "opacity", finished: opening.promise } as unknown as CSSTransition,
    ]);

    component.collapsed = false;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose", "close", "beforeOpen"]);

    opening.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose", "close", "beforeOpen", "open"]);
  });

  it("uses transitionRef when provided", async () => {
    const emitted: string[] = [];

    class Test extends LitElement {
      @property() open = false;

      transitionProp = "opacity" as const;
      transitionRef = createRef<HTMLDivElement>();

      openCloseController = useOpenClose<this>({
        lifecycle: {
          onBeforeOpen: () => this.onBeforeOpen(),
          onOpen: () => this.onOpen(),
          onBeforeClose: () => this.onBeforeClose(),
          onClose: () => this.onClose(),
        },
        visibilityProps: ["open"],
      })(this);

      onBeforeOpen(): void {
        emitted.push("beforeOpen");
      }

      onOpen(): void {
        emitted.push("open");
      }

      onBeforeClose(): void {
        emitted.push("beforeClose");
      }

      onClose(): void {
        emitted.push("close");
      }

      override render(): JsxNode {
        return <div ref={this.transitionRef} />;
      }
    }

    const { component } = await mount(Test);
    await component.updateComplete;

    const opening = createControlledPromise<void>();
    const getAnimationsSpy = vi.spyOn(component.transitionRef.value, "getAnimations");
    getAnimationsSpy.mockImplementation(() => [
      { transitionProperty: "opacity", finished: opening.promise } as unknown as CSSTransition,
    ]);

    component.open = true;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeOpen"]);

    opening.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeOpen", "open"]);
  });

  it("still emits events when no matching transition is found", async () => {
    const emitted: string[] = [];

    class Test extends LitElement {
      @property() open = false;

      transitionProp = "opacity" as const;
      transitionEl!: HTMLDivElement;

      openCloseController = useOpenClose<this>({
        lifecycle: {
          onBeforeOpen: () => this.onBeforeOpen(),
          onOpen: () => this.onOpen(),
          onBeforeClose: () => this.onBeforeClose(),
          onClose: () => this.onClose(),
        },
        visibilityProps: ["open"],
      })(this);

      onBeforeOpen(): void {
        emitted.push("beforeOpen");
      }

      onOpen(): void {
        emitted.push("open");
      }

      onBeforeClose(): void {
        emitted.push("beforeClose");
      }

      onClose(): void {
        emitted.push("close");
      }

      override render(): JsxNode {
        return (
          <div
            ref={(el) => {
              if (el) {
                this.transitionEl = el;
              }
            }}
          />
        );
      }
    }

    const { component } = await mount(Test);
    await component.updateComplete;

    vi.spyOn(component.transitionEl, "getAnimations").mockReturnValue([]);

    component.open = true;
    await component.updateComplete;
    await afterNextFrame();
    await afterNextFrame(); // whenTransitionDone checks next frame before bailing out
    expect(emitted).toEqual(["beforeOpen", "open"]);
  });

  it("supports multiple configured visibility props in one controller", async () => {
    const emitted: string[] = [];

    class Test extends LitElement {
      @property() collapsed = false;
      @property() closed = false;

      transitionProp = "opacity" as const;
      transitionEl!: HTMLDivElement;

      openCloseController = useOpenClose<this>({
        lifecycle: {
          onBeforeOpen: () => this.onBeforeOpen(),
          onOpen: () => this.onOpen(),
          onBeforeClose: () => this.onBeforeClose(),
          onClose: () => this.onClose(),
        },
        visibilityProps: ["collapsed", "closed"],
      })(this);

      onBeforeOpen(): void {
        emitted.push("beforeOpen");
      }

      onOpen(): void {
        emitted.push("open");
      }

      onBeforeClose(): void {
        emitted.push("beforeClose");
      }

      onClose(): void {
        emitted.push("close");
      }

      override render(): JsxNode {
        return (
          <div
            ref={(el) => {
              if (el) {
                this.transitionEl = el;
              }
            }}
          />
        );
      }
    }

    const { component } = await mount(Test);
    await component.updateComplete;

    const getAnimationsSpy = vi.spyOn(component.transitionEl, "getAnimations");

    const closingControlledPromise = createControlledPromise<void>();
    getAnimationsSpy.mockImplementation(() => [
      {
        transitionProperty: "opacity",
        finished: closingControlledPromise.promise,
      } as unknown as CSSTransition,
    ]);

    component.closed = true;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose"]);

    closingControlledPromise.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose", "close"]);

    const openingControlledPromise = createControlledPromise<void>();
    getAnimationsSpy.mockImplementation(() => [
      {
        transitionProperty: "opacity",
        finished: openingControlledPromise.promise,
      } as unknown as CSSTransition,
    ]);

    component.closed = false;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose", "close", "beforeOpen"]);

    openingControlledPromise.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose", "close", "beforeOpen", "open"]);

    const closeFromCollapsedControlledPromise = createControlledPromise<void>();
    getAnimationsSpy.mockImplementation(() => [
      {
        transitionProperty: "opacity",
        finished: closeFromCollapsedControlledPromise.promise,
      } as unknown as CSSTransition,
    ]);

    component.collapsed = true;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose", "close", "beforeOpen", "open", "beforeClose"]);

    closeFromCollapsedControlledPromise.resolve();
    await afterNextFrame();
    expect(emitted).toEqual(["beforeClose", "close", "beforeOpen", "open", "beforeClose", "close"]);

    const openFromCollapsedControlledPromise = createControlledPromise<void>();
    getAnimationsSpy.mockImplementation(() => [
      {
        transitionProperty: "opacity",
        finished: openFromCollapsedControlledPromise.promise,
      } as unknown as CSSTransition,
    ]);

    component.collapsed = false;
    await component.updateComplete;
    await afterNextFrame();
    expect(emitted).toEqual([
      "beforeClose",
      "close",
      "beforeOpen",
      "open",
      "beforeClose",
      "close",
      "beforeOpen",
    ]);

    openFromCollapsedControlledPromise.resolve();
    await afterNextFrame();
    expect(emitted).toEqual([
      "beforeClose",
      "close",
      "beforeOpen",
      "open",
      "beforeClose",
      "close",
      "beforeOpen",
      "open",
    ]);
  });
});
