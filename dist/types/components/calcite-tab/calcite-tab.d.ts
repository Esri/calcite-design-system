import { EventEmitter } from "../../stencil.core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { TabRegisterEventDetail } from "../../interfaces/TabRegister";
export declare class CalciteTab {
    id: string;
    private labeledBy;
    el: HTMLElement;
    tab: string;
    isActive: boolean;
    tabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void;
    calciteRegisterTab: EventEmitter<TabRegisterEventDetail>;
    componentDidLoad(): void;
    getTabIndex(): Promise<any>;
    registerLabeledBy(id: any): Promise<void>;
    render(): any;
}
