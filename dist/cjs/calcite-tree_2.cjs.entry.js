'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-9cd06664.js');
const keys = require('./keys-7f994354.js');
const dom = require('./dom-dcb5a4ba.js');
const index = require('./index-e5ebc500.js');

var TreeSelectionMode;
(function (TreeSelectionMode) {
    TreeSelectionMode["Single"] = "single";
    TreeSelectionMode["Multi"] = "multi";
    TreeSelectionMode["Children"] = "children";
    TreeSelectionMode["MultiChildren"] = "multi-children";
})(TreeSelectionMode || (TreeSelectionMode = {}));

const CalciteTree = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
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
        this.calciteTreeSelect = core.createEvent(this, "calciteTreeSelect", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    componentWillRender() {
        const parent = this.el.parentElement.closest("calcite-tree");
        this.theme = dom.getElementTheme(this.el);
        this.lines = parent ? parent.lines : this.lines;
        this.size = parent ? parent.size : this.size;
        this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
        this.root = parent ? false : true;
    }
    render() {
        const dir = dom.getElementDir(this.el);
        return (core.h(core.Host, { tabindex: this.root ? "1" : undefined, dir: dir, "aria-role": this.root ? "tree" : undefined, "aria-multiselectable": this.selectionMode === TreeSelectionMode.Multi ||
                this.selectionMode === TreeSelectionMode.MultiChildren }, core.h("slot", null)));
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
        const childItems = dom.nodeListToArray(target.querySelectorAll("calcite-tree-item"));
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
                const selectedItems = dom.nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
                selectedItems.forEach(treeItem => {
                    if (!targetItems.includes(treeItem)) {
                        treeItem.selected = false;
                    }
                });
            }
            if (shouldExpandTarget && !e.detail.forceCollapse) {
                target.expanded = true;
            }
            if (shouldModifyToCurrentSelection) {
                window.getSelection().removeAllRanges();
            }
            if ((shouldModifyToCurrentSelection && target.selected) ||
                (shouldSelectChildren && e.detail.forceCollapse)) {
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
            selected: dom.nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter(i => i.selected)
        });
    }
    get el() { return core.getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}:host{display:block;outline:none;--calcite-tree-text:#404040;--calcite-tree-text-hover:#2b2b2b;--calcite-tree-line:transparent;--calcite-tree-line-hover:transparent;--calcite-tree-line-active:transparent;--calcite-tree-chevron:#bfbfbf;--calcite-tree-chevron-hover:#50a7da;--calcite-tree-chevron-active:#007ac2;--calcite-tree-indicator:#bfbfbf;--calcite-tree-indicator-hover:#50a7da;--calcite-tree-indicator-active:#007ac2;--calcite-tree-vertical-padding:0.375rem;--calcite-tree-icon-padding-start:0.375rem;--calcite-tree-icon-padding-end:0;--calcite-tree-children-indent-start:0.5rem;--calcite-tree-children-indent-end:0;--calcite-tree-children-padding-start:0.75rem;--calcite-tree-children-padding-end:0;--calcite-tree-line-position-start:-0.875rem;--calcite-tree-line-position-end:0}:host([size=s]){--calcite-tree-vertical-padding:0.25rem;--calcite-tree-icon-padding-start:0.25rem;--calcite-tree-icon-padding-end:0;--calcite-tree-children-padding-start:0.375rem;--calcite-tree-children-padding-end:0;--calcite-tree-line-position-start:-0.5rem;--calcite-tree-line-position-end:0}:host([theme=dark]){--calcite-tree-text:#d4d4d4;--calcite-tree-text-hover:#eaeaea;--calcite-tree-line:transparent;--calcite-tree-line-hover:transparent;--calcite-tree-line-active:transparent;--calcite-tree-chevron:#555;--calcite-tree-chevron-hover:#007ac2;--calcite-tree-chevron-active:#3db8ff;--calcite-tree-indicator:#555;--calcite-tree-indicator-hover:#007ac2;--calcite-tree-indicator-active:#3db8ff}:host([lines]){--calcite-tree-line:#d4d4d4;--calcite-tree-line-active:#007ac2;--calcite-tree-line-hover:#50a7da}:host([lines][theme=dark]){--calcite-tree-line:#404040;--calcite-tree-line-active:#3db8ff;--calcite-tree-line-hover:#007ac2}:host([dir=rtl]){--calcite-tree-icon-padding-end:0.375rem;--calcite-tree-children-indent-start:0;--calcite-tree-children-indent-end:0.5rem;--calcite-tree-children-padding-end:0.75rem;--calcite-tree-line-position-end:-0.875rem}:host([dir=rtl]),:host([dir=rtl][size=s]){--calcite-tree-icon-padding-start:0;--calcite-tree-children-padding-start:0;--calcite-tree-line-position-start:0}:host([dir=rtl][size=s]){--calcite-tree-icon-padding-end:0.25rem;--calcite-tree-children-padding-end:0.375rem;--calcite-tree-line-position-end:-0.5rem}:host([root]) ::slotted(calcite-tree-item){border-left:none;margin-left:0;padding-left:0}"; }
};

