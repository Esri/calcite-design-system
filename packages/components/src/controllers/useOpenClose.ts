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

export type OpenCloseExpandedCollapseState = OpenCloseState & ExpandedCollapseState;

type OpenCloseVisibilityProp = keyof OpenCloseState & string;

type ExpandedCollapseVisibilityProp = keyof ExpandedCollapseState & string;

type VisibilityProp = keyof OpenCloseExpandedCollapseState & string;

type StandardWatchedProps = readonly [VisibilityProp];

type DerivedBuiltInWatchedProps =
  | readonly [OpenCloseVisibilityProp, ExpandedCollapseVisibilityProp]
  | readonly [ExpandedCollapseVisibilityProp, OpenCloseVisibilityProp];

type CustomWatchedProp<T extends UseOpenCloseComponent> = Exclude<Extract<keyof T, string>, VisibilityProp>;

type DerivedCustomWatchedProps<T extends UseOpenCloseComponent> = readonly [
  CustomWatchedProp<T>,
  ...CustomWatchedProp<T>[],
];

type DerivedWatchedProps<T extends UseOpenCloseComponent> = DerivedBuiltInWatchedProps | DerivedCustomWatchedProps<T>;

type UseOpenCloseLifecycleHooks<T extends UseOpenCloseComponent> = {
  onBeforeOpen: (host: T) => void;
  onOpen: (host: T) => void;
  onBeforeClose: (host: T) => void;
  onClose: (host: T) => void;
};

type UseOpenCloseComponent = LitElement &
  OpenCloseExpandedCollapseState & {
    transitionProp?: KebabCase<Extract<keyof CSSStyleDeclaration, string>>;
    transitionEl?: HTMLElement;
    transitionRef?: Ref<HTMLElement>;
  };

type UseOpenCloseBaseOptions<T extends UseOpenCloseComponent> = {
  lifecycle: UseOpenCloseLifecycleHooks<T>;
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

export function useOpenClose<
  T extends UseOpenCloseComponent,
  const TWatchedProps extends StandardWatchedProps = StandardWatchedProps,
>(
  options: UseOpenCloseBaseOptions<T> & {
    /**
     * Use a single built-in visibility prop when the controller can infer open state.
     * Valid values: "open", "closed", "expanded", or "collapsed".
     */
    watchedProps: TWatchedProps;
    isOpen?: never;
  },
): ReturnType<typeof makeGenericController<void, T>>;

export function useOpenClose<
  T extends UseOpenCloseComponent,
  const TWatchedProps extends DerivedWatchedProps<T> = DerivedWatchedProps<T>,
>(
  options: UseOpenCloseBaseOptions<T> & {
    /**
     * Use either:
     * - a CROSS-AXIS built-in pair such as ["open", "expanded"], or
     * - one or more CUSTOM watched props such as ["opened"].
     *
     * Same-axis built-in pairs such as ["open", "closed"] and
     * ["expanded", "collapsed"] are intentionally rejected by typing.
     */
    watchedProps: TWatchedProps;
    isOpen: (host: T) => boolean;
  },
): ReturnType<typeof makeGenericController<void, T>>;

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
