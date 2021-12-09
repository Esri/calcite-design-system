import { forceUpdate } from "@stencil/core";

const slotChangedMap = new WeakMap<ConditionalSlotComponent, (this: ConditionalSlotComponent) => void>();

/**
 * Defines interface for components with a dynamically changing slot.
 */
export interface ConditionalSlotComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;
}

function onSlotChange(this: ConditionalSlotComponent): void {
  forceUpdate(this);
}

const eventType = "slotchange";

/**
 * Helper to set up a conditional slot component on connectedCallback.
 */
export function connectConditionalSlotComponent(component: ConditionalSlotComponent): void {
  const boundSlotChange: (this: ConditionalSlotComponent) => void = onSlotChange.bind(component);
  component.el.shadowRoot.addEventListener(eventType, boundSlotChange);
  slotChangedMap.set(component, boundSlotChange);
}

/**
 * Helper to tear down a conditional slot component on disconnectedCallback.
 */
export function disconnectConditionalSlotComponent(component: ConditionalSlotComponent): void {
  const boundSlotChange = slotChangedMap.get(component);
  component.el.shadowRoot.removeEventListener(eventType, boundSlotChange);
  slotChangedMap.delete(component);
}
