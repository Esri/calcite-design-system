import { EventEmitter } from "../../stencil-public-runtime";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
export declare class CalciteTabTitle {
    el: HTMLCalciteTabTitleElement;
    /**
     * Optionally include a unique name for the tab title,
     * be sure to also set this name on the associated tab.
     */
    tab?: string;
    /** Show this tab title as selected */
    active: boolean;
    /** optionally pass an icon to display at the start of a tab title - accepts calcite ui icon names  */
    iconStart?: string;
    /** optionally pass an icon to display at the end of a tab title - accepts calcite ui icon names  */
    iconEnd?: string;
    /** @internal Parent tabs component layout value */
    layout: "center" | "inline";
    /** @internal Parent tabs component position value */
    position: "above" | "below";
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillLoad(): void;
    componentWillRender(): void;
    render(): any;
    componentDidLoad(): void;
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
    /** watches for changing text content **/
    private observer;
    private controls;
    /** determine if there is slotted text for styling purposes */
    private hasText?;
    private updateHasText;
    private setupTextContentObserver;
    /**
     * @internal
     */
    private guid;
}
