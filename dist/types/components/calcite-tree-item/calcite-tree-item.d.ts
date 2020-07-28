import { Event, EventEmitter } from "../../stencil-public-runtime";
import { TreeItemSelectDetail } from "../../interfaces/TreeItemSelect";
export declare class CalciteTreeItem {
    el: HTMLElement;
    /** Is the item currently selected */
    selected: boolean;
    /** True if the item is in an expanded state */
    expanded: boolean;
    expandedHandler(newValue: boolean): void;
    componentWillRender(): void;
    render(): any;
    onClick(e: Event): void;
    iconClickHandler: (event: Event) => void;
    childrenClickHandler: (event: any) => any;
    keyDownHandler(e: KeyboardEvent): void;
    calciteTreeItemSelect: EventEmitter<TreeItemSelectDetail>;
    /** @internal Is the parent of this item expanded? */
    parentExpanded: boolean;
    /** @internal What level of depth is this item at? */
    depth: number;
    /** @internal Does this tree item have a tree inside it? */
    hasChildren: boolean;
    /** @internal Draw lines (set on parent) */
    lines: boolean;
    /** @internal Scale of the parent tree, defaults to m */
    scale: "s" | "m";
    private selectionMode;
    childrenSlotWrapper: HTMLElement;
    defaultSlotWrapper: HTMLElement;
}
