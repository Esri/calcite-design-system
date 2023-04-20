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

type HostIsTabbablePredicate = () => boolean;

function onPointerDown(event: PointerEvent): void {
  // prevent click from moving focus on host
  event.preventDefault();
}

const nonBubblingWhenDisabledMouseEvents = ["mousemove", "mousedown", "mouseup", "click"];

function onNonBubblingWhenDisabledMouseEvent(event: MouseEvent): void {
  // prevent disallowed mouse events from being emitted on the host (per https://github.com/whatwg/html/issues/5886)
  //⚠ we generally avoid stopping propagation of events, but this is needed to adhere to the intended spec changes above ⚠
  event.stopImmediatePropagation();
}

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
 * @param hostIsTabbable
 */
export function updateHostInteraction(
  component: InteractiveComponent,
  hostIsTabbable: boolean | HostIsTabbablePredicate | "managed" = false
): void {
  if (component.disabled) {
    component.el.setAttribute("tabindex", "-1");
    component.el.setAttribute("aria-disabled", "true");

    if (component.el.contains(document.activeElement)) {
      (document.activeElement as HTMLElement).blur();
    }

    component.el.addEventListener("pointerdown", onPointerDown, { capture: true });
    nonBubblingWhenDisabledMouseEvents.forEach((event) =>
      component.el.addEventListener(event, onNonBubblingWhenDisabledMouseEvent)
    );

    return;
  }

  component.el.removeEventListener("pointerdown", onPointerDown, { capture: true });
  nonBubblingWhenDisabledMouseEvents.forEach((event) =>
    component.el.removeEventListener(event, onNonBubblingWhenDisabledMouseEvent)
  );

  if (typeof hostIsTabbable === "function") {
    component.el.setAttribute("tabindex", hostIsTabbable.call(component) ? "0" : "-1");
  } else if (hostIsTabbable === true) {
    component.el.setAttribute("tabindex", "0");
  } else if (hostIsTabbable === false) {
    component.el.removeAttribute("tabindex");
  } else {
    // noop for "managed" as owning component will manage its tab index
  }

  component.el.removeAttribute("aria-disabled");
}
