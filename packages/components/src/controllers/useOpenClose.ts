import { makeGenericController } from "@arcgis/lumina/controllers";
import { LitElement } from "@arcgis/lumina";
import { Ref } from "lit/directives/ref.js";
import type { KebabCase } from "type-fest";
import { ReactiveElement } from "lit";
import { whenTransitionDone } from "../utils/dom";

type VisibilityProp = "open" | "closed" | "expanded" | "collapsed";
/** One or more props used to derive whether a component is open. */
type VisibilityPropList = readonly [VisibilityProp, ...VisibilityProp[]];
type CustomVisibilityPropList = readonly [string, ...string[]];

type VisibilityState = Partial<Record<VisibilityProp, boolean>> &
  ({ open: boolean } | { closed: boolean } | { expanded: boolean } | { collapsed: boolean });

/**
 * Interface for open/close event-emitting components.
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
 *
 * Use ONE of the following configuration modes:
 *
 * STANDARD VISIBILITY CONTRACT
 * Use `visibilityProps` when the component uses one or more of the built-in
 * visibility props: `open`, `closed`, `expanded`, or `collapsed`.
 *
 * useOpenClose({
 *   visibilityProps: ["open"],
 *   shouldToggle: (host) => !host.disabled && !host.readOnly,
 * });
 *
 * CUSTOM VISIBILITY CONTRACT
 * Use `customVisibilityProps` when the component uses component-specific
 * visibility props not covered by the built-in set. In this mode, `isOpen`
 * defines how to derive whether the component is currently open.
 *
 * useOpenClose({
 *   customVisibilityProps: ["opened"],
 *   isOpen: (host) => host.opened,
 * });
 *
 * `shouldToggle` optionally suppresses lifecycle emission for either mode.
 */
type UseOpenCloseOptions<T extends UseOpenCloseComponent> =
  | {
      visibilityProps: VisibilityPropList;
      shouldToggle?: (host: T, isOpen: boolean) => boolean;
    }
  | {
      customVisibilityProps: CustomVisibilityPropList;
      isOpen: (host: T) => boolean;
      shouldToggle?: (host: T, isOpen: boolean) => boolean;
    };

/**
 * Controller for managing open/close-related events.
 */
export const useOpenClose = <T extends UseOpenCloseComponent>(
  options: UseOpenCloseOptions<T>,
): ReturnType<typeof makeGenericController<void, T>> =>
  makeGenericController<void, T>((component, controller) => {
    const watchedProps = "visibilityProps" in options ? options.visibilityProps : options.customVisibilityProps;

    let previousOpenState = getOpenState(component);

    controller.onUpdate((changes) => {
      const visibilityPropChanged = watchedProps.some((visibilityProp) => changes.has(visibilityProp));

      if (!visibilityPropChanged) {
        return;
      }

      const currentOpenState = getOpenState(component);

      if (previousOpenState === currentOpenState) {
        return;
      }

      if (options.shouldToggle?.(component, currentOpenState) ?? true) {
        void emitOpenCloseEventsAfterUpdate(component, currentOpenState);
      }

      previousOpenState = currentOpenState;
    });

    function getOpenState(host: UseOpenCloseComponent): boolean {
      if ("visibilityProps" in options) {
        return options.visibilityProps.every((visibilityProp) => getOpenStateForProp(host, visibilityProp));
      }

      return !!options.isOpen(host as T);
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

    async function emitOpenCloseEventsAfterUpdate(host: UseOpenCloseComponent, isOpen: boolean): Promise<void> {
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
