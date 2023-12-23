import { getUserAgentString } from "./browser";
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

// ⚠️ browser-sniffing is not a best practice and should be avoided ⚠️
const isFirefox = /firefox/i.test(getUserAgentString());

type ParentElement<T extends HTMLElement = HTMLElement> = T | null;

const interactiveElementToParent: WeakMap<InteractiveHTMLElement, ParentElement> | null = isFirefox
  ? new WeakMap()
  : null;

function interceptedClick(): void {
  const { disabled } = this as InteractiveHTMLElement;

  if (!disabled) {
    HTMLElement.prototype.click.call(this);
  }
}

function onPointerDown(event: PointerEvent): void {
  const interactiveElement = event.target as InteractiveHTMLElement;

  if (isFirefox && !interactiveElementToParent.get(interactiveElement)) {
    return;
  }

  const { disabled } = interactiveElement;

  if (disabled) {
    // prevent click from moving focus on host
    event.preventDefault();
  }
}

const nonBubblingWhenDisabledMouseEvents = ["mousedown", "mouseup", "click"];

function onNonBubblingWhenDisabledMouseEvent(event: MouseEvent): void {
  if (isFirefox && !interactiveElementToParent.get(event.target as InteractiveHTMLElement)) {
    return;
  }

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
  addInteractionListeners(isFirefox ? getParentElement(component) : component.el);
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

function getParentElement(component: InteractiveComponent): ParentElement {
  return interactiveElementToParent.get(component.el as InteractiveHTMLElement);
}

function restoreInteraction(component: InteractiveComponent): void {
  delete component.el.click; // fallback on HTMLElement.prototype.click
  removeInteractionListeners(isFirefox ? getParentElement(component) : component.el);
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

/**
 * This utility helps disable components consistently in Firefox.
 *
 * It needs to be called in `connectedCallback` and is only needed for Firefox as it does not call capture event listeners before non-capture ones (see https://bugzilla.mozilla.org/show_bug.cgi?id=1731504).
 *
 * @param component
 */
export function connectInteractive(component: InteractiveComponent): void {
  if (!component.disabled || !isFirefox) {
    return;
  }

  const parent =
    component.el.parentElement ||
    component.el; /* assume element is host if it has no parent when connected */
  interactiveElementToParent.set(component.el as InteractiveHTMLElement, parent);
  blockInteraction(component);
}

/**
 * This utility restores interactivity to disabled components consistently in Firefox.
 *
 * It needs to be called in `disconnectedCallback` and is only needed for Firefox as it does not call capture event listeners before non-capture ones (see https://bugzilla.mozilla.org/show_bug.cgi?id=1731504).
 *
 * @param component
 */
export function disconnectInteractive(component: InteractiveComponent): void {
  if (!isFirefox) {
    return;
  }

  // always remove on disconnect as render or connect will restore it
  interactiveElementToParent.delete(component.el as InteractiveHTMLElement);
  restoreInteraction(component);
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-error - `inert` is missing from Stencil's types (see https://github.com/ionic-team/stencil/issues/5071)
    <div class={CSS.container} inert={disabled}>
      {...children}
    </div>
  );
}
