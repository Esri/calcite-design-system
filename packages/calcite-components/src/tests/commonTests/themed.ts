// @ts-strict-ignore
import { toHaveNoViolations } from "jest-axe";
import type { RequireExactlyOne } from "type-fest";
import { E2EPage, E2EElement } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { getTokenValue } from "../utils/cssTokenValues";
import { toElementHandle } from "../utils";
import type { ComponentTestSetup } from "./interfaces";
import { getTagAndPage } from "./utils";

expect.extend(toHaveNoViolations);

interface TargetInfo {
  el: E2EElement;
  selector: string;
  shadowSelector: string;
}

// only `before`, `after`, `first-letter` and `first-line` support the legacy syntax (single `:`)
const pseudoElementPattern =
  /:{1,2}(before|after|first-letter|first-line|selection|backdrop|placeholder|marker|spelling-error|grammar-error|slotted|file-selector-button|cue|cue-region|part|shadow|content|footnote-call|footnote-marker)/;

/** This object that represents component tokens and their respective test options. */
export type ComponentTestTokens = Record<CalciteCSSCustomProp, TestSelectToken | TestSelectToken[]>;

/**
 * Helper to test custom theming of a component's associated tokens.
 *
 * @example
 * describe("theme", () => {
 *   const tokens: ComponentTestTokens = {
 *      "--calcite-action-menu-border-color": [
 *        {
 *          targetProp: "borderLeftColor",
 *        },
 *        {
 *          shadowSelector: "calcite-action",
 *          targetProp: "--calcite-action-border-color",
 *        },
 *        {
 *          // added to demonstrate pseudo-element support
 *          shadowSelector: "calcite-action::after",
 *          targetProp: "borderColor",
 *        },
 *     ],
 *     "--calcite-action-menu-background-color": {
 *          targetProp: "backgroundColor",
 *          shadowSelector: ".container",
 *     },
 *     "--calcite-action-menu-trigger-background-color-active": {
 *        shadowSelector: "calcite-action",
 *        targetProp: "--calcite-action-background-color",
 *        state: { press: { attribute: "class", value: CSS.defaultTrigger } },
 *      },
 *      "--calcite-action-menu-trigger-background-color-focus": {
 *        shadowSelector: "calcite-action",
 *        targetProp: "--calcite-action-background-color",
 *        state: "focus",
 *      },
 *      "--calcite-action-menu-trigger-background-color-hover": {
 *        shadowSelector: "calcite-action",
 *        targetProp: "--calcite-action-background-color",
 *        state: "hover",
 *      },
 *      "--calcite-action-menu-trigger-background-color": {
 *        shadowSelector: "calcite-action",
 *        targetProp: "--calcite-action-background-color",
 *      },
 *   };
 *   themed(`calcite-action-bar`, tokens);
 * });
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
        setTokens[token] = getTokenValue(token);
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
          const effectiveShadowSelector = shadowSelector.replace(pseudoElementPattern, "");
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
          expectedValue: tokens[token].expectedValue || setTokens[token],
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

type ContextSelectByAttr = { attribute: string; value: string };

type CSSProp = Extract<keyof CSSStyleDeclaration, string>;

type State = "press" | "hover" | "focus";

/** Describes a test target for themed components. */
type TestTarget = {
  /** An object with target element and selector info. */
  target: TargetInfo;

  /** @todo doc */
  contextSelector?: ContextSelectByAttr;

  /** The CSSStyleDeclaration property or mapped sub-component CSS custom prop to assert on. */
  targetProp: CSSProp | MappedCalciteCSSCustomProp;

  /** The state to apply to the target element. */
  state?: State;

  /** The expected value of the targetProp. */
  expectedValue: string;

  /** The associated component token. */
  token: CalciteCSSCustomProp;
};

/** Represents a Calcite CSS custom prop */
type CalciteCSSCustomProp = `--calcite-${string}`;

