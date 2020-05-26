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
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-d518aa55.js';
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
var calcitePaginationCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]){--calcite-pagination-spacing:4px 8px}:host([scale=s]) .previous,:host([scale=s]) .next,:host([scale=s]) .page{font-size:12px}:host([scale=m]){--calcite-pagination-spacing:8px 12px}:host([scale=m]) .previous,:host([scale=m]) .next,:host([scale=m]) .page{font-size:16px}:host([scale=l]){--calcite-pagination-spacing:12px 16px}:host([scale=l]) .previous,:host([scale=l]) .next,:host([scale=l]) .page{font-size:20px}:host{display:-ms-inline-flexbox;display:inline-flex;background-color:transparent;-webkit-writing-mode:horizontal-tb;-ms-writing-mode:lr-tb;writing-mode:horizontal-tb}:host button{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.previous,.next,.page{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;background-color:transparent;border:none;border-top:3px solid transparent;border-bottom:3px solid transparent;font-family:inherit;font-size:1rem;line-height:1.5;color:var(--calcite-ui-text-3);cursor:pointer}.previous:hover,.next:hover,.page:hover{color:var(--calcite-ui-text-1);-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}.page:hover{border-bottom-color:var(--calcite-ui-border-2)}.page.is-selected{font-weight:500;color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-blue-1)}.previous,.next{padding:var(--calcite-pagination-spacing)}.previous:hover,.next:hover{color:var(--calcite-ui-blue-1);background-color:var(--calcite-ui-foreground-2)}.previous:active,.next:active{background-color:var(--calcite-ui-foreground-3)}.previous.is-disabled,.next.is-disabled{background-color:transparent;pointer-events:none}.previous.is-disabled>calcite-icon,.next.is-disabled>calcite-icon{opacity:0.4}.next{margin-right:0}.page,.ellipsis{padding:var(--calcite-pagination-spacing)}.ellipsis{display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;color:var(--calcite-ui-text-3)}";
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
        /** number of items per page */
        this.num = 20;
        /** index of item that should begin the page */
        this.start = 1;
        /** total number of items */
        this.total = 0;
        /** title of the next button */
        this.textLabelNext = TEXT.nextLabel;
        /** title of the previous button */
        this.textLabelPrevious = TEXT.previousLabel;
        /** The scale of the pagination */
        this.scale = "m";
        this.previousClicked = function () {
            _this.previousPage().then();
            _this.emitUpdate();
        };
        this.nextClicked = function () {
            _this.nextPage();
            _this.emitUpdate();
        };
        this.calcitePaginationUpdate = createEvent(this, "calcitePaginationUpdate", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.connectedCallback = function () {
        // prop validations
        var scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    };
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Go to the next page of results */
    class_1.prototype.nextPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.start = Math.min(this.getLastStart(), this.start + this.num);
                return [2 /*return*/];
            });
        });
    };
    /** Go to the previous page of results */
    class_1.prototype.previousPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.start = Math.max(1, this.start - this.num);
                return [2 /*return*/];
            });
        });
    };
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.getLastStart = function () {
        var _a = this, total = _a.total, num = _a.num;
        var lastStart = total % num === 0 ? total - num : Math.floor(total / num) * num;
        return lastStart + 1;
    };
    class_1.prototype.showLeftEllipsis = function () {
        return Math.floor(this.start / this.num) > 3;
    };
    class_1.prototype.showRightEllipsis = function () {
        return (this.total - this.start) / this.num > 3;
    };
    class_1.prototype.emitUpdate = function () {
        this.calcitePaginationUpdate.emit({
            start: this.start,
            total: this.total,
            num: this.num,
        });
    };
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    class_1.prototype.renderPages = function () {
        var _this = this;
        var lastStart = this.getLastStart();
        var end;
        var nextStart;
        // if we don't need ellipses render the whole set
        if (this.total / this.num <= maxPagesDisplayed) {
            nextStart = 1 + this.num;
            end = lastStart - this.num;
        }
        else {
            // if we're within max pages of page 1
            if (this.start / this.num < maxPagesDisplayed - 1) {
                nextStart = 1 + this.num;
                end = 1 + 4 * this.num;
            }
            else {
                // if we're within max pages of last page
                if (this.start + 3 * this.num >= this.total) {
                    nextStart = lastStart - 4 * this.num;
                    end = lastStart - this.num;
                }
                else {
                    nextStart = this.start - this.num;
                    end = this.start + this.num;
                }
            }
        }
        var pages = [];
        while (nextStart <= end) {
            pages.push(nextStart);
            nextStart = nextStart + this.num;
        }
        return pages.map(function (page) { return _this.renderPage(page); });
    };
    class_1.prototype.renderPage = function (start) {
        var _a;
        var _this = this;
        var page = Math.floor(start / this.num) + 1;
        return (h("button", { class: (_a = {},
                _a[CSS.page] = true,
                _a[CSS.selected] = start === this.start,
                _a), onClick: function () {
                _this.start = start;
                _this.emitUpdate();
            } }, page));
    };
    class_1.prototype.renderLeftEllipsis = function (iconScale) {
        if (this.total / this.num > maxPagesDisplayed && this.showLeftEllipsis()) {
            return (h("span", { class: CSS.ellipsis + " " + CSS.ellipsisStart }, h("calcite-icon", { scale: iconScale, icon: "ellipsis" })));
        }
    };
    class_1.prototype.renderRightEllipsis = function (iconScale) {
        if (this.total / this.num > maxPagesDisplayed && this.showRightEllipsis()) {
            return (h("span", { class: CSS.ellipsis + " " + CSS.ellipsisEnd }, h("calcite-icon", { scale: iconScale, icon: "ellipsis" })));
        }
    };
    class_1.prototype.render = function () {
        var _a, _b;
        var _c = this, total = _c.total, num = _c.num, start = _c.start;
        var iconScale = this.scale === "l" ? "m" : "s";
        return (h(Host, null, h("button", { class: (_a = {},
                _a[CSS.previous] = true,
                _a[CSS.disabled] = start < num,
                _a), "aria-label": this.textLabelPrevious, onClick: this.previousClicked, disabled: start < num }, h("calcite-icon", { scale: iconScale, icon: "chevronLeft" })), this.renderPage(1), this.renderLeftEllipsis(iconScale), this.renderPages(), this.renderRightEllipsis(iconScale), this.renderPage(this.getLastStart()), h("button", { class: (_b = {},
                _b[CSS.next] = true,
                _b[CSS.disabled] = start + num >= total,
                _b), "aria-label": this.textLabelNext, onClick: this.nextClicked, disabled: start + num >= total }, h("calcite-icon", { scale: iconScale, icon: "chevronRight" }))));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
CalcitePagination.style = calcitePaginationCss;
export { CalcitePagination as calcite_pagination };
