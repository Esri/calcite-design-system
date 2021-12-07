import { forceUpdate } from "@stencil/core";

const slotChangedMap = new WeakMap<SlotChangingComponent, (this: SlotChangingComponent) => void>();

/**
 * Defines interface for dynamic slot components.
 */
export interface SlotChangingComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;
}

function onSlotChange(this: SlotChangingComponent): void {
  forceUpdate(this);
}

const eventType = "slotchange";

/**
 * Helper to set up slot change rendering on connectedCallback.
 */
export function connectSlotChangingComponent(component: SlotChangingComponent): void {
  const boundSlotChange: (this: SlotChangingComponent) => void = onSlotChange.bind(component);
  component.el.shadowRoot.addEventListener(eventType, boundSlotChange);
  slotChangedMap.set(component, boundSlotChange);
}

/**
 * Helper to tear down slot change rendering on disconnectedCallback.
 */
export function disconnectSlotChangingComponent(component: SlotChangingComponent): void {
  const boundSlotChange = slotChangedMap.get(component);
  component.el.shadowRoot.removeEventListener(eventType, boundSlotChange);
  slotChangedMap.delete(component);
}
