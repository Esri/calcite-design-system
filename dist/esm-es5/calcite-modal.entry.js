var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-26bd2899.js';
import { h as hasSlottedContent, g as getElementDir, a as getElementTheme } from './dom-73b84262.js';
import { x as x24 } from './index-12295034.js';
/**
 * Traverses the slots of the open shadowroots and returns all children matching the query.
 * @param {ShadowRoot | HTMLElement} root
 * @param skipNode
 * @param isMatch
 * @param {number} maxDepth
 * @param {number} depth
 * @returns {HTMLElement[]}
 */
function queryShadowRoot(root, skipNode, isMatch, maxDepth, depth) {
    if (maxDepth === void 0) { maxDepth = 20; }
    if (depth === void 0) { depth = 0; }
    var matches = [];
    // If the depth is above the max depth, abort the searching here.
    if (depth >= maxDepth) {
        return matches;
    }
    // Traverses a slot element
    var traverseSlot = function ($slot) {
        // Only check nodes that are of the type Node.ELEMENT_NODE
        // Read more here https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        var assignedNodes = $slot.assignedNodes().filter(function (node) { return node.nodeType === 1; });
        if (assignedNodes.length > 0) {
            return queryShadowRoot(assignedNodes[0].parentElement, skipNode, isMatch, maxDepth, depth + 1);
        }
        return [];
    };
    // Go through each child and continue the traversing if necessary
    // Even though the typing says that children can't be undefined, Edge 15 sometimes gives an undefined value.
    // Therefore we fallback to an empty array if it is undefined.
    var children = Array.from(root.children || []);
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var $child = children_1[_i];
        // Check if the node and its descendants should be skipped
        if (skipNode($child)) {
            continue;
        }
        // If the child matches we always add it
        if (isMatch($child)) {
            matches.push($child);
        }
        if ($child.shadowRoot != null) {
            matches.push.apply(matches, queryShadowRoot($child.shadowRoot, skipNode, isMatch, maxDepth, depth + 1));
        }
        else if ($child.tagName === "SLOT") {
            matches.push.apply(matches, traverseSlot($child));
        }
        else {
            matches.push.apply(matches, queryShadowRoot($child, skipNode, isMatch, maxDepth, depth + 1));
        }
    }
    return matches;
}
/**
 * Returns whether the element is hidden.
 * @param $elem
 */
function isHidden($elem) {
    return $elem.hasAttribute("hidden")
        || ($elem.hasAttribute("aria-hidden") && $elem.getAttribute("aria-hidden") !== "false")
        // A quick and dirty way to check whether the element is hidden.
        // For a more fine-grained check we could use "window.getComputedStyle" but we don't because of bad performance.
        // If the element has visibility set to "hidden" or "collapse", display set to "none" or opacity set to "0" through CSS
        // we won't be able to catch it here. We accept it due to the huge performance benefits.
        || $elem.style.display === "none"
        || $elem.style.opacity === "0"
        || $elem.style.visibility === "hidden"
        || $elem.style.visibility === "collapse";
}
/**
 * Returns whether the element is disabled.
 * @param $elem
 */
function isDisabled($elem) {
    return $elem.hasAttribute("disabled")
        || ($elem.hasAttribute("aria-disabled") && $elem.getAttribute("aria-disabled") !== "false");
}
/**
 * Determines whether an element is focusable.
 * Read more here: https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus/1600194#1600194
 * Or here: https://stackoverflow.com/questions/18261595/how-to-check-if-a-dom-element-is-focusable
 * @param $elem
 */
