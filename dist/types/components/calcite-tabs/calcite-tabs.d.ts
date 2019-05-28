import { TabRegisterEventDetail } from "../../interfaces/TabRegister";
interface TabRegister {
    [key: string]: {
        id: string;
        tab: HTMLCalciteTabElement;
    };
}
interface TabTitleRegister {
    [key: string]: {
        id: string;
        title: HTMLCalciteTabTitleElement;
    };
}
export declare class CalciteTabs {
    tabs: TabRegister;
    tabTitles: TabTitleRegister;
    theme: "light" | "dark";
    tabTitleRegistationHandler(e: CustomEvent<TabRegisterEventDetail>): void;
    tabRegistationHandler(e: CustomEvent<TabRegisterEventDetail>): void;
    render(): any;
}
export {};
