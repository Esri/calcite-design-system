import { EventEmitter } from "../../stencil.core";
import { TreeSelectionMode } from "../../interfaces/TreeSelectionMode";
import { TreeItemSelectDetail } from "../../interfaces/TreeItemSelect";
import { TreeSelectDetail } from "../../interfaces/TreeSelect";
export declare class CalciteTree {
    el: HTMLElement;
    /**
     * Be sure to add a jsdoc comment describing your propery for the generated readme file.
     * If your property should be hidden from documentation, you can use the `@internal` tag
     */
    lines: boolean;
    root: boolean;
    theme: "light" | "dark";
    size: "s" | "m";
    selectionMode: TreeSelectionMode;
    componentWillUpdate(): void;
    componentWillRender(): void;
    render(): any;
    onFocus(): void;
    onClick(e: CustomEvent<TreeItemSelectDetail>): void;
    calciteTreeSelect: EventEmitter<TreeSelectDetail>;
}
