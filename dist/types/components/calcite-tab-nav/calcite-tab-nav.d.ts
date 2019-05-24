import { EventEmitter } from "../../stencil.core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { TabRegisterEventDetail } from "../../interfaces/TabRegister";
export declare class CalciteTabNav {
    el: any;
    id: string;
    calciteTabChange: EventEmitter<TabChangeEventDetail>;
    selectedTab: number | string;
    selectedTabChanged(): void;
    focusPreviousTabHandler(e: CustomEvent): void;
    focusNextTabHandler(e: CustomEvent): void;
    tabTitleRegistationHandler(e: CustomEvent<TabRegisterEventDetail>): void;
    activateTabHandler(e: CustomEvent<TabChangeEventDetail>): void;
    getIndexOfTabTitle(el: HTMLCalciteTabTitleElement): number;
    componentWillLoad(): void;
    render(): any;
}
