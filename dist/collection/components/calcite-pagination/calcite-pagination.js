import { h, Host } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS, TEXT } from "./resources";
const maxPagesDisplayed = 5;
export class CalcitePagination {
    constructor() {
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
        return (h("a", { class: { [CSS.page]: true, [CSS.selected]: (num === this.selectedIndex) }, onClick: () => {
                this.selectedIndex = num;
            } }, num));
    }
    renderLeftEllipsis() {
        if (this.total > maxPagesDisplayed && this.showLeftEllipsis()) {
            return (h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisStart}` },
                h("calcite-icon", { scale: "s", icon: "ellipsis" })));
        }
    }
    renderRightEllipsis() {
        if (this.total > maxPagesDisplayed && this.showRightEllipsis()) {
            return (h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisEnd}` },
                h("calcite-icon", { scale: "s", icon: "ellipsis" })));
        }
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, class: this.backgroundStyle },
            h("a", { class: { [CSS.previous]: true, [CSS.disabled]: this.selectedIndex <= 1 }, title: this.textLabelPrevious, onClick: this.previousClicked },
                h("calcite-icon", { scale: "s", icon: "chevronLeft" })),
            this.renderPage(this.start),
            this.renderLeftEllipsis(),
            this.renderPages(),
            this.renderRightEllipsis(),
            this.renderPage(this.total),
            h("a", { class: { [CSS.next]: true, [CSS.disabled]: this.selectedIndex >= this.total }, title: this.textLabelNext, onClick: this.nextClicked },
                h("calcite-icon", { scale: "s", icon: "chevronRight" }))));
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
        "backgroundStyle": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"backgroundColor\" | \"foregroundColor\"",
                "resolved": "\"backgroundColor\" | \"foregroundColor\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Change between foreground colors or background colors for container background"
            },
            "attribute": "background-style",
            "reflect": true,
            "defaultValue": "\"foregroundColor\""
        },
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
                "text": "starting selected index"
            },
            "attribute": "num",
            "reflect": true,
            "defaultValue": "1"
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
                "text": "starting number of the pagination"
            },
            "attribute": "start",
            "reflect": true,
            "defaultValue": "1"
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
            "reflect": true,
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
            "reflect": true,
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
            "reflect": true,
            "defaultValue": "\"light\""
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
                "text": "ending number of the pagination"
            },
            "attribute": "total",
            "reflect": true,
            "defaultValue": "2"
        }
    }; }
    static get states() { return {
        "selectedIndex": {}
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
                "original": "any",
                "resolved": "any",
                "references": {}
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
                "text": "When called, selected page will increment by 1.",
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
                "text": "When called, selected page will decrement by 1.",
                "tags": []
            }
        },
        "setPage": {
            "complexType": {
                "signature": "(num: number) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Set selected page to a specific page number. Will not go below start or above total.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "num",
            "methodName": "numWatchHandler"
        }, {
            "propName": "selectedIndex",
            "methodName": "selectedIndexWatchHandler"
        }]; }
}
