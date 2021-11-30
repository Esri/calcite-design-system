import { createObserver } from "./observers";

type AttributeObject = { [k: string]: any };

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

  /**
   * The MutationObserver to listen to inherited attributes.
   */
  globalAttributesObserver: MutationObserver;
}

/**
 * Helper to set up listening for changes to global attributes.
 *
 * render() {
 *   const lang = this.inheritedAttributes['lang'] ?? 'en';
 *   return <div>My lang is {lang}</div>;
 * }
 */
export function watchGlobalAttributes(component: GlobalAttrComponent, attributes: string[]): void {
  const attributeObject: AttributeObject = {};
  const { el } = component;

  const updateAttributesObject = () => {
    attributes
      .filter((attr) => !!el.hasAttribute(attr))
      .forEach((attr) => {
        const value = el.getAttribute(attr);

        if (value !== null) {
          attributeObject[attr] = value;
        }
      });

    component.globalAttributes = { ...attributeObject };
  };

  updateAttributesObject();

  component.globalAttributesObserver = createObserver("mutation", () => updateAttributesObject());

  component.globalAttributesObserver.observe(el, {
    attributeFilter: attributes
  });
}

/**
 * Helper remove listening for changes to inherited attributes.
 */
export function unwatchGlobalAttributes(component: GlobalAttrComponent): void {
  component.globalAttributesObserver?.disconnect();
}
