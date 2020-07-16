import { Component, Element, Prop, Host, Event, Listen, h, } from "@stencil/core";
import { nodeListToArray } from "../../utils/dom";
import { TreeSelectionMode } from "../../interfaces/TreeSelectionMode";
export class CalciteTree {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Display indentation guide lines */
        this.lines = false;
        /** Specify the scale of the tree, defaults to m */
        this.scale = "m";
        /** Customize how tree selection works (single, multi, children, multi-children) */
        this.selectionMode = TreeSelectionMode.Single;
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** @internal If this tree is nested within another tree, set to false */
        this.root = true;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    componentWillRender() {
        const parent = this.el.parentElement.closest("calcite-tree");
        // this.theme = getElementTheme(this.el);
        this.lines = parent ? parent.lines : this.lines;
        this.scale = parent ? parent.scale : this.scale;
        this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
        this.root = parent ? false : true;
    }
    render() {
        return (h(Host, { tabindex: this.root ? "1" : undefined, "aria-role": this.root ? "tree" : undefined, "aria-multiselectable": this.selectionMode === TreeSelectionMode.Multi ||
                this.selectionMode === TreeSelectionMode.MultiChildren },
            h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onFocus() {
        if (this.root) {
            const selectedNode = this.el.querySelector("calcite-tree-item[selected]");
            const firstNode = this.el.querySelector("calcite-tree-item");
            (selectedNode || firstNode).focus();
        }
    }
    onClick(e) {
        const target = e.target;
        const childItems = nodeListToArray(target.querySelectorAll("calcite-tree-item"));
        const shouldSelect = this.selectionMode !== null &&
            (!target.hasChildren ||
                (target.hasChildren &&
                    (this.selectionMode === TreeSelectionMode.Children ||
                        this.selectionMode === TreeSelectionMode.MultiChildren)));
        const shouldModifyToCurrentSelection = e.detail.modifyCurrentSelection &&
            (this.selectionMode === TreeSelectionMode.Multi ||
                this.selectionMode === TreeSelectionMode.MultiChildren);
        const shouldSelectChildren = this.selectionMode === TreeSelectionMode.MultiChildren ||
            this.selectionMode === TreeSelectionMode.Children;
        const shouldClearCurrentSelection = !shouldModifyToCurrentSelection &&
            (((this.selectionMode === TreeSelectionMode.Single ||
                this.selectionMode === TreeSelectionMode.Multi) &&
                childItems.length <= 0) ||
                this.selectionMode === TreeSelectionMode.Children ||
                this.selectionMode === TreeSelectionMode.MultiChildren);
        const shouldExpandTarget = this.selectionMode === TreeSelectionMode.Children ||
            this.selectionMode === TreeSelectionMode.MultiChildren;
        if (this.root) {
            const targetItems = [];
            if (shouldSelect) {
                targetItems.push(target);
            }
            if (shouldSelectChildren) {
                childItems.forEach((treeItem) => {
                    targetItems.push(treeItem);
                });
            }
            if (shouldClearCurrentSelection) {
                const selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
                selectedItems.forEach((treeItem) => {
                    if (!targetItems.includes(treeItem)) {
                        treeItem.selected = false;
                    }
                });
            }
            if (shouldExpandTarget && !e.detail.forceToggle) {
                target.expanded = true;
            }
            if (shouldModifyToCurrentSelection) {
                window.getSelection().removeAllRanges();
            }
            if ((shouldModifyToCurrentSelection && target.selected) ||
                (shouldSelectChildren && e.detail.forceToggle)) {
                targetItems.forEach((treeItem) => {
                    treeItem.selected = false;
                });
            }
            else {
                targetItems.forEach((treeItem) => {
                    treeItem.selected = true;
                });
            }
        }
        if (this.root) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.calciteTreeSelect.emit({
            selected: nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected),
        });
    }
    static get is() { return "calcite-tree"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-tree.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-tree.css"]
    }; }
    static get properties() { return {
        "lines": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Display indentation guide lines"
            },
            "attribute": "lines",
            "reflect": true,
            "defaultValue": "false"
        },
        "theme": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"light\" | \"dark\"",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Select theme (light or dark)"
            },
            "attribute": "theme",
            "reflect": true
        },
        "scale": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"s\" | \"m\"",
                "resolved": "\"m\" | \"s\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Specify the scale of the tree, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "selectionMode": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "TreeSelectionMode",
                "resolved": "TreeSelectionMode.Children | TreeSelectionMode.Multi | TreeSelectionMode.MultiChildren | TreeSelectionMode.Single",
                "references": {
                    "TreeSelectionMode": {
                        "location": "import",
                        "path": "../../interfaces/TreeSelectionMode"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Customize how tree selection works (single, multi, children, multi-children)"
            },
            "attribute": "selection-mode",
            "reflect": true,
            "defaultValue": "TreeSelectionMode.Single"
        },
        "root": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "If this tree is nested within another tree, set to false",
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "root",
            "reflect": true,
            "defaultValue": "true"
        }
    }; }
    static get events() { return [{
            "method": "calciteTreeSelect",
            "name": "calciteTreeSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "TreeSelectDetail",
                "resolved": "TreeSelectDetail",
                "references": {
                    "TreeSelectDetail": {
                        "location": "import",
                        "path": "../../interfaces/TreeSelect"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "focus",
            "method": "onFocus",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteTreeItemSelect",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
