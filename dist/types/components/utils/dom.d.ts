import { CalciteTheme } from "../interfaces";
export declare function getElementDir(el: HTMLElement): "ltr" | "rtl";
export declare function getElementTheme(el: HTMLElement): CalciteTheme;
export declare function getElementProp(el: HTMLElement, prop: any, value: any): any;
export interface CalciteFocusableElement extends HTMLElement {
    setFocus?: () => void;
}
export declare function focusElement(el: CalciteFocusableElement): void;
interface GetSlottedOptions {
    all?: boolean;
    direct?: boolean;
    selector?: string;
}
export declare function getSlotted<T extends Element = Element>(element: Element, slotName: string, options: GetSlottedOptions & {
    all: true;
}): T[];
export declare function getSlotted<T extends Element = Element>(element: Element, slotName: string, options?: GetSlottedOptions): T | null;
export {};
