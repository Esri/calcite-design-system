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
   * * This prop should use the @Prop decorator and reflect.
   * * The `disabled` Sass mixin must be added to the component's stylesheet.
   */
  disabled: boolean;
}

/**
 * This helper updates the host element to prevent keyboard interaction on its subtree and sets the appropriate aria attribute for accessibility.
 *
 * This should be used in the `componentDidRender` lifecycle hook.
 *
 * **Notes**
 *
 * * this util is not needed for simple components whose root element or elements are an interactive component (custom element or native control). For those cases, set the `disabled` props on the root components instead.
 * * technically, users can override `tabindex` and restore keyboard navigation, but this will be considered user error
 */
export function updateHostInteraction(component: InteractiveComponent): void {
  // intentionally using attribute to avoid making host tabbable when !disabled
  if (component.disabled) {
    component.el.setAttribute("tabindex", "-1");
  } else {
    component.el.removeAttribute("tabindex");
  }

  component.el.setAttribute("aria-disabled", component.disabled.toString());
}
