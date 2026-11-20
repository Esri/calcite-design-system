import { mount } from "@arcgis/lumina-compiler/testing";
import { expect, it } from "vitest";
import { type Locator } from "vitest/browser";

const globalPropToAttribute = {
  accessKey: "accesskey",
  ariaAtomic: "aria-atomic",
  ariaAutoComplete: "aria-autocomplete",
  ariaBusy: "aria-busy",
  ariaChecked: "aria-checked",
  ariaCurrent: "aria-current",
  ariaDisabled: "aria-disabled",
  ariaExpanded: "aria-expanded",
  ariaHasPopup: "aria-haspopup",
  ariaHidden: "aria-hidden",
  ariaInvalid: "aria-invalid",
  ariaLabel: "aria-label",
  ariaLive: "aria-live",
  ariaPressed: "aria-pressed",
  ariaReadOnly: "aria-readonly",
  ariaRequired: "aria-required",
  ariaSelected: "aria-selected",
  autocapitalize: "autocapitalize",
  autofocus: "autofocus",
  contentEditable: "contenteditable",
  dir: "dir",
  draggable: "draggable",
  enterKeyHint: "enterkeyhint",
  hidden: "hidden",
  inert: "inert",
  inputMode: "inputmode",
  lang: "lang",
  nonce: "nonce",
  popover: "popover",
  role: "role",
  slot: "slot",
  spellcheck: "spellcheck",
  tabIndex: "tabindex",
  title: "title",
  translate: "translate",
} as const satisfies Partial<Record<keyof HTMLElement, string>>;

type GlobalProperty = keyof typeof globalPropToAttribute;

type GlobalProps = {
  [Property in GlobalProperty]?: HTMLElement[Property];
};

type ExpectedDefaults<Props extends GlobalProps> = Partial<{
  [Property in keyof Props]: Property extends GlobalProperty ? HTMLElement[Property] : never;
}>;

/**
 * Verifies that global properties and attributes sync to a target element.
 *
 * The configured properties and matching attributes are set on the component. The attributes are then removed to
 * verify that the target properties reset to their initial values or configured defaults.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("global props", () => {
 *   globalProps(
 *     () => mount("calcite-input"),
 *     () => page.getByRole("textbox"),
 *     {
 *       autofocus: true,
 *       enterKeyHint: "done",
 *       inputMode: "numeric",
 *     },
 *   );
 * });
 */
export function globalProps<Props extends GlobalProps>(
  setUp: () => ReturnType<typeof mount>,
  target: () => Locator,
  props: Props,
  expectedDefaults?: ExpectedDefaults<Props>,
): void {
  it("syncs to the target element", async () => {
    const { el, reRender } = await setUp();
    const targetLocator = target();
    const targetElement = targetLocator.element();
    const propertyNames = Object.keys(props) as (keyof Props & GlobalProperty)[];
    const initialValues = new Map(
      propertyNames.map((propertyName) => [propertyName, Reflect.get(targetElement, propertyName)]),
    );

    Object.assign(el, props);
    await reRender();

    for (const propertyName of propertyNames) {
      await expect.element(targetLocator).toHaveProperty(propertyName, props[propertyName]);
    }

    for (const propertyName of propertyNames) {
      el.removeAttribute(globalPropToAttribute[propertyName]);
    }
    await reRender();

    for (const propertyName of propertyNames) {
      const expectedDefault = Object.hasOwn(expectedDefaults ?? {}, propertyName)
        ? expectedDefaults?.[propertyName]
        : initialValues.get(propertyName);

      await expect.element(targetLocator).toHaveProperty(propertyName, expectedDefault);
    }

    for (const propertyName of propertyNames) {
      el.setAttribute(globalPropToAttribute[propertyName], String(props[propertyName]));
    }
    await reRender();

    for (const propertyName of propertyNames) {
      await expect.element(targetLocator).toHaveProperty(propertyName, props[propertyName]);
    }
  });
}
