import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { createRef } from "lit/directives/ref.js";
import { describe, expect, it, vi } from "vitest";
import { createControlledPromise } from "../tests/utils/promises";
import { afterNextFrame } from "../tests/utils/timing";
import { useToggleTransitionEvents } from "./useToggleTransitionEvents";

function transition(finished: Promise<void>): CSSTransition {
  return {
    finished,
    transitionProperty: "opacity",
  } as unknown as CSSTransition;
}

describe("useToggleTransitionEvents", () => {
  class Test extends LitElement {
    @property() open = false;

    transitionProp = "opacity" as const;
    transitionRef = createRef<HTMLDivElement>();

    transitionController: void = useToggleTransitionEvents<Test>({
      open: {
        events: {
          active() {
            this.emittedEvents.push("open");
          },
          beforeActive() {
            this.emittedEvents.push("beforeOpen");
          },
          beforeInactive() {
            this.emittedEvents.push("beforeClose");
          },
          inactive() {
            this.emittedEvents.push("close");
          },
        },
      },
    })(this);

    emittedEvents: string[] = [];

    override render(): JsxNode {
      return <div ref={this.transitionRef} />;
    }
  }

  it("emits paired events around active and inactive transitions", async () => {
    const { component } = await mount(Test);
    const opening = createControlledPromise<void>();
    const closing = createControlledPromise<void>();
    const getAnimationsSpy = vi.spyOn(component.transitionRef.value!, "getAnimations");

    expect(component.emittedEvents).toEqual([]);

    getAnimationsSpy.mockReturnValue([transition(opening.promise)]);

    component.open = true;
    await component.updateComplete;
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["beforeOpen"]);

    opening.resolve();
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["beforeOpen", "open"]);

    getAnimationsSpy.mockReturnValue([transition(closing.promise)]);

    component.open = false;
    await component.updateComplete;
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["beforeOpen", "open", "beforeClose"]);

    closing.resolve();
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["beforeOpen", "open", "beforeClose", "close"]);
  });

  it("does not emit for an initially inactive property and emits for an initially active property", async () => {
    const { component: inactiveComponent } = await mount(Test);

    await afterNextFrame();
    await afterNextFrame();

    expect(inactiveComponent.emittedEvents).toEqual([]);

    class InitiallyOpenTest extends Test {
      constructor() {
        super();
        this.open = true;
      }
    }

    const { component: activeComponent } = await mount(InitiallyOpenTest);

    await afterNextFrame();
    await afterNextFrame();

    expect(activeComponent.emittedEvents).toEqual(["beforeOpen", "open"]);
  });

  it("supports boolean active-state inversion", async () => {
    class InvertedTest extends LitElement {
      @property() collapsed = false;

      transitionProp = "opacity" as const;
      transitionRef = createRef<HTMLDivElement>();

      transitionController: void = useToggleTransitionEvents<InvertedTest>({
        collapsed: {
          events: {
            active() {
              this.emittedEvents.push("expanded");
            },
            beforeActive() {
              this.emittedEvents.push("beforeExpand");
            },
            beforeInactive() {
              this.emittedEvents.push("beforeCollapse");
            },
            inactive() {
              this.emittedEvents.push("collapsed");
            },
          },
          isActive: false,
        },
      })(this);

      emittedEvents: string[] = [];

      constructor() {
        super();
        this.collapsed = true;
      }

      override render(): JsxNode {
        return <div ref={this.transitionRef} />;
      }
    }

    const { component } = await mount(InvertedTest);

    vi.spyOn(component.transitionRef.value!, "getAnimations").mockReturnValue([]);

    component.collapsed = false;
    await component.updateComplete;
    await afterNextFrame();
    await afterNextFrame();

    component.collapsed = true;
    await component.updateComplete;
    await afterNextFrame();
    await afterNextFrame();

    expect(component.emittedEvents).toEqual([
      "beforeExpand",
      "expanded",
      "beforeCollapse",
      "collapsed",
    ]);
  });

  it("supports predicate active states and binds callback this to the component", async () => {
    class PredicateTest extends LitElement {
      @property() enabled = false;
      @property() selected = false;

      transitionProp = "opacity" as const;
      transitionRef = createRef<HTMLDivElement>();

      transitionController: void = useToggleTransitionEvents<PredicateTest>({
        selected: {
          events: {
            active() {
              this.callbackHosts.push(this);
              this.emittedEvents.push("selected");
            },
            beforeActive() {
              this.callbackHosts.push(this);
              this.emittedEvents.push("beforeSelect");
            },
            beforeInactive() {
              this.callbackHosts.push(this);
              this.emittedEvents.push("beforeDeselect");
            },
            inactive() {
              this.callbackHosts.push(this);
              this.emittedEvents.push("deselected");
            },
          },
          isActive(value) {
            this.callbackHosts.push(this);
            this.predicateValues.push(value);
            return value && this.enabled;
          },
          shouldToggle(active) {
            this.callbackHosts.push(this);
            this.guardValues.push(active);
            return true;
          },
        },
      })(this);

      callbackHosts: PredicateTest[] = [];
      emittedEvents: string[] = [];
      guardValues: boolean[] = [];
      predicateValues: boolean[] = [];

      override render(): JsxNode {
        return <div ref={this.transitionRef} />;
      }
    }

    const { component } = await mount(PredicateTest);

    vi.spyOn(component.transitionRef.value!, "getAnimations").mockReturnValue([]);

    component.selected = true;
    await component.updateComplete;
    await afterNextFrame();

    expect(component.emittedEvents).toEqual([]);

    component.selected = false;
    await component.updateComplete;
    component.enabled = true;
    await component.updateComplete;
    component.selected = true;
    await component.updateComplete;
    await afterNextFrame();
    await afterNextFrame();

    component.selected = false;
    await component.updateComplete;
    await afterNextFrame();
    await afterNextFrame();

    expect(component.predicateValues).toEqual([false, true, false, true, false]);
    expect(component.guardValues).toEqual([true, false]);
    expect(component.emittedEvents).toEqual([
      "beforeSelect",
      "selected",
      "beforeDeselect",
      "deselected",
    ]);
    expect(component.callbackHosts.every((host) => host === component)).toBe(true);
  });

  it("supports omitted before callbacks and a missing transition ref", async () => {
    class OptionalBeforeTest extends LitElement {
      @property() active = false;

      transitionProp = "opacity" as const;
      transitionRef = createRef<HTMLDivElement>();

      transitionController: void = useToggleTransitionEvents<OptionalBeforeTest>({
        active: {
          events: {
            active() {
              this.emittedEvents.push("active");
            },
            inactive() {
              this.emittedEvents.push("inactive");
            },
          },
        },
      })(this);

      emittedEvents: string[] = [];

      override render(): JsxNode {
        return <div />;
      }
    }

    const { component } = await mount(OptionalBeforeTest);

    component.active = true;
    await component.updateComplete;
    await afterNextFrame();

    component.active = false;
    await component.updateComplete;
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["active", "inactive"]);
  });

  it("supports guards", async () => {
    class GuardedTest extends LitElement {
      @property() disabled = false;
      @property() open = false;

      transitionProp = "opacity" as const;
      transitionRef = createRef<HTMLDivElement>();

      transitionController: void = useToggleTransitionEvents<GuardedTest>({
        open: {
          events: {
            active() {
              this.emittedEvents.push("open");
            },
            beforeActive() {
              this.emittedEvents.push("beforeOpen");
            },
            beforeInactive() {
              this.emittedEvents.push("beforeClose");
            },
            inactive() {
              this.emittedEvents.push("close");
            },
          },
          shouldToggle(active) {
            this.guardValues.push(active);
            return !this.disabled;
          },
        },
      })(this);

      emittedEvents: string[] = [];
      guardValues: boolean[] = [];

      override render(): JsxNode {
        return <div ref={this.transitionRef} />;
      }
    }

    const { component } = await mount(GuardedTest);

    vi.spyOn(component.transitionRef.value!, "getAnimations").mockReturnValue([]);

    component.disabled = true;
    component.open = true;
    await component.updateComplete;
    component.open = false;
    await component.updateComplete;

    expect(component.emittedEvents).toEqual([]);

    component.disabled = false;
    component.open = true;
    await component.updateComplete;
    await afterNextFrame();
    await afterNextFrame();

    component.open = false;
    await component.updateComplete;
    await afterNextFrame();
    await afterNextFrame();

    expect(component.guardValues).toEqual([true, false, true, false]);
    expect(component.emittedEvents).toEqual(["beforeOpen", "open", "beforeClose", "close"]);
  });

  it("supports multiple independently keyed toggle properties", async () => {
    class MultiplePropertyTest extends LitElement {
      @property() expanded = false;
      @property() selected = false;

      transitionProp = "opacity" as const;
      transitionRef = createRef<HTMLDivElement>();

      transitionController: void = useToggleTransitionEvents<MultiplePropertyTest>({
        expanded: {
          events: {
            active() {
              this.emittedEvents.push("expand");
            },
            beforeActive() {
              this.emittedEvents.push("beforeExpand");
            },
            beforeInactive() {
              this.emittedEvents.push("beforeCollapse");
            },
            inactive() {
              this.emittedEvents.push("collapse");
            },
          },
        },
        selected: {
          events: {
            active() {
              this.emittedEvents.push("select");
            },
            beforeActive() {
              this.emittedEvents.push("beforeSelect");
            },
            beforeInactive() {
              this.emittedEvents.push("beforeDeselect");
            },
            inactive() {
              this.emittedEvents.push("deselect");
            },
          },
        },
      })(this);

      emittedEvents: string[] = [];

      override render(): JsxNode {
        return <div ref={this.transitionRef} />;
      }
    }

    const { component } = await mount(MultiplePropertyTest);

    vi.spyOn(component.transitionRef.value!, "getAnimations").mockReturnValue([]);

    component.expanded = true;
    await component.updateComplete;
    await afterNextFrame();
    await afterNextFrame();

    component.selected = true;
    await component.updateComplete;
    await afterNextFrame();
    await afterNextFrame();

    component.expanded = false;
    await component.updateComplete;
    await afterNextFrame();
    await afterNextFrame();

    expect(component.emittedEvents).toEqual([
      "beforeExpand",
      "expand",
      "beforeSelect",
      "select",
      "beforeCollapse",
      "collapse",
    ]);
  });

  it("keeps rapid reversal callbacks paired with their transition direction", async () => {
    const { component } = await mount(Test);
    const opening = createControlledPromise<void>();
    const closing = createControlledPromise<void>();

    vi.spyOn(component.transitionRef.value!, "getAnimations")
      .mockReturnValueOnce([transition(opening.promise)])
      .mockReturnValueOnce([transition(closing.promise)]);

    component.open = true;
    await component.updateComplete;
    await afterNextFrame();

    component.open = false;
    await component.updateComplete;
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["beforeOpen", "beforeClose"]);

    opening.resolve();
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["beforeOpen", "beforeClose", "open"]);

    closing.resolve();
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["beforeOpen", "beforeClose", "open", "close"]);
  });

  it("completes an active transition synchronously and once when disconnected", async () => {
    const { component, el } = await mount(Test);
    const opening = createControlledPromise<void>();

    vi.spyOn(component.transitionRef.value!, "getAnimations").mockReturnValue([
      transition(opening.promise),
    ]);

    component.open = true;
    await component.updateComplete;
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["beforeOpen"]);

    el.remove();

    expect(component.emittedEvents).toEqual(["beforeOpen", "open"]);

    opening.resolve();
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["beforeOpen", "open"]);
  });

  it("completes an inactive transition synchronously and once when disconnected", async () => {
    const { component, el } = await mount(Test);
    const closing = createControlledPromise<void>();
    const getAnimationsSpy = vi
      .spyOn(component.transitionRef.value!, "getAnimations")
      .mockReturnValue([]);

    component.open = true;
    await component.updateComplete;
    await afterNextFrame();
    await afterNextFrame();
    component.emittedEvents.length = 0;

    getAnimationsSpy.mockReturnValue([transition(closing.promise)]);

    component.open = false;
    await component.updateComplete;
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["beforeClose"]);

    el.remove();

    expect(component.emittedEvents).toEqual(["beforeClose", "close"]);

    closing.resolve();
    await afterNextFrame();

    expect(component.emittedEvents).toEqual(["beforeClose", "close"]);
  });

  it("does not emit an unmatched completion when disconnected before the before callback", async () => {
    const { component, el } = await mount(Test);

    component.open = true;
    el.remove();
    await component.updateComplete;
    await afterNextFrame();

    expect(component.emittedEvents).toEqual([]);
  });
});