function isFocusable($elem) {
    // Discard elements that are removed from the tab order.
    if ($elem.getAttribute("tabindex") === "-1" || isHidden($elem) || isDisabled($elem)) {
        return false;
    }
    return (
    // At this point we know that the element can have focus (eg. won't be -1) if the tabindex attribute exists
    $elem.hasAttribute("tabindex")
        // Anchor tags or area tags with a href set
        || ($elem instanceof HTMLAnchorElement || $elem instanceof HTMLAreaElement) && $elem.hasAttribute("href")
        // Form elements which are not disabled
        || ($elem instanceof HTMLButtonElement
            || $elem instanceof HTMLInputElement
            || $elem instanceof HTMLTextAreaElement
            || $elem instanceof HTMLSelectElement)
        // IFrames
        || $elem instanceof HTMLIFrameElement);
}
var timeouts = new Map();
/**
 * Debounces a callback.
 * @param cb
 * @param ms
 * @param id
 */
function debounce(cb, ms, id) {
    // Clear current timeout for id
    var timeout = timeouts.get(id);
    if (timeout != null) {
        window.clearTimeout(timeout);
    }
    // Set new timeout
    timeouts.set(id, window.setTimeout(function () {
        cb();
        timeouts.delete(id);
    }, ms));
}
/**
 * Template for the focus trap.
 */
var template = document.createElement("template");
template.innerHTML = "\n\t<div id=\"start\"></div>\n\t<slot></slot>\n\t<div id=\"backup\"></div>\n\t<div id=\"end\"></div>\n";
/**
 * Focus trap web component.
 * @slot - Default content.
 */
