import { makeGenericController } from "@arcgis/lumina/controllers";
import { LitElement } from "@arcgis/lumina";
import { Promisable } from "type-fest";
import { componentFocusable } from "../utils/component";
import { FocusableElement, focusElement, getRootNode } from "../utils/dom";

type FocusMode = Parameters<typeof focusElement>[1];

export interface UseSetFocus {
  // TODO: confirm if promisable is useful here or not
  (
    getFocusTarget: () => Promisable<FocusableElement | { target: FocusableElement; mode: FocusMode }> | undefined,
  ): Promise<void>;
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
      const focusConfig = toFocusConfig(await getFocusTarget());
      if (!focusConfig) {
        return;
      }

      const { target, mode } = focusConfig;

      const rootNode = getRootNode(component.el);
      const currentActiveElement = rootNode.activeElement;

      await componentFocusable(component);

      const focusAlreadyChanged = currentActiveElement !== rootNode.activeElement;

      if (focusAlreadyChanged || (abortController && !abortController?.signal.aborted)) {
        return;
      }

      component.el.removeEventListener("focus", handleFocusOut);

      return focusElement(target, mode, component.el);
    };
  });
};

function isFocusOverride(
  focusTarget: FocusableElement | { target: FocusableElement; mode: FocusMode },
): focusTarget is { target: FocusableElement; mode: FocusMode } {
  return (focusTarget as { target: FocusableElement; mode: FocusMode }).mode !== undefined;
}

function toFocusConfig(
  focusTarget: FocusableElement | { target: FocusableElement; mode: FocusMode } | undefined,
): { target: FocusableElement; mode: FocusMode } | undefined {
  if (!focusTarget) {
    return;
  }

  return isFocusOverride(focusTarget) ? focusTarget : { target: focusTarget, mode: "auto" };
}
