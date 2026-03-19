import { makeGenericController } from "@arcgis/lumina/controllers";
import { LitElement } from "@arcgis/lumina";
import { Ref } from "lit/directives/ref.js";
import type { KebabCase } from "type-fest";
import { whenTransitionDone } from "../utils/dom";

export type ExclusiveState<A extends string, B extends string> =
  | ({ [K in A]?: boolean } & { [K in B]?: never })
  | ({ [K in B]?: boolean } & { [K in A]?: never });

export type OpenCloseState = ExclusiveState<"open", "closed">;

export type ExpandedCollapseState = ExclusiveState<"expanded", "collapsed">;

/**
 * Components may expose one prop from each axis:
 * - open/closed
 * - expanded/collapsed
 */
export type OpenCloseExpandedCollapseState = OpenCloseState & ExpandedCollapseState;

type OpenCloseVisibilityProp = keyof OpenCloseState & string;

type ExpandedCollapseVisibilityProp = keyof ExpandedCollapseState & string;

type VisibilityProp = keyof OpenCloseExpandedCollapseState & string;

/**
 * Standard mode watches a single built-in visibility prop and lets the controller
 * infer whether the host is open or closed.
 */
type StandardWatchedProps = readonly [VisibilityProp];

/**
 * Derived built-in mode supports only cross-axis pairs. Same-axis pairs are
 * intentionally excluded by typing.
 */
type DerivedBuiltInWatchedProps =
  | readonly [OpenCloseVisibilityProp, ExpandedCollapseVisibilityProp]
  | readonly [ExpandedCollapseVisibilityProp, OpenCloseVisibilityProp];

/**
 * Custom watched props are host string keys that are not built-in visibility props.
 * Example: "opened"
 */
type CustomWatchedProp<T extends UseOpenCloseComponent> = Exclude<Extract<keyof T, string>, VisibilityProp>;

type DerivedCustomWatchedProps<T extends UseOpenCloseComponent> = readonly [
  CustomWatchedProp<T>,
  ...CustomWatchedProp<T>[],
];

/**
 * Derived mode supports:
 * - cross-axis built-in watched props, or
 * - one or more custom watched props with an explicit `isOpen` resolver.
 */
type DerivedWatchedProps<T extends UseOpenCloseComponent> = DerivedBuiltInWatchedProps | DerivedCustomWatchedProps<T>;

type UseOpenCloseLifecycleHooks<T extends UseOpenCloseComponent> = {
  onBeforeOpen: (host: T) => void;
  onOpen: (host: T) => void;
  onBeforeClose: (host: T) => void;
  onClose: (host: T) => void;
};

/**
 * Minimum host surface expected by the controller.
 * Components may optionally provide a transition target through `transitionEl`,
 * `transitionRef`, along with the CSS transition property to observe.
 */
type UseOpenCloseComponent = LitElement &
  OpenCloseExpandedCollapseState & {
    transitionProp?: KebabCase<Extract<keyof CSSStyleDeclaration, string>>;
    transitionEl?: HTMLElement;
    transitionRef?: Ref<HTMLElement>;
  };

type UseOpenCloseBaseOptions<T extends UseOpenCloseComponent> = {
  /**
   * Hooks invoked when the controller detects an open/close state transition.
   */
  lifecycle: UseOpenCloseLifecycleHooks<T>;
  /**
   * Use `shouldToggle` to suppress open/close lifecycle events when host state
   * such as `disabled` or `readOnly` should prevent toggling.
   *
   * @example
   * shouldToggle: (host) => !host.disabled && !host.readOnly
   */
  shouldToggle?: (host: T, isOpen: boolean) => boolean;
};

type UseOpenCloseStandardOptions<T extends UseOpenCloseComponent> = UseOpenCloseBaseOptions<T> & {
  watchedProps: StandardWatchedProps;
  isOpen?: never;
};

