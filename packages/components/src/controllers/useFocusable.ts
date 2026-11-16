import { makeGenericController } from "@arcgis/lumina/controllers";
import { componentFocusable } from "../utils/component";
import { FocusableElement, focusElement, getFocusableElements, getRootNode, SetFocusable } from "../utils/dom";
import type { InteractiveComponent } from "./useInteractive";

type FocusStrategy = "focusable" | "tabbable";
type FocusConfig = { target: FocusableElement; includeContainer?: boolean; strategy?: FocusStrategy };

export interface UseFocusable {
  /** Resolves the deepest focused element in the component's root. */
  getDeepActiveElement: () => Element | null;
  /** Returns unique focusable elements, including the container and its shadow trees. */
  getFocusableElements: (container: Element | undefined) => (HTMLElement | SVGElement)[];
  /** Whether focus is within the component, including its shadow tree. */
  readonly hasFocus: boolean;
  /** Checks whether focus remains on a previously captured element. */
  isFocusUnchanged: (focusedElement: Element | null) => boolean;
  /** Checks whether focus is within an element, including its shadow tree. */
  isFocusedWithin: (element: Element) => boolean;
  /** Focuses the resolved target after the component is ready, unless focus has changed. */
  setFocus: (getFocusTarget: () => FocusableElement | FocusConfig | undefined, options?: FocusOptions) => Promise<void>;
}

type FocusableComponent = SetFocusable & Partial<Pick<InteractiveComponent, "disabled">>;

/**
 * A controller for shared focus queries and a focus setter for component setFocus methods.
 * The component must implement `setFocus`.
 */
export const useFocusable = <T extends FocusableComponent>(): ReturnType<
  typeof makeGenericController<UseFocusable, T>
> => {
  return makeGenericController<UseFocusable, T>((component, controller) => {
    let abortController: AbortController;

    function handleFocusOut(): void {
      abortController?.abort();
    }

    controller.onLoad(() => {
      component.listen("focus", () => {
        abortController = new AbortController();
        component.el.addEventListener("focusout", handleFocusOut, { signal: abortController.signal });
      });
    });

    controller.onDisconnected(() => {
      component.el.removeEventListener("focusout", handleFocusOut);
    });

    async function setFocus(
      getFocusTarget: () => FocusableElement | FocusConfig | undefined,
      options?: FocusOptions,
    ): Promise<void> {
      if (component.disabled) {
        return;
      }

      const focusConfig = toFocusConfig(getFocusTarget());
      if (!focusConfig) {
        return;
      }

      const { target, includeContainer, strategy } = focusConfig;

      const rootNode = getRootNode(component.el);
      const currentActiveElement = rootNode.activeElement;

      await componentFocusable(component);

      const focusAlreadyChanged = currentActiveElement !== rootNode.activeElement;

      if (focusAlreadyChanged || (abortController && !abortController?.signal.aborted)) {
        return;
      }

      component.el.removeEventListener("focus", handleFocusOut);

      return focusElement(target, includeContainer, strategy, component.el, options);
    }

    const focusable: UseFocusable = {
      getDeepActiveElement(): Element | null {
        const rootNode = getRootNode(component.el);
        let focusedElement = rootNode.activeElement ?? component.el.ownerDocument.activeElement;
        while (focusedElement?.shadowRoot?.activeElement) {
          focusedElement = focusedElement.shadowRoot.activeElement;
        }
        return focusedElement;
      },
      getFocusableElements,
      get hasFocus(): boolean {
        return component.el.matches(":focus-within");
      },
      isFocusUnchanged(focusedElement): boolean {
        return focusable.getDeepActiveElement() === focusedElement;
      },
      isFocusedWithin(element): boolean {
        const activeElement = getRootNode(element).activeElement;
        return element.contains(activeElement);
      },
      setFocus,
    };
    return focusable;
  });
};

function isFocusOverride(focusTarget: FocusableElement | FocusConfig): focusTarget is FocusConfig {
  return "target" in focusTarget && ("includeContainer" in focusTarget || "strategy" in focusTarget);
}

function toFocusConfig(focusTarget: FocusableElement | FocusConfig | undefined): FocusConfig | undefined {
  if (!focusTarget) {
    return;
  }

  return isFocusOverride(focusTarget) ? focusTarget : { target: focusTarget };
}
