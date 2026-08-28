import { expect, it, onTestFinished } from "vitest";
import { type Locator, page, userEvent } from "vitest/browser";
import { type RequireExactlyOne } from "type-fest";
import { commands } from "../../browser/commands";
import { getTokenValue } from "../../utils/cssTokenValues";
import "./utils";
import { TestSetup } from "./types";
import { focusElement } from "../../../utils/dom";

const pseudoElementPattern =
  /:{1,2}(before|after|first-letter|first-line|selection|backdrop|placeholder|marker|spelling-error|grammar-error|slotted|file-selector-button|cue|cue-region|part|shadow|content|footnote-call|footnote-marker)/;

type CSSProp = Extract<keyof CSSStyleDeclaration, string>;
type State = "press" | "hover" | "focus";
type CalciteCSSCustomProp = `--calcite-${string}`;
type MappedCalciteCSSCustomProp = CalciteCSSCustomProp;
type Selector = string | Locator;

type ElementMatcher = {
  attribute: string;
  value: string;
};

type InteractionSelector = ElementMatcher | Selector;

type StateDetail = RequireExactlyOne<Record<State, InteractionSelector>, State>;

type TestSelectToken = {
  selector?: Selector;
  shadowSelector?: Selector;
  targetProp: CSSProp | MappedCalciteCSSCustomProp;
  expectedValue?: string;
  state?: Exclude<State, "press"> | StateDetail;
};

export type ComponentTestTokens = Record<CalciteCSSCustomProp, TestSelectToken | TestSelectToken[]>;

type TargetInfo = {
  locator: Locator;
  selector: Selector;
  shadowSelector?: Selector;
  selectorText: string;
  shadowSelectorText?: string;
};

type TestTarget = {
  target: TargetInfo;
  interactionSelector?: InteractionSelector;
  targetProp: CSSProp | MappedCalciteCSSCustomProp;
  state?: State;
  expectedValue: string;
  token: CalciteCSSCustomProp;
};

type ThemeAssertion = TestTarget & {
  hoverBeforeInteraction: boolean;
  interactionElement?: HTMLElement;
  pseudoElement?: string;
  targetElement: HTMLElement;
};

type InteractionGroup = {
  assertions: ThemeAssertion[];
  element: HTMLElement;
  hoverBeforeInteraction: boolean;
  state: State;
};

/**
 * Helper to test custom theming of a component's associated tokens.
 *
 * @example
 * describe("theme", () => {
 *   themed(() => mount("calcite-action-bar"), {
 *     "--calcite-action-menu-border-color": [
 *       {
 *         targetProp: "borderLeftColor",
 *       },
 *       {
 *         shadowSelector: "calcite-action",
 *         targetProp: "--calcite-action-border-color",
 *       },
 *       {
 *         // added to demonstrate pseudo-element support
 *         shadowSelector: "calcite-action::after",
 *         targetProp: "borderColor",
 *       },
 *     ],
 *     "--calcite-action-menu-background-color": {
 *          targetProp: "backgroundColor",
 *          shadowSelector: ".container",
 *     },
 *     "--calcite-action-menu-trigger-background-color-active": {
 *       shadowSelector: "calcite-action",
 *       targetProp: "--calcite-action-background-color",
 *       state: { press: `calcite-action-menu >>> .${CSS.defaultTrigger}`,
 *     },
 *     "--calcite-action-menu-trigger-background-color-focus": {
 *       shadowSelector: "calcite-action",
 *       targetProp: "--calcite-action-background-color",
 *       state: "focus",
 *     },
 *     "--calcite-action-menu-trigger-background-color-hover": {
 *       shadowSelector: "calcite-action",
 *       targetProp: "--calcite-action-background-color",
 *       state: "hover",
 *     },
 *     "--calcite-action-menu-trigger-background-color": {
 *       shadowSelector: "calcite-action",
 *       targetProp: "--calcite-action-background-color",
 *     },
 *   });
 * });
 */