type UseOpenCloseDerivedOptions<T extends UseOpenCloseComponent> = UseOpenCloseBaseOptions<T> & {
  watchedProps: DerivedWatchedProps<T>;
  isOpen: (host: T) => boolean;
};

type UseOpenCloseOptions<T extends UseOpenCloseComponent> =
  | UseOpenCloseStandardOptions<T>
  | UseOpenCloseDerivedOptions<T>;

function usesDerivedOpenState<T extends UseOpenCloseComponent>(
  options: UseOpenCloseOptions<T>,
): options is UseOpenCloseDerivedOptions<T> {
  return "isOpen" in options;
}

function getOpenStateForBuiltInProp(host: OpenCloseExpandedCollapseState, visibilityProp: VisibilityProp): boolean {
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

/**
 * Standard mode:
 * - watches exactly one built-in prop
 * - infers open state automatically
 * - does not allow `isOpen`
 *
 * Valid examples:
 * - `watchedProps: ["open"]`
 * - `watchedProps: ["closed"]`
 * - `watchedProps: ["expanded"]`
 * - `watchedProps: ["collapsed"]`
 */
export function useOpenClose<
  T extends UseOpenCloseComponent,
  const TWatchedProps extends StandardWatchedProps = StandardWatchedProps,
>(
  options: UseOpenCloseBaseOptions<T> & {
    watchedProps: TWatchedProps;
    isOpen?: never;
  },
): ReturnType<typeof makeGenericController<void, T>>;

/**
 * Derived mode:
 * - watches cross-axis built-in props or custom props
 * - requires `isOpen` to resolve the effective open state
 *
 * Valid examples:
 * - `watchedProps: ["open", "expanded"]`
 * - `watchedProps: ["closed", "collapsed"]`
 * - `watchedProps: ["opened"]`
 *
 * Invalid same-axis combinations such as `["open", "closed"]` and
 * `["expanded", "collapsed"]` are intentionally rejected by typing.
 */
export function useOpenClose<
  T extends UseOpenCloseComponent,
  const TWatchedProps extends DerivedWatchedProps<T> = DerivedWatchedProps<T>,
>(
  options: UseOpenCloseBaseOptions<T> & {
    watchedProps: TWatchedProps;
    isOpen: (host: T) => boolean;
  },
): ReturnType<typeof makeGenericController<void, T>>;

/**
 * Creates a generic open/close controller that:
 * - watches configured visibility props
 * - resolves the current open state
 * - emits before/open and beforeClose/close lifecycle hooks
 * - waits for the configured CSS transition to finish before final open/close hooks
 */
export function useOpenClose<T extends UseOpenCloseComponent>(
  options: UseOpenCloseOptions<T>,
): ReturnType<typeof makeGenericController<void, T>> {
  return makeGenericController<void, T>((component, controller) => {
    const watchedProps = options.watchedProps;

    let previousOpenState = getOpenState(component);

    controller.onUpdate((changes) => {
      const watchedPropChanged = watchedProps.some((watchedProp) => changes.has(watchedProp));

      if (!watchedPropChanged) {
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

    function getOpenState(host: T): boolean {
      if (usesDerivedOpenState(options)) {
        return !!options.isOpen(host);
      }

      return getOpenStateForBuiltInProp(host, options.watchedProps[0]);
    }

    async function emitOpenCloseEventsAfterUpdate(host: T, isOpen: boolean): Promise<void> {
      await host.updateComplete;

      if (isOpen) {
        options.lifecycle.onBeforeOpen(host);
      } else {
        options.lifecycle.onBeforeClose(host);
      }

      await host.updateComplete;
      const transitionNode = host.transitionRef?.value ?? host.transitionEl;

      if (transitionNode && host.transitionProp) {
        await whenTransitionDone(transitionNode, host.transitionProp);
      }

      if (isOpen) {
        options.lifecycle.onOpen(host);
      } else {
        options.lifecycle.onClose(host);
      }
    }
  });
}
