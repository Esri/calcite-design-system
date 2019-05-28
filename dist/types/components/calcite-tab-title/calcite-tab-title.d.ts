import { EventEmitter } from "../../stencil.core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
export declare class CalciteTabTitle {
    id: string;
    private controls;
    el: HTMLElement;
    tab: string;
    isActive: boolean;
    calciteActivateTab: EventEmitter<TabChangeEventDetail>;
    calciteFocusNextTab: EventEmitter;
    calciteFocusPreviousTab: EventEmitter;
    private calciteRegisterTabTitle;
    tabChangeHand(event: CustomEvent<TabChangeEventDetail>): void;
    onClick(): void;
    keyDownHandler(e: KeyboardEvent): void;
    componentDidLoad(): void;
    getTabIndex(): Promise<any>;
    setControledBy(id: string): Promise<void>;
    render(): any;
}
