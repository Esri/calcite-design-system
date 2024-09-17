import { forceUpdate } from "@stencil/core";
import { createObserver, ExtendedMutationObserver } from "./observers";

/**
 * Defines interface for components with a dynamically changing slot.
 *
 * @deprecated Use `onSlotchange` event with `slotChangeHasAssignedElement` DOM utility instead.
 *
 * ```
 * <slot onSlotchange={(event) => this.mySlotHasElement = slotChangeHasAssignedElement(event)} />}
 * ```
 */
export interface ConditionalSlotComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;
}

let mutationObserver: ExtendedMutationObserver;
const observerOptions: Pick<Parameters<MutationObserver["observe"]>[1], "childList"> = { childList: true };

/**
 * Helper to set up a conditional slot component on connectedCallback.
 *
 * @param component
 * @deprecated Use `onSlotchange` event with `slotChangeHasAssignedElement` DOM utility instead.
 *
 * ```
 * <slot onSlotchange={(event) => this.mySlotHasElement = slotChangeHasAssignedElement(event)} />}
 * ```
 */
export function connectConditionalSlotComponent(component: ConditionalSlotComponent): void {
  if (!mutationObserver) {
    mutationObserver = createObserver("mutation", processMutations);
  }

  mutationObserver.observe(component.el, observerOptions);
}

/**
 * Helper to tear down a conditional slot component on disconnectedCallback.
 *
 * @param component
 * @deprecated Use `onSlotchange` event with `slotChangeHasAssignedElement` DOM utility instead.
 *
 * ```
 * <slot onSlotchange={(event) => this.mySlotHasElement = slotChangeHasAssignedElement(event)} />}
 * ```
 */
export function disconnectConditionalSlotComponent(component: ConditionalSlotComponent): void {
  mutationObserver.unobserve(component.el);
}

function processMutations(mutations: MutationRecord[]): void {
  mutations.forEach(({ target }) => {
    forceUpdate(target);
  });
}
