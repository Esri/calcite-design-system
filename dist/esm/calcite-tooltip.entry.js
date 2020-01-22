import { r as registerInstance, h, H as Host, g as getElement } from './core-b5a9209a.js';
import './dom-e9ddd61f.js';
import { P as Popper, g as getPlacement } from './popper-4e0f0ab3.js';
import { g as guid } from './guid-cb609d41.js';

const CSS = {
    container: "tooltip-container",
    containerOpen: "tooltip-container--open",
    contentContainer: "tooltip-content-container"
};

const CalciteTooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this._boundariesElement = this.getBoundariesElement();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getId = () => {
            return this.el.id || `calcite-tooltip-${guid()}`;
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
    boundariesElementHandler() {
        this._boundariesElement = this.getBoundariesElement();
        this.destroyPopper();
        this.reposition();
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
    getBoundariesElement() {
        const { boundariesElement } = this;
        return ((typeof boundariesElement === "string"
            ? document.getElementById(boundariesElement)
            : boundariesElement) || null);
    }
    getModifiers() {
        const { _boundariesElement } = this;
        return {
            preventOverflow: {
                enabled: true,
                boundariesElement: _boundariesElement || "viewport",
                escapeWithReference: true
            },
            flip: {
                enabled: true,
                boundariesElement: _boundariesElement || "viewport",
                flipVariationsByContent: true
            }
        };
    }
    createPopper() {
        const { _referenceElement, el, open, placement } = this;
        if (!_referenceElement || !open) {
            return;
        }
        const newPopper = new Popper(_referenceElement, el, {
            placement: getPlacement(el, placement),
            modifiers: this.getModifiers()
        });
        this.popper = newPopper;
    }
    updatePopper(popper) {
        popper.options.placement = getPlacement(this.el, this.placement);
        popper.options.modifiers = Object.assign(Object.assign({}, popper.options.modifiers), this.getModifiers());
        popper.scheduleUpdate();
    }
    destroyPopper() {
        const { popper } = this;
        if (popper) {
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
        return (h(Host, { role: "tooltip", "aria-hidden": !displayed ? "true" : "false", id: this.getId() }, h("div", { class: {
                [CSS.container]: true,
                [CSS.containerOpen]: displayed
            } }, h("div", { class: CSS.contentContainer }, h("slot", null)))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "boundariesElement": ["boundariesElementHandler"],
        "open": ["openHandler"],
        "placement": ["placementHandler"],
        "referenceElement": ["referenceElementHandler"]
    }; }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}.tooltip-container{visibility:hidden;position:relative;-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.16);box-shadow:0 0 16px 0 rgba(0,0,0,.16);border-radius:var(--calcite-border-radius);background:var(--calcite-ui-foreground);overflow:hidden}.tooltip-container--open{visibility:visible}:host([x-out-of-boundaries]) .tooltip-container{visibility:hidden}.tooltip-content-container{max-width:300px;max-height:300px;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-direction:column;flex-direction:column;font-weight:500;color:var(--calcite-ui-text-1);padding:12px 16px;overflow:hidden;font-size:.8125rem;line-height:1.5}.tooltip-content-container:after{position:absolute;content:\"\";font-size:0;line-height:0}:host([x-placement=top-start]) .tooltip-content-container:after{left:5px}:host([x-placement=top-start]) .tooltip-content-container:after,:host([x-placement=top]) .tooltip-content-container:after{top:100%;width:0;border-top:5px solid var(--calcite-ui-foreground);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=top]) .tooltip-content-container:after{left:50%;margin-left:-5px}:host([x-placement=top-end]) .tooltip-content-container:after{top:100%;right:5px;width:0;border-top:5px solid var(--calcite-ui-foreground);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=right-start]) .tooltip-content-container:after{top:5px}:host([x-placement=right-start]) .tooltip-content-container:after,:host([x-placement=right]) .tooltip-content-container:after{right:100%;width:0;border-right:5px solid var(--calcite-ui-foreground);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=right]) .tooltip-content-container:after{top:50%;margin-top:-5px}:host([x-placement=right-end]) .tooltip-content-container:after{right:100%;bottom:5px;width:0;border-right:5px solid var(--calcite-ui-foreground);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=bottom-start]) .tooltip-content-container:after{left:5px}:host([x-placement=bottom-start]) .tooltip-content-container:after,:host([x-placement=bottom]) .tooltip-content-container:after{bottom:100%;width:0;border-bottom:5px solid var(--calcite-ui-foreground);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=bottom]) .tooltip-content-container:after{left:50%;margin-left:-5px}:host([x-placement=bottom-end]) .tooltip-content-container:after{bottom:100%;right:5px;width:0;border-bottom:5px solid var(--calcite-ui-foreground);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=left-start]) .tooltip-content-container:after{top:5px}:host([x-placement=left-start]) .tooltip-content-container:after,:host([x-placement=left]) .tooltip-content-container:after{left:100%;width:0;border-left:5px solid var(--calcite-ui-foreground);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=left]) .tooltip-content-container:after{top:50%;margin-top:-5px}:host([x-placement=left-end]) .tooltip-content-container:after{left:100%;bottom:5px;width:0;border-left:5px solid var(--calcite-ui-foreground);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement*=bottom]) .tooltip-container,:host([x-placement*=top]) .tooltip-container{margin:5px 0}:host([x-placement*=left]) .tooltip-container,:host([x-placement*=right]) .tooltip-container{margin:0 5px}"; }
};

export { CalciteTooltip as calcite_tooltip };
