/**
 * Mocks `getComputedStyle` to return the provided values for the provided element.
 * This is needed due to JSDOM issue with getComputedStyle - https://github.com/jsdom/jsdom/issues/3090
 *
 * @param element
 * @param fakeComputedStyle
 */
export function mockGetComputedStyleFor(element: Element, fakeComputedStyle: Partial<CSSStyleDeclaration>): void {
  jest.spyOn(window, "getComputedStyle").mockImplementation((el: Element): CSSStyleDeclaration => {
    if (el === element) {
      return fakeComputedStyle as CSSStyleDeclaration;
    }
  });
}
