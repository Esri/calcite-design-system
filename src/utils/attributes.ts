import { createObserver } from "./observers";

type AttributeObject = { [k: string]: any };

/**
 * Watches global attributes of a component.
 *
 * Derived from: https://gist.github.com/willmartian/b4dd6b57d71dd0438fb9e7c6f4048578
 */
export interface WatchedComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  /**
   * The watched attributes object.
   * Should be stateful.
   * '@State() inheritedAttributes = {};'
   */
  inheritedAttributes: AttributeObject;

  /**
   * The MutationObserver to listen to inherited attributes.
   */
  inheritedAttributesObserver: MutationObserver;
}

/**
 * Helper to set up listening for changes to global attributes.
 *
 * render() {
 *   const lang = this.inheritedAttributes['lang'] ?? 'en';
 *   return <div>My lang is {lang}</div>;
 * }
 */
export function watchAttributes(component: WatchedComponent, attributes: string[]): void {
  const attributeObject: AttributeObject = {};
  const { el } = component;

  const updateAttributesObject = () => {
    attributes.forEach((attr) => {
      if (el.hasAttribute(attr)) {
        const value = el.getAttribute(attr);
        if (value !== null) {
          attributeObject[attr] = el.getAttribute(attr);
        }
      }
    });

    component.inheritedAttributes = { ...attributeObject };
  };

  updateAttributesObject();

  component.inheritedAttributesObserver = createObserver("mutation", () => updateAttributesObject());

  component.inheritedAttributesObserver.observe(el, {
    attributeFilter: attributes
  });
}

/**
 * Helper remove listening for changes to inherited attributes.
 */
export function unwatchAttributes(component: WatchedComponent): void {
  component.inheritedAttributesObserver?.disconnect();
  component.inheritedAttributes = {};
}
