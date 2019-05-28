import { EventEmitter } from '../../stencil.core';
export declare class CalciteAlert {
    el: HTMLElement;
    currentAlert: string;
    dismiss: boolean;
    icon: boolean;
    id: string;
    queueLength: number;
    color: string;
    theme: string;
    duration: string;
    isActive: boolean;
    alertClose: EventEmitter;
    alertOpen: EventEmitter;
    close(): Promise<void>;
    componentWillUpdate(): void;
    setIcon(): any;
    render(): any;
}
