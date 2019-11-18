'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-df5cbf37.js');
require('./dom-7866810c.js');
const guid = require('./guid-1986fc89.js');
const popper = require('./popper-a96c79e5.js');

const CSS = {
    container: "tooltip-container",
    containerOpen: "tooltip-container--open",
    contentContainer: "tooltip-content-container"
};

const CalciteTooltip = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Display and position the component.
         */
        this.open = false;
        /**
         * Determines where the component will be positioned relative to the referenceElement.
         */
        this.placement = "auto";
        /** Select theme (light or dark) */
        this.theme = "light";
        this._referenceElement = this.getReferenceElement();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getId = () => {
            return this.el.id || `calcite-tooltip-${guid.guid()}`;
        };
        this.addReferenceAria = () => {
            const { _referenceElement } = this;
            if (_referenceElement &&
                !_referenceElement.hasAttribute("aria-describedby")) {
                _referenceElement.setAttribute("aria-describedby", this.getId());
            }
        };
        this.addReferenceListeners = () => {
            const { _referenceElement } = this;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.addEventListener("mouseenter", this.show);
            _referenceElement.addEventListener("mouseleave", this.hide);
            _referenceElement.addEventListener("focus", this.show);
            _referenceElement.addEventListener("blur", this.hide);
        };
        this.removeReferenceListeners = () => {
            const { _referenceElement } = this;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.removeEventListener("mouseenter", this.show);
            _referenceElement.removeEventListener("mouseleave", this.hide);
            _referenceElement.removeEventListener("focus", this.show);
            _referenceElement.removeEventListener("blur", this.hide);
        };
        this.show = () => {
            this.open = true;
        };
        this.hide = () => {
            this.open = false;
        };
    }
    openHandler(open) {
        if (open) {
            this.reposition();
        }
        else {
            this.destroyPopper();
        }
    }
    placementHandler() {
        this.reposition();
    }
    referenceElementHandler() {
        this.removeReferenceListeners();
        this._referenceElement = this.getReferenceElement();
        this.addReferenceListeners();
        this.addReferenceAria();
        this.destroyPopper();
        this.reposition();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        this.addReferenceListeners();
        this.addReferenceAria();
        this.reposition();
    }
    componentDidUnload() {
        this.removeReferenceListeners();
        this.destroyPopper();
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async reposition() {
        const { popper } = this;
        popper ? this.updatePopper(popper) : this.createPopper();
    }
    getReferenceElement() {
        const { referenceElement } = this;
        return ((typeof referenceElement === "string"
            ? document.getElementById(referenceElement)
            : referenceElement) || null);
    }
    getModifiers() {
        return {
            preventOverflow: {
                enabled: false
            },
            hide: {
                enabled: false
            }
        };
    }
    createPopper() {
        const { _referenceElement, el, open, placement } = this;
        if (!_referenceElement || !open) {
            return;
        }
        const newPopper = new popper.Popper(_referenceElement, el, {
            eventsEnabled: false,
            placement: popper.getPlacement(el, placement),
            modifiers: this.getModifiers()
        });
        window.addEventListener("resize", newPopper.scheduleUpdate, {
            passive: true
        });
        this.popper = newPopper;
    }
    updatePopper(popper$1) {
        popper$1.options.placement = popper.getPlacement(this.el, this.placement);
        popper$1.options.modifiers = Object.assign(Object.assign({}, popper$1.options.modifiers), this.getModifiers());
        popper$1.scheduleUpdate();
    }
    destroyPopper() {
        const { popper } = this;
        if (popper) {
            window.removeEventListener("resize", popper.scheduleUpdate);
            popper.destroy();
        }
        this.popper = null;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { _referenceElement, open } = this;
        const displayed = _referenceElement && open;
        return (core.h(core.Host, { role: "tooltip", "aria-hidden": !displayed ? "true" : "false", id: this.getId() }, core.h("div", { class: {
                [CSS.container]: true,
                [CSS.containerOpen]: displayed
            } }, core.h("div", { class: CSS.contentContainer }, core.h("slot", null)))));
    }
    get el() { return core.getElement(this); }
    static get watchers() { return {
        "open": ["openHandler"],
        "placement": ["placementHandler"],
        "referenceElement": ["referenceElementHandler"]
    }; }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-pressed:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-pressed:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-pressed:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-pressed:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-pressed:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-pressed:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-pressed:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-pressed:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-pressed:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-pressed:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}.tooltip-container{visibility:hidden;position:relative;-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15)}.tooltip-container--open{visibility:visible}.tooltip-content-container{background:var(--calcite-ui-foreground);max-width:300px;max-height:300px;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-direction:column;flex-direction:column;font-weight:500;color:var(--calcite-ui-text-1);padding:12px 16px;font-size:.8125rem;line-height:1.5}:host{--calcite-popper-background:#fff}:host([theme=dark]){--calcite-popper-background:#2b2b2b}.tooltip-content-container:after{position:absolute;content:\"\";font-size:0;line-height:0}:host([x-placement=top-start]) .tooltip-content-container:after{left:5px}:host([x-placement=top-start]) .tooltip-content-container:after,:host([x-placement=top]) .tooltip-content-container:after{top:100%;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=top]) .tooltip-content-container:after{left:50%;margin-left:-5px}:host([x-placement=top-end]) .tooltip-content-container:after{top:100%;right:5px;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=right-start]) .tooltip-content-container:after{top:5px}:host([x-placement=right-start]) .tooltip-content-container:after,:host([x-placement=right]) .tooltip-content-container:after{right:100%;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=right]) .tooltip-content-container:after{top:50%;margin-top:-5px}:host([x-placement=right-end]) .tooltip-content-container:after{right:100%;bottom:5px;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=bottom-start]) .tooltip-content-container:after{left:5px}:host([x-placement=bottom-start]) .tooltip-content-container:after,:host([x-placement=bottom]) .tooltip-content-container:after{bottom:100%;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=bottom]) .tooltip-content-container:after{left:50%;margin-left:-5px}:host([x-placement=bottom-end]) .tooltip-content-container:after{bottom:100%;right:5px;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=left-start]) .tooltip-content-container:after{top:5px}:host([x-placement=left-start]) .tooltip-content-container:after,:host([x-placement=left]) .tooltip-content-container:after{left:100%;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=left]) .tooltip-content-container:after{top:50%;margin-top:-5px}:host([x-placement=left-end]) .tooltip-content-container:after{left:100%;bottom:5px;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement*=bottom]) .tooltip-container,:host([x-placement*=top]) .tooltip-container{margin:5px 0}:host([x-placement*=left]) .tooltip-container,:host([x-placement*=right]) .tooltip-container{margin:0 5px}"; }
};

exports.calcite_tooltip = CalciteTooltip;