export function themed(setup: TestSetup, tokens: ComponentTestTokens): void {
  it("is themeable", async () => {
    const { el, container } = await setup();
    const elLocator = page.elementLocator(el);
    preventClicks(container);

    const styleTargets = new Map<HTMLElement, Map<string, string>>();
    const testTargets: TestTarget[] = [];
    const setTokens = new Map<CalciteCSSCustomProp, string>();

    for (const [token, tokenConfig] of Object.entries(tokens) as [
      CalciteCSSCustomProp,
      TestSelectToken | TestSelectToken[],
    ][]) {
      const selectors = Array.isArray(tokenConfig) ? tokenConfig : [tokenConfig];

      if (!setTokens.has(token)) {
        setTokens.set(token, getTokenValue(token));
      }

      for (const selectorConfig of selectors) {
        const selector = selectorConfig.selector ?? elLocator;
        const shadowSelector = selectorConfig.shadowSelector;
        const targetProp = selectorConfig.targetProp;

        if (typeof selectorConfig.selector === "string" && selectorConfig.selector.includes(">>>")) {
          throw new Error("Deep piercing via `selector` is not supported, use `shadowSelector` instead");
        }

        if (token === targetProp) {
          throw new Error(
            `"${token}" cannot be used as its own targetProp, please use a different property or mapped sub-component token.`,
          );
        }

const selectorLocator =
  selector === elLocator ? elLocator : getScopedLocator(page.elementLocator(document.body), el, selector);
const errorMessage = `[${token}] target (${describeTarget(selector, shadowSelector)}) not found, make sure test HTML renders the component and expected shadow DOM elements`;
        const selectorElement = getRequiredElement(selectorLocator, errorMessage);
        const targetLocator = shadowSelector ? getNestedLocator(selectorLocator, shadowSelector) : selectorLocator;

        getRequiredElement(targetLocator, errorMessage);

        if (!styleTargets.has(selectorElement)) {
          styleTargets.set(selectorElement, new Map());
        }

        styleTargets.get(selectorElement)!.set(token, setTokens.get(token)!);

        let interactionSelector: InteractionSelector | undefined;
        let stateName: State | undefined;

        if (selectorConfig.state) {
          stateName = (
            typeof selectorConfig.state === "string" ? selectorConfig.state : Object.keys(selectorConfig.state)[0]
          ) as State;
        }

        if (selectorConfig.state && typeof selectorConfig.state !== "string") {
          interactionSelector = Object.values(selectorConfig.state)[0] as InteractionSelector;
        }

        testTargets.push({
          target: {
            locator: targetLocator,
            selector,
            shadowSelector,
            selectorText: typeof selector === "string" ? selector : el.tagName,
            shadowSelectorText: typeof shadowSelector === "string" ? shadowSelector : undefined,
          },
          interactionSelector,
          targetProp,
          state: stateName,
          expectedValue: selectorConfig.expectedValue ?? setTokens.get(token)!,
          token,
        });
      }
    }

    for (const [styleTarget, cssVars] of styleTargets) {
      for (const [token, value] of cssVars) {
        styleTarget.style.setProperty(token, value);
      }
    }

    const themeAssertions = testTargets.map((testTarget) => createThemeAssertion(el, elLocator, testTarget));

    for (const themeAssertion of themeAssertions) {
      if (!themeAssertion.state) {
        assertThemedProp(themeAssertion);
      }
    }

    const interactionGroups = groupInteractionTargets(themeAssertions);

    for (const interactionGroup of interactionGroups) {
      await assertInteractionGroup(interactionGroup);
    }
  });
}

function getNestedLocator(baseLocator: Locator, selector: Selector): Locator {
  return typeof selector === "string"
    ? baseLocator.getBySelector(normalizeSelector(stripPseudoElement(selector))).nth(0)
    : selector.nth(0);
}

function getScopedLocator(rootLocator: Locator, rootElement: HTMLElement, selector: Selector): Locator {
  if (typeof selector !== "string") {
    return selector.nth(0);
  }

  const normalizedSelector = normalizeSelector(selector);
  const rootPrefixedSelector = `${rootElement.localName} `;

  if (rootElement.matches(normalizedSelector)) {
    return rootLocator;
  }

  const scopedLocator = normalizedSelector.startsWith(rootPrefixedSelector)
    ? rootLocator.getBySelector(normalizedSelector.slice(rootPrefixedSelector.length)).first()
    : rootLocator.getBySelector(normalizedSelector).first();
  const scopedElement = scopedLocator.element() as HTMLElement | null;

  if (scopedElement && isElementVisible(scopedElement)) {
    return scopedLocator;
  }

  const visibleGlobalElement = Array.from(document.querySelectorAll<HTMLElement>(normalizedSelector)).find(
    isElementVisible,
  );

  return visibleGlobalElement ? page.elementLocator(visibleGlobalElement) : scopedLocator;
}

function getRequiredElement(locator: Locator, errorMessage: string): HTMLElement {
  let element: HTMLElement;

  try {
    element = locator.element() as HTMLElement;
  } catch {
    throw new Error(errorMessage);
  }

  return element;
}

function normalizeSelector(selector: string): string {
  return selector.replace(/\s*>>>\s*/g, " ").trim();
}

function stripPseudoElement(selector: string): string {
  return selector.replace(pseudoElementPattern, "").trim();
}

function describeTarget(selector: Selector, shadowSelector?: Selector): string {
  const selectorText = typeof selector === "string" ? selector : "<locator>";
  const shadowSelectorText =
    typeof shadowSelector === "string" ? ` >>> ${shadowSelector}` : shadowSelector ? " >>> <locator>" : "";

  return `${selectorText}${shadowSelectorText}`;
}

