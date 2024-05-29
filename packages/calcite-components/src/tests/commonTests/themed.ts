import { E2EElement, E2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
import { ElementHandle } from "puppeteer";
import type { RequireExactlyOne } from "type-fest";
import type { ComponentTestSetup } from "./interfaces";
import { getTagAndPage } from "./utils";

expect.extend(toHaveNoViolations);

interface TargetInfo {
  el: E2EElement;
  selector: string;
  shadowSelector: string;
}

/**
 * This object that represents component tokens and their respective test options.
 */
export type ComponentTestTokens = Record<CalciteCSSCustomProp, TestSelectToken | TestSelectToken[]>;

/**
 *
 * Helper to test custom theming of a component's associated tokens.
 *
 * @example
 // describe("theme", () => {
 //   const tokens: ComponentTestTokens = {
 //      "--calcite-action-menu-border-color": [
 //        {
 //          targetProp: "borderLeftColor",
 //        },
 //        {
 //          shadowSelector: "calcite-action",
 //          targetProp: "--calcite-action-border-color",
 //        },
 //     ],
 //     "--calcite-action-menu-background-color": {
 //          targetProp: "backgroundColor",
 //          shadowSelector: ".container",
 //     },
 //     "--calcite-action-menu-trigger-background-color-active": {
 //        shadowSelector: "calcite-action",
 //        targetProp: "--calcite-action-background-color",
 //        state: { press: { attribute: "class", value: CSS.defaultTrigger } },
 //      },
 //      "--calcite-action-menu-trigger-background-color-focus": {
 //        shadowSelector: "calcite-action",
 //        targetProp: "--calcite-action-background-color",
 //        state: "focus",
 //      },
 //      "--calcite-action-menu-trigger-background-color-hover": {
 //        shadowSelector: "calcite-action",
 //        targetProp: "--calcite-action-background-color",
 //        state: "hover",
 //      },
 //      "--calcite-action-menu-trigger-background-color": {
 //        shadowSelector: "calcite-action",
 //        targetProp: "--calcite-action-background-color",
 //      },
 //   };
 //   themed(`calcite-action-bar`, tokens);
 // });
 *
 * @param componentTestSetup - A component tag, html, tag + e2e page or provider for setting up a test.
 * @param tokens - A record of token names and their associated selectors, shadow selectors, target props, and states.
 */
export function themed(componentTestSetup: ComponentTestSetup, tokens: ComponentTestTokens): void {
  it("is themeable", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    await page.evaluate(() => {
      // we block all clicks to prevent triggering behavior as mouse states are activated between assertions
      document.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          event.stopPropagation();
        },
        true,
      );
    });
    const setTokens: Record<string, string> = {};
    const styleTargets: Record<string, [E2EElement, string[]]> = {};
    const testTargets: TestTarget[] = [];

    // Parse test config for tokens and selectors
    for (const token in tokens) {
      let selectors = tokens[token];

      if (!Array.isArray(selectors)) {
        selectors = [selectors];
      }

      // Set test values for each token
      if (!setTokens[token]) {
        setTokens[token] = assignTestTokenThemeValues(token);
      }

      // Set up styleTargets and testTargets
      for (let i = 0; i < selectors.length; i++) {
        const { shadowSelector, targetProp, state } = selectors[i];
        const selector = selectors[i].selector || tag;

        if (selector.includes(">>>")) {
          throw new Error("Deep piercing via `selector` is not supported, use `shadowSelector` instead");
        }

        const el = await page.find(selector);
        const tokenStyle = `${token}: ${setTokens[token]}`;
        const target: TargetInfo = { el, selector, shadowSelector };
        let contextSelector: ContextSelectByAttr;
        let stateName: State;

        if (state) {
          stateName = (typeof state === "string" ? state : Object.keys(state)[0]) as State;
        }

        if (!styleTargets[selector]) {
          styleTargets[selector] = [el, []];
        }
        if (styleTargets[selector][1].indexOf(tokenStyle) === -1) {
          styleTargets[selector][1].push(tokenStyle);
        }
        if (shadowSelector) {
          const effectiveShadowSelector = shadowSelector.replace(/::.*$/, "");
          target.el = await page.find(`${selector} >>> ${effectiveShadowSelector}`);
        }
        if (state && typeof state !== "string") {
          contextSelector = Object.values(state)[0] as ContextSelectByAttr;
        }

        if (!target.el) {
          throw new Error(
            `[${token}] target (${selector}${
              shadowSelector ? " >>> " + shadowSelector : ""
            }) not found, make sure test HTML renders the component and expected shadow DOM elements`,
          );
        }

        testTargets.push({
          target,
          targetProp,
          contextSelector,
          state: stateName,
          expectedValue: setTokens[token],
          token: token as CalciteCSSCustomProp,
        });
      }
    }

    // set style attribute on each of the styleTargets with the assigned CSS variable values
    for (const selector in styleTargets) {
      const [el, assignedCSSVars] = styleTargets[selector];

      el.setAttribute("style", assignedCSSVars.join("; "));
    }

    await page.waitForChanges();

    // Assert the targetProp in each testTarget's styles matches the expected value
    for (let i = 0; i < testTargets.length; i++) {
      await page.waitForChanges();
      await assertThemedProps(page, { ...testTargets[i] });
    }
  });
}

