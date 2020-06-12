import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteExample {
    el: HTMLElement;
    /**
     * Be sure to add a jsdoc comment describing your property for the generated readme file.
     * If your property should be hidden from documentation, you can use the `@internal` tag
     */
    property: string;
    componentWillUpdate(): void;
    render(): any;
    onClick(e: Event): void;
    open: EventEmitter;
    /**
     * Add a jsdoc comment describing your method and it's parameters (use `@param`).
     */
    doThing(): Promise<void>;
    private state;
    private privateMethod;
}
