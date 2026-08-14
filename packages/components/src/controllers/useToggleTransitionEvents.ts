import { LitElement } from "@arcgis/lumina";
import { makeGenericController } from "@arcgis/lumina/controllers";
import type { Ref } from "lit/directives/ref.js";
import type { KebabCase } from "type-fest";
import { whenTransitionDone } from "../utils/dom";

/**
 * Component contract required by the toggle transition events controller.
 */
export interface ToggleTransitionComponent extends LitElement {
  /** Specifies the name of the CSS transition property. */
  transitionProp: KebabCase<Extract<keyof CSSStyleDeclaration, string>>;

  /** Specifies the element whose transition the controller awaits. */
  transitionRef: Ref<HTMLElement>;
}

type BooleanPropertyKey<T> = Extract<
  {
    [Property in keyof T]-?: T[Property] extends boolean ? Property : never;
  }[keyof T],
  string
>;

/**
 * Lifecycle callbacks for a toggle property's active and inactive states.
 */
export interface ToggleTransitionEvents<T extends ToggleTransitionComponent> {
  /** Called after the active transition completes. */
  active: (this: T) => void;

  /** Called after the component updates and before the active transition starts. */
  beforeActive?: (this: T) => void;

  /** Called after the component updates and before the inactive transition starts. */
  beforeInactive?: (this: T) => void;

  /** Called after the inactive transition completes. */
  inactive: (this: T) => void;
}

/**
 * Configuration for a boolean property that triggers transition lifecycle callbacks.
 */
export interface ToggleTransitionPropertyConfig<T extends ToggleTransitionComponent> {
  /** Lifecycle callbacks for the property's active and inactive states. */
  events: ToggleTransitionEvents<T>;

  /**
   * Resolves the effective active state. A boolean makes the property active when it equals that value.
   */
  isActive?: boolean | ((this: T, value: boolean) => boolean);
}

/**
 * Configures reactive boolean properties that trigger transition lifecycle callbacks.
 */
export type ToggleTransitionEventsConfig<T extends ToggleTransitionComponent> = {
  [Property in BooleanPropertyKey<T>]?: ToggleTransitionPropertyConfig<T>;
};

type ToggleTransitionCallback<T extends ToggleTransitionComponent> = (this: T) => void;

interface PendingTransition {
  complete: () => void;
}

/**
 * Creates a controller that invokes lifecycle callbacks around CSS transitions for one or more boolean properties.
 */
export function useToggleTransitionEvents<T extends ToggleTransitionComponent>(
  config: ToggleTransitionEventsConfig<T>,
): ReturnType<typeof makeGenericController<void, T>> {
  return makeGenericController<void, T>((component, controller) => {
    const pendingTransitions = new Set<PendingTransition>();
    const previousActiveStates = new Map<BooleanPropertyKey<T>, boolean>();
    const properties = Object.keys(config) as BooleanPropertyKey<T>[];

    controller.onUpdate((changes) => {
      const initialUpdate = !component.hasUpdated;

      properties.forEach((property) => {
        const propertyConfig = config[property];

        if (!propertyConfig || (!initialUpdate && !changes.has(property))) {
          return;
        }

        const active = getActiveState(component, property, propertyConfig);
        const stateChanged = previousActiveStates.get(property) !== active;

        previousActiveStates.set(property, active);

        if ((!stateChanged && !initialUpdate) || (initialUpdate && !active)) {
          return;
        }

        const { events } = propertyConfig;
        const before = active ? events.beforeActive : events.beforeInactive;
        const complete = active ? events.active : events.inactive;

        void runTransition(before, complete);
      });
    });

    controller.onDisconnected(() => {
      pendingTransitions.forEach((transition) => transition.complete());
    });

    async function runTransition(
      before: ToggleTransitionCallback<T> | undefined,
      complete: ToggleTransitionCallback<T>,
    ): Promise<void> {
      let started = false;
      let completed = false;

      const pendingTransition: PendingTransition = {
        complete: () => {
          if (!started || completed) {
            return;
          }

          completed = true;
          pendingTransitions.delete(pendingTransition);
          complete.call(component);
        },
      };

      pendingTransitions.add(pendingTransition);

      before?.call(component);
      started = true;

      if (!component.el.isConnected) {
        pendingTransition.complete();
        return;
      }

      await component.updateComplete;

      if (completed) {
        return;
      }

      const transitionNode = component.transitionRef.value;

      if (transitionNode) {
        await whenTransitionDone(transitionNode, component.transitionProp);
      }

      pendingTransition.complete();
    }
  });
}

function getActiveState<T extends ToggleTransitionComponent>(
  component: T,
  property: BooleanPropertyKey<T>,
  config: ToggleTransitionPropertyConfig<T>,
): boolean {
  const value = component[property] === true;

  if (typeof config.isActive === "function") {
    return config.isActive.call(component, value);
  }

  return typeof config.isActive === "boolean" ? value === config.isActive : value;
}
