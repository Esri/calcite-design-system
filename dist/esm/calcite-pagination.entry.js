import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';

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

const calcitePaginationCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]){--calcite-pagination-spacing:4px 8px}:host([scale=s]) .previous,:host([scale=s]) .next,:host([scale=s]) .page{font-size:12px}:host([scale=m]){--calcite-pagination-spacing:8px 12px}:host([scale=m]) .previous,:host([scale=m]) .next,:host([scale=m]) .page{font-size:16px}:host([scale=l]){--calcite-pagination-spacing:12px 16px}:host([scale=l]) .previous,:host([scale=l]) .next,:host([scale=l]) .page{font-size:20px}:host{display:-ms-inline-flexbox;display:inline-flex;-webkit-writing-mode:horizontal-tb;-ms-writing-mode:lr-tb;writing-mode:horizontal-tb}:host button{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.previous,.next,.page{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;background-color:transparent;border:none;border-top:3px solid transparent;border-bottom:3px solid transparent;font-family:inherit;font-size:1rem;line-height:1.5;color:var(--calcite-ui-text-3);cursor:pointer}.previous:hover,.next:hover,.page:hover{color:var(--calcite-ui-text-1);-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}.page:hover{border-bottom-color:var(--calcite-ui-border-2)}.page.is-selected{font-weight:500;color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-blue-1)}.previous,.next{padding:var(--calcite-pagination-spacing)}.previous:hover,.next:hover{color:var(--calcite-ui-blue-1);background-color:var(--calcite-ui-foreground-2)}.previous:active,.next:active{background-color:var(--calcite-ui-foreground-3)}.previous.is-disabled,.next.is-disabled{background-color:transparent;pointer-events:none}.previous.is-disabled>calcite-icon,.next.is-disabled>calcite-icon{opacity:0.4}.next{margin-right:0}.page,.ellipsis{padding:var(--calcite-pagination-spacing)}.ellipsis{display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;color:var(--calcite-ui-text-3)}";

const maxPagesDisplayed = 5;
const CalcitePagination = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calcitePaginationUpdate = createEvent(this, "calcitePaginationUpdate", 7);
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
        this.previousClicked = () => {
            this.previousPage().then();
            this.emitUpdate();
        };
        this.nextClicked = () => {
            this.nextPage();
            this.emitUpdate();
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Go to the next page of results */
    async nextPage() {
        this.start = Math.min(this.getLastStart(), this.start + this.num);
    }
    /** Go to the previous page of results */
    async previousPage() {
        this.start = Math.max(1, this.start - this.num);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    getLastStart() {
        const { total, num } = this;
        const lastStart = total % num === 0 ? total - num : Math.floor(total / num) * num;
        return lastStart + 1;
    }
    showLeftEllipsis() {
        return Math.floor(this.start / this.num) > 3;
    }
    showRightEllipsis() {
        return (this.total - this.start) / this.num > 3;
    }
    emitUpdate() {
        this.calcitePaginationUpdate.emit({
            start: this.start,
            total: this.total,
            num: this.num,
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderPages() {
        let lastStart = this.getLastStart();
        let end;
        let nextStart;
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
        const pages = [];
        while (nextStart <= end) {
            pages.push(nextStart);
            nextStart = nextStart + this.num;
        }
        return pages.map((page) => this.renderPage(page));
    }
    renderPage(start) {
        const page = Math.floor(start / this.num) + 1;
        return (h("button", { class: {
                [CSS.page]: true,
                [CSS.selected]: start === this.start,
            }, onClick: () => {
                this.start = start;
                this.emitUpdate();
            } }, page));
    }
    renderLeftEllipsis(iconScale) {
        if (this.total / this.num > maxPagesDisplayed && this.showLeftEllipsis()) {
            return (h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisStart}` }, h("calcite-icon", { scale: iconScale, icon: "ellipsis" })));
        }
    }
    renderRightEllipsis(iconScale) {
        if (this.total / this.num > maxPagesDisplayed && this.showRightEllipsis()) {
            return (h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisEnd}` }, h("calcite-icon", { scale: iconScale, icon: "ellipsis" })));
        }
    }
    render() {
        const { total, num, start } = this;
        const iconScale = this.scale === "l" ? "m" : "s";
        return (h(Host, null, h("button", { class: {
                [CSS.previous]: true,
                [CSS.disabled]: start < num,
            }, "aria-label": this.textLabelPrevious, onClick: this.previousClicked, disabled: start < num }, h("calcite-icon", { scale: iconScale, icon: "chevronLeft" })), this.renderPage(1), this.renderLeftEllipsis(iconScale), this.renderPages(), this.renderRightEllipsis(iconScale), this.renderPage(this.getLastStart()), h("button", { class: {
                [CSS.next]: true,
                [CSS.disabled]: start + num >= total,
            }, "aria-label": this.textLabelNext, onClick: this.nextClicked, disabled: start + num >= total }, h("calcite-icon", { scale: iconScale, icon: "chevronRight" }))));
    }
    get el() { return getElement(this); }
};
CalcitePagination.style = calcitePaginationCss;

export { CalcitePagination as calcite_pagination };
