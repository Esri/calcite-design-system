import { Host, h } from "@stencil/core";
import { nodeListToArray, getElementDir, getElementTheme } from "../../utils/dom";
import { TreeSelectionMode } from "../../interfaces/TreeSelectionMode";
export class CalciteTree {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Be sure to add a jsdoc comment describing your propery for the generated readme file.
         * If your property should be hidden from documentation, you can use the `@internal` tag
         */
        this.lines = false;
        this.root = true;
        this.theme = "light";
        this.size = "m";
        this.selectionMode = TreeSelectionMode.Single;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    componentWillRender() {
        const parent = this.el.parentElement.closest("calcite-tree");
        this.theme = getElementTheme(this.el);
        this.lines = parent ? parent.lines : this.lines;
        this.size = parent ? parent.size : this.size;
        this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
        this.root = parent ? false : true;
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { tabindex: this.root ? "1" : undefined, dir: dir, "aria-role": this.root ? "tree" : undefined, "aria-multiselectable": this.selectionMode === TreeSelectionMode.Multi ||
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
                (this.selectionMode === TreeSelectionMode.Children ||
                    this.selectionMode === TreeSelectionMode.MultiChildren));
        const shouldExpandTarget = this.selectionMode === TreeSelectionMode.Children ||
            this.selectionMode === TreeSelectionMode.MultiChildren;
        if (this.root) {
            const targetItems = [];
            if (shouldSelect) {
                targetItems.push(target);
            }
            if (shouldSelectChildren) {
                childItems.forEach(treeItem => {
                    targetItems.push(treeItem);
                });
            }
            if (shouldClearCurrentSelection) {
                const selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
                selectedItems.forEach(treeItem => {
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
                targetItems.forEach(treeItem => {
                    treeItem.selected = false;
                });
            }
            else {
                targetItems.forEach(treeItem => {
                    treeItem.selected = true;
                });
            }
        }
        if (this.root) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.calciteTreeSelect.emit({
            selected: nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter(i => i.selected)
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
                "text": "Be sure to add a jsdoc comment describing your propery for the generated readme file.\nIf your property should be hidden from documentation, you can use the `@internal` tag"
            },
            "attribute": "lines",
            "reflect": true,
            "defaultValue": "false"
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
                "tags": [],
                "text": ""
            },
            "attribute": "root",
            "reflect": true,
            "defaultValue": "true"
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
                "text": ""
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
        },
        "size": {
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
                "text": ""
            },
            "attribute": "size",
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
                "text": ""
            },
            "attribute": "selection-mode",
            "reflect": true,
            "defaultValue": "TreeSelectionMode.Single"
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
