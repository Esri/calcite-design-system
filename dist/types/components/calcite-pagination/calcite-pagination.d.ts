import { EventEmitter } from "../../stencil-public-runtime";
export interface CalcitePaginationDetail {
    start: number;
    total: number;
    num: number;
}
export declare class CalcitePagination {
    /** number of items per page */
    num: number;
    /** index of item that should begin the page */
    start: number;
    /** total number of items */
    total: number;
    /** title of the next button */
    textLabelNext: string;
    /** title of the previous button */
    textLabelPrevious: string;
    /** specify the theme of accordion, defaults to light */
    theme: "light" | "dark";
    /** The scale of the pagination */
    scale: "s" | "m" | "l";
    el: HTMLElement;
    connectedCallback(): void;
    /** Emitted whenever the selected page changes.
     * @event calcitePaginationUpdate
     */
    calcitePaginationUpdate: EventEmitter<CalcitePaginationDetail>;
    /** Go to the next page of results */
    nextPage(): Promise<void>;
    /** Go to the previous page of results */
    previousPage(): Promise<void>;
    private getLastStart;
    private previousClicked;
    private nextClicked;
    private showLeftEllipsis;
    private showRightEllipsis;
    private emitUpdate;
    renderPages(): any[];
    renderPage(start: number): any;
    renderLeftEllipsis(iconScale: any): any;
    renderRightEllipsis(iconScale: any): any;
    render(): any;
}
