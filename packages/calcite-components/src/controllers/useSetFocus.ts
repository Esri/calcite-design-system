import { makeGenericController } from "@arcgis/components-controllers";
import { LitElement } from "@arcgis/lumina";
import { componentFocusable } from "../utils/component";
import { FocusableElement, focusElement, getRootNode } from "../utils/dom";

export interface UseSetFocus {
  (getFocusTarget: () => FocusableElement | undefined): Promise<void>;
}

interface SetFocusComponent extends LitElement {
  /** Sets focus on the fist focusable `calcite-radio-button` element in the component. */
  setFocus: () => Promise<void>;
}

/**
 * A controller for centralized setFocus behavior.
 *
 * @param options
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

    return async (getFocusTarget): Promise<void> => {
      const target = getFocusTarget();
      if (!target) {
        return;
      }

      const rootNode = getRootNode(component.el);
      const currentActiveElement = rootNode.activeElement;

      await componentFocusable(component);

      const focusAlreadyChanged = currentActiveElement !== rootNode.activeElement;

      if (focusAlreadyChanged || (abortController && !abortController?.signal.aborted)) {
        return;
      }

      component.el.removeEventListener("focus", handleFocusOut);
      return focusElement(target);
    };
  });
};
