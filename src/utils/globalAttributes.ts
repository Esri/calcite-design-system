import { createObserver } from "./observers";

type AttributeObject = { [k: string]: any };
type AllowedGlobalAttribute = "lang";
const allowedGlobalAttributes = ["lang"];

const mutationObserverMap: WeakMap<GlobalAttrComponent, MutationObserver> = new WeakMap();

/**
 * Watches global attributes of a component.
 *
 * Derived from: https://gist.github.com/willmartian/b4dd6b57d71dd0438fb9e7c6f4048578
 */
export interface GlobalAttrComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  /**
   * The watched attributes object.
   * Should be stateful.
   * '@State() inheritedAttributes = {};'
   */
  globalAttributes: AttributeObject;
}

/**
 * Helper to set up listening for changes to global attributes.
 *
 * render() {
 *   const lang = this.inheritedAttributes['lang'] ?? 'en';
 *   return <div>My lang is {lang}</div>;
 * }
 */
export function watchGlobalAttributes(component: GlobalAttrComponent, attributes: AllowedGlobalAttribute[]): void {
  const attributeObject: AttributeObject = {};
  const { el } = component;

  const updateAttributesObject = () => {
    attributes
      .filter((attr) => !!allowedGlobalAttributes.includes(attr) && !!el.hasAttribute(attr))
      .forEach((attr) => {
        const value = el.getAttribute(attr);

        if (value !== null) {
          attributeObject[attr] = value;
        }
      });

    component.globalAttributes = { ...attributeObject };
  };

  updateAttributesObject();

  const mutationObserver = createObserver("mutation", () => updateAttributesObject());

  mutationObserver.observe(el, {
    attributeFilter: attributes
  });

  mutationObserverMap.set(component, mutationObserver);
}

/**
 * Helper remove listening for changes to inherited attributes.
 */
export function unwatchGlobalAttributes(component: GlobalAttrComponent): void {
  if (mutationObserverMap.has(component)) {
    mutationObserverMap.get(component)?.disconnect();
    mutationObserverMap.delete(component);
  }
}
