export declare function nodeListToArray(domNodeList: any): Element[];
export declare function getElementDir(el: HTMLElement): any;
export declare function getElementTheme(el: HTMLElement): any;
export declare function getElementProp(el: HTMLElement, prop: any, value: any): any;
export interface CalciteFocusableElement extends HTMLElement {
    setFocus?: () => void;
}
export declare function focusElement(el: CalciteFocusableElement): void;
export declare function hasSlottedContent(el: HTMLSlotElement): boolean;
export declare function getSlottedElements<T extends Element>(wrapperEl: Element, selector: string): T[];
export declare function getDescribedByElement<T extends HTMLElement>(element: HTMLElement): T | HTMLElement | null;
export declare const HOST_CSS: {
    hydratedInvisible: string;
};