const CalciteTreeItem = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Be sure to add a jsdoc comment describing your property for the generated readme file.
         * If your property should be hidden from documentation, you can use the `@internal` tag
         */
        this.expanded = false;
        this.selected = false;
        this.depth = -1;
        this.hasChildren = null;
        this.calciteTreeItemSelect = core.createEvent(this, "calciteTreeItemSelect", 7);
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
        const dir = dom.getElementDir(this.el);
        const icon = this.hasChildren ? (core.h("svg", { class: "calcite-tree-chevron", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16", viewBox: "0 0 16 16" }, core.h("path", { d: index.chevronRight16F }))) : (core.h("svg", { class: "calcite-tree-indicator", height: "16", width: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, core.h("circle", { cx: "8", cy: "8", r: "3" })));
        return (core.h(core.Host, { tabindex: "1", dir: dir, "aria-role": "treeitem", "aria-selected": this.selected
                ? "true"
                : this.selectionMode === TreeSelectionMode.Multi ||
                    this.selectionMode === TreeSelectionMode.MultiChildren
                    ? "false"
                    : undefined, "aria-expanded": this.hasChildren ? (this.expanded ? "true" : "false") : undefined }, core.h("div", { class: "calcite-tree-node" }, icon, core.h("slot", null)), core.h("div", { class: "calcite-tree-children", role: this.hasChildren ? "group" : undefined }, core.h("slot", { name: "children" }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick(e) {
        const target = e.target;
        const originalTarget = e.originalTarget;
        const shouldSelect = target.parentElement === this.el || this.el === e.target;
        if (shouldSelect && this.hasChildren) {
            this.expanded = !this.expanded;
        }
        if (shouldSelect) {
            this.calciteTreeItemSelect.emit({
                modifyCurrentSelection: e.shiftKey,
                forceCollapse: originalTarget && !!originalTarget.closest("svg")
            });
        }
    }
    keyDownHandler(e) {
        let root;
        switch (e.keyCode) {
            case keys.SPACE:
                this.selected = !this.selected;
                e.preventDefault();
                e.stopPropagation();
                break;
            case keys.ENTER:
                // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
                const link = dom.nodeListToArray(this.el.children).find(e => e.matches("a"));
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
            case keys.LEFT:
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
            case keys.RIGHT:
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
            case keys.UP:
                const previous = this.el
                    .previousElementSibling;
                if (previous && previous.matches("calcite-tree-item")) {
                    previous.focus();
                }
                break;
            case keys.DOWN:
                const next = this.el.nextElementSibling;
                if (next && next.matches("calcite-tree-item")) {
                    next.focus();
                }
                break;
            case keys.HOME:
                root = this.el.closest("calcite-tree[root]");
                const firstNode = root.querySelector("calcite-tree-item");
                firstNode.focus();
                break;
            case keys.END:
                root = this.el.closest("calcite-tree[root]");
                let currentNode = root.children[root.children.length - 1]; // last child
                let currentTree = dom.nodeListToArray(currentNode.children).find(e => e.matches("calcite-tree"));
                while (currentTree) {
                    currentNode = currentTree.children[root.children.length - 1];
                    currentTree = dom.nodeListToArray(currentNode.children).find(e => e.matches("calcite-tree"));
                }
                currentNode.focus();
                break;
        }
    }
    get el() { return core.getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}:host,calcite-tab[is-active]{display:block}:host{cursor:pointer;outline:none}::slotted(a),:host{color:var(--calcite-tree-text)}::slotted(a){font-size:.875rem;line-height:1.5;text-decoration:none}.calcite-tree-children{-webkit-transition:.15s cubic-bezier(.215,.44,.42,.88),opacity .15s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.15s cubic-bezier(.215,.44,.42,.88),opacity .15s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;height:0;-webkit-transform:scaleY(0);transform:scaleY(0);opacity:0;-webkit-transform-origin:top;transform-origin:top;margin-left:var(--calcite-tree-children-indent-start);margin-right:var(--calcite-tree-children-indent-end);padding-left:var(--calcite-tree-children-padding-start);padding-right:var(--calcite-tree-children-padding-end);border-left:2px solid var(--calcite-tree-line)}:host([expanded]) .calcite-tree-children{-webkit-transform:scaleY(1);transform:scaleY(1);opacity:1;height:auto}.calcite-tree-node{font-size:.875rem;line-height:1.5;display:-ms-flexbox;display:flex;padding:var(--calcite-tree-vertical-padding) 0;position:relative}.calcite-tree-node:before{content:\"\";height:100%;width:2px;background:var(--calcite-tree-line);left:var(--calcite-tree-line-position-start);right:var(--calcite-tree-line-position-end);top:0;position:absolute}:host([depth=\"1\"]) .calcite-tree-node:before{display:none}:host([selected]) .calcite-tree-node{color:var(--calcite-tree-text-active);font-weight:500}:host([selected]) .calcite-tree-node:before{background:var(--calcite-tree-line-active)}:host([selected]) .calcite-tree-node ::slotted(a){color:var(--calcite-tree-text-active)}:host([selected]) .calcite-tree-node .calcite-tree-indicator{opacity:1}:host([selected]) .calcite-tree-node .calcite-tree-chevron{fill:var(--calcite-tree-chevron-active)}:host([selected]) .calcite-tree-node .calcite-tree-indicator{fill:var(--calcite-tree-indicator-active)}.calcite-tree-node:hover,:host(:focus) .calcite-tree-node,:host([selected]) .calcite-tree-node:hover{font-weight:500;color:var(--calcite-tree-text-hover)}.calcite-tree-node:hover:before,:host(:focus) .calcite-tree-node:before,:host([selected]) .calcite-tree-node:hover:before{background:var(--calcite-tree-line-hover)}.calcite-tree-node:hover ::slotted(a),:host(:focus) .calcite-tree-node ::slotted(a),:host([selected]) .calcite-tree-node:hover ::slotted(a){color:var(--calcite-tree-text-hover)}.calcite-tree-node:hover .calcite-tree-indicator,:host(:focus) .calcite-tree-node .calcite-tree-indicator,:host([selected]) .calcite-tree-node:hover .calcite-tree-indicator{opacity:1}.calcite-tree-node:hover .calcite-tree-chevron,:host(:focus) .calcite-tree-node .calcite-tree-chevron,:host([selected]) .calcite-tree-node:hover .calcite-tree-chevron{fill:var(--calcite-tree-chevron-hover)}.calcite-tree-node:hover .calcite-tree-indicator,:host(:focus) .calcite-tree-node .calcite-tree-indicator,:host([selected]) .calcite-tree-node:hover .calcite-tree-indicator{fill:var(--calcite-tree-indicator-hover)}.calcite-tree-chevron,.calcite-tree-indicator{-ms-flex:0 0 1rem;flex:0 0 1rem;width:1rem;height:1rem;margin-right:var(--calcite-tree-icon-padding-start);margin-left:var(--calcite-tree-icon-padding-end);margin-top:.125rem}.calcite-tree-chevron{-webkit-transition:-webkit-transform .15s cubic-bezier(.215,.44,.42,.88);transition:-webkit-transform .15s cubic-bezier(.215,.44,.42,.88);transition:transform .15s cubic-bezier(.215,.44,.42,.88);transition:transform .15s cubic-bezier(.215,.44,.42,.88),-webkit-transform .15s cubic-bezier(.215,.44,.42,.88);-webkit-transform:rotate(0deg);transform:rotate(0deg);fill:var(--calcite-tree-chevron)}:host([dir=rtl]) .calcite-tree-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host([expanded]) .calcite-tree-chevron{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.calcite-tree-indicator{-webkit-transition:opacity .15s cubic-bezier(.215,.44,.42,.88);transition:opacity .15s cubic-bezier(.215,.44,.42,.88);opacity:0;fill:transparent}:host([children]) .calcite-tree-indicator{opacity:0}"; }
};

exports.calcite_tree = CalciteTree;
exports.calcite_tree_item = CalciteTreeItem;