/**
 * Represents a mapped Calcite CSS custom prop (used for sub-components)
 *
 * Note: this shares the same type as `CalciteCSSCustomProp` but is used to differentiate between the two.
 */
type MappedCalciteCSSCustomProp = CalciteCSSCustomProp;

/** Describes a test selector for themed components. */
type TestSelectToken = {
  /** The selector of the target element. When not provided, the component tag is used. */
  selector?: string;

  /** This selector will be used to find the target element within the shadow DOM of the component. */
  shadowSelector?: string;

  /** The CSSStyleDeclaration property to assert on. */
  targetProp: CSSProp | MappedCalciteCSSCustomProp;

  /** Override the default expect value set based on the token schema. Good for testing edge-cases where a token should not set the targetProp. */
  expectedValue?: string;

  /** The state to apply to the target element. */
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
  const elementHandle = await toElementHandle(element);

  return await elementHandle.evaluate(
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
  const pseudoElement = target.shadowSelector?.match(pseudoElementPattern)?.[0] ?? undefined;

  if (contextSelector) {
    const rect = (await page.evaluate((context: TestTarget["contextSelector"]) => {
      const searchInShadowDom = (node: Node): HTMLElement | SVGElement | Node | undefined => {
        const { attribute, value } = context as {
          attribute: string;
          value: string;
        };
        if (node.nodeType === 1) {
          const attr = (node as Element).getAttribute(attribute);
          if (typeof value === "string" && attr === value) {
            return node;
          }
          if (attr === value) {
            return node;
          }

          if ((node as Element) && !attribute && !value) {
            return node;
          }
        }

        if (node.nodeType === 1 && (node as Element).shadowRoot) {
          for (const child of (node as Element).shadowRoot.children) {
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

    if (!rect) {
      throw new Error(
        `[${token}] context target (${contextSelector.attribute}="${contextSelector.value}") not found, make sure test HTML renders the component and expected shadow DOM elements`,
      );
    }

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
    try {
      await targetEl[state as Exclude<State, "press">]();
    } catch (error) {
      // checking for explicit Puppeteer ElementHandle error: https://github.com/puppeteer/puppeteer/blob/68fd7712932f94730b6186107a0509c233938084/packages/puppeteer-core/src/api/ElementHandle.ts#L625
      const message =
        error.message === "Node is either not clickable or not an Element"
          ? `[${token}] target node (${target.selector}${
              target.shadowSelector ? " >>> " + target.shadowSelector : ""
            }) must be clickable (larger than 1x1) for state: ${state}`
          : `[${token}] ${error.message} for state: ${state} on target node (${target.selector}${
              target.shadowSelector ? " >>> " + target.shadowSelector : ""
            })`;

      throw new Error(message);
    }
  }

  await page.waitForChanges();

  if (targetProp.startsWith("--calcite-")) {
    const customPropValue = await getComputedStylePropertyValue(targetEl, targetProp, pseudoElement);
    expect(getStyleString(token, targetProp, customPropValue)).toBe(getStyleString(token, targetProp, expectedValue));
    return;
  }

  const styles = await targetEl.getComputedStyle(pseudoElement);
  const isFakeBorderColorToken =
    token.includes("-color") &&
    (targetProp === "boxShadow" || targetProp === "outline" || targetProp === "outlineColor");
  const isLinearGradientUnderlineToken = token.includes("link-underline-color") && targetProp === "backgroundImage";

  if (isFakeBorderColorToken || isLinearGradientUnderlineToken) {
    expect(getStyleString(token, targetProp, styles[targetProp])).toMatch(expectedValue);
    return;
  }

  expect(getStyleString(token, targetProp, styles[targetProp])).toBe(getStyleString(token, targetProp, expectedValue));
}

/**
 * Generates a message with the token, property, and value.
 *
 * Used for debugging.
 *
 * @param token - the token as a CSS variable
 * @param prop - the CSS property
 * @param value - the value of the CSS property
 */
function getStyleString(token: string, prop: string, value: string): string {
  return `[${token}:${prop}] ${value}`;
}
