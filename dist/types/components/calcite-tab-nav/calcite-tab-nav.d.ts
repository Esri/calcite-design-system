import { EventEmitter } from "../../stencil.core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
export declare class CalciteTabNav {
    el: any;
    /**
     * Name to use when saving selected tab data to localStorage
     */
    storageId: string;
    /**
     * Pass the same string to multiple tab navs to keep them all in sync if one changes
     */
    syncId: string;
    /**
     * @internal
     */
    selectedTab: number | string;
    selectedTabChanged(): void;
    componentWillLoad(): void;
    render(): any;
    componentDidRender(): void;
    /**
     * @internal
     */
    focusPreviousTabHandler(e: CustomEvent): void;
    /**
     * @internal
     */
    focusNextTabHandler(e: CustomEvent): void;
    /**
     * @internal
     */
    activateTabHandler(e: CustomEvent<TabChangeEventDetail>): void;
    /**
     * @internal
     */
    globalTabChangeHandler(e: CustomEvent<TabChangeEventDetail>): void;
    /**
     * Emitted when the active tab changes
     */
    calciteTabChange: EventEmitter<TabChangeEventDetail>;
    private tabNavEl;
    private getIndexOfTabTitle;
    private get tabTitles();
}
