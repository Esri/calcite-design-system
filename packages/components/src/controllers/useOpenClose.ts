import { makeGenericController } from "@arcgis/lumina/controllers";
import { LitElement } from "@arcgis/lumina";
import { Ref } from "lit/directives/ref.js";
import type { KebabCase } from "type-fest";
import { ReactiveElement } from "lit";
import { whenTransitionDone } from "../utils/dom";

type VisibilityProp = "open" | "closed" | "expanded" | "collapsed";
type VisibilityPropList = readonly [VisibilityProp, ...VisibilityProp[]];

type VisibilityState = Partial<Record<VisibilityProp, boolean>> &
  ({ open: boolean } | { closed: boolean } | { expanded: boolean } | { collapsed: boolean });

/**
 * Interface for components using the open/close controller.
 */
export type UseOpenCloseComponent = LitElement &
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
 * Controller for managing open/close lifecycle and transitions.
 */
export const useOpenClose = <T extends UseOpenCloseComponent>(
  visibilityProps: VisibilityPropList,
): ReturnType<typeof makeGenericController<void, T>> =>
  makeGenericController<void, T>((component, controller) => {
    let previousOpenState = getOpenState(component);

    controller.onUpdate(() => {
      const currentOpenState = getOpenState(component);

      if (previousOpenState !== currentOpenState) {
        handleOpenClose(component, currentOpenState);
        previousOpenState = currentOpenState;
      }
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
