import { h, r as registerInstance, H as Host, g as getElement } from './core-2154eb68.js';
import './dom-e9ddd61f.js';
import { P as Popper, g as getPlacement } from './popper-4e0f0ab3.js';
import { x as x16 } from './index-dc732c5a.js';
import { g as guid } from './guid-cb609d41.js';

const CSS = {
    container: "container",
    containerOpen: "container--open",
    containerPointer: "container--pointer",
    contentContainer: "content-container",
    imageContainer: "image-container",
    closeButton: "close-button",
    content: "content"
};

const CalciteIcon = ({ path, size, svgAttributes, title }) => (h("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: size, width: size, fill: "currentColor", viewBox: `0 0 ${size} ${size}` }, svgAttributes),
    title ? h("title", null, title) : null,
    h("path", { d: path })));

const CalcitePopover = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Adds a click handler to the referenceElement to toggle open the Popover.
         */
        this.addClickHandle = false;
        /**
         * Display a close button within the Popover.
         */
        this.closeButton = false;
        /**
         * Prevents flipping the popover's placement when it starts to overlap its reference element.
         */
        this.disableFlip = false;
        /**
         * Removes the caret pointer.
         */
        this.disablePointer = false;
        /**
         * Makes the popover flow toward the inner of the reference element.
         */
        this.flowInner = false;
        /**
         * Display and position the component.
         */
        this.open = false;
        /**
         * Determines where the component will be positioned relative to the referenceElement.
         */
        this.placement = "auto";
        /** Text for close button. */
        this.textClose = "Close";
        /** Select theme (light or dark) */
        this.theme = "light";
        /**
         * Offset the position of the popover in the horizontal direction.
         */
        this.xOffset = 0;
        /**
         * Offset the position of the popover in the vertical direction.
         */
        this.yOffset = 0;
        this._referenceElement = this.getReferenceElement();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getId = () => {
            return this.el.id || `calcite-popover-${guid()}`;
        };
        this.addReferenceAria = () => {
            const { _referenceElement } = this;
            if (_referenceElement &&
                !_referenceElement.hasAttribute("aria-describedby")) {
                _referenceElement.setAttribute("aria-describedby", this.getId());
            }
        };
        this.clickHandler = () => {
            this.toggle();
        };
        this.addReferenceListener = () => {
            const { _referenceElement, addClickHandle } = this;
            if (!_referenceElement || !addClickHandle) {
                return;
            }
            _referenceElement.addEventListener("click", this.clickHandler);
        };
        this.removeReferenceListener = () => {
            const { _referenceElement } = this;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.removeEventListener("click", this.clickHandler);
        };
        this.hide = () => {
            this.open = false;
        };
    }
    interactionElementHandler() {
        this.removeReferenceListener();
        this.addReferenceListener();
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
        this.destroyPopper();
        this.reposition();
    }
    referenceElementHandler() {
        this.removeReferenceListener();
        this._referenceElement = this.getReferenceElement();
        this.addReferenceListener();
        this.addReferenceAria();
        this.destroyPopper();
        this.reposition();
    }
    xOffsetHandler() {
        this.destroyPopper();
        this.reposition();
    }
    yOffsetHandler() {
        this.destroyPopper();
        this.reposition();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        this.reposition();
        this.addReferenceListener();
        this.addReferenceAria();
    }
    componentDidUnload() {
        this.removeReferenceListener();
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
    async toggle() {
        this.open = !this.open;
    }
    getReferenceElement() {
        const { referenceElement } = this;
        return ((typeof referenceElement === "string"
            ? document.getElementById(referenceElement)
            : referenceElement) || null);
    }
    getModifiers() {
        const verticalRE = /top|bottom/gi;
        const autoRE = /auto/gi;
        const { disableFlip, flowInner, placement, xOffset, yOffset } = this;
        const offsetEnabled = !!(yOffset || xOffset) && !autoRE.test(placement);
        const offsets = [yOffset, xOffset];
        if (verticalRE.test(placement)) {
            offsets.reverse();
        }
        return {
            preventOverflow: {
                enabled: false
            },
            flip: {
                enabled: !disableFlip
            },
            hide: {
                enabled: false
            },
            inner: {
                enabled: flowInner
            },
            offset: {
                enabled: !!offsetEnabled,
                offset: offsets.join(",")
            }
        };
    }
    createPopper() {
        const { el, open, placement, _referenceElement } = this;
        if (!_referenceElement || !open) {
            return;
        }
        const newPopper = new Popper(_referenceElement, el, {
            eventsEnabled: false,
            placement: getPlacement(el, placement),
            modifiers: this.getModifiers()
        });
        window.addEventListener("resize", newPopper.scheduleUpdate, {
            passive: true
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
    renderImage() {
        return this.el.querySelector("[slot=image]") ? (h("div", { class: CSS.imageContainer }, h("slot", { name: "image" }))) : null;
    }
    renderCloseButton() {
        const { closeButton, textClose } = this;
        return closeButton ? (h("button", { "aria-label": textClose, title: textClose, class: { [CSS.closeButton]: true }, onClick: this.hide }, h(CalciteIcon, { size: "16", path: x16 }))) : null;
    }
    render() {
        const { _referenceElement, open, disablePointer } = this;
        const displayed = _referenceElement && open;
        return (h(Host, { role: "dialog", "aria-hidden": !displayed ? "true" : "false", id: this.getId() }, h("div", { class: {
                [CSS.container]: true,
                [CSS.containerOpen]: displayed,
                [CSS.containerPointer]: !disablePointer
            } }, h("div", { class: CSS.contentContainer }, this.renderImage(), h("div", { class: CSS.content }, h("slot", null), this.renderCloseButton())))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "addClickHandle": ["interactionElementHandler"],
        "open": ["openHandler"],
        "placement": ["placementHandler"],
        "referenceElement": ["referenceElementHandler"],
        "xOffset": ["xOffsetHandler"],
        "yOffset": ["yOffsetHandler"]
    }; }
    static get style() { return ":root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-popover-background:#fff;--calcite-popover-primary-text:var(--calcite-global-ui-text-1);--calcite-popover-close-hover:#f3f3f3;--calcite-popover-close-pressed:#eaeaea;display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}:host([theme=dark]){--calcite-popover-background:#2b2b2b;--calcite-popover-primary-text:#fff;--calcite-popover-close-hover:#353535;--calcite-popover-close-pressed:#404040}.container{-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15);visibility:hidden;position:relative}.container--open{visibility:visible}.content-container{max-width:350px;-ms-flex-direction:column;flex-direction:column;background:var(--calcite-popover-background);color:var(--calcite-popover-primary-text)}.content,.content-container{display:-ms-flexbox;display:flex}.content{-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;line-height:24px}.close-button{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;width:40px;height:45px;z-index:1;background:var(--calcite-popover-background);color:var(--calcite-popover-primary-text);padding:16px 12px;border:none;display:block;cursor:pointer;border-top-right-radius:2px}.close-button:hover{background:var(--calcite-popover-close-hover)}.close-button:active{background:var(--calcite-popover-close-pressed)}.image-container{overflow:hidden;max-height:200px;margin:5px}slot[name=image]::slotted(img){height:auto;width:100%;max-height:200px;-o-object-position:50% 50%;object-position:50% 50%;-o-object-fit:cover;object-fit:cover}:host{--calcite-popper-background:#fff}:host([theme=dark]){--calcite-popper-background:#2b2b2b}.container--pointer .content-container:after{position:absolute;content:\"\";font-size:0;line-height:0}:host([x-placement=top-start]) .container--pointer .content-container:after{top:100%;left:5px;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=top]) .container--pointer .content-container:after{top:100%;left:50%;margin-left:-5px;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=top-end]) .container--pointer .content-container:after{top:100%;right:5px;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=right-start]) .container--pointer .content-container:after{right:100%;top:5px;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=right]) .container--pointer .content-container:after{right:100%;top:50%;margin-top:-5px;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=right-end]) .container--pointer .content-container:after{right:100%;bottom:5px;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=bottom-start]) .container--pointer .content-container:after{bottom:100%;left:5px;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=bottom]) .container--pointer .content-container:after{bottom:100%;left:50%;margin-left:-5px;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=bottom-end]) .container--pointer .content-container:after{bottom:100%;right:5px;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=left-start]) .container--pointer .content-container:after{left:100%;top:5px;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=left]) .container--pointer .content-container:after{left:100%;top:50%;margin-top:-5px;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=left-end]) .container--pointer .content-container:after{left:100%;bottom:5px;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement*=bottom]) .container--pointer,:host([x-placement*=top]) .container--pointer{margin:5px 0}:host([x-placement*=left]) .container--pointer,:host([x-placement*=right]) .container--pointer{margin:0 5px}"; }
};

export { CalcitePopover as calcite_popover };
