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

type VisibilityProp = keyof OpenCloseExpandedCollapseState & string;

/**
 * Built-in visibility props have standardized semantics, so the controller can
 * infer open state for a single prop per channel.
 */
type BuiltInWatchedProps = readonly [VisibilityProp];

type MultiWatchedProps<T extends UseOpenCloseComponent> = readonly [
  Extract<keyof T, string>,
  ...Extract<keyof T, string>[],
];

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
   * Use `shouldToggle` to suppress open/close lifecycle events when host state
   * such as `disabled` or `readOnly` should prevent toggling.
   *
   * @example
   * shouldToggle: (host) => !host.disabled && !host.readOnly
   */
  shouldToggle?: (host: T, isOpen: boolean) => boolean;
};

type UseOpenCloseChannelBaseOptions<T extends UseOpenCloseComponent> = UseOpenCloseBaseOptions<T> & {
  /**
   * Hooks invoked when the controller detects an open/close state transition.
   */
  lifecycle: UseOpenCloseLifecycleHooks<T>;
};

type UseOpenCloseInferredOptions<T extends UseOpenCloseComponent> = UseOpenCloseChannelBaseOptions<T> & {
  watchedProps: BuiltInWatchedProps;
  isOpen?: never;
};

type UseOpenCloseMultiPropOptions<T extends UseOpenCloseComponent> = UseOpenCloseChannelBaseOptions<T> & {
  watchedProps: MultiWatchedProps<T>;
  isOpen: (host: T) => boolean;
};

type UseOpenCloseChannelOptions<T extends UseOpenCloseComponent> =
  | UseOpenCloseInferredOptions<T>
  | UseOpenCloseMultiPropOptions<T>;

type UseOpenCloseChannelGroupOptions<T extends UseOpenCloseComponent> = {
  channels: readonly [UseOpenCloseChannelOptions<T>, ...UseOpenCloseChannelOptions<T>[]];
};

function usesMultiPropOpenState<T extends UseOpenCloseComponent>(
  options: UseOpenCloseChannelOptions<T>,
): options is UseOpenCloseMultiPropOptions<T> {
  return "isOpen" in options;
}

function isVisibilityProp(prop: string): prop is VisibilityProp {
  return prop === "open" || prop === "closed" || prop === "expanded" || prop === "collapsed";
}

function usesInferredBuiltInOpenState<T extends UseOpenCloseComponent>(
  options: UseOpenCloseChannelOptions<T>,
): options is UseOpenCloseInferredOptions<T> {
  return options.watchedProps.every(isVisibilityProp);
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
 * Channel mode:
 * - accepts one or more channels under a single `channels` option
 * - each channel can use inferred built-in state or custom `isOpen` resolution
 * - keeps previous open state per channel so each event family can emit independently
 *
 * Valid examples:
 * - `channels: [{ watchedProps: ["open"], lifecycle: ... }]`
 * - `channels: [{ watchedProps: ["closed"], ... }, { watchedProps: ["collapsed"], ... }]`
 */
export function useOpenClose<T extends UseOpenCloseComponent>(
  options: UseOpenCloseChannelGroupOptions<T>,
): ReturnType<typeof makeGenericController<void, T>>;

/**
 * Creates a generic open/close controller that:
 * - watches configured visibility props
 * - resolves the current open state
 * - emits before/open and beforeClose/close lifecycle hooks
 * - waits for the configured CSS transition to finish before final open/close hooks
 */
export function useOpenClose<T extends UseOpenCloseComponent>(
  options: UseOpenCloseChannelGroupOptions<T>,
): ReturnType<typeof makeGenericController<void, T>> {
  return makeGenericController<void, T>((component, controller) => {
    const { channels } = options;

    const previousOpenStates = channels.map((channel) => getOpenState(component, channel));

    controller.onUpdate((changes) => {
      channels.forEach((channel, channelIndex) => {
        const watchedPropChanged = channel.watchedProps.some((watchedProp) => changes.has(watchedProp));

        if (!watchedPropChanged) {
          return;
        }

        const currentOpenState = getOpenState(component, channel);

        if (previousOpenStates[channelIndex] === currentOpenState) {
          return;
        }

        if (channel.shouldToggle?.(component, currentOpenState) ?? true) {
          void emitOpenCloseEventsAfterUpdate(component, () => getOpenState(component, channel), channel.lifecycle);
        }

        previousOpenStates[channelIndex] = currentOpenState;
      });
    });

    function getOpenState(host: T, channel: UseOpenCloseChannelOptions<T>): boolean {
      if (usesMultiPropOpenState(channel)) {
        return !!channel.isOpen(host);
      }

      if (usesInferredBuiltInOpenState(channel)) {
        return getOpenStateForBuiltInProp(host, channel.watchedProps[0]);
      }

      return false;
    }

    async function emitOpenCloseEventsAfterUpdate(
      host: T,
      getCurrentOpenState: () => boolean,
      lifecycle: UseOpenCloseLifecycleHooks<T>,
    ): Promise<void> {
      await host.updateComplete;

      const isOpen = getCurrentOpenState();

      if (isOpen) {
        lifecycle.onBeforeOpen(host);
      } else {
        lifecycle.onBeforeClose(host);
      }

      await host.updateComplete;
      const transitionNode = host.transitionRef?.value ?? host.transitionEl;

      if (transitionNode && host.transitionProp) {
        await whenTransitionDone(transitionNode, host.transitionProp);
      }

      const latestOpenState = getCurrentOpenState();

      if (latestOpenState) {
        lifecycle.onOpen(host);
      } else {
        lifecycle.onClose(host);
      }
    }
  });
}
