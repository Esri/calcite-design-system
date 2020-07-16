import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { n as nodeListToArray, c as getSlottedElements, g as getElementDir } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';
var TreeSelectionMode;
(function (TreeSelectionMode) {
    TreeSelectionMode["Single"] = "single";
    TreeSelectionMode["Multi"] = "multi";
    TreeSelectionMode["Children"] = "children";
    TreeSelectionMode["MultiChildren"] = "multi-children";
})(TreeSelectionMode || (TreeSelectionMode = {}));
var calciteTreeCss = ":host([hidden]){display:none}:host{display:block;outline:none}";
var CalciteTree = /** @class */ (function () {
    function CalciteTree(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTreeSelect = createEvent(this, "calciteTreeSelect", 7);
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
    CalciteTree.prototype.componentWillUpdate = function () { };
    CalciteTree.prototype.componentWillRender = function () {
        var parent = this.el.parentElement.closest("calcite-tree");
        // this.theme = getElementTheme(this.el);
        this.lines = parent ? parent.lines : this.lines;
        this.scale = parent ? parent.scale : this.scale;
        this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
        this.root = parent ? false : true;
    };
    CalciteTree.prototype.render = function () {
        return (h(Host, { tabindex: this.root ? "1" : undefined, "aria-role": this.root ? "tree" : undefined, "aria-multiselectable": this.selectionMode === TreeSelectionMode.Multi ||
                this.selectionMode === TreeSelectionMode.MultiChildren }, h("slot", null)));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteTree.prototype.onFocus = function () {
        if (this.root) {
            var selectedNode = this.el.querySelector("calcite-tree-item[selected]");
            var firstNode = this.el.querySelector("calcite-tree-item");
            (selectedNode || firstNode).focus();
        }
    };
    CalciteTree.prototype.onClick = function (e) {
        var target = e.target;
        var childItems = nodeListToArray(target.querySelectorAll("calcite-tree-item"));
        var shouldSelect = this.selectionMode !== null &&
            (!target.hasChildren ||
                (target.hasChildren &&
                    (this.selectionMode === TreeSelectionMode.Children ||
                        this.selectionMode === TreeSelectionMode.MultiChildren)));
        var shouldModifyToCurrentSelection = e.detail.modifyCurrentSelection &&
            (this.selectionMode === TreeSelectionMode.Multi ||
                this.selectionMode === TreeSelectionMode.MultiChildren);
        var shouldSelectChildren = this.selectionMode === TreeSelectionMode.MultiChildren ||
            this.selectionMode === TreeSelectionMode.Children;
        var shouldClearCurrentSelection = !shouldModifyToCurrentSelection &&
            (((this.selectionMode === TreeSelectionMode.Single ||
                this.selectionMode === TreeSelectionMode.Multi) &&
                childItems.length <= 0) ||
                this.selectionMode === TreeSelectionMode.Children ||
                this.selectionMode === TreeSelectionMode.MultiChildren);
        var shouldExpandTarget = this.selectionMode === TreeSelectionMode.Children ||
            this.selectionMode === TreeSelectionMode.MultiChildren;
        if (this.root) {
            var targetItems_1 = [];
            if (shouldSelect) {
                targetItems_1.push(target);
            }
            if (shouldSelectChildren) {
                childItems.forEach(function (treeItem) {
                    targetItems_1.push(treeItem);
                });
            }
            if (shouldClearCurrentSelection) {
                var selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
                selectedItems.forEach(function (treeItem) {
                    if (!targetItems_1.includes(treeItem)) {
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
                targetItems_1.forEach(function (treeItem) {
                    treeItem.selected = false;
                });
            }
            else {
                targetItems_1.forEach(function (treeItem) {
                    treeItem.selected = true;
                });
            }
        }
        if (this.root) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.calciteTreeSelect.emit({
            selected: nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter(function (i) { return i.selected; }),
        });
    };
    Object.defineProperty(CalciteTree.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return CalciteTree;
}());
CalciteTree.style = calciteTreeCss;
var calciteTreeItemCss = "@charset \"UTF-8\";:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:block;color:var(--calcite-tree-text);cursor:pointer;outline:none;font-size:0.875rem;line-height:1.5;max-width:100%;--calcite-tree-text:var(--calcite-ui-text-2);--calcite-tree-text:var(--calcite-ui-text-1);--calcite-tree-text:var(--calcite-ui-text-1);--calcite-tree-chevron:var(--calcite-ui-border-1);--calcite-tree-chevron-hover:var(--calcite-ui-text-3);--calcite-tree-vertical-padding:0.375rem;--calcite-tree-indicator:var(--calcite-ui-border-1);--calcite-tree-indicator-active:var(--calcite-ui-blue-1);--calcite-tree-indicator-first-start:0.1rem;--calcite-tree-indicator-first-end:auto;--calcite-tree-indicator-distance-start:0.15rem;--calcite-tree-indicator-distance-end:auto;--calcite-tree-icon-edge-distance-start:-0.2rem;--calcite-tree-icon-edge-distance-end:0;--calcite-tree-icon-content-distance-start:0.375rem;--calcite-tree-icon-content-distance-end:0;--calcite-tree-indent-start:1.4rem;--calcite-tree-indent-end:0;--calcite-tree-children-indent-start:0.25rem;--calcite-tree-children-indent-end:0;--calcite-tree-children-padding-start:1rem;--calcite-tree-children-padding-end:0;--calcite-tree-line-position-start:0.05rem;--calcite-tree-line-position-end:0;--calcite-tree-parent-line-position-start:-0.95rem;--calcite-tree-parent-line-position-end:0;--calcite-tree-line-width:1px;--calcite-tree-hover-line-width:3px}:host([lines]){--calcite-tree-line:var(--calcite-ui-border-3);--calcite-tree-line-hover:var(--calcite-ui-border-1)}:host([scale=s]){--calcite-tree-hover-line-width:2px;--calcite-tree-vertical-padding:0.1875rem;--calcite-tree-children-indent-start:0rem;--calcite-tree-children-padding-start:0.8rem;--calcite-tree-line-position-start:0.3rem;--calcite-tree-parent-line-position-start:-0.5rem}:host([dir=rtl]){--calcite-tree-indicator-first-start:0;--calcite-tree-indicator-first-end:0.1rem;--calcite-tree-indicator-distance-start:auto;--calcite-tree-indicator-distance-end:0.15rem;--calcite-tree-icon-edge-distance-start:auto;--calcite-tree-icon-edge-distance-end:-0.2rem;--calcite-tree-icon-content-distance-start:0;--calcite-tree-icon-content-distance-end:0.375rem;--calcite-tree-indent-start:0;--calcite-tree-indent-end:1.4rem;--calcite-tree-children-indent-start:0;--calcite-tree-children-indent-end:0.25rem;--calcite-tree-children-padding-start:0;--calcite-tree-children-padding-end:1rem;--calcite-tree-line-position-start:0;--calcite-tree-line-position-end:0.05rem;--calcite-tree-parent-line-position-start:0;--calcite-tree-parent-line-position-end:-0.95rem}:host([dir=rtl][scale=s]){--calcite-tree-children-indent-end:0rem;--calcite-tree-children-padding-end:0.8rem;--calcite-tree-line-position-end:0.3rem;--calcite-tree-parent-line-position-end:-0.5rem}::slotted(*){color:inherit;font-size:0.875rem;line-height:1.5;text-decoration:none !important;word-wrap:break-word;overflow-wrap:break-word;min-width:0;max-width:100%}::slotted(*):hover{text-decoration:none !important}::slotted(a){width:100%;text-decoration:none}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.calcite-tree-children{z-index:1;margin-left:var(--calcite-tree-children-indent-start);margin-right:var(--calcite-tree-children-indent-end);padding-left:var(--calcite-tree-children-padding-start);padding-right:var(--calcite-tree-children-padding-end);position:relative;-webkit-transform:scaleY(0);transform:scaleY(0);opacity:0;overflow:hidden;-webkit-transition:0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;transition:0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;height:0;-webkit-transform-origin:top;transform-origin:top}.calcite-tree-children:after{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;content:\"\";height:100%;width:var(--calcite-tree-line-width);background:var(--calcite-tree-line);left:var(--calcite-tree-line-position-start);right:var(--calcite-tree-line-position-end);top:0;position:absolute}:host([expanded])>.calcite-tree-children{-webkit-transform:scaleY(1);transform:scaleY(1);opacity:1;height:auto}:host([has-children]) .calcite-tree-children:hover:after,:host([has-children]) .calcite-tree-children:focus:after{background:var(--calcite-tree-line-hover)}.calcite-tree-node{display:-ms-flexbox;display:flex;padding:var(--calcite-tree-vertical-padding) 0;padding-left:var(--calcite-tree-indent-start);padding-right:var(--calcite-tree-indent-end);position:relative}.calcite-tree-node:before{content:\"•\";position:absolute;left:var(--calcite-tree-indicator-distance-start);right:var(--calcite-tree-indicator-distance-end);opacity:0;color:var(--calcite-tree-indicator);-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}.calcite-tree-node:after{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;content:\"\";height:100%;width:var(--calcite-tree-line-width);background:var(--calcite-tree-line);left:var(--calcite-tree-parent-line-position-start);right:var(--calcite-tree-parent-line-position-end);top:0;position:absolute}:host([depth=\"1\"])>.calcite-tree-node:after{display:none}:host([has-children])>.calcite-tree-node{padding-left:0;padding-right:0}:host([has-children])>.calcite-tree-node:before{display:none}:host([depth=\"1\"])>.calcite-tree-node:before,:host([depth=\"1\"])>.calcite-tree-children:before{left:var(--calcite-tree-indicator-first-start);right:var(--calcite-tree-indicator-first-end)}.calcite-tree-node:hover:before,:host([selected]) .calcite-tree-node:hover:before,:host(:focus) .calcite-tree-node:before{opacity:1}.calcite-tree-node:hover:after,:host([selected]) .calcite-tree-node:hover:after,:host(:focus) .calcite-tree-node:after{width:var(--calcite-tree-hover-line-width);background:var(--calcite-tree-line-hover);z-index:2}.calcite-tree-node:hover ::slotted(*),:host([selected]) .calcite-tree-node:hover ::slotted(*),:host(:focus) .calcite-tree-node ::slotted(*){color:var(--calcite-tree-text-hover)}.calcite-tree-node:hover .calcite-tree-chevron,:host([selected]) .calcite-tree-node:hover .calcite-tree-chevron,:host(:focus) .calcite-tree-node .calcite-tree-chevron{fill:var(--calcite-tree-chevron-hover)}.calcite-tree-node:hover .calcite-tree-indicator,:host([selected]) .calcite-tree-node:hover .calcite-tree-indicator,:host(:focus) .calcite-tree-node .calcite-tree-indicator{fill:var(--calcite-tree-indicator-hover)}:host([selected])>.calcite-tree-node,:host([selected])>.calcite-tree-node:hover{color:var(--calcite-tree-text-active);font-weight:500}:host([selected])>.calcite-tree-node:before,:host([selected])>.calcite-tree-node:hover:before{opacity:1;color:var(--calcite-tree-indicator-active)}:host([selected])>.calcite-tree-node:after,:host([selected])>.calcite-tree-node:hover:after{background:var(--calcite-ui-blue-1);width:var(--calcite-tree-hover-line-width);z-index:2}:host([selected])>.calcite-tree-node ::slotted(*),:host([selected])>.calcite-tree-node:hover ::slotted(*){color:var(--calcite-tree-text-active)}:host([has-children][expanded])>.calcite-tree-node{color:var(--calcite-tree-text-active);font-weight:500}:host([has-children][expanded])>.calcite-tree-node:after{background:var(--calcite-ui-blue-1)}:host([has-children][expanded])>.calcite-tree-node:before{opacity:1;color:var(--calcite-tree-indicator-active)}:host([has-children][expanded])>.calcite-tree-node ::slotted(*){color:var(--calcite-tree-text-active)}:host([has-children][expanded][selected])>.calcite-tree-node:after{background:var(--calcite-ui-blue-1);width:var(--calcite-tree-hover-line-width);z-index:2}.calcite-tree-chevron{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;-ms-flex:0 0 auto;flex:0 0 auto;position:relative;-ms-flex-item-align:center;align-self:center;left:var(--calcite-tree-icon-edge-distance-start);right:var(--calcite-tree-icon-edge-distance-end);margin-right:var(--calcite-tree-icon-content-distance-start);margin-left:var(--calcite-tree-icon-content-distance-end);-webkit-transform:rotate(0deg);transform:rotate(0deg);fill:var(--calcite-tree-chevron)}:host([dir=rtl]) .calcite-tree-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host(:hover) .calcite-tree-chevron,:host(:focus) .calcite-tree-chevron{fill:var(--calcite-tree-chevron-hover);stroke:var(--calcite-tree-chevron-hover);stroke-width:0.75}:host([expanded])>.calcite-tree-node>.calcite-tree-chevron{-webkit-transform:rotate(90deg);transform:rotate(90deg);fill:var(--calcite-ui-blue-1);stroke-width:0.75;stroke:var(--calcite-ui-blue-1)}";
var CalciteTreeItem = /** @class */ (function () {
    function CalciteTreeItem(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.calciteTreeItemSelect = createEvent(this, "calciteTreeItemSelect", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Is the item currently selected */
        this.selected = false;
        /** True if the item is in an expanded state */
        this.expanded = false;
        this.iconClickHandler = function (event) {
            event.stopPropagation();
            _this.expanded = !_this.expanded;
            _this.calciteTreeItemSelect.emit({
                modifyCurrentSelection: event.shiftKey,
                forceToggle: true,
            });
        };
        this.childrenClickHandler = function (event) { return event.stopPropagation(); };
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
    CalciteTreeItem.prototype.expandedHandler = function (newValue) {
        if (this.childrenSlotWrapper) {
            var childTree = getSlottedElements(this.childrenSlotWrapper, "calcite-tree")[0];
            if (childTree) {
                var items = getSlottedElements(childTree, "calcite-tree-item");
                items.forEach(function (item) { return (item.parentExpanded = newValue); });
            }
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteTreeItem.prototype.componentWillRender = function () {
        this.hasChildren = !!this.el.querySelector("calcite-tree");
        var parentTree = this.el.closest("calcite-tree");
        this.selectionMode = parentTree.selectionMode;
        this.depth = 0;
        this.scale = (parentTree && parentTree.scale) || "m";
        this.lines = parentTree && parentTree.lines;
        this.el.dir = getElementDir(this.el);
        var nextParentTree;
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
    };
    CalciteTreeItem.prototype.render = function () {
        var _this = this;
        var icon = this.hasChildren ? (h("calcite-icon", { class: "calcite-tree-chevron", icon: "chevron-right", scale: "s", onClick: this.iconClickHandler, "data-test-id": "icon" })) : null;
        return (h(Host, { tabindex: this.parentExpanded || this.depth === 1 ? "0" : "-1", "aria-role": "treeitem", "aria-hidden": this.parentExpanded || this.depth === 1 ? undefined : "true", "aria-selected": this.selected
                ? "true"
                : this.selectionMode === TreeSelectionMode.Multi ||
                    this.selectionMode === TreeSelectionMode.MultiChildren
                    ? "false"
                    : undefined, "aria-expanded": this.hasChildren ? this.expanded.toString() : undefined }, h("div", { class: "calcite-tree-node", ref: function (el) { return (_this.defaultSlotWrapper = el); } }, icon, h("slot", null)), h("div", { class: "calcite-tree-children", "data-test-id": "calcite-tree-children", role: this.hasChildren ? "group" : undefined, ref: function (el) { return (_this.childrenSlotWrapper = el); }, onClick: this.childrenClickHandler }, h("slot", { name: "children" }))));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteTreeItem.prototype.onClick = function (e) {
        // Solve for if the item is clicked somewhere outside the slotted anchor.
        // Anchor is triggered anywhere you click
        var link = getSlottedElements(this.defaultSlotWrapper, "a")[0];
        if (link && e.composedPath()[0].tagName.toLowerCase() !== "a") {
            var target = link.target === "" ? "_self" : link.target;
            window.open(link.href, target);
        }
        this.expanded = !this.expanded;
        this.calciteTreeItemSelect.emit({
            modifyCurrentSelection: e.shiftKey,
            forceToggle: false,
        });
    };
    CalciteTreeItem.prototype.keyDownHandler = function (e) {
        var root;
        switch (getKey(e.key)) {
            case " ":
                this.selected = !this.selected;
                e.preventDefault();
                e.stopPropagation();
                break;
            case "Enter":
                // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
                var link = nodeListToArray(this.el.children).find(function (e) { return e.matches("a"); });
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
                var parentItem = this.el.parentElement.closest("calcite-tree-item");
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
                var previous = this.el
                    .previousElementSibling;
                if (previous && previous.matches("calcite-tree-item")) {
                    previous.focus();
                }
                break;
            case "ArrowDown":
                var next = this.el.nextElementSibling;
                if (next && next.matches("calcite-tree-item")) {
                    next.focus();
                }
                break;
            case "Home":
                root = this.el.closest("calcite-tree[root]");
                var firstNode = root.querySelector("calcite-tree-item");
                firstNode.focus();
                break;
            case "End":
                root = this.el.closest("calcite-tree[root]");
                var currentNode = root.children[root.children.length - 1]; // last child
                var currentTree = nodeListToArray(currentNode.children).find(function (e) { return e.matches("calcite-tree"); });
                while (currentTree) {
                    currentNode = currentTree.children[root.children.length - 1];
                    currentTree = nodeListToArray(currentNode.children).find(function (e) { return e.matches("calcite-tree"); });
                }
                currentNode.focus();
                break;
        }
    };
    Object.defineProperty(CalciteTreeItem.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalciteTreeItem, "watchers", {
        get: function () {
            return {
                "expanded": ["expandedHandler"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CalciteTreeItem;
}());
CalciteTreeItem.style = calciteTreeItemCss;
export { CalciteTree as calcite_tree, CalciteTreeItem as calcite_tree_item };
