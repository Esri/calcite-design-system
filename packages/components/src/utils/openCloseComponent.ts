// @ts-strict-ignore
import { KebabCase } from "type-fest";
import { LitElement } from "@arcgis/lumina";
import { Ref } from "lit/directives/ref.js";
import { whenTransitionDone } from "./dom";

/**
 * Defines interface for components with open/close public emitter.
 * All implementations of this interface must handle the following events: `beforeOpen`, `open`, `beforeClose`, `close`.
 */
interface OpenCloseComponentBase extends LitElement {
  /**
   * Specifies property on which active transition is watched for.
   *
   * This should be used if the component uses a property other than `open` to trigger a transition.
   */
  openProp?: string;

  /** Specifies the name of CSS transition property. */
  transitionProp?: KebabCase<Extract<keyof CSSStyleDeclaration, string>>;

  /** Defines method for `beforeOpen` event handler. */
  onBeforeOpen: () => void;

  /** Defines method for `open` event handler: */
  onOpen: () => void;

  /** Defines method for `beforeClose` event handler: */
  onBeforeClose: () => void;

  /** Defines method for `close` event handler: */
  onClose: () => void;
}

export interface OpenCloseComponentWithEl extends OpenCloseComponentBase {
  /** Specifies element that the transition is allowed to emit on. */
  transitionEl: HTMLElement;
}

export interface OpenCloseComponentWithRef extends OpenCloseComponentBase {
  /** Specifies a Ref to the element that the transition is allowed to emit on. */
  transitionRef: Ref<HTMLElement>;
}

export type OpenCloseComponent = OpenCloseComponentWithEl | OpenCloseComponentWithRef;

function isOpen(component: OpenCloseComponent): boolean {
  return component[component.openProp || "open"];
}

/**
 * This util helps emit (before)open/close events consistently based on the associated CSS transition property.
 *
 * Note: this should be called whenever the component's toggling property changes and would trigger a transition.
 *
 * @example
 * import { toggleOpenClose } from "../../utils/openCloseComponent";
 *
 * override willUpdate(changes: PropertyValues<this>): void {
 *   if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
 *     toggleOpenClose(this);
 *   }
 *   // ...
 * }
 * @param component - OpenCloseComponent uses `open` prop to emit (before)open/close.
 */
export async function toggleOpenClose(component: OpenCloseComponent): Promise<void> {
  await component.updateComplete;

  if (isOpen(component)) {
    component.onBeforeOpen();
  } else {
    component.onBeforeClose();
  }

  await component.updateComplete;
  const transitionNode = hasRef(component) ? component.transitionRef.value : component.transitionEl;

  if (transitionNode) {
    await whenTransitionDone(transitionNode, component.transitionProp);
  }

  if (isOpen(component)) {
    component.onOpen();
  } else {
    component.onClose();
  }
}

function hasRef(component: OpenCloseComponent): component is OpenCloseComponentWithRef {
  return !!(component as OpenCloseComponentWithRef).transitionRef;
}
