import { KebabCase } from "type-fest";
import { LitElement } from "@arcgis/lumina";
import { Ref } from "lit/directives/ref.js";
import { whenTransitionDone } from "./dom";

/**
 * Defines interface for components with open/close public emitter.
 * All implementations of this interface must handle the following events: `beforeOpen`, `open`, `beforeClose`, `close`.
 */
interface OpenCloseComponentBase<OpenProp extends PropertyKey = "open"> extends LitElement {
  /** Specifies whether the component is open. */
  open?: boolean;

  /**
   * Specifies property on which active transition is watched for.
   *
   * This should be used if the component uses a property other than `open` to trigger a transition.
   */
  openProp?: OpenProp;

  /** Specifies the name of CSS transition property. */
  transitionProp: KebabCase<Extract<keyof CSSStyleDeclaration, string>>;

  /** Defines method for `beforeOpen` event handler. */
  onBeforeOpen: () => void;

  /** Defines method for `open` event handler: */
  onOpen: () => void;

  /** Defines method for `beforeClose` event handler: */
  onBeforeClose: () => void;

  /** Defines method for `close` event handler: */
  onClose: () => void;
}

export interface OpenCloseComponentWithEl<
  OpenProp extends PropertyKey = "open",
> extends OpenCloseComponentBase<OpenProp> {
  /** Specifies element that the transition is allowed to emit on. */
  transitionEl: HTMLElement | undefined;
}

export interface OpenCloseComponentWithRef<
  OpenProp extends PropertyKey = "open",
> extends OpenCloseComponentBase<OpenProp> {
  /** Specifies a Ref to the element that the transition is allowed to emit on. */
  transitionRef: Ref<HTMLElement>;
}

export type OpenCloseComponent<OpenProp extends PropertyKey = "open"> =
  | (OpenCloseComponentWithRef<OpenProp> & { transitionEl?: never })
  | (OpenCloseComponentWithEl<OpenProp> & { transitionRef?: never });

type CustomOpenCloseComponent<OpenProp extends PropertyKey> = OpenCloseComponent<OpenProp> &
  Record<OpenProp, boolean | undefined> & {
    openProp: OpenProp;
  };

type DefaultOpenCloseComponent = OpenCloseComponent & {
  openProp?: undefined;
};

type OpenCloseComponentState<OpenProp extends PropertyKey> =
  | DefaultOpenCloseComponent
  | CustomOpenCloseComponent<OpenProp>;

function isOpen<OpenProp extends PropertyKey>(component: OpenCloseComponentState<OpenProp>): boolean | undefined {
  return hasCustomOpenProp(component) ? component[component.openProp] : component.open;
}

function hasCustomOpenProp<OpenProp extends PropertyKey>(
  component: OpenCloseComponentState<OpenProp>,
): component is CustomOpenCloseComponent<OpenProp> {
  return component.openProp !== undefined;
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
export function toggleOpenClose(component: DefaultOpenCloseComponent): Promise<void>;
export function toggleOpenClose<OpenProp extends PropertyKey>(
  component: CustomOpenCloseComponent<OpenProp>,
): Promise<void>;
export async function toggleOpenClose<OpenProp extends PropertyKey>(
  component: OpenCloseComponentState<OpenProp>,
): Promise<void> {
  await component.updateComplete;

  if (isOpen(component)) {
    component.onBeforeOpen();
  } else {
    component.onBeforeClose();
  }

  await component.updateComplete;
  const transitionNode = component.transitionRef?.value ?? component.transitionEl;

  if (transitionNode) {
    await whenTransitionDone(transitionNode, component.transitionProp);
  }

  if (isOpen(component)) {
    component.onOpen();
  } else {
    component.onClose();
  }
}
