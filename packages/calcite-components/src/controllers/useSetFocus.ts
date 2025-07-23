import { makeGenericController } from "@arcgis/lumina/controllers";
import { componentFocusable } from "../utils/component";
import { FocusableElement, focusElement, getRootNode, SetFocusable } from "../utils/dom";
import { type InteractiveComponent } from "../utils/interactive";

type FocusStrategy = "focusable" | "tabbable";
type FocusConfig = { target: FocusableElement; includeContainer?: boolean; strategy?: FocusStrategy };

export interface UseSetFocus {
  (getFocusTarget: () => FocusableElement | FocusConfig | undefined, options?: FocusOptions): Promise<void>;
}

type SetFocusComponent = SetFocusable & Partial<Pick<InteractiveComponent, "disabled">>;

/**
 * A controller for centralized setFocus behavior.
 */
export const useSetFocus = <T extends SetFocusComponent>(): ReturnType<
  typeof makeGenericController<UseSetFocus, T>
> => {
  return makeGenericController<UseSetFocus, T>((component, controller) => {
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

    return async (getFocusTarget, options?: FocusOptions): Promise<void> => {
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
    };
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