export type ContextSelectByAttr = { attribute: string; value: string | RegExp };

type CSSProp = Extract<keyof CSSStyleDeclaration, string>;

type State = "press" | "hover" | "focus";

/**
 * Describes a test target for themed components.
 */
export type TestTarget = {
  /**
   * An object with target element and selector info.
   */
  target: TargetInfo;

  /**
   * @todo doc
   */
  contextSelector?: ContextSelectByAttr;

  /**
   * The CSSStyleDeclaration property or mapped sub-component CSS custom prop to assert on.
   */
  targetProp: CSSProp | MappedCalciteCSSCustomProp;

  /**
   * The state to apply to the target element.
   */
  state?: State;

  /**
   * The expected value of the targetProp.
   */
  expectedValue: string;

  /**
   * The associated component token.
   */
  token: CalciteCSSCustomProp;
};

/**
 * Represents a Calcite CSS custom prop
 */
type CalciteCSSCustomProp = `--calcite-${string}`;

/**
 * Represents a mapped Calcite CSS custom prop (used for sub-components)
 *
 * Note: this shares the same type as `CalciteCSSCustomProp` but is used to differentiate between the two.
 */
type MappedCalciteCSSCustomProp = CalciteCSSCustomProp;

/**
 * Describes a test selector for themed components.
 */
export type TestSelectToken = {
  /**
   * The selector of the target element. When not provided, the component tag is used.
   */
  selector?: string;

  /**
   * This selector will be used to find the target element within the shadow DOM of the component.
   */
  shadowSelector?: string;

  /**
   * The CSSStyleDeclaration property to assert on.
   */
  targetProp: CSSProp | MappedCalciteCSSCustomProp;

  /**
   * The state to apply to the target element.
   */
  state?: State | RequireExactlyOne<Record<State, ContextSelectByAttr>, "focus" | "hover" | "press">;
};

/**
 * Returns the computed style of an element's CSS property.
 *
 * This is a workaround for Stencil's `E2EElement.getComputedStyle()` not returning computed style of CSS custom properties.
 *
 * @param element
 * @param property
 * @param pseudoElement
 */
async function getComputedStylePropertyValue(
  element: E2EElement,
  property: string,
  pseudoElement?: string,
): Promise<string> {
  type E2EElementInternal = E2EElement & {
    _elmHandle: ElementHandle;
  };

  return await (element as E2EElementInternal)._elmHandle.evaluate(
    (el, targetProp, pseudoElement): string => window.getComputedStyle(el, pseudoElement).getPropertyValue(targetProp),
    property,
    pseudoElement,
  );
}

