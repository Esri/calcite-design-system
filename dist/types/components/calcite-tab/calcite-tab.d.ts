import { EventEmitter } from "../../stencil-public-runtime";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
export declare class CalciteTab {
    el: HTMLElement;
    /**
     * Optionally include a unique name for this tab,
     * be sure to also set this name on the associated title.
     */
    tab: string;
    /**
     * Show this tab
     */
    active: boolean;
    render(): any;
    componentDidLoad(): void;
    componentDidUnload(): void;
    /**
     * @internal
     */
    calciteTabRegister: EventEmitter;
    /**
     * @internal
     */
    calciteTabUnregister: EventEmitter;
    tabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void;
    /**
     * Return the index of this tab within the tab array
     */
    getTabIndex(): Promise<number>;
    /**
     * @internal
     */
    private guid;
    private labeledBy;
    /**
     * @internal
     */
    updateAriaInfo(tabIds?: string[], titleIds?: string[]): Promise<void>;
}
