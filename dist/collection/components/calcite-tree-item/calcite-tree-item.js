import { Component, Element, Prop, Host, Event, State, Listen, Watch, h, } from "@stencil/core";
import { TreeSelectionMode } from "../../interfaces/TreeSelectionMode";
import { nodeListToArray, getSlottedElements, getElementDir, } from "../../utils/dom";
import { getKey } from "../../utils/key";
export class CalciteTreeItem {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Is the item currently selected */
        this.selected = false;
        /** True if the item is in an expanded state */
        this.expanded = false;
        this.iconClickHandler = (event) => {
            event.stopPropagation();
            this.expanded = !this.expanded;
            this.calciteTreeItemSelect.emit({
                modifyCurrentSelection: event.shiftKey,
                forceToggle: true,
            });
        };
        this.childrenClickHandler = (event) => event.stopPropagation();
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
        /** @internal Is the parent of this item expanded? */
        this.parentExpanded = false;
        /** @internal What level of depth is this item at? */
        this.depth = -1;
        /** @internal Does this tree item have a tree inside it? */
        this.hasChildren = null;
    }
    expandedHandler(newValue) {
        if (this.childrenSlotWrapper) {
            const [childTree] = getSlottedElements(this.childrenSlotWrapper, "calcite-tree");
            if (childTree) {
                const items = getSlottedElements(childTree, "calcite-tree-item");
                items.forEach((item) => (item.parentExpanded = newValue));
            }
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillRender() {
        this.hasChildren = !!this.el.querySelector("calcite-tree");
        let parentTree = this.el.closest("calcite-tree");
        this.selectionMode = parentTree.selectionMode;
        this.depth = 0;
        this.scale = (parentTree && parentTree.scale) || "m";
        this.lines = parentTree && parentTree.lines;
        this.el.dir = getElementDir(this.el);
        let nextParentTree;
        while (parentTree) {
            nextParentTree = parentTree.parentElement.closest("calcite-tree");
            if (nextParentTree === parentTree) {
                break;
            }
            else {
                parentTree = nextParentTree;
                this.depth = this.depth + 1;
            }
        }
    }
    render() {
        const icon = this.hasChildren ? (h("calcite-icon", { class: "calcite-tree-chevron", icon: "chevron-right", scale: "s", onClick: this.iconClickHandler, "data-test-id": "icon" })) : null;
        return (h(Host, { tabindex: this.parentExpanded || this.depth === 1 ? "0" : "-1", "aria-role": "treeitem", "aria-hidden": this.parentExpanded || this.depth === 1 ? undefined : "true", "aria-selected": this.selected
                ? "true"
                : this.selectionMode === TreeSelectionMode.Multi ||
                    this.selectionMode === TreeSelectionMode.MultiChildren
                    ? "false"
                    : undefined, "aria-expanded": this.hasChildren ? this.expanded.toString() : undefined },
            h("div", { class: "calcite-tree-node", ref: (el) => (this.defaultSlotWrapper = el) },
                icon,
                h("slot", null)),
            h("div", { class: "calcite-tree-children", "data-test-id": "calcite-tree-children", role: this.hasChildren ? "group" : undefined, ref: (el) => (this.childrenSlotWrapper = el), onClick: this.childrenClickHandler },
                h("slot", { name: "children" }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick(e) {
        // Solve for if the item is clicked somewhere outside the slotted anchor.
        // Anchor is triggered anywhere you click
        const [link] = getSlottedElements(this.defaultSlotWrapper, "a");
        if (link && e.composedPath()[0].tagName.toLowerCase() !== "a") {
            const target = link.target === "" ? "_self" : link.target;
            window.open(link.href, target);
        }
        this.expanded = !this.expanded;
        this.calciteTreeItemSelect.emit({
            modifyCurrentSelection: e.shiftKey,
            forceToggle: false,
        });
    }
    keyDownHandler(e) {
        let root;
        switch (getKey(e.key)) {
            case " ":
                this.selected = !this.selected;
                e.preventDefault();
                e.stopPropagation();
                break;
            case "Enter":
                // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
                const link = nodeListToArray(this.el.children).find((e) => e.matches("a"));
                if (link) {
                    link.click();
                    this.selected = true;
                }
                else {
                    this.selected = !this.selected;
                }
                e.preventDefault();
                e.stopPropagation();
                break;
            case "ArrowLeft":
                // When focus is on an open node, closes the node.
                if (this.hasChildren && this.expanded) {
                    this.expanded = false;
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                }
                // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
                const parentItem = this.el.parentElement.closest("calcite-tree-item");
                if (parentItem && (!this.hasChildren || this.expanded === false)) {
                    parentItem.focus();
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                }
                // When focus is on a root node that is also either an end node or a closed node, does nothing.
                break;
            case "ArrowRight":
                // When focus is on a closed node, opens the node; focus does not move.
                if (this.hasChildren && this.expanded === false) {
                    this.expanded = true;
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                }
                // When focus is on a open node, moves focus to the first child node.
                if (this.hasChildren && this.expanded) {
                    this.el.querySelector("calcite-tree-item").focus();
                    break;
                }
                // When focus is on an end node, does nothing.
                break;
            case "ArrowUp":
                const previous = this.el
                    .previousElementSibling;
                if (previous && previous.matches("calcite-tree-item")) {
                    previous.focus();
                }
                break;
            case "ArrowDown":
                const next = this.el.nextElementSibling;
                if (next && next.matches("calcite-tree-item")) {
                    next.focus();
                }
                break;
            case "Home":
                root = this.el.closest("calcite-tree[root]");
                const firstNode = root.querySelector("calcite-tree-item");
                firstNode.focus();
                break;
            case "End":
                root = this.el.closest("calcite-tree[root]");
                let currentNode = root.children[root.children.length - 1]; // last child
                let currentTree = nodeListToArray(currentNode.children).find((e) => e.matches("calcite-tree"));
                while (currentTree) {
                    currentNode = currentTree.children[root.children.length - 1];
                    currentTree = nodeListToArray(currentNode.children).find((e) => e.matches("calcite-tree"));
                }
                currentNode.focus();
                break;
        }
    }
    static get is() { return "calcite-tree-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-tree-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-tree-item.css"]
    }; }
    static get properties() { return {
        "selected": {
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
                "text": "Is the item currently selected"
            },
            "attribute": "selected",
            "reflect": true,
            "defaultValue": "false"
        },
        "expanded": {
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
                "text": "True if the item is in an expanded state"
            },
            "attribute": "expanded",
            "reflect": true,
            "defaultValue": "false"
        },
        "parentExpanded": {
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
                        "text": "Is the parent of this item expanded?",
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "parent-expanded",
            "reflect": false,
            "defaultValue": "false"
        },
        "depth": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "What level of depth is this item at?",
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "depth",
            "reflect": true,
            "defaultValue": "-1"
        },
        "hasChildren": {
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
                        "text": "Does this tree item have a tree inside it?",
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "has-children",
            "reflect": true,
            "defaultValue": "null"
        },
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
                "tags": [{
                        "text": "Draw lines (set on parent)",
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "lines",
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
                "tags": [{
                        "text": "Scale of the parent tree, defaults to m",
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "scale",
            "reflect": true
        }
    }; }
    static get states() { return {
        "selectionMode": {}
    }; }
    static get events() { return [{
            "method": "calciteTreeItemSelect",
            "name": "calciteTreeItemSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "TreeItemSelectDetail",
                "resolved": "TreeItemSelectDetail",
                "references": {
                    "TreeItemSelectDetail": {
                        "location": "import",
                        "path": "../../interfaces/TreeItemSelect"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "expanded",
            "methodName": "expandedHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