/**
 * Get the computed style of an element and assert that it matches the expected themed token value.
 * This is useful for testing themed components.
 *
 * @param page - the e2e page
 * @param options - the options to pass to the utility
 * @param options.target - the element to get the computed style from
 * @param options.contextSelector - the selector of the target element
 * @param options.targetProp - the CSSStyleDeclaration property to check
 * @param options.state - the state to apply to the target element
 * @param options.expectedValue - the expected value of the targetProp
 */
async function assertThemedProps(page: E2EPage, options: TestTarget): Promise<void> {
  const { target, contextSelector, targetProp, state, expectedValue, token } = options;

  await page.mouse.reset();
  await page.waitForChanges();

  const targetEl = target.el;
  const pseudoElement = target.shadowSelector?.match(/::(before|after)/)?.[0] ?? undefined;

  if (contextSelector) {
    const rect = (await page.evaluate((context: TestTarget["contextSelector"]) => {
      const searchInShadowDom = (node: Node): HTMLElement | SVGElement | Node | undefined => {
        const { attribute, value } = context as {
          attribute: string;
          value: string | RegExp;
        };
        if (node.nodeType === 1) {
          const attr = (node as Element).getAttribute(attribute);
          if (typeof value === "string" && attr === value) {
            return node;
          }
          if (value instanceof RegExp && attr && value.test(attr)) {
            return node ?? undefined;
          }
          if (attr === value) {
            return node;
          }

          if ((node as Element) && !attribute && !value) {
            return node;
          }
        }

        if (node.nodeType === 1 && (node as Element).shadowRoot) {
          for (const child of ((node as Element).shadowRoot as ShadowRoot).children) {
            const result = searchInShadowDom(child);
            if (result) {
              return result;
            }
          }
        }

        for (const child of node.childNodes) {
          const result = searchInShadowDom(child);
          if (result) {
            return result;
          }
        }
      };
      return new Promise<{ width: number; height: number; left: number; top: number } | undefined>((resolve) => {
        requestAnimationFrame(() => {
          const foundNode =
            typeof context === "string"
              ? document.querySelector(context)
              : (searchInShadowDom(document) as HTMLElement | SVGElement | undefined);

          if (foundNode?.getBoundingClientRect) {
            const { width, height, left, top } = foundNode.getBoundingClientRect();
            resolve({ width, height, left, top });
          } else {
            resolve(undefined);
          }
        });
      });
    }, contextSelector)) as { width: number; height: number; left: number; top: number } | undefined;

    const box = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    // hover state
    await page.mouse.move(box.x, box.y);

    if (state === "press") {
      await page.mouse.down();
    } else if (state === "focus") {
      await page.mouse.down();
      await page.mouse.up();
    }
  } else if (state) {
    await targetEl[state as Exclude<State, "press">]();
  }

  await page.waitForChanges();

  if (targetProp.startsWith("--calcite-")) {
    expect(await getComputedStylePropertyValue(targetEl, targetProp, pseudoElement)).toBe(expectedValue);
    return;
  }

  const styles = await targetEl.getComputedStyle(pseudoElement);
  const isFakeBorderToken = token.includes("border-color") && targetProp === "boxShadow";
  const isLinearGradientUnderlineToken = token.includes("link-underline-color") && targetProp === "backgroundImage";

  if (isFakeBorderToken || isLinearGradientUnderlineToken) {
    expect(styles[targetProp]).toMatch(expectedValue);
    return;
  }

  expect(styles[targetProp]).toBe(expectedValue);
}

/**
 *
 * Sets the value of a CSS variable to a test value.
 * This is useful for testing themed components.
 *
 * @param token - the token as a CSS variable
 * @returns string - the new value for the token
 */
function assignTestTokenThemeValues(token: string): string {
  return token.includes("color")
    ? "rgb(0, 191, 255)"
    : token.includes("shadow")
      ? "rgb(255, 255, 255) 0px 0px 0px 4px, rgb(255, 105, 180) 0px 0px 0px 5px inset, rgb(0, 191, 255) 0px 0px 0px 9px"
      : `42${token.includes("z-index") ? "" : "px"}`;
}
