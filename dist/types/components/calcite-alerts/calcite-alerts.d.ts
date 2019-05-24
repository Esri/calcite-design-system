import { EventEmitter } from '../../stencil.core';
export declare class CalciteAlerts {
    el: HTMLElement;
    id: string;
    currentAlert: string;
    isActive: boolean;
    queue: string[];
    alertsClose: EventEmitter;
    alertsOpen: EventEmitter;
    open(requestedAlert: any): Promise<void>;
    updateQueue(event: CustomEvent): void;
    componentWillUpdate(): void;
    render(): any;
}
