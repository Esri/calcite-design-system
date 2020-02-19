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
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-30c05663.js';
import { g as getElementDir } from './dom-0361c8d2.js';
var CSS = {
    page: "page",
    selected: "is-selected",
    previous: "previous",
    next: "next",
    disabled: "is-disabled",
    ellipsis: "ellipsis",
    ellipsisStart: "ellipsis--start",
    ellipsisEnd: "ellipsis--end"
};
var TEXT = {
    nextLabel: "next",
    previousLabel: "previous"
};
var maxPagesDisplayed = 5;
var CalcitePagination = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /** Change between foreground colors or background colors for container background */
        this.backgroundStyle = "foregroundColor";
        /** starting selected index */
        this.num = 1;
        /** starting number of the pagination */
        this.start = 1;
        /** title of the next button */
        this.textLabelNext = TEXT.nextLabel;
        /** title of the previous button */
        this.textLabelPrevious = TEXT.previousLabel;
        /** specify the theme of accordion, defaults to light */
        this.theme = "light";
        /** ending number of the pagination */
        this.total = 2;
        this.selectedIndex = this.num;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.previousClicked = function () {
            _this.previousPage();
        };
        this.nextClicked = function () {
            _this.nextPage();
        };
        this.calcitePaginationUpdate = createEvent(this, "calcitePaginationUpdate", 7);
    }
    class_1.prototype.numWatchHandler = function (newValue) {
        this.selectedIndex = newValue;
    };
    class_1.prototype.selectedIndexWatchHandler = function () {
        this.calcitePaginationUpdate.emit({
            start: this.start,
            total: this.total,
            num: this.selectedIndex
        });
    };
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** When called, selected page will increment by 1.
     */
    class_1.prototype.nextPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.selectedIndex = Math.min(this.total, this.selectedIndex + 1);
                return [2 /*return*/];
            });
        });
    };
    /** When called, selected page will decrement by 1.
     */
    class_1.prototype.previousPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.selectedIndex = Math.max(this.start, this.selectedIndex - 1);
                return [2 /*return*/];
            });
        });
    };
    /** Set selected page to a specific page number. Will not go below start or above total.
     */
    class_1.prototype.setPage = function (num) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.selectedIndex = Math.max(this.start, Math.min(this.total, num));
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.showLeftEllipsis = function () {
        return (this.selectedIndex - this.start) > 3;
    };
    class_1.prototype.showRightEllipsis = function () {
        return (this.total - this.selectedIndex) > 3;
    };
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    class_1.prototype.renderPages = function () {
        var _this = this;
        var pages = [];
        var currentNum;
        var end;
        if (this.total <= maxPagesDisplayed) {
            currentNum = this.start + 1;
            end = this.total - 1;
        }
        else {
            if (this.selectedIndex < maxPagesDisplayed) {
                currentNum = this.start + 1;
                end = this.start + 4;
            }
            else {
                if (this.selectedIndex + 3 >= this.total) {
                    currentNum = this.total - 4;
                    end = this.total - 1;
                }
                else {
                    currentNum = this.selectedIndex - 1;
                    end = this.selectedIndex + 1;
                }
            }
        }
        while (currentNum <= end) {
            pages.push(currentNum);
            currentNum++;
        }
        return pages.map(function (page) { return _this.renderPage(page); });
    };
    class_1.prototype.renderPage = function (num) {
        var _a;
        var _this = this;
        return (h("a", { class: (_a = {}, _a[CSS.page] = true, _a[CSS.selected] = (num === this.selectedIndex), _a), onClick: function () {
                _this.selectedIndex = num;
            } }, num));
    };
    class_1.prototype.renderLeftEllipsis = function () {
        if (this.total > maxPagesDisplayed && this.showLeftEllipsis()) {
            return (h("span", { class: CSS.ellipsis + " " + CSS.ellipsisStart }, h("calcite-icon", { scale: "s", icon: "ellipsis" })));
        }
    };
    class_1.prototype.renderRightEllipsis = function () {
        if (this.total > maxPagesDisplayed && this.showRightEllipsis()) {
            return (h("span", { class: CSS.ellipsis + " " + CSS.ellipsisEnd }, h("calcite-icon", { scale: "s", icon: "ellipsis" })));
        }
    };
    class_1.prototype.render = function () {
        var _a, _b;
        var dir = getElementDir(this.el);
        return (h(Host, { dir: dir, class: this.backgroundStyle }, h("a", { class: (_a = {}, _a[CSS.previous] = true, _a[CSS.disabled] = this.selectedIndex <= 1, _a), title: this.textLabelPrevious, onClick: this.previousClicked }, h("calcite-icon", { scale: "s", icon: "chevronLeft" })), this.renderPage(this.start), this.renderLeftEllipsis(), this.renderPages(), this.renderRightEllipsis(), this.renderPage(this.total), h("a", { class: (_b = {}, _b[CSS.next] = true, _b[CSS.disabled] = this.selectedIndex >= this.total, _b), title: this.textLabelNext, onClick: this.nextClicked }, h("calcite-icon", { scale: "s", icon: "chevronRight" }))));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "num": ["numWatchHandler"],
                "selectedIndex": ["selectedIndexWatchHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{display:-ms-inline-flexbox;display:inline-flex;background-color:var(--calcite-ui-foreground);-webkit-writing-mode:horizontal-tb;-ms-writing-mode:lr-tb;writing-mode:horizontal-tb}:host(.backgroundColor){background-color:var(--calcite-ui-background)}.next,.page,.previous{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;border-top:3px solid transparent;border-bottom:3px solid transparent;color:var(--calcite-ui-text-3);cursor:pointer}.next:hover,.page:hover,.previous:hover{color:var(--calcite-ui-text-1);-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.page:hover{border-bottom-color:var(--calcite-ui-border-2)}.page.is-selected{font-weight:500;color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-blue)}.next,.previous{padding:.75em 1em}.next:hover,.previous:hover{color:var(--calcite-ui-blue);background-color:var(--calcite-ui-foreground-hover)}.next:active,.previous:active{background-color:var(--calcite-ui-foreground-press)}.next.is-disabled,.previous.is-disabled{background-color:transparent}.next.is-disabled>svg,.previous.is-disabled>svg{opacity:.3}.next{margin-right:0}.ellipsis,.page{padding:.75em 1em}.ellipsis{display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;color:var(--calcite-ui-text-3)}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { CalcitePagination as calcite_pagination };
