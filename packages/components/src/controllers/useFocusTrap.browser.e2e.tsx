import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { beforeEach, afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { html, PropertyValues } from "lit";
import * as focusTrap from "focus-trap";
import { Locator, page, userEvent } from "vitest/browser";
import { createRef } from "lit/directives/ref.js";
import { afterNextTask } from "../tests/utils/timing";
import { GlobalTestProps } from "../tests/utils/interfaces";
import { CalciteConfig, clearConfig } from "../utils/config";
import { FocusTrap, useFocusTrap } from "./useFocusTrap";

vi.mock("focus-trap", { spy: true });

type TestGlobal = GlobalTestProps<{ calciteConfig?: Pick<CalciteConfig, "focusTrapStack"> }>;

class Test extends LitElement {
  static tagName = "focus-trap";

  @property() open? = false;

  focusTrap = useFocusTrap<this>({
    triggerProp: "open",
  })(this);

  private onClick() {
    this.open = false;
  }

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("open")) {
      if (this.open) {
        this.focusTrap.activate();
      } else {
        this.focusTrap.deactivate();
      }
    }
  }

  override render(): JsxNode {
    return <div>{this.open ? <button onClick={this.onClick}>close me!</button> : null}</div>;
  }
}

async function waitForFocusShift(): Promise<void> {
  // focus-trap delays focus changes until the next execution frame - see https://github.com/focus-trap/focus-trap/#delayinitialfocus
  // wait for one timeout
  await afterNextTask();
}

it("focusTrapComponent lifecycle", async () => {
  const { el, component } = await mount(Test);

  expect(component.focusTrap._instance).toBeUndefined();

  el.open = true;
  await component.updateComplete;
  const activateSpy = vi.spyOn(component.focusTrap._instance!, "activate");
  const deactivateSpy = vi.spyOn(component.focusTrap._instance!, "deactivate");
  const updateContainerElsSpy = vi.spyOn(component.focusTrap._instance!, "updateContainerElements");

  component.focusTrap.activate();
  expect(activateSpy).toHaveBeenCalledTimes(1);

  component.focusTrap.updateContainerElements();
  expect(updateContainerElsSpy).toHaveBeenCalledTimes(1);

  component.focusTrap.deactivate();
  expect(deactivateSpy).toHaveBeenCalledTimes(1);
});

describe("configuration", () => {
  beforeEach(() => {
    clearConfig();
    vi.clearAllMocks();
  });

  afterAll(() => {
    clearConfig();
    delete (globalThis as TestGlobal).calciteConfig;
  });

  it("supports custom global trap stack", async () => {
    const createFocusTrapSpy = vi.mocked(focusTrap.createFocusTrap);
    const customFocusTrapStack: FocusTrap[] = [];

    (globalThis as TestGlobal).calciteConfig = {
      focusTrapStack: customFocusTrapStack,
    };

    const { el, component } = await mount(Test);

    expect(createFocusTrapSpy).not.toHaveBeenCalled();
    expect(customFocusTrapStack).toHaveLength(0);

    el.open = true;
    await component.updateComplete;

    expect(createFocusTrapSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        trapStack: customFocusTrapStack,
      }),
    );
    expect(customFocusTrapStack).toHaveLength(1);

    el.open = false;
    await component.updateComplete;
    expect(customFocusTrapStack).toHaveLength(0);

    el.open = true;
    await component.updateComplete;
    expect(customFocusTrapStack).toHaveLength(1);
  });
});

