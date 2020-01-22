'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-7b8a2494.js');
const dom = require('./dom-7866810c.js');

const CSS = {
    page: "page",
    selected: "is-selected",
    previous: "previous",
    next: "next",
    disabled: "is-disabled",
    ellipsis: "ellipsis",
    ellipsisStart: "ellipsis--start",
    ellipsisEnd: "ellipsis--end"
};
const TEXT = {
    nextLabel: "next",
    previousLabel: "previous"
};

const maxPagesDisplayed = 5;
const CalcitePagination = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
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
        this.previousClicked = () => {
            this.previousPage();
        };
        this.nextClicked = () => {
            this.nextPage();
        };
        this.calcitePaginationUpdate = core.createEvent(this, "calcitePaginationUpdate", 7);
    }
    numWatchHandler(newValue) {
        this.selectedIndex = newValue;
    }
    selectedIndexWatchHandler() {
        this.calcitePaginationUpdate.emit({
            start: this.start,
            total: this.total,
            num: this.selectedIndex
        });
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** When called, selected page will increment by 1.
     */
    async nextPage() {
        this.selectedIndex = Math.min(this.total, this.selectedIndex + 1);
    }
    /** When called, selected page will decrement by 1.
     */
    async previousPage() {
        this.selectedIndex = Math.max(this.start, this.selectedIndex - 1);
    }
    /** Set selected page to a specific page number. Will not go below start or above total.
     */
    async setPage(num) {
        this.selectedIndex = Math.max(this.start, Math.min(this.total, num));
    }
    showLeftEllipsis() {
        return (this.selectedIndex - this.start) > 3;
    }
    showRightEllipsis() {
        return (this.total - this.selectedIndex) > 3;
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderPages() {
        let pages = [];
        let currentNum;
        let end;
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
        return pages.map(page => this.renderPage(page));
    }
    renderPage(num) {
        return (core.h("a", { class: { [CSS.page]: true, [CSS.selected]: (num === this.selectedIndex) }, onClick: () => {
                this.selectedIndex = num;
            } }, num));
    }
    renderLeftEllipsis() {
        if (this.total > maxPagesDisplayed && this.showLeftEllipsis()) {
            return (core.h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisStart}` }, core.h("calcite-icon", { scale: "s", icon: "ellipsis" })));
        }
    }
    renderRightEllipsis() {
        if (this.total > maxPagesDisplayed && this.showRightEllipsis()) {
            return (core.h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisEnd}` }, core.h("calcite-icon", { scale: "s", icon: "ellipsis" })));
        }
    }
    render() {
        const dir = dom.getElementDir(this.el);
        return (core.h(core.Host, { dir: dir, class: this.backgroundStyle }, core.h("a", { class: { [CSS.previous]: true, [CSS.disabled]: this.selectedIndex <= 1 }, title: this.textLabelPrevious, onClick: this.previousClicked }, core.h("calcite-icon", { scale: "s", icon: "chevronLeft" })), this.renderPage(this.start), this.renderLeftEllipsis(), this.renderPages(), this.renderRightEllipsis(), this.renderPage(this.total), core.h("a", { class: { [CSS.next]: true, [CSS.disabled]: this.selectedIndex >= this.total }, title: this.textLabelNext, onClick: this.nextClicked }, core.h("calcite-icon", { scale: "s", icon: "chevronRight" }))));
    }
    get el() { return core.getElement(this); }
    static get watchers() { return {
        "num": ["numWatchHandler"],
        "selectedIndex": ["selectedIndexWatchHandler"]
    }; }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{display:-ms-inline-flexbox;display:inline-flex;background-color:var(--calcite-ui-foreground);-webkit-writing-mode:horizontal-tb;-ms-writing-mode:lr-tb;writing-mode:horizontal-tb}:host(.backgroundColor){background-color:var(--calcite-ui-background)}.next,.page,.previous{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;border-top:3px solid transparent;border-bottom:3px solid transparent;color:var(--calcite-ui-text-3);cursor:pointer}.next:hover,.page:hover,.previous:hover{color:var(--calcite-ui-text-1);-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.page:hover{border-bottom-color:var(--calcite-ui-border-2)}.page.is-selected{font-weight:500;color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-blue)}.next,.previous{padding:.75em 1em}.next:hover,.previous:hover{color:var(--calcite-ui-blue);background-color:var(--calcite-ui-foreground-hover)}.next:active,.previous:active{background-color:var(--calcite-ui-foreground-press)}.next.is-disabled,.previous.is-disabled{background-color:transparent}.next.is-disabled>svg,.previous.is-disabled>svg{opacity:.3}.next{margin-right:0}.ellipsis,.page{padding:.75em 1em}.ellipsis{display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;color:var(--calcite-ui-text-3)}"; }
};

exports.calcite_pagination = CalcitePagination;
