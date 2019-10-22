import { EventEmitter } from "../../stencil.core";
import { TreeItemSelectDetail } from "../../interfaces/TreeItemSelect";
export declare class CalciteTreeItem {
    el: HTMLElement;
    /**
     * Be sure to add a jsdoc comment describing your property for the generated readme file.
     * If your property should be hidden from documentation, you can use the `@internal` tag
     */
    selected: boolean;
    depth: number;
    hasChildren: boolean;
    expanded: boolean;
    parentExpanded: boolean;
    expandedHandler(newValue: boolean): void;
    componentWillRender(): void;
    render(): any;
    onClick(e: Event): void;
    iconClickHandler: (event: Event) => void;
    childrenClickHandler: (event: any) => any;
    keyDownHandler(e: KeyboardEvent): void;
    calciteTreeItemSelect: EventEmitter<TreeItemSelectDetail>;
    private selectionMode;
    childrenSlotWrapper: HTMLElement;
    defaultSlotWrapper: HTMLElement;
}
