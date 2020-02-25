import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-30c05663.js';
import { g as getElementDir } from './dom-0361c8d2.js';
import { b as ENTER, S as SPACE } from './keys-1c8b189f.js';
var CSS = {
    container: "container",
    header: "header",
    footer: "footer",
    title: "title",
    subtitle: "subtitle",
    thumbnailWrapper: "thumbnail-wrapper"
};
var CalciteCard = /** @class */ (function () {
    function CalciteCard(hostRef) {
        registerInstance(this, hostRef);
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
        /**  The theme of the card.*/
        this.theme = "light";
        this.calciteCardSelected = createEvent(this, "calciteCardSelected", 7);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    CalciteCard.prototype.connectedCallback = function () {
        var themes = ["dark", "light"];
        if (!themes.includes(this.theme))
            this.theme = "light";
    };
    CalciteCard.prototype.render = function () {
        var _a;
        var dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("div", { class: "calcite-card-container" }, this.loading ? (h("div", { class: "calcite-card-loader-container" }, h("calcite-loader", { class: "calcite-card-loader", "is-active": true }))) : null, h("section", { class: (_a = {}, _a[CSS.container] = true, _a), "aria-busy": this.loading }, this.selectable ? this.renderCheckbox() : null, this.renderThumbnail(), this.renderHeader(), h("div", { class: "card-content" }, h("slot", null)), this.renderFooter()))));
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
        switch (e.keyCode) {
            case SPACE:
            case ENTER:
                this.selectCard();
                e.preventDefault();
                break;
        }
    };
    CalciteCard.prototype.selectCard = function () {
        this.selected = !this.selected;
        this.calciteCardSelected.emit({
            element: this.el,
            selected: this.selected
        });
    };
    CalciteCard.prototype.renderThumbnail = function () {
        var hasThumbnail = this.el.querySelector("[slot=" + "thumbnail" /* thumbnail */ + "]");
        return hasThumbnail ? (h("div", { class: CSS.thumbnailWrapper }, h("slot", { name: "thumbnail" /* thumbnail */ }))) : null;
    };
    CalciteCard.prototype.renderCheckbox = function () {
        var _this = this;
        return (h("div", { class: "card-checkbox-wrapper", onClick: function () { return _this.cardSelectClick(); }, onKeyDown: function (e) { return _this.cardSelectKeyDown(e); } }, h("calcite-checkbox", { checked: this.selected })));
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteCard, "style", {
        get: function () { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{max-width:100%}:host .calcite-card-container{display:-ms-flexbox;display:flex;height:100%;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;background-color:var(--calcite-ui-foreground);-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out;position:relative;border:1px solid var(--calcite-ui-border-2);color:var(--calcite-ui-text-3);-webkit-box-shadow:0 0 0 transparent;box-shadow:0 0 0 transparent}:host .calcite-card-container:hover{-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.08);box-shadow:0 0 16px 0 rgba(0,0,0,.08);z-index:1}:host .calcite-card-container:active{-webkit-box-shadow:0 0 8px 0 rgba(0,0,0,.16);box-shadow:0 0 8px 0 rgba(0,0,0,.16);z-index:1}:host([loading]) .calcite-card-container :not(calcite-loader):not(.calcite-card-loader-container){opacity:0;pointer-events:none}:host([loading]) .calcite-card-loader-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:absolute;left:0;right:0;top:0;bottom:0}:host([loading]) .calcite-card-loader{position:absolute;left:0;right:0;z-index:9}:host .footer,:host .header{padding:.75rem;display:-ms-flexbox;display:flex}:host .header{-ms-flex-direction:column;flex-direction:column}:host .footer{padding:.75rem;-ms-flex-direction:row;flex-direction:row}:host .card-content{padding:0 .75rem;color:var(--calcite-ui-text-3);font-size:.875rem;line-height:1.5}:host([selectable]) .calcite-card-container:active{-webkit-box-shadow:0 0 8px 0 rgba(0,0,0,.16);box-shadow:0 0 8px 0 rgba(0,0,0,.16)}:host([selected]) .calcite-card-container{border-color:var(--calcite-ui-blue)}::slotted([slot=title]),slot[name=title]::slotted(*){font-weight:500;color:var(--calcite-ui-text-1);margin:0;font-size:.9375rem;line-height:1.5}::slotted([slot=subtitle]),slot[name=subtitle]::slotted(*){font-weight:400;color:var(--calcite-ui-text-2);margin:0;margin-top:.375rem;font-size:.875rem;line-height:1.5}img::slotted([slot=thumbnail]),slot[name=thumbnail]::slotted(img){max-width:100%;min-width:100%}::slotted([slot=footer-leading]),slot[name=footer-leading]::slotted(*){-webkit-margin-end:auto;margin-inline-end:auto}::slotted([slot=footer-leading]),::slotted([slot=footer-trailing]),slot[name=footer-leading]::slotted(*),slot[name=footer-trailing]::slotted(*){-ms-flex-item-align:center;align-self:center;font-size:.875rem;line-height:1.5}:host .thumbnail-wrapper{font-size:0}:host .card-checkbox-wrapper{position:absolute;top:.375rem;right:.375rem;margin:0;padding:0}:host([dir=rtl]) .card-checkbox-wrapper{left:.375rem;right:auto}"; },
        enumerable: true,
        configurable: true
    });
    return CalciteCard;
}());
export { CalciteCard as calcite_card };
