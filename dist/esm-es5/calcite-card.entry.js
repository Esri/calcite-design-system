import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { g as getElementDir } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';
var CSS = {
    container: "container",
    header: "header",
    footer: "footer",
    title: "title",
    subtitle: "subtitle",
    thumbnailWrapper: "thumbnail-wrapper",
    checkboxWrapper: "checkbox-wrapper"
};
var calciteCardCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{max-width:100%}:host .calcite-card-container{display:-ms-flexbox;display:flex;height:100%;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;background-color:var(--calcite-ui-foreground-1);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;position:relative;border:1px solid var(--calcite-ui-border-2);color:var(--calcite-ui-text-3);-webkit-box-shadow:0 0 0 rgba(0, 0, 0, 0);box-shadow:0 0 0 rgba(0, 0, 0, 0)}:host .calcite-card-container:hover{-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.08);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.08);z-index:1}:host .calcite-card-container:active{-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);z-index:1}:host([loading]) .calcite-card-container *:not(calcite-loader):not(.calcite-card-loader-container){opacity:0;pointer-events:none}:host([loading]) .calcite-card-loader-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:absolute;left:0;right:0;top:0;bottom:0}:host .header,:host .footer{padding:0.75rem;display:-ms-flexbox;display:flex}:host .header{-ms-flex-direction:column;flex-direction:column}:host .footer{padding:0.75rem;-ms-flex-direction:row;flex-direction:row;-ms-flex-line-pack:justify;align-content:space-between;-ms-flex-pack:justify;justify-content:space-between}:host .card-content{padding:0 0.75rem;color:var(--calcite-ui-text-3);font-size:0.875rem;line-height:1.5}:host([selectable]) .calcite-card-container:active{-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16)}:host([selected]) .calcite-card-container{border-color:var(--calcite-ui-blue-1)}slot[name=title]::slotted(*),*::slotted([slot=title]){font-weight:500;color:var(--calcite-ui-text-1);margin:0;font-size:0.9375rem;line-height:1.5}slot[name=subtitle]::slotted(*),*::slotted([slot=subtitle]){font-weight:400;color:var(--calcite-ui-text-2);margin:0;margin-top:0.375rem;font-size:0.875rem;line-height:1.5}slot[name=thumbnail]::slotted(img),img::slotted([slot=thumbnail]){max-width:100%;min-width:100%}slot[name=footer-leading]::slotted(*),*::slotted([slot=footer-leading]){-webkit-margin-end:auto;margin-inline-end:auto;-ms-flex-item-align:center;align-self:center;font-size:0.875rem;line-height:1.5}slot[name=footer-trailing]::slotted(*),*::slotted([slot=footer-trailing]){-ms-flex-item-align:center;align-self:center;font-size:0.875rem;line-height:1.5}:host .thumbnail-wrapper{font-size:0}:host .checkbox-wrapper{position:absolute;top:0.375rem;right:0.375rem;margin:0;padding:0}:host([dir=rtl]) .checkbox-wrapper{left:0.375rem;right:auto}";
var CalciteCard = /** @class */ (function () {
    function CalciteCard(hostRef) {
        registerInstance(this, hostRef);
        this.calciteCardSelect = createEvent(this, "calciteCardSelect", 7);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /**  When true, the cards content is waiting to be loaded. This state shows a busy indicator.*/
        this.loading = false;
        /** Indicates whether the card is selected. */
        this.selected = false;
        /** Indicates whether the card is selectable. */
        this.selectable = false;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    CalciteCard.prototype.render = function () {
        var _a;
        var dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("div", { class: "calcite-card-container" }, this.loading ? (h("div", { class: "calcite-card-loader-container" }, h("calcite-loader", { active: true }))) : null, h("section", { class: (_a = {}, _a[CSS.container] = true, _a), "aria-busy": this.loading }, this.selectable ? this.renderCheckbox() : null, this.renderThumbnail(), this.renderHeader(), h("div", { class: "card-content" }, h("slot", null)), this.renderFooter()))));
    };
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    CalciteCard.prototype.cardSelectClick = function () {
        this.selectCard();
    };
    CalciteCard.prototype.cardSelectKeyDown = function (e) {
        switch (getKey(e.key)) {
            case " ":
            case "Enter":
                this.selectCard();
                e.preventDefault();
                break;
        }
    };
    CalciteCard.prototype.selectCard = function () {
        this.selected = !this.selected;
        this.calciteCardSelect.emit();
    };
    CalciteCard.prototype.renderThumbnail = function () {
        var hasThumbnail = this.el.querySelector("[slot=" + "thumbnail" /* thumbnail */ + "]");
        return hasThumbnail ? (h("div", { class: CSS.thumbnailWrapper }, h("slot", { name: "thumbnail" /* thumbnail */ }))) : null;
    };
    CalciteCard.prototype.renderCheckbox = function () {
        var _this = this;
        return (h("div", { class: CSS.checkboxWrapper, onClick: function () { return _this.cardSelectClick(); }, onKeyDown: function (e) { return _this.cardSelectKeyDown(e); } }, h("calcite-checkbox", { theme: this.theme, checked: this.selected })));
    };
    CalciteCard.prototype.renderHeader = function () {
        var title = this.el.querySelector("[slot=" + "title" /* title */ + "]");
        var subtitle = this.el.querySelector("[slot=" + "subtitle" /* subtitle */ + "]");
        var hasHeader = title || subtitle;
        return hasHeader ? (h("header", { class: CSS.header }, h("slot", { name: "title" /* title */ }), h("slot", { name: "subtitle" /* subtitle */ }))) : null;
    };
    CalciteCard.prototype.renderFooter = function () {
        var leadingFooter = this.el.querySelector("[slot=" + "footer-leading" /* footerLeading */ + "]");
        var trailingFooter = this.el.querySelector("[slot=" + "footer-trailing" /* footerTrailing */ + "]");
        var hasFooter = leadingFooter || trailingFooter;
        return hasFooter ? (h("footer", { class: CSS.footer }, h("slot", { name: "footer-leading" /* footerLeading */ }), h("slot", { name: "footer-trailing" /* footerTrailing */ }))) : null;
    };
    Object.defineProperty(CalciteCard.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return CalciteCard;
}());
CalciteCard.style = calciteCardCss;
export { CalciteCard as calcite_card };
