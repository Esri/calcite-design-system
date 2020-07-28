import { EventEmitter } from "../../stencil-public-runtime";
import { TreeSelectionMode } from "../../interfaces/TreeSelectionMode";
import { TreeItemSelectDetail } from "../../interfaces/TreeItemSelect";
import { TreeSelectDetail } from "../../interfaces/TreeSelect";
export declare class CalciteTree {
    el: HTMLElement;
    /** Display indentation guide lines */
    lines: boolean;
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** Specify the scale of the tree, defaults to m */
    scale: "s" | "m";
    /** Customize how tree selection works (single, multi, children, multi-children) */
    selectionMode: TreeSelectionMode;
    componentWillUpdate(): void;
    componentWillRender(): void;
    render(): any;
    onFocus(): void;
    onClick(e: CustomEvent<TreeItemSelectDetail>): void;
    calciteTreeSelect: EventEmitter<TreeSelectDetail>;
    /** @internal If this tree is nested within another tree, set to false */
    root: boolean;
}
