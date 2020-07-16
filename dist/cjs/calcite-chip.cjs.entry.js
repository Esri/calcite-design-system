'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ebea6174.js');
const dom = require('./dom-eb444cd9.js');

const CSS = {
    close: 'close'
};
const TEXT = {
    close: 'close'
};

const calciteChipCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{--calcite-chip-transparent-hover:rgba(0, 0, 0, 0.05);--calcite-chip-transparent-press:rgba(0, 0, 0, 0.08)}:host([theme=dark]){--calcite-chip-transparent-hover:rgba(255, 255, 255, 0.05);--calcite-chip-transparent-press:rgba(255, 255, 255, 0.08)}:host([scale=s]){font-size:10px;height:22px;--calcite-chip-spacing-unit-l:8px;--calcite-chip-spacing-unit-s:4px}:host([scale=s]) slot[name=chip-image]::slotted(*){max-height:16px}:host([scale=m]){font-size:12px;height:28px;--calcite-chip-spacing-unit-l:12px;--calcite-chip-spacing-unit-s:6px}:host([scale=m]) slot[name=chip-image]::slotted(*){max-height:22px}:host([scale=l]){font-size:14px;height:40px;--calcite-chip-spacing-unit-l:16px;--calcite-chip-spacing-unit-s:8px}:host([scale=l]) slot[name=chip-image]::slotted(*){max-height:30px}:host{--calcite-chip-button-border-radius:0 50px 50px 0;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;background-color:var(--calcite-ui-foreground-2);border-radius:50px;border:1px solid var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);font-weight:500;cursor:default}:host button{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([dir=rtl]){--calcite-chip-button-border-radius:50px 0 0 50px;text-align:right}:host span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l)}:host([dismissible]) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l)}:host([dir=rtl][dismissible]) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s)}:host([icon]:not([dismissible])) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s)}:host([dir=rtl][icon]:not([dismissible])) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l)}:host button{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-item-align:stretch;align-self:stretch;-webkit-appearance:none;background-color:transparent;margin:0;padding:0;border-radius:var(--calcite-chip-button-border-radius);border:none;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;padding:var(--calcite-chip-spacing-unit-s);cursor:pointer;color:var(--calcite-ui-text-1)}:host button:hover,:host button:focus{background-color:var(--calcite-ui-foreground-2);border-color:var(--calcite-ui-foreground-2)}:host button:active{background-color:var(--calcite-ui-foreground-3)}:host slot[name=chip-image]{display:-ms-inline-flexbox;display:inline-flex}:host slot[name=chip-image]::slotted(*){border-radius:50%;height:100%;padding:calc(var(--calcite-chip-spacing-unit-l) / 3)}.calcite-chip--icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0 0 0 var(--calcite-chip-spacing-unit-l);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;border-radius:var(--calcite-chip-button-border-radius)}:host([dir=rtl]) .calcite-chip--icon{margin:0 var(--calcite-chip-spacing-unit-l) 0 0}:host([color=blue][appearance=solid]),:host([color=blue][appearance=solid]) button{border-color:var(--calcite-ui-blue-1);background-color:var(--calcite-ui-blue-1);color:var(--calcite-ui-foreground-1)}:host([color=blue][appearance=solid]):hover,:host([color=blue][appearance=solid]):focus,:host([color=blue][appearance=solid]) button:hover,:host([color=blue][appearance=solid]) button:focus{background-color:var(--calcite-ui-blue-2)}:host([color=blue][appearance=solid]):active,:host([color=blue][appearance=solid]) button:active{background-color:var(--calcite-ui-blue-3)}:host([theme=dark][color=blue][appearance=solid]:not([color=grey])),:host([theme=dark][color=blue][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=blue][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-blue-3);background-color:transparent}:host([color=blue][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-blue-3)}:host([color=blue][appearance=clear]) button:hover,:host([color=blue][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=blue][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=red][appearance=solid]),:host([color=red][appearance=solid]) button{border-color:var(--calcite-ui-red-1);background-color:var(--calcite-ui-red-1);color:var(--calcite-ui-foreground-1)}:host([color=red][appearance=solid]):hover,:host([color=red][appearance=solid]):focus,:host([color=red][appearance=solid]) button:hover,:host([color=red][appearance=solid]) button:focus{background-color:var(--calcite-ui-red-2)}:host([color=red][appearance=solid]):active,:host([color=red][appearance=solid]) button:active{background-color:var(--calcite-ui-red-3)}:host([theme=dark][color=red][appearance=solid]:not([color=grey])),:host([theme=dark][color=red][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=red][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-red-3);background-color:transparent}:host([color=red][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-red-3)}:host([color=red][appearance=clear]) button:hover,:host([color=red][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=red][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=yellow][appearance=solid]),:host([color=yellow][appearance=solid]) button{border-color:var(--calcite-ui-yellow-1);background-color:var(--calcite-ui-yellow-1);color:var(--calcite-ui-text-1)}:host([color=yellow][appearance=solid]):hover,:host([color=yellow][appearance=solid]):focus,:host([color=yellow][appearance=solid]) button:hover,:host([color=yellow][appearance=solid]) button:focus{background-color:var(--calcite-ui-yellow-2)}:host([color=yellow][appearance=solid]):active,:host([color=yellow][appearance=solid]) button:active{background-color:var(--calcite-ui-yellow-3)}:host([theme=dark][color=yellow][appearance=solid]:not([color=grey])),:host([theme=dark][color=yellow][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=yellow][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-yellow-3);background-color:transparent}:host([color=yellow][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-yellow-3)}:host([color=yellow][appearance=clear]) button:hover,:host([color=yellow][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=yellow][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=green][appearance=solid]),:host([color=green][appearance=solid]) button{border-color:var(--calcite-ui-green-1);background-color:var(--calcite-ui-green-1);color:var(--calcite-ui-text-1)}:host([color=green][appearance=solid]):hover,:host([color=green][appearance=solid]):focus,:host([color=green][appearance=solid]) button:hover,:host([color=green][appearance=solid]) button:focus{background-color:var(--calcite-ui-green-2)}:host([color=green][appearance=solid]):active,:host([color=green][appearance=solid]) button:active{background-color:var(--calcite-ui-green-3)}:host([theme=dark][color=green][appearance=solid]:not([color=grey])),:host([theme=dark][color=green][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=green][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-green-3);background-color:transparent}:host([color=green][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-green-3)}:host([color=green][appearance=clear]) button:hover,:host([color=green][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=green][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=grey][appearance=solid]),:host([color=grey][appearance=solid]) button{border-color:var(--calcite-ui-foreground-2);background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host([color=grey][appearance=solid]):hover,:host([color=grey][appearance=solid]):focus,:host([color=grey][appearance=solid]) button:hover,:host([color=grey][appearance=solid]) button:focus{background-color:var(--calcite-ui-foreground-3)}:host([color=grey][appearance=solid]):active,:host([color=grey][appearance=solid]) button:active{background-color:var(--calcite-ui-foreground-3)}:host([theme=dark][color=grey][appearance=solid]:not([color=grey])),:host([theme=dark][color=grey][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=grey][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-foreground-3);background-color:transparent}:host([color=grey][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-text-1)}:host([color=grey][appearance=clear]) button:hover,:host([color=grey][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=grey][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}";

const CalciteChip = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteChipDismiss = index.createEvent(this, "calciteChipDismiss", 7);
        /** specify the scale of the chip, defaults to m */
        this.scale = "m";
        /** specify the color of the button, defaults to blue */
        this.color = "grey";
        /** specify the appearance style of the button, defaults to solid. */
        this.appearance = "solid";
        /** Optionally show a button the user can click to dismiss the chip */
        this.dismissible = false;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.closeClickHandler = (event) => {
            event.preventDefault();
            this.calciteChipDismiss.emit(this.el);
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let appearance = ["solid", "clear"];
        if (!appearance.includes(this.appearance))
            this.appearance = "solid";
        let color = ["blue", "green", "grey", "yellow", "red"];
        if (!color.includes(this.color))
            this.color = "grey";
    }
    render() {
        const dir = dom.getElementDir(this.el);
        const iconScale = this.scale !== "l" ? "s" : "m";
        const iconEl = (index.h("calcite-icon", { class: "calcite-chip--icon", icon: this.icon, scale: iconScale }));
        const closeButton = (index.h("button", { onClick: this.closeClickHandler, class: CSS.close, title: TEXT.close }, index.h("calcite-icon", { scale: iconScale, icon: "x" })));
        return (index.h(index.Host, { dir: dir }, index.h("slot", { name: "chip-image" }), this.icon ? iconEl : null, index.h("span", null, index.h("slot", null)), this.dismissible ? closeButton : null));
    }
    get el() { return index.getElement(this); }
};
CalciteChip.style = calciteChipCss;

exports.calcite_chip = CalciteChip;
