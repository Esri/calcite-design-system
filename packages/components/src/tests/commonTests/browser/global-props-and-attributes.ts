import { mount } from "@arcgis/lumina-compiler/testing";
import { expect, it } from "vitest";
import { type Locator } from "vitest/browser";

type GlobalProps = {
  [Property in keyof HTMLElement]?: HTMLElement[Property];
};

type ExpectedDefaults<Props extends GlobalProps> = Partial<{
  [Property in keyof Props]: Property extends keyof HTMLElement ? HTMLElement[Property] : never;
}>;

const globalPropDefaults: GlobalProps = {
  ariaExpanded: null,
  autofocus: false,
  enterKeyHint: "",
  inputMode: "",
  spellcheck: true,
};

const globalPropToAttribute: Partial<Record<keyof HTMLElement, string>> = {
  ariaExpanded: "aria-expanded",
  autofocus: "autofocus",
  enterKeyHint: "enterkeyhint",
  inputMode: "inputmode",
  spellcheck: "spellcheck",
};

/**
 * Verifies that global properties and attributes sync to a target element.
 *
 * The configured properties are set on the component first. Their matching attributes are then removed to verify
 * that the target properties reset to their defaults.
 */
export function globalPropsAndAttributes<Props extends GlobalProps>(
  setup: () => ReturnType<typeof mount>,
  target: () => Locator,
  props: Props,
  expectedDefaults?: ExpectedDefaults<Props>,
): void {
  it("syncs global properties and attributes", async () => {
    const { el, reRender } = await setup();
    const targetLocator = target();
    const propertyNames = Object.keys(props) as (keyof Props & string)[];

    for (const propertyName of propertyNames) {
      Reflect.set(el, propertyName, props[propertyName]);
    }
    await reRender();

    for (const propertyName of propertyNames) {
      await expect.element(targetLocator).toHaveProperty(propertyName, props[propertyName]);
    }

    for (const propertyName of propertyNames) {
      const attributeName = globalPropToAttribute[propertyName as keyof HTMLElement];

      if (!attributeName) {
        throw new Error(`Attribute name must be configured for global property "${propertyName}".`);
      }

      el.removeAttribute(attributeName);
    }
    await reRender();

    for (const propertyName of propertyNames) {
      const expectedDefault = Object.hasOwn(expectedDefaults ?? {}, propertyName)
        ? expectedDefaults?.[propertyName]
        : globalPropDefaults[propertyName as keyof GlobalProps];

      if (expectedDefault === undefined) {
        throw new Error(`Expected default must be provided for global property "${propertyName}".`);
      }

      await expect.element(targetLocator).toHaveProperty(propertyName, expectedDefault);
    }
  });
}
