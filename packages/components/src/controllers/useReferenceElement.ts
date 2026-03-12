import { makeGenericController } from "@arcgis/lumina/controllers";
import { LitElement } from "@arcgis/lumina";
import { nil } from "@arcgis/toolkit/type";
import { ReferenceElement } from "../utils/floating-ui";
import { queryElementRoots } from "../utils/dom";
import type { ReferenceElementComponentManager } from "./useReferenceElement/manager";

export type ReferenceElementType = "click" | "hover";

interface UseReferenceElementOptions {
  manager: ReferenceElementComponentManager;
}

type PublicProps = {
  /**
   * If true, the component will automatically close when another component opens.
   * Note that this prop should use the `@Prop` decorator.
   */
  autoClose?: boolean;
  /**
   * If true, the component will close when its reference element is clicked.
   * Note that this prop should use the `@Prop` decorator.
   */
  closeOnClick?: boolean;
  /**
   * Whether the component is currently open.
   * Note that this prop should use the `@Prop` decorator.
   */
  open: boolean;
  /**
   * The reference element, either as a string id or HTMLElement.
   * Note that this prop should use the `@Prop` decorator.
   */
  referenceElement: string | ReferenceElement | nil;
  /**
   * If true, disables the trigger interaction for the component.
   * Note that this prop should use the `@Prop` decorator.
   */
  triggerDisabled?: boolean;
};

type InternalProps = {
  /**
   * The resolved reference element used to trigger the component.
   */
  referenceEl: ReferenceElement | nil;

  /**
   * The type of reference element interaction ("click" or "hover").
   */
  referenceElementType: ReferenceElementType | nil;
};

/**
 * Component contract required by the reference element controller.
 */
export type ReferenceElementComponent = LitElement & PublicProps & InternalProps;

/**
 * Creates a controller that resolves and tracks a component's reference element.
 *
 * It registers the component with the provided manager and keeps registration state
 * synchronized when `referenceElement`, `referenceEl`, or `open` changes.
 *
 * Note: reference elements are managed automatically when the component is disconnected.
 */
export const useReferenceElement = <T extends ReferenceElementComponent>(
  options: UseReferenceElementOptions,
): ReturnType<typeof makeGenericController<void, T>> => {
  const { manager } = options;

  return makeGenericController<void, T>((component, controller) => {
    let animationFrameId: number | nil = null;

    const getReferenceElement = (component: ReferenceElementComponent): ReferenceElement | nil => {
      const { referenceElement, el } = component;

      return (
        (typeof referenceElement === "string" ? queryElementRoots(el, { id: referenceElement }) : referenceElement) ||
        null
      );
    };

    const setUpReferenceElement = (warn = true): void => {
      if (!component.referenceElementType) {
        return;
      }

      component.referenceEl = getReferenceElement(component);

      const { el, referenceElement, referenceEl } = component;
      if (warn && referenceElement && !referenceEl) {
        console.warn(`${el.tagName}: reference-element id "${referenceElement}" was not found.`, {
          el,
        });
      }
    };

    controller.onConnected(() => {
      // we set up the ref element in the next frame to ensure manager
      // event handlers are invoked after connect (mainly for `components` output target)
      animationFrameId = requestAnimationFrame(() => {
        if (!component.el.isConnected) {
          return;
        }

        setUpReferenceElement(component.manager.loadedCalled);
        manager.registerElement(component, component.referenceEl);
      });
    });

    controller.onLoaded(() => {
      if (component.referenceElement && !component.referenceEl) {
        setUpReferenceElement();
      }
    });

    controller.onUpdate((changes) => {
      if (!component.hasUpdated) {
        return;
      }

      if (changes.has("referenceElement")) {
        setUpReferenceElement();
      }

      if (changes.has("referenceEl")) {
        manager.unregisterElement(component, changes.get("referenceEl"));
        manager.registerElement(component, component.referenceEl);
      } else if (changes.has("open")) {
        manager.updateElement(component, component.referenceEl);
      }
    });

    controller.onDisconnected(() => {
      if (animationFrameId != null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      manager.unregisterElement(component, component.referenceEl);
    });
  });
};
