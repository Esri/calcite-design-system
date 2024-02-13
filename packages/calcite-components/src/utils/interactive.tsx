import { JSXAttributes } from "@stencil/core/internal";
import { FunctionalComponent, h, VNode } from "@stencil/core";

export interface InteractiveComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  /**
   * When true, prevents user interaction.
   *
   * Notes:
   *
   * This prop should use the @Prop decorator and reflect.
   * The `disabled` Sass mixin must be added to the component's stylesheet.
   */
  disabled: boolean;
}

/**
 * Exported for testing purposes only.
 *
 * @internal
 */
export type InteractiveHTMLElement = HTMLElement & Pick<InteractiveComponent, "disabled">;

function interceptedClick(): void {
  const { disabled } = this as InteractiveHTMLElement;

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

const nonBubblingWhenDisabledMouseEvents = ["mousedown", "mouseup", "click"];

function onNonBubblingWhenDisabledMouseEvent(event: MouseEvent): void {
  const { disabled } = event.target as InteractiveHTMLElement;

  // prevent disallowed mouse events from being emitted on the disabled host (per https://github.com/whatwg/html/issues/5886)
  //⚠ we generally avoid stopping propagation of events, but this is needed to adhere to the intended spec changes above ⚠
  if (disabled) {
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
  if (!element) {
    // this path is only applicable to Firefox
    return;
  }

  element.addEventListener("pointerdown", onPointerDown, captureOnlyOptions);
  nonBubblingWhenDisabledMouseEvents.forEach((event) =>
    element.addEventListener(event, onNonBubblingWhenDisabledMouseEvent, captureOnlyOptions),
  );
}

function restoreInteraction(component: InteractiveComponent): void {
  delete component.el.click; // fallback on HTMLElement.prototype.click
  removeInteractionListeners(component.el);
}

function removeInteractionListeners(element: HTMLElement): void {
  if (!element) {
    // this path is only applicable to Firefox
    return;
  }

  element.removeEventListener("pointerdown", onPointerDown, captureOnlyOptions);
  nonBubblingWhenDisabledMouseEvents.forEach((event) =>
    element.removeEventListener(event, onNonBubblingWhenDisabledMouseEvent, captureOnlyOptions),
  );
}

export interface InteractiveContainerOptions extends JSXAttributes {
  disabled: boolean;
}

export const CSS = {
  container: "interaction-container",
};

export function InteractiveContainer(
  { disabled }: InteractiveContainerOptions,
  children: VNode[],
): FunctionalComponent {
  return (
    <div class={CSS.container} inert={disabled}>
      {...children}
    </div>
  );
}
