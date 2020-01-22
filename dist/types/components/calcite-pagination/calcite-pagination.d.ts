import { EventEmitter } from "../../stencil.core";
export declare class CalcitePagination {
    /** Change between foreground colors or background colors for container background */
    backgroundStyle: "backgroundColor" | "foregroundColor";
    /** starting selected index */
    num: number;
    numWatchHandler(newValue: any): void;
    /** starting number of the pagination */
    start: number;
    /** title of the next button */
    textLabelNext: string;
    /** title of the previous button */
    textLabelPrevious: string;
    /** specify the theme of accordion, defaults to light */
    theme: "light" | "dark";
    /** ending number of the pagination */
    total: number;
    el: HTMLElement;
    selectedIndex: number;
    selectedIndexWatchHandler(): void;
    /** Emitted whenever the selected page changes.
     * @event calcitePaginationUpdate
     */
    calcitePaginationUpdate: EventEmitter;
    /** When called, selected page will increment by 1.
     */
    nextPage(): Promise<void>;
    /** When called, selected page will decrement by 1.
     */
    previousPage(): Promise<void>;
    /** Set selected page to a specific page number. Will not go below start or above total.
     */
    setPage(num: number): Promise<void>;
    previousClicked: () => void;
    nextClicked: () => void;
    showLeftEllipsis(): boolean;
    showRightEllipsis(): boolean;
    renderPages(): any[];
    renderPage(num: any): any;
    renderLeftEllipsis(): any;
    renderRightEllipsis(): any;
    render(): any;
}