var FocusTrap = /** @class */ (function (_super) {
    __extends(FocusTrap, _super);
    /**
     * Attaches the shadow root.
     */
    function FocusTrap() {
        var _this = _super.call(this) || this;
        // The debounce id is used to distinguish this focus trap from others when debouncing
        _this.debounceId = Math.random().toString();
        _this._focused = false;
        var shadow = _this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));
        _this.focusLastElement = _this.focusLastElement.bind(_this);
        _this.focusFirstElement = _this.focusFirstElement.bind(_this);
        _this.onFocusIn = _this.onFocusIn.bind(_this);
        _this.onFocusOut = _this.onFocusOut.bind(_this);
        return _this;
    }
    Object.defineProperty(FocusTrap, "observedAttributes", {
        // Whenever one of these attributes changes we need to render the template again.
        get: function () {
            return ["inactive"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTrap.prototype, "inactive", {
        /**
         * Determines whether the focus trap is active or not.
         * @attr
         */
        get: function () {
            return this.hasAttribute("inactive");
        },
        set: function (value) {
            value
                ? this.setAttribute("inactive", "")
                : this.removeAttribute("inactive");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTrap.prototype, "focused", {
        /**
         * Returns whether the element currently has focus.
         */
        get: function () {
            return this._focused;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Hooks up the element.
     */
    FocusTrap.prototype.connectedCallback = function () {
        this.$backup = this.shadowRoot.querySelector("#backup");
        this.$start = this.shadowRoot.querySelector("#start");
        this.$end = this.shadowRoot.querySelector("#end");
        this.$start.addEventListener("focus", this.focusLastElement);
        this.$end.addEventListener("focus", this.focusFirstElement);
        // Focus out is called every time the user tabs around inside the element
        this.addEventListener("focusin", this.onFocusIn);
        this.addEventListener("focusout", this.onFocusOut);
        this.render();
    };
    /**
     * Tears down the element.
     */
    FocusTrap.prototype.disconnectedCallback = function () {
        this.$start.removeEventListener("focus", this.focusLastElement);
        this.$end.removeEventListener("focus", this.focusFirstElement);
        this.removeEventListener("focusin", this.onFocusIn);
        this.removeEventListener("focusout", this.onFocusOut);
    };
    /**
     * When the attributes changes we need to re-render the template.
     */
    FocusTrap.prototype.attributeChangedCallback = function () {
        this.render();
    };
    /**
     * Focuses the first focusable element in the focus trap.
     */
    FocusTrap.prototype.focusFirstElement = function () {
        this.trapFocus();
    };
    /**
     * Focuses the last focusable element in the focus trap.
     */
    FocusTrap.prototype.focusLastElement = function () {
        this.trapFocus(true);
    };
    /**
     * Returns a list of the focusable children found within the element.
     */
    FocusTrap.prototype.getFocusableElements = function () {
        return queryShadowRoot(this, isHidden, isFocusable);
    };
    /**
     * Focuses on either the last or first focusable element.
     * @param {boolean} trapToEnd
     */
    FocusTrap.prototype.trapFocus = function (trapToEnd) {
        if (this.inactive)
            return;
        var focusableChildren = this.getFocusableElements();
        if (focusableChildren.length > 0) {
            if (trapToEnd) {
                focusableChildren[focusableChildren.length - 1].focus();
            }
            else {
                focusableChildren[0].focus();
            }
            this.$backup.setAttribute("tabindex", "-1");
        }
        else {
            // If there are no focusable children we need to focus on the backup
            // to trap the focus. This is a useful behavior if the focus trap is
            // for example used in a dialog and we don't want the user to tab
            // outside the dialog even though there are no focusable children
            // in the dialog.
            this.$backup.setAttribute("tabindex", "0");
            this.$backup.focus();
        }
    };
    /**
     * When the element gains focus this function is called.
     */
    FocusTrap.prototype.onFocusIn = function () {
        this.updateFocused(true);
    };
    /**
     * When the element looses its focus this function is called.
     */
    FocusTrap.prototype.onFocusOut = function () {
        this.updateFocused(false);
    };
    /**
     * Updates the focused property and updates the view.
     * The update is debounced because the focusin and focusout out
     * might fire multiple times in a row. We only want to render
     * the element once, therefore waiting until the focus is "stable".
     * @param value
     */
    FocusTrap.prototype.updateFocused = function (value) {
        var _this = this;
        debounce(function () {
            if (_this.focused !== value) {
                _this._focused = value;
                _this.render();
            }
        }, 0, this.debounceId);
    };
    /**
     * Updates the template.
     */
    FocusTrap.prototype.render = function () {
        if (!this.isConnected)
            return;
        this.$start.setAttribute("tabindex", !this.focused || this.inactive ? "-1" : "0");
        this.$end.setAttribute("tabindex", !this.focused || this.inactive ? "-1" : "0");
        this.focused
            ? this.setAttribute("focused", "")
            : this.removeAttribute("focused");
    };
    return FocusTrap;
}(HTMLElement));
if (window && window.customElements) {
    window.customElements.define("focus-trap", FocusTrap);
}
var CalciteModal = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Optionally pass a function to run before close */
        this.beforeClose = function () { return Promise.resolve(); };
        /** Aria label for the close button */
        this.closeLabel = "Close";
        /** Set the overall size of the modal */
        this.size = "small";
        /** Select theme (light or dark) */
        this.theme = "light";
        this.hideBackButton = true;
        this.hideSecondaryButton = true;
        this.calciteModalOpen = createEvent(this, "calciteModalOpen", 7);
        this.calciteModalClose = createEvent(this, "calciteModalClose", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.componentDidLoad = function () {
        var _this = this;
        {
            var back_1 = this.el.shadowRoot.querySelector("slot[name=back]");
            var secondary_1 = this.el.shadowRoot.querySelector("slot[name=secondary]");
            back_1.addEventListener("slotchange", function () {
                _this.hideBackButton = !hasSlottedContent(back_1);
            });
            secondary_1.addEventListener("slotchange", function () {
                _this.hideSecondaryButton = !hasSlottedContent(secondary_1);
            });
        }
    };
    class_1.prototype.render = function () {
        var _this = this;
        var dir = getElementDir(this.el);
        var theme = getElementTheme(this.el);
        return (h(Host, { role: "dialog", "aria-modal": "true", class: { "is-active": this.isActive }, dir: dir, theme: theme }, h("div", { class: "modal" }, h("focus-trap", { ref: function (el) { return (_this.trap = el); } }, h("div", { class: "modal__header" }, h("button", { class: "modal__close", "aria-label": this.closeLabel, onClick: function () { return _this.close(); } }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 24 24", fill: "currentColor" }, h("path", { d: x24 }))), h("header", { class: "modal__title" }, h("slot", { name: "header" }))), h("div", { class: "modal__content" }, h("slot", { name: "content" })), h("div", { class: {
                modal__footer: true,
                "modal__footer--hide-back": this.hideBackButton,
                "modal__footer--hide-secondary": this.hideSecondaryButton
            } }, h("slot", { name: "back" }), h("slot", { name: "secondary" }), h("slot", { name: "primary" }))))));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    class_1.prototype.handleEscape = function (e) {
        if (e.key === "Escape" && !this.disableEscape) {
            this.close();
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Open the modal */
    class_1.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.previousActiveElement = document.activeElement;
                this.isActive = true;
                // wait for the modal to open, then handle focus.
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            if (_this.firstFocus) {
                                _this.firstFocus.focus();
                            }
                            else {
                                _this.trap.focusFirstElement();
                            }
                            resolve(_this.el);
                        }, 300);
                        document.documentElement.classList.add("overflow-hidden");
                        _this.calciteModalOpen.emit();
                    })];
            });
        });
    };
    /** Close the modal, first running the `beforeClose` method */
    class_1.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.beforeClose(this.el).then(function () {
                        _this.isActive = false;
                        _this.previousActiveElement.focus();
                        document.documentElement.classList.remove("overflow-hidden");
                        _this.calciteModalClose.emit();
                        return new Promise(function (resolve) {
                            setTimeout(function () { return resolve(_this.el); }, 300);
                        });
                    })];
            });
        });
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-modal-background:#fff;--calcite-modal-hover:#f3f3f3;--calcite-modal-pressed:#eaeaea;--calcite-modal-header-text:#151515;--calcite-modal-body-text:#151515;--calcite-modal-scrim:rgba(0,0,0,0.75);--calcite-modal-border:#f3f3f3;--calcite-modal-red:#d83020;--calcite-modal-blue:#007ac2;position:fixed;top:0;right:0;bottom:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;overflow-y:hidden;color:var(--calcite-modal-body-text);opacity:0;visibility:hidden!important;background:var(--calcite-modal-scrim);-webkit-transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88);transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88);z-index:101}:host([theme=dark]){--calcite-modal-background:#353535;--calcite-modal-hover:#2b2b2b;--calcite-modal-pressed:#202020;--calcite-modal-header-text:#fff;--calcite-modal-body-text:#f3f3f3;--calcite-modal-border:#2b2b2b;--calcite-modal-red:#ff0015;--calcite-modal-blue:#3db8ff}.modal{-webkit-box-sizing:border-box;box-sizing:border-box;z-index:102;float:none;text-align:left;-webkit-overflow-scrolling:touch;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:row-wrap;flex-wrap:row-wrap;opacity:0;visibility:hidden;-webkit-transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15);margin:1.5rem;width:100%}:host(.is-active){visibility:visible!important;opacity:1;-webkit-transition-delay:0ms;transition-delay:0ms}:host(.is-active) .modal{visibility:visible;opacity:1;-webkit-transition-delay:0ms;transition-delay:0ms;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88)}:host([dir=rtl]) .modal{text-align:right}:host([theme=dark]) .modal{border:1px solid #202020}focus-trap{-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-direction:column;flex-direction:column}.modal__header,focus-trap{display:-ms-flexbox;display:flex}.modal__header{background-color:var(--calcite-modal-background);-ms-flex:0;flex:0;max-width:100%;min-width:0;z-index:2;border-bottom:1px solid var(--calcite-modal-border)}.modal__close{padding:1.125rem;margin:0;-ms-flex-order:2;order:2;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;color:var(--calcite-modal-body-text);outline:none;cursor:pointer}.modal__close svg{pointer-events:none}.modal__close:focus,.modal__close:hover{background-color:var(--calcite-modal-hover)}.modal__close:active{background-color:var(--calcite-modal-pressed)}.modal__title{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:.75rem 1.5rem;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-order:1;order:1;min-width:0}slot[name=header]::slotted(*){margin:0;font-weight:400;font-size:1.414rem;line-height:1.5;color:var(--calcite-modal-header-text)}\@media screen and (max-width:859px){slot[name=header]::slotted(*){font-size:1.33rem}}\@media screen and (max-width:479px){slot[name=header]::slotted(*){font-size:1.25rem}}.modal__content{position:relative;padding:1.5rem;height:100%;overflow:auto;max-height:calc(100vh - 14rem);overflow-y:auto;display:block;background-color:var(--calcite-modal-background);z-index:1}slot[name=content]::slotted(*){font-size:1rem;line-height:1.5}.modal__footer{background-color:var(--calcite-modal-background);-ms-flex:0;flex:0;display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;padding:1.2rem 1.125rem;border-top:1px solid var(--calcite-modal-border);z-index:2}.modal__footer--hide-back slot[name=back],.modal__footer--hide-secondary slot[name=secondary]{display:none}slot[name=back]{display:block;margin-right:auto}:host([dir=rtl]) slot[name=back]{margin-left:auto;margin-right:unset}slot[name=secondary]{display:block;margin:0 .375rem}slot[name=primary]{display:block}:host([size=small]) .modal{width:auto;max-width:32rem}\@media screen and (max-width:35rem){:host([size=small]) .modal{height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0}:host([size=small]) .modal__content{-ms-flex:1 1 0px;flex:1 1 0;max-height:unset}:host([size=small][docked]){-ms-flex-align:end;align-items:flex-end}}:host([size=medium]) .modal{max-width:64rem}\@media screen and (max-width:67rem){:host([size=medium]) .modal{height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0}:host([size=medium]) .modal__content{-ms-flex:1 1 0px;flex:1 1 0;max-height:unset}:host([size=medium][docked]){-ms-flex-align:end;align-items:flex-end}}:host([size=large]) .modal{max-width:94rem}\@media screen and (max-width:97rem){:host([size=large]) .modal{height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0}:host([size=large]) .modal__content{-ms-flex:1 1 0px;flex:1 1 0;max-height:unset}:host([size=large][docked]){-ms-flex-align:end;align-items:flex-end}}:host([size=fullscreen]){background-color:transparent}:host([size=fullscreen]) .modal{-webkit-transform:translate3D(0,20px,0) scale(.95);transform:translate3D(0,20px,0) scale(.95);height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0}:host([size=fullscreen]) .modal__content{-ms-flex:1 1 auto;flex:1 1 auto}:host(.is-active[size=fullscreen]) .modal{-webkit-transform:translateZ(0) scale(1);transform:translateZ(0) scale(1)}:host([docked]) .modal{height:auto!important}:host([docked]) .modal__content{height:auto}:host([color=red]) .modal{border-top:4px solid var(--calcite-modal-red);border-radius:2px 2px 0 0}:host([color=blue]) .modal{border-top:4px solid var(--calcite-modal-blue);border-radius:2px 2px 0 0}\@media screen and (max-width:860px){slot[name=header]::slotted(*){font-size:1.2019rem;line-height:1.5}}\@media screen and (max-width:860px) and (max-width:859px){slot[name=header]::slotted(*){font-size:1.1305rem}}\@media screen and (max-width:860px) and (max-width:479px){slot[name=header]::slotted(*){font-size:1.0625rem}}\@media screen and (max-width:860px){.modal__title{padding:.375rem 1.0125rem}}\@media screen and (max-width:860px){.modal__close,.modal__content{padding:1.0125rem}}\@media screen and (max-width:860px){.modal__footer{position:-webkit-sticky;position:sticky;bottom:0}}\@media screen and (max-width:480px){.modal__footer{-ms-flex-direction:column;flex-direction:column}slot[name=back],slot[name=secondary]{margin:0 0 .375rem 0}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { CalciteModal as calcite_modal };
