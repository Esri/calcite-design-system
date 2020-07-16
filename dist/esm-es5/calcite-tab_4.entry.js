var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { n as nodeListToArray, c as getSlottedElements, g as getElementDir } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';
import { g as guid } from './guid-ef96c8c4.js';
var calciteTabCss = ":host([hidden]){display:none}:host([active]) section{display:block}:host{display:none;z-index:1}:host([active]){display:block}section{height:100%;width:100%;display:none}";
var CalciteTab = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTabRegister = createEvent(this, "calciteTabRegister", 7);
        this.calciteTabUnregister = createEvent(this, "calciteTabUnregister", 7);
        /**
         * Show this tab
         */
        this.active = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /**
         * @internal
         */
        this.guid = "calcite-tab-title-" + guid();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.render = function () {
        var id = this.el.id || this.guid;
        return (h(Host, { id: id, "aria-labeledby": this.labeledBy, "aria-expanded": this.active.toString(), role: "tabpanel" }, h("section", null, h("slot", null))));
    };
    class_1.prototype.componentDidLoad = function () {
        this.calciteTabRegister.emit();
    };
    class_1.prototype.componentDidUnload = function () {
        this.calciteTabUnregister.emit();
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    class_1.prototype.tabChangeHandler = function (event) {
        var _this = this;
        // to allow `<calcite-tabs>` to be nested we need to make sure this
        // `calciteTabChange` event was actually fired from a title that is a
        // child of the `<calcite-tabs>` that is the a parent of this tab.
        if (event.target.closest("calcite-tabs") !==
            this.el.closest("calcite-tabs")) {
            return;
        }
        if (this.tab) {
            this.active = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then(function (index) {
                _this.active = index === event.detail.tab;
            });
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Return the index of this tab within the tab array
     */
    class_1.prototype.getTabIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, Promise.resolve(Array.prototype.indexOf.call(nodeListToArray(this.el.parentElement.children).filter(function (e) { return e.matches("calcite-tab"); }), this.el))];
            });
        });
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     */
    class_1.prototype.updateAriaInfo = function (tabIds, titleIds) {
        if (tabIds === void 0) { tabIds = []; }
        if (titleIds === void 0) { titleIds = []; }
        this.labeledBy = titleIds[tabIds.indexOf(this.el.id)] || null;
        return Promise.resolve();
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
CalciteTab.style = calciteTabCss;
var calciteTabNavCss = ":host([hidden]){display:none}:host{z-index:2}.tab-nav{display:-ms-flexbox;display:flex;overflow:auto;-ms-flex-pack:start;justify-content:flex-start;-webkit-overflow-scrolling:touch;padding:4px;margin:-4px}:host([layout=center]) .tab-nav{-ms-flex-pack:center;justify-content:center}";
var CalciteTabNav = /** @class */ (function () {
    function CalciteTabNav(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTabChange = createEvent(this, "calciteTabChange", 7);
    }
    CalciteTabNav.prototype.selectedTabChanged = function () {
        if (localStorage &&
            this.storageId &&
            this.selectedTab !== undefined &&
            this.selectedTab !== null) {
            localStorage.setItem("calcite-tab-nav-" + this.storageId, JSON.stringify(this.selectedTab));
        }
        this.calciteTabChange.emit({
            tab: this.selectedTab,
        });
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteTabNav.prototype.componentWillLoad = function () {
        var storageKey = "calcite-tab-nav-" + this.storageId;
        if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
            this.selectedTab = JSON.parse(localStorage.getItem(storageKey));
            this.calciteTabChange.emit({
                tab: this.selectedTab,
            });
        }
    };
    CalciteTabNav.prototype.componentWillRender = function () {
        var _a;
        this.layout = (_a = this.el.closest("calcite-tabs")) === null || _a === void 0 ? void 0 : _a.layout;
    };
    CalciteTabNav.prototype.render = function () {
        var _this = this;
        return (h(Host, { role: "tablist" }, h("nav", { class: "tab-nav", ref: function (el) { return (_this.tabNavEl = el); } }, h("slot", null))));
    };
    CalciteTabNav.prototype.componentDidRender = function () {
        var _this = this;
        // if every tab title is active select the first tab.
        if (this.tabTitles.length &&
            this.tabTitles.every(function (title) { return !title.active; }) &&
            !this.selectedTab) {
            this.tabTitles[0].getTabIdentifier().then(function (tab) {
                _this.calciteTabChange.emit({
                    tab: tab,
                });
            });
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Events Listeners
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     */
    CalciteTabNav.prototype.focusPreviousTabHandler = function (e) {
        var currentIndex = this.getIndexOfTabTitle(e.target);
        var previousTab = this.tabTitles[currentIndex - 1] ||
            this.tabTitles[this.tabTitles.length - 1];
        previousTab.focus();
        e.stopPropagation();
        e.preventDefault();
    };
    /**
     * @internal
     */
    CalciteTabNav.prototype.focusNextTabHandler = function (e) {
        var currentIndex = this.getIndexOfTabTitle(e.target);
        var nextTab = this.tabTitles[currentIndex + 1] || this.tabTitles[0];
        nextTab.focus();
        e.stopPropagation();
        e.preventDefault();
    };
    /**
     * @internal
     */
    CalciteTabNav.prototype.activateTabHandler = function (e) {
        if (e.detail.tab) {
            this.selectedTab = e.detail.tab;
        }
        else {
            this.selectedTab = this.getIndexOfTabTitle(e.target);
        }
        e.stopPropagation();
        e.preventDefault();
    };
    /**
     * @internal
     */
    CalciteTabNav.prototype.globalTabChangeHandler = function (e) {
        if (this.syncId &&
            e.target !== this.el &&
            e.target.syncId === this.syncId &&
            this.selectedTab !== e.detail.tab) {
            this.selectedTab = e.detail.tab;
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    CalciteTabNav.prototype.getIndexOfTabTitle = function (el) {
        return this.tabTitles.indexOf(el);
    };
    Object.defineProperty(CalciteTabNav.prototype, "tabTitles", {
        get: function () {
            if (this.tabNavEl) {
                return getSlottedElements(this.tabNavEl, "calcite-tab-title");
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalciteTabNav.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalciteTabNav, "watchers", {
        get: function () {
            return {
                "selectedTab": ["selectedTabChanged"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CalciteTabNav;
}());
CalciteTabNav.style = calciteTabNavCss;
var calciteTabTitleCss = ":host([hidden]){display:none}:host{-ms-flex:0 1 auto;flex:0 1 auto;outline:none;margin-right:1.25rem;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:1.25rem;margin-inline-end:1.25rem}:host-context([dir=rtl]){margin-right:0;margin-left:1.25rem}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([layout=center]){-ms-flex-preferred-size:200px;flex-basis:200px;text-align:center;margin:0 1.25rem}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host(:active) a,:host(:focus) a,:host(:hover) a{outline:none;text-decoration:none;color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-border-2)}:host([active]) a{color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-blue-1);font-weight:500}a{-webkit-box-sizing:border-box;box-sizing:border-box;font-size:0.875rem;line-height:1.5;padding:0.75rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:3px solid transparent;cursor:pointer;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;color:var(--calcite-ui-text-3);outline:none;width:100%;display:block}";
var CalciteTabTitle = /** @class */ (function () {
    function class_2(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTabsActivate = createEvent(this, "calciteTabsActivate", 7);
        this.calciteTabsFocusNext = createEvent(this, "calciteTabsFocusNext", 7);
        this.calciteTabsFocusPrevious = createEvent(this, "calciteTabsFocusPrevious", 7);
        this.calciteTabTitleRegister = createEvent(this, "calciteTabTitleRegister", 7);
        this.calciteTabTitleUnregister = createEvent(this, "calciteTabTitleUnregister", 7);
        /** Show this tab title as selected */
        this.active = false;
        /**
         * @internal
         */
        this.guid = "calcite-tab-title-" + guid();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_2.prototype.componentWillLoad = function () {
        if (this.tab && this.active) {
            this.calciteTabsActivate.emit({
                tab: this.tab,
            });
        }
    };
    class_2.prototype.componentWillRender = function () {
        var _a;
        this.layout = (_a = this.el.closest("calcite-tabs")) === null || _a === void 0 ? void 0 : _a.layout;
    };
    class_2.prototype.render = function () {
        var id = this.el.id || this.guid;
        return (h(Host, { id: id, "aria-controls": this.controls, "aria-expanded": this.active.toString(), role: "tab", tabindex: "0" }, h("a", null, h("slot", null))));
    };
    class_2.prototype.componentDidLoad = function () {
        this.calciteTabTitleRegister.emit();
    };
    class_2.prototype.componentDidUnload = function () {
        this.calciteTabTitleUnregister.emit();
    };
    //--------------------------------------------------------------------------
    //
    //  Events Listeners
    //
    //--------------------------------------------------------------------------
    class_2.prototype.tabChangeHandler = function (event) {
        var _this = this;
        if (this.tab) {
            this.active = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then(function (index) {
                _this.active = index === event.detail.tab;
            });
        }
    };
    class_2.prototype.onClick = function () {
        this.calciteTabsActivate.emit({
            tab: this.tab,
        });
    };
    class_2.prototype.keyDownHandler = function (e) {
        switch (getKey(e.key)) {
            case " ":
            case "Enter":
                this.calciteTabsActivate.emit({
                    tab: this.tab,
                });
                e.preventDefault();
                break;
            case "ArrowRight":
                if (getElementDir(this.el) === "ltr") {
                    this.calciteTabsFocusNext.emit();
                }
                else {
                    this.calciteTabsFocusPrevious.emit();
                }
                break;
            case "ArrowLeft":
                if (getElementDir(this.el) === "ltr") {
                    this.calciteTabsFocusPrevious.emit();
                }
                else {
                    this.calciteTabsFocusNext.emit();
                }
                break;
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Return the index of this title within the nav
     */
    class_2.prototype.getTabIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, Promise.resolve(Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-tab-title"), this.el))];
            });
        });
    };
    /**
     * @internal
     */
    class_2.prototype.getTabIdentifier = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.tab ? Promise.resolve(this.tab) : this.getTabIndex()];
            });
        });
    };
    /**
     * @internal
     */
    class_2.prototype.updateAriaInfo = function (tabIds, titleIds) {
        if (tabIds === void 0) { tabIds = []; }
        if (titleIds === void 0) { titleIds = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.controls = tabIds[titleIds.indexOf(this.el.id)] || null;
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    Object.defineProperty(class_2.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return class_2;
}());
CalciteTabTitle.style = calciteTabTitleCss;
var calciteTabsCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}section{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;overflow:hidden;border-top:1px solid var(--calcite-ui-border-1)}";
var CalciteTabs = /** @class */ (function () {
    function class_3(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Align tab titles to the edge or fully justify them across the tab nav ("center")
         */
        this.layout = "inline";
        //--------------------------------------------------------------------------
        //
        //  Events
        //
        //--------------------------------------------------------------------------
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /**
         * @internal
         *
         * Stores an array of ids of `<calcite-tab-titles>`s to match up ARIA
         * attributes.
         */
        this.titles = [];
        /**
         * @internal
         *
         * Stores an array of ids of `<calcite-tab>`s to match up ARIA attributes.
         */
        this.tabs = [];
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_3.prototype.render = function () {
        return (h(Host, null, h("slot", { name: "tab-nav" }), h("section", null, h("slot", null))));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     */
    class_3.prototype.calciteTabTitleRegister = function (e) {
        this.titles = __spreadArrays(this.titles, [e.target]);
        this.registryHandler();
        e.stopPropagation();
    };
    /**
     * @internal
     */
    class_3.prototype.calciteTabTitleUnregister = function (e) {
        this.titles = this.titles.filter(function (el) { return el !== e.target; });
        this.registryHandler();
        e.stopPropagation();
    };
    /**
     * @internal
     */
    class_3.prototype.calciteTabRegister = function (e) {
        this.tabs = __spreadArrays(this.tabs, [e.target]);
        this.registryHandler();
        e.stopPropagation();
    };
    /**
     * @internal
     */
    class_3.prototype.calciteTabUnregister = function (e) {
        this.tabs = this.tabs.filter(function (el) { return el !== e.target; });
        this.registryHandler();
        e.stopPropagation();
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     *
     * Matches up elements from the internal `tabs` and `titles` to automatically
     * update the ARIA attributes and link `<calcite-tab>` and
     * `<calcite-tab-title>` components.
     */
    class_3.prototype.registryHandler = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tabIds, titleIds, tabDomIndexes, titleDomIndexes;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.tabs.some(function (e) { return e.tab; }) || this.titles.some(function (e) { return e.tab; }))) return [3 /*break*/, 1];
                        // if we are using `tab` based identifiers sort by `tab` to account for
                        // possible out of order tabs and get the id of each tab
                        tabIds = this.tabs
                            .sort(function (a, b) { return a.tab.localeCompare(b.tab); })
                            .map(function (e) { return e.id; });
                        titleIds = this.titles
                            .sort(function (a, b) { return a.tab.localeCompare(b.tab); })
                            .map(function (e) { return e.id; });
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, Promise.all(this.tabs.map(function (el) { return el.getTabIndex(); }))];
                    case 2:
                        tabDomIndexes = _b.sent();
                        return [4 /*yield*/, Promise.all(this.titles.map(function (el) { return el.getTabIndex(); }))];
                    case 3:
                        titleDomIndexes = _b.sent();
                        // once we have the DOM order as a source of truth we can build the
                        // matching tabIds and titleIds arrays
                        tabIds = tabDomIndexes.reduce(function (ids, indexInDOM, registryIndex) {
                            ids[indexInDOM] = _this.tabs[registryIndex].id;
                            return ids;
                        }, []);
                        titleIds = titleDomIndexes.reduce(function (ids, indexInDOM, registryIndex) {
                            ids[indexInDOM] = _this.titles[registryIndex].id;
                            return ids;
                        }, []);
                        _b.label = 4;
                    case 4:
                        // pass all our new aria information to each `<calcite-tab>` and
                        // `<calcite-tab-title>` which will check if they can update their internal
                        // `controlled` or `labeledBy` states and re-render if necessary
                        this.tabs.forEach(function (el) { return el.updateAriaInfo(tabIds, titleIds); });
                        this.titles.forEach(function (el) { return el.updateAriaInfo(tabIds, titleIds); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(class_3.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return class_3;
}());
CalciteTabs.style = calciteTabsCss;
export { CalciteTab as calcite_tab, CalciteTabNav as calcite_tab_nav, CalciteTabTitle as calcite_tab_title, CalciteTabs as calcite_tabs };
