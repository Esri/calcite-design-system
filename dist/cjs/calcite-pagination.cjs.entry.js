'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-afc57de2.js');

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

const calcitePaginationCss = ":host([hidden]){display:none}:host{display:-ms-inline-flexbox;display:inline-flex;background-color:var(--calcite-ui-foreground-1);-webkit-writing-mode:horizontal-tb;-ms-writing-mode:lr-tb;writing-mode:horizontal-tb}:host(.backgroundColor){background-color:var(--calcite-ui-background)}:host a{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host a:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.previous,.next,.page{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;border-top:3px solid transparent;border-bottom:3px solid transparent;color:var(--calcite-ui-text-3);cursor:pointer}.previous:hover,.next:hover,.page:hover{color:var(--calcite-ui-text-1);-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}.page:hover{border-bottom-color:var(--calcite-ui-border-2)}.page.is-selected{font-weight:500;color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-blue-1)}.previous,.next{padding:0.75em 1em}.previous:hover,.next:hover{color:var(--calcite-ui-blue-1);background-color:var(--calcite-ui-foreground-2)}.previous:active,.next:active{background-color:var(--calcite-ui-foreground-3)}.previous.is-disabled,.next.is-disabled{background-color:transparent}.previous.is-disabled>svg,.next.is-disabled>svg{opacity:0.3}.next{margin-right:0}.page,.ellipsis{padding:0.75em 1em}.ellipsis{display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;color:var(--calcite-ui-text-3)}";

const maxPagesDisplayed = 5;
const CalcitePagination = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        this.calcitePaginationUpdate = index.createEvent(this, "calcitePaginationUpdate", 7);
    }
    numWatchHandler(newValue) {
        this.selectedIndex = newValue;
    }
    selectedIndexWatchHandler() {
        this.calcitePaginationUpdate.emit({
            start: this.start,
            total: this.total,
            num: this.selectedIndex,
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
        return this.selectedIndex - this.start > 3;
    }
    showRightEllipsis() {
        return this.total - this.selectedIndex > 3;
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
        return pages.map((page) => this.renderPage(page));
    }
    renderPage(num) {
        return (index.h("a", { tabIndex: 0, class: { [CSS.page]: true, [CSS.selected]: num === this.selectedIndex }, onClick: () => {
                this.selectedIndex = num;
            } }, num));
    }
    renderLeftEllipsis() {
        if (this.total > maxPagesDisplayed && this.showLeftEllipsis()) {
            return (index.h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisStart}` }, index.h("calcite-icon", { scale: "s", icon: "ellipsis" })));
        }
    }
    renderRightEllipsis() {
        if (this.total > maxPagesDisplayed && this.showRightEllipsis()) {
            return (index.h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisEnd}` }, index.h("calcite-icon", { scale: "s", icon: "ellipsis" })));
        }
    }
    render() {
        return (index.h(index.Host, { class: this.backgroundStyle }, index.h("a", { class: {
                [CSS.previous]: true,
                [CSS.disabled]: this.selectedIndex <= 1,
            }, tabIndex: 0, title: this.textLabelPrevious, onClick: this.previousClicked }, index.h("calcite-icon", { scale: "s", icon: "chevronLeft" })), this.renderPage(this.start), this.renderLeftEllipsis(), this.renderPages(), this.renderRightEllipsis(), this.renderPage(this.total), index.h("a", { class: {
                [CSS.next]: true,
                [CSS.disabled]: this.selectedIndex >= this.total,
            }, tabIndex: 0, title: this.textLabelNext, onClick: this.nextClicked }, index.h("calcite-icon", { scale: "s", icon: "chevronRight" }))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "num": ["numWatchHandler"],
        "selectedIndex": ["selectedIndexWatchHandler"]
    }; }
};
CalcitePagination.style = calcitePaginationCss;

exports.calcite_pagination = CalcitePagination;