describe("focusTrapDisabledOverride", () => {
  let override = false;

  class FocusTrapDisabledOverride extends LitElement {
    static tagName = "focus-trap-disabled-override";

    @property() open? = false;

    focusTrap = useFocusTrap<this>({
      triggerProp: "open",
    })(this);

    focusTrapDisabled = false;

    focusTrapDisabledOverride(): boolean {
      return override;
    }

    private onClick() {
      this.open = false;
    }

    override updated(changes: PropertyValues<this>): void {
      if (changes.has("open")) {
        if (this.open) {
          this.focusTrap.activate();
        } else {
          this.focusTrap.deactivate();
        }
      }
    }

    override render(): JsxNode {
      return <div>{this.open ? <button onClick={this.onClick}>close me!</button> : null}</div>;
    }
  }

  it("should activate focus trap when focusTrapDisabledOverride returns false", async () => {
    const { el, component } = await mount(FocusTrapDisabledOverride);
    el.open = true;
    await component.updateComplete;
    const activateSpy = vi.spyOn(component.focusTrap._instance!, "activate");
    override = false;

    component.focusTrap.activate();

    expect(activateSpy).toHaveBeenCalledTimes(1);
  });

  describe("configuration", () => {
    beforeEach(() => {
      clearConfig();
      vi.clearAllMocks();
    });

    afterAll(() => {
      clearConfig();
      delete (globalThis as TestGlobal).calciteConfig;
    });

    it("supports custom global trap stack", async () => {
      const createFocusTrapSpy = vi.mocked(focusTrap.createFocusTrap);
      const customFocusTrapStack: FocusTrap[] = [];
      type TestGlobal = GlobalTestProps<{ calciteConfig: Pick<CalciteConfig, "focusTrapStack"> }>;

      (globalThis as TestGlobal).calciteConfig = {
        focusTrapStack: customFocusTrapStack,
      };

      const { el, component } = await mount(FocusTrapDisabledOverride);

      expect(createFocusTrapSpy).not.toHaveBeenCalled();
      expect(customFocusTrapStack).toHaveLength(0);

      el.open = true;
      await component.updateComplete;

      expect(createFocusTrapSpy).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({
          trapStack: customFocusTrapStack,
        }),
      );
      expect(customFocusTrapStack).toHaveLength(1);

      el.open = false;
      await component.updateComplete;
      expect(customFocusTrapStack).toHaveLength(0);

      el.open = true;
      await component.updateComplete;
      expect(customFocusTrapStack).toHaveLength(1);
    });
  });

  describe("focusTrapDisabledOverride", () => {
    let override = false;

    class Test extends LitElement {
      @property() open? = false;

      focusTrap = useFocusTrap<this>({
        triggerProp: "open",
      })(this);

      focusTrapDisabled = false;

      focusTrapDisabledOverride(): boolean {
        return override;
      }

      private onClick() {
        this.open = false;
      }

      override updated(changes: PropertyValues<this>): void {
        if (changes.has("open")) {
          if (this.open) {
            this.focusTrap.activate();
          } else {
            this.focusTrap.deactivate();
          }
        }
      }

      override render(): JsxNode {
        return <div>{this.open ? <button onClick={this.onClick}>close me!</button> : null}</div>;
      }
    }

    it("should activate focus trap when focusTrapDisabledOverride returns false", async () => {
      const { el, component } = await mount(Test);
      el.open = true;
      await component.updateComplete;
      const activateSpy = vi.spyOn(component.focusTrap._instance!, "activate");
      override = false;

      component.focusTrap.activate();

      expect(activateSpy).toHaveBeenCalledTimes(1);
    });

    it("should not activate focus trap when focusTrapDisabledOverride returns true", async () => {
      const { el, component } = await mount(Test);
      el.open = true;
      await component.updateComplete;
      const activateSpy = vi.spyOn(component.focusTrap._instance!, "activate");
      override = true;

      component.focusTrap.activate();

      expect(activateSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe("focusTrapOptions", () => {
    let insideButtonLocator: Locator;
    let previousFocusedLocator: Locator;
    let nextFocusedLocator: Locator;

    function createFocusTrapOptionsTestComponent(
      options: Pick<Parameters<typeof useFocusTrap>[0], "focusTrapOptions">,
    ) {
      return class Test extends LitElement {
        open? = false;

        focusTrap = useFocusTrap<this>({
          triggerProp: "open",
          ...options,
        })(this);

        // open handling intentionally ignored to simplify test

        override render(): JsxNode {
          return <button data-testid="inside-button">close me!</button>;
        }
      };
    }

    let previousFocusedEl: HTMLInputElement;
    let nextFocusedEl: HTMLInputElement;

    beforeEach(async () => {
      previousFocusedEl = document.createElement("input");
      nextFocusedEl = document.createElement("input");
      document.body.append(nextFocusedEl, previousFocusedEl);

      previousFocusedLocator = page.elementLocator(previousFocusedEl);
      nextFocusedLocator = page.elementLocator(nextFocusedEl);

      insideButtonLocator = page.getByTestId("inside-button");

      await previousFocusedLocator.click();
    });

    afterEach(() => {
      previousFocusedEl.remove();
      nextFocusedEl.remove();
    });

    describe("setReturnFocus option", () => {
      it("should use custom setReturnFocus function if provided", async () => {
        const { component } = await mount(
          createFocusTrapOptionsTestComponent({
            focusTrapOptions: {
              setReturnFocus: () => nextFocusedLocator.element() as HTMLInputElement,
            },
          }),
        );

        component.focusTrap.activate();
        await waitForFocusShift();

        await expect
          .element(insideButtonLocator)
          .toBe(document.activeElement!.shadowRoot!.activeElement);

        component.focusTrap.deactivate();
        await waitForFocusShift();

        await expect.element(nextFocusedLocator).toBe(document.activeElement);
      });

      it("allows disabling return focus behavior", async () => {
        const { component } = await mount(
          createFocusTrapOptionsTestComponent({
            focusTrapOptions: {
              setReturnFocus: false,
            },
          }),
        );

        component.focusTrap.activate();
        await waitForFocusShift();

        await expect
          .element(insideButtonLocator)
          .toBe(document.activeElement!.shadowRoot!.activeElement);

        component.focusTrap.deactivate();
        await waitForFocusShift();

        await expect
          .element(insideButtonLocator)
          .toBe(document.activeElement!.shadowRoot!.activeElement);
      });

      it("should use default setReturnFocus if custom function is not provided", async () => {
        const { component } = await mount(
          createFocusTrapOptionsTestComponent({
            focusTrapOptions: {
              setReturnFocus: undefined,
            },
          }),
        );

        component.focusTrap.activate();
        await waitForFocusShift();

        await expect
          .element(insideButtonLocator)
          .toBe(document.activeElement!.shadowRoot!.activeElement);

        component.focusTrap.deactivate();
        await waitForFocusShift();

        await expect.element(previousFocusedLocator).toBe(document.activeElement);
      });
    });
  });

  it("does not try to restore focus to the document when there was no previously focused element", async () => {
    const { el, component } = await mount<FocusTrapDisabledOverride>(
      html`
        <input value="should not focus here" />
        <focus-trap-disabled-override></focus-trap-disabled-override>
      `,
      { dynamicComponents: [FocusTrapDisabledOverride] },
    );

    el.open = true;
    await component.updateComplete;
    const activateSpy = vi.spyOn(component.focusTrap._instance!, "activate");
    override = true;

    component.focusTrap.activate();

    expect(activateSpy).toHaveBeenCalledTimes(0);
  });

  it("handles Escape in a hierarchy of focus-trapping and non-focus-trapping components", async () => {
    class FocusTrapComponent extends LitElement {
      static tagName = "focus-trapping-child";

      @property({ type: Boolean }) open = false;

      focusTrap = useFocusTrap<this>({
        triggerProp: "open",
        focusTrapOptions: {
          escapeDeactivates: (event) => {
            if (!event.defaultPrevented) {
              this.open = false;
              event.preventDefault();
            }
            return true;
          },
        },
      })(this);

      override updated(changes: PropertyValues<this>): void {
        if (changes.has("open")) {
          if (this.open) {
            this.focusTrap.activate();
          } else {
            this.focusTrap.deactivate();
          }
        }
      }

      override render(): JsxNode {
        return this.open ? <input /> : null;
      }
    }

    class NonFocusTrapComponent extends LitElement {
      static tagName = "non-focus-trapping-parent";

      @property({ type: Boolean }) open = false;

      #buttonRef = createRef<HTMLButtonElement>();

      constructor() {
        super();
        this.listen("keydown", (event) => {
          if (event.key === "Escape" && !event.defaultPrevented) {
            this.open = false;
            event.preventDefault();
          }
        });
      }

      override updated(changes: PropertyValues<this>): void {
        if (changes.has("open")) {
          if (this.open) {
            this.#buttonRef.value?.focus();
          }
        }
      }

      override render(): JsxNode {
        return this.open ? (
          <div>
            <slot />
            <button ref={this.#buttonRef}>close</button>
          </div>
        ) : null;
      }
    }

    await mount(
      html`
        <non-focus-trapping-parent open data-testid="non-focus-trapping">
          <focus-trapping-child open data-testid="focus-trapping"></focus-trapping-child>
        </non-focus-trapping-parent>
      `,
      { dynamicComponents: [NonFocusTrapComponent, FocusTrapComponent] },
    );
    const nonTrap = page.getByTestId("non-focus-trapping");
    const trap = nonTrap.getByTestId("focus-trapping");

    await expect.element(trap).toHaveFocus();

    await userEvent.keyboard("{Escape}");

    await expect.element(nonTrap).toHaveFocus();
    await expect.element(trap).toHaveProperty("open", false);
    await expect.element(nonTrap).toHaveProperty("open", true);
  });
});

describe("focusTrapOptions", () => {
  let insideButtonLocator: Locator;
  let previousFocusedLocator: Locator;
  let nextFocusedLocator: Locator;

  function createFocusTrapOptionsTestComponent(
    options: Pick<Parameters<typeof useFocusTrap>[0], "focusTrapOptions">,
  ) {
    return class Test extends LitElement {
      open? = false;

      focusTrap = useFocusTrap<this>({
        triggerProp: "open",
        ...options,
      })(this);

      // open handling intentionally ignored to simplify test

      override render(): JsxNode {
        return <button data-testid="inside-button">close me!</button>;
      }
    };
  }

  let previousFocusedEl: HTMLInputElement;
  let nextFocusedEl: HTMLInputElement;

  beforeEach(async () => {
    previousFocusedEl = document.createElement("input");
    nextFocusedEl = document.createElement("input");
    document.body.append(nextFocusedEl, previousFocusedEl);

    previousFocusedLocator = page.elementLocator(previousFocusedEl);
    nextFocusedLocator = page.elementLocator(nextFocusedEl);

    insideButtonLocator = page.getByTestId("inside-button");

    await previousFocusedLocator.click();
  });

  afterEach(() => {
    previousFocusedEl.remove();
    nextFocusedEl.remove();
  });

  describe("setReturnFocus option", () => {
    it("should use custom setReturnFocus function if provided", async () => {
      const { component } = await mount(
        createFocusTrapOptionsTestComponent({
          focusTrapOptions: {
            setReturnFocus: () => nextFocusedLocator.element() as HTMLInputElement,
          },
        }),
      );

      component.focusTrap.activate();
      await waitForFocusShift();

      await expect
        .element(insideButtonLocator)
        .toBe(document.activeElement!.shadowRoot!.activeElement);

      component.focusTrap.deactivate();
      await waitForFocusShift();

      await expect.element(nextFocusedLocator).toBe(document.activeElement);
    });

    it("allows disabling return focus behavior", async () => {
      const { component } = await mount(
        createFocusTrapOptionsTestComponent({
          focusTrapOptions: {
            setReturnFocus: false,
          },
        }),
      );

      component.focusTrap.activate();
      await waitForFocusShift();

      await expect
        .element(insideButtonLocator)
        .toBe(document.activeElement!.shadowRoot!.activeElement);

      component.focusTrap.deactivate();
      await waitForFocusShift();

      await expect
        .element(insideButtonLocator)
        .toBe(document.activeElement!.shadowRoot!.activeElement);
    });

    it("should use default setReturnFocus if custom function is not provided", async () => {
      const { component } = await mount(
        createFocusTrapOptionsTestComponent({
          focusTrapOptions: {
            setReturnFocus: undefined,
          },
        }),
      );

      component.focusTrap.activate();
      await waitForFocusShift();

      await expect
        .element(insideButtonLocator)
        .toBe(document.activeElement!.shadowRoot!.activeElement);

      component.focusTrap.deactivate();
      await waitForFocusShift();

      await expect.element(previousFocusedLocator).toBe(document.activeElement);
    });
  });
});

it("does not try to restore focus to the document when there was no previously focused element", async () => {
  const { el, component } = await mount(
    html`
      <input value="should not focus here" />
      <focus-trap></focus-trap>
    `,
    { dynamicComponents: [Test] },
  );

  el.open = true;
  await component.updateComplete;
  await waitForFocusShift();

  expect(document.activeElement!.tagName).toBe(el.tagName);

  el.open = false;
  await component.updateComplete;
  await waitForFocusShift();

  expect(document.activeElement!.tagName).toBe("BODY");
});
