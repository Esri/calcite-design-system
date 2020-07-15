import { Component, Element, Event, h, Host, Prop, Method, } from "@stencil/core";
import { CSS, TEXT } from "./resources";
const maxPagesDisplayed = 5;
export class CalcitePagination {
    constructor() {
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
            return (h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisStart}` },
                h("calcite-icon", { scale: iconScale, icon: "ellipsis" })));
        }
    }
    renderRightEllipsis(iconScale) {
        if (this.total / this.num > maxPagesDisplayed && this.showRightEllipsis()) {
            return (h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisEnd}` },
                h("calcite-icon", { scale: iconScale, icon: "ellipsis" })));
        }
    }
    render() {
        const { total, num, start } = this;
        const iconScale = this.scale === "l" ? "m" : "s";
        return (h(Host, null,
            h("button", { class: {
                    [CSS.previous]: true,
                    [CSS.disabled]: start < num,
                }, "aria-label": this.textLabelPrevious, onClick: this.previousClicked, disabled: start < num },
                h("calcite-icon", { scale: iconScale, icon: "chevronLeft" })),
            this.renderPage(1),
            this.renderLeftEllipsis(iconScale),
            this.renderPages(),
            this.renderRightEllipsis(iconScale),
            this.renderPage(this.getLastStart()),
            h("button", { class: {
                    [CSS.next]: true,
                    [CSS.disabled]: start + num >= total,
                }, "aria-label": this.textLabelNext, onClick: this.nextClicked, disabled: start + num >= total },
                h("calcite-icon", { scale: iconScale, icon: "chevronRight" }))));
    }
    static get is() { return "calcite-pagination"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-pagination.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-pagination.css"]
    }; }
    static get properties() { return {
        "num": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "number of items per page"
            },
            "attribute": "num",
            "reflect": false,
            "defaultValue": "20"
        },
        "start": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "index of item that should begin the page"
            },
            "attribute": "start",
            "reflect": false,
            "defaultValue": "1"
        },
        "total": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "total number of items"
            },
            "attribute": "total",
            "reflect": false,
            "defaultValue": "0"
        },
        "textLabelNext": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "title of the next button"
            },
            "attribute": "text-label-next",
            "reflect": false,
            "defaultValue": "TEXT.nextLabel"
        },
        "textLabelPrevious": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "title of the previous button"
            },
            "attribute": "text-label-previous",
            "reflect": false,
            "defaultValue": "TEXT.previousLabel"
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"light\" | \"dark\"",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the theme of accordion, defaults to light"
            },
            "attribute": "theme",
            "reflect": true
        },
        "scale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"s\" | \"m\" | \"l\"",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The scale of the pagination"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        }
    }; }
    static get events() { return [{
            "method": "calcitePaginationUpdate",
            "name": "calcitePaginationUpdate",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "calcitePaginationUpdate",
                        "name": "event"
                    }],
                "text": "Emitted whenever the selected page changes."
            },
            "complexType": {
                "original": "CalcitePaginationDetail",
                "resolved": "CalcitePaginationDetail",
                "references": {
                    "CalcitePaginationDetail": {
                        "location": "local"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "nextPage": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Go to the next page of results",
                "tags": []
            }
        },
        "previousPage": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Go to the previous page of results",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
}
