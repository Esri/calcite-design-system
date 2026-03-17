import { makeGenericController } from "@arcgis/lumina/controllers";
import { LitElement } from "@arcgis/lumina";
import { Ref } from "lit/directives/ref.js";
import type { KebabCase } from "type-fest";
import { ReactiveElement } from "lit";
import { whenTransitionDone } from "../utils/dom";

type VisibilityProp = "open" | "closed" | "expanded" | "collapsed";

/** One or more props used to derive whether a component is open. */
type VisibilityPropList = readonly [VisibilityProp, ...VisibilityProp[]];

type VisibilityState = Partial<Record<VisibilityProp, boolean>> &
  ({ open: boolean } | { closed: boolean } | { expanded: boolean } | { collapsed: boolean });

/**
 * Components supported by the open/close controller.
 */
type UseOpenCloseComponent = LitElement &
  VisibilityState & {
    transitionProp?: KebabCase<Extract<keyof CSSStyleDeclaration, string>>;
    onBeforeOpen: () => void;
    onOpen: () => void;
    onBeforeClose: () => void;
    onClose: () => void;
    transitionEl?: HTMLElement;
    transitionRef?: Ref<HTMLElement>;
    updateComplete: ReactiveElement["updateComplete"];
  };

/**
 * Configuration for the open/close controller.
 * - `visibilityProps`: Props used to derive the open state.
 * - `shouldToggle`: Optional guard for suppressing lifecycle emission.
 *
 * Example:
 * useOpenClose({
 *   visibilityProps: ["open"],
 *   shouldToggle: (host) => !host.disabled && !host.readOnly,
 * });
 */
export interface UseOpenCloseOptions<T extends UseOpenCloseComponent> {
  visibilityProps: VisibilityPropList;
  shouldToggle?: (host: T, isOpen: boolean) => boolean;
}

/**
 * Controller for managing open/close-related events.
 */
export const useOpenClose = <T extends UseOpenCloseComponent>(
  options: UseOpenCloseOptions<T>,
): ReturnType<typeof makeGenericController<void, T>> =>
  makeGenericController<void, T>((component, controller) => {
    const { visibilityProps, shouldToggle } = options;
    let previousOpenState = getOpenState(component);

    controller.onUpdate((changes) => {
      const visibilityPropChanged = visibilityProps.some((visibilityProp) => changes.has(visibilityProp));

      if (!visibilityPropChanged) {
        return;
      }

      const currentOpenState = getOpenState(component);

      if (previousOpenState === currentOpenState) {
        return;
      }

      if (shouldToggle?.(component, currentOpenState) ?? true) {
        void handleOpenClose(component, currentOpenState);
      }

      previousOpenState = currentOpenState;
    });

    function getOpenState(host: UseOpenCloseComponent): boolean {
      return visibilityProps.every((visibilityProp) => getOpenStateForProp(host, visibilityProp));
    }

    function getOpenStateForProp(host: UseOpenCloseComponent, visibilityProp: VisibilityProp): boolean {
      if (visibilityProp === "open") {
        return !!host.open;
      }

      if (visibilityProp === "expanded") {
        return !!host.expanded;
      }

      if (visibilityProp === "closed") {
        return !host.closed;
      }

      return !host.collapsed;
    }

    async function handleOpenClose(host: UseOpenCloseComponent, isOpen: boolean): Promise<void> {
      await host.updateComplete;

      if (isOpen) {
        host.onBeforeOpen();
      } else {
        host.onBeforeClose();
      }

      await host.updateComplete;
      const transitionNode = host.transitionRef?.value ?? host.transitionEl;

      if (transitionNode && host.transitionProp) {
        await whenTransitionDone(transitionNode, host.transitionProp);
      }

      if (isOpen) {
        host.onOpen();
      } else {
        host.onClose();
      }
    }
  });
