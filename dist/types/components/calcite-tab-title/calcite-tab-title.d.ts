import { EventEmitter } from "../../stencil-public-runtime";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
export declare class CalciteTabTitle {
    el: HTMLElement;
    /**
     * Optionally include a unique name for the tab title,
     * be sure to also set this name on the associated tab.
     */
    tab?: string;
    /** Show this tab title as selected */
    isActive: boolean;
    /** @internal Parent tabs component layout value */
    layout: "center" | "inline";
    componentWillLoad(): void;
    componentWillRender(): void;
    render(): any;
    componentDidLoad(): void;
    componentDidUnload(): void;
    tabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void;
    onClick(): void;
    keyDownHandler(e: KeyboardEvent): void;
    /**
     * Fires when a specific tab is activated. `event.details`: [TabChangeEventDetail](../../interfaces/TabChange.ts)
     */
    calciteTabsActivate: EventEmitter<TabChangeEventDetail>;
    /**
     * @internal
     */
    calciteTabsFocusNext: EventEmitter;
    /**
     * @internal
     */
    calciteTabsFocusPrevious: EventEmitter;
    /**
     * @internal
     */
    calciteTabTitleRegister: EventEmitter;
    /**
     * @internal
     */
    calciteTabTitleUnregister: EventEmitter;
    /**
     * Return the index of this title within the nav
     */
    getTabIndex(): Promise<number>;
    /**
     * @internal
     */
    getTabIdentifier(): Promise<string | number>;
    /**
     * @internal
     */
    updateAriaInfo(tabIds?: string[], titleIds?: string[]): Promise<void>;
    private controls;
    /**
     * @internal
     */
    private guid;
}
