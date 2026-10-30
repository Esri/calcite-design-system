import { makeGenericController } from "@arcgis/lumina/controllers";
import { h, type JsxNode, LitElement } from "@arcgis/lumina";
import type { TemplateResult } from "lit";
import type { SetOptional } from "type-fest";
import type { CustomAttributes } from "@arcgis/lumina/jsx/baseTypes";

export interface InteractiveComponent extends LitElement {
  /**
   * When true, prevents user interaction.
   */
  disabled: boolean;
}

type UseInteractive = typeof InteractiveContainer;

interface InteractiveContainerProps extends CustomAttributes {
  disabled: boolean;
}

const CSS = {
  container: "interaction-container",
};

const InteractiveContainer = ({
  children,
  disabled,
}: InteractiveContainerProps & { children: JsxNode }): TemplateResult => (
  <div class={CSS.container} inert={disabled}>
    {children}
  </div>
);

/**
 * Provides shared disabled-state behavior for interactive components, keeping interaction handling
 * consistent across components.
 *
 * The controller synchronizes host-level disabled behavior when the component updates, including
 * setting `aria-disabled`, removing focus from a focused descendant, and making the wrapped content
 * inert. Forward `disabled` to child controls that support it so they can apply their own disabled
 * behavior and appearance.
 *
 * @returns A JSX container component that accepts `disabled` and wraps the component's interactive
 * content.
 *
 * @example Controller setup
 * ```tsx
 * import { h, LitElement, property, type JsxNode } from "@arcgis/lumina";
 * import { useInteractive } from "../../controllers/useInteractive";
 *
 * class ExampleComponent extends LitElement {
 *   @property({ reflect: true }) disabled = false;
 *
 *   private interactiveContainer = useInteractive(this);
 *
 *   override render(): JsxNode {
 *     return (
 *       <this.interactiveContainer disabled={this.disabled}>
 *         <calcite-button disabled={this.disabled}>Save</calcite-button>
 *         <a href="#details">Details</a>
 *       </this.interactiveContainer>
 *     );
 *   }
 * }
 * ```
 *
 * @example Disabled styles
 * ```scss
 * @use "../../styles/shared";
 *
 * @include shared.disabled();
 * ```
 */
export const useInteractive = makeGenericController<UseInteractive, InteractiveComponent>(
  (component, controller) => {
    controller.onUpdated(() => updateHostInteraction(component));

    return InteractiveContainer;
  },
);

type InteractiveHTMLElement = HTMLElement & Pick<InteractiveComponent, "disabled">;

function interceptedClick(this: InteractiveHTMLElement): void {
  const { disabled } = this;

  if (!disabled) {
    HTMLElement.prototype.click.call(this);
  }
}

function onPointerDown(event: PointerEvent): void {
  const interactiveElement = event.target as InteractiveHTMLElement;

  if (interactiveElement.disabled) {
    // prevent click from moving focus on host
    event.preventDefault();
  }
}

const nonBubblingWhenDisabledMouseEvents = ["mousedown", "mouseup", "click"] as const;

function onNonBubblingWhenDisabledMouseEvent(event: MouseEvent): void {
  const interactiveElement = event.target as InteractiveHTMLElement;

  // prevent disallowed mouse events from being emitted on the disabled host (per https://github.com/whatwg/html/issues/5886)
  // ⚠ we generally avoid stopping propagation of events, but this is needed to adhere to the intended spec changes above ⚠
  if (interactiveElement.disabled) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
}

const captureOnlyOptions = { capture: true } as const;

/**
 * This helper updates the host element to prevent keyboard interaction on its subtree and sets the appropriate aria attribute for accessibility.
 *
 * This should be used in the `componentDidRender` lifecycle hook.
 *
 * **Notes**
 *
 * this util is not needed for simple components whose root element or elements are an interactive component (custom element or native control). For those cases, set the `disabled` props on the root components instead.
 * technically, users can override `tabindex` and restore keyboard navigation, but this will be considered user error
 *
 * @param component
 */
export function updateHostInteraction(component: InteractiveComponent): void {
  if (component.disabled) {
    component.el.setAttribute("aria-disabled", "true");

    if (component.el.contains(document.activeElement)) {
      (document.activeElement as HTMLElement).blur();
    }

    blockInteraction(component);

    return;
  }

  restoreInteraction(component);

  component.el.removeAttribute("aria-disabled");
}

function blockInteraction(component: InteractiveComponent): void {
  component.el.click = interceptedClick;
  addInteractionListeners(component.el);
}

function addInteractionListeners(element: HTMLElement): void {
  element.addEventListener("pointerdown", onPointerDown, captureOnlyOptions);
  nonBubblingWhenDisabledMouseEvents.forEach((event) =>
    element.addEventListener(event, onNonBubblingWhenDisabledMouseEvent, captureOnlyOptions),
  );
}

type OverriddenClickElementComponent = Omit<InteractiveComponent, "el"> & {
  el: SetOptional<InteractiveComponent["el"], "click">;
};

function restoreInteraction(component: InteractiveComponent): void {
  delete (component as OverriddenClickElementComponent).el.click; // fallback on HTMLElement.prototype.click

  removeInteractionListeners(component.el);
}

function removeInteractionListeners(element: HTMLElement): void {
  element.removeEventListener("pointerdown", onPointerDown, captureOnlyOptions);
  nonBubblingWhenDisabledMouseEvents.forEach((event) =>
    element.removeEventListener(event, onNonBubblingWhenDisabledMouseEvent, captureOnlyOptions),
  );
}
