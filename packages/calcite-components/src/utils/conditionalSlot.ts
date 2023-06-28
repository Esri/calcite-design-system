import { forceUpdate } from "@stencil/core";
import { createObserver } from "./observers";

const observed = new Set<HTMLElement>();

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

let mutationObserver: MutationObserver;
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
  observed.delete(component.el);

  // we explicitly process queued mutations and disconnect and reconnect
  // the observer until MutationObserver gets an `unobserve` method
  // see https://github.com/whatwg/dom/issues/126
  processMutations(mutationObserver.takeRecords());
  mutationObserver.disconnect();
  for (const [element] of observed.entries()) {
    mutationObserver.observe(element, observerOptions);
  }
}

function processMutations(mutations: MutationRecord[]): void {
  mutations.forEach(({ target }) => {
    forceUpdate(target);
  });
}