function preventClicks(root: HTMLElement): void {
  root.addEventListener("click", clickBlocker, { capture: true });

  function clickBlocker(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onTestFinished(() => {
    root.removeEventListener("click", clickBlocker, { capture: true });
  });
}

async function resetInteractionState(): Promise<void> {
  await userEvent.unhover(document.body);
}

async function hoverElement(element: HTMLElement): Promise<void> {
  await userEvent.hover(element, { force: true });
}

function createThemeAssertion(host: HTMLElement, hostLocator: Locator, options: TestTarget): ThemeAssertion {
  const { target, interactionSelector, token } = options;
  const targetElement = getRequiredElement(
    target.locator,
    `[${token}] target (${target.selectorText}${target.shadowSelectorText ? ` >>> ${target.shadowSelectorText}` : ""}) not found`,
  );
  const pseudoElement =
    typeof target.shadowSelector === "string" ? target.shadowSelector.match(pseudoElementPattern)?.[0] : undefined;
  const interactionElement = interactionSelector
    ? getInteractionTarget(host, hostLocator, targetElement, interactionSelector, token).element
    : options.state
      ? targetElement
      : undefined;

  return {
    ...options,
    hoverBeforeInteraction: Boolean(interactionSelector) || options.state === "hover" || options.state === "press",
    interactionElement,
    pseudoElement,
    targetElement,
  };
}

function groupInteractionTargets(themeAssertions: ThemeAssertion[]): InteractionGroup[] {
  const groups: InteractionGroup[] = [];

  for (const themeAssertion of themeAssertions) {
    const { hoverBeforeInteraction, interactionElement, state } = themeAssertion;

    if (!state || !interactionElement) {
      continue;
    }

    let group = groups.find(
      (candidate) =>
        candidate.element === interactionElement &&
        candidate.state === state &&
        candidate.hoverBeforeInteraction === hoverBeforeInteraction,
    );

    if (!group) {
      group = {
        assertions: [],
        element: interactionElement,
        hoverBeforeInteraction,
        state,
      };
      groups.push(group);
    }

    group.assertions.push(themeAssertion);
  }

  return groups;
}

async function assertInteractionGroup(group: InteractionGroup): Promise<void> {
  const { assertions, element, hoverBeforeInteraction, state } = group;
  await resetInteractionState();

  try {
    if (hoverBeforeInteraction) {
      await hoverElement(element);
    }

    if (state === "press") {
      await commands.mouseDown();
    } else if (state === "focus") {
      await focusElement(element);
    }

    for (const themeAssertion of assertions) {
      assertThemedProp(themeAssertion);
    }
  } finally {
    if (state === "press") {
      await commands.mouseUp();
    }
  }
}

function assertThemedProp(options: ThemeAssertion): void {
  const { targetElement, targetProp, pseudoElement, expectedValue, token } = options;

  if (targetProp.startsWith("--calcite-")) {
    const customPropValue = getComputedStylePropertyValue(targetElement, targetProp, pseudoElement);
    expect(getStyleString(token, targetProp, customPropValue)).toBe(getStyleString(token, targetProp, expectedValue));
    return;
  }

  const styles = getComputedStyle(targetElement, pseudoElement);
  const actualValue = styles[targetProp];
  const isFakeBorderColorToken =
    token.includes("-color") &&
    (targetProp === "boxShadow" || targetProp === "outline" || targetProp === "outlineColor");
  const isLinearGradientUnderlineToken = token.includes("link-underline-color") && targetProp === "backgroundImage";

  if (isFakeBorderColorToken || isLinearGradientUnderlineToken) {
    expect(getStyleString(token, targetProp, actualValue)).toMatch(expectedValue);
    return;
  }

  expect(getStyleString(token, targetProp, actualValue)).toBe(getStyleString(token, targetProp, expectedValue));
}

function getInteractionTarget(
  host: HTMLElement,
  hostLocator: Locator,
  targetElement: HTMLElement,
  interactionSelector: InteractionSelector,
  token: CalciteCSSCustomProp,
): { element: HTMLElement } {
  if (typeof interactionSelector === "string" || isLocator(interactionSelector)) {
    const locator = getScopedLocator(hostLocator, host, interactionSelector);
    const element = getRequiredElement(
      locator,
      `[${token}] interaction target (${typeof interactionSelector === "string" ? interactionSelector : "<locator>"}) was not found, make sure test HTML renders the component and expected shadow DOM elements`,
    );

    return { element };
  }

  const { attribute, value } = interactionSelector;
  const matched =
    (attribute === "class" && targetElement.classList.contains(value)) ||
    targetElement.getAttribute(attribute) === value ||
    (!attribute && !value);

  if (!matched) {
    throw new Error(
      `[${token}] interaction target with (${attribute}="${value}") was not found, make sure test HTML renders the component and expected shadow DOM elements`,
    );
  }

  return {
    element: host === targetElement ? host : targetElement,
  };
}

function isLocator(value: InteractionSelector): value is Locator {
  return typeof value === "object" && "element" in value;
}

function getComputedStylePropertyValue(element: HTMLElement, property: string, pseudoElement?: string): string {
  return getComputedStyle(element, pseudoElement).getPropertyValue(property);
}

function isElementVisible(element: HTMLElement): boolean {
  const styles = getComputedStyle(element);

  return element.getClientRects().length > 0 && styles.visibility !== "hidden" && styles.display !== "none";
}

function getStyleString(token: string, prop: string, value: string): string {
  return `[${token}:${prop}] ${value}`;
}
