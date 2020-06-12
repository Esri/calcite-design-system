import { r as registerInstance, h, H as Host, g as getElement } from './index-d518aa55.js';
import { g as getElementDir } from './dom-5f44ff8d.js';

const calciteLinkCss = ":host([hidden]){display:none}:host{display:inline;--calcite-blue-accessible:#00619b;--calcite-red-accessible:#a82b1e;--calcite-link-blue-underline:rgba(0, 97, 155, 0.4);--calcite-link-red-underline:rgba(168, 43, 30, 0.4)}:host([theme=dark]){--calcite-blue-accessible:#00A0FF;--calcite-red-accessible:#FE583E;--calcite-link-blue-underline:rgba(0, 160, 255, 0.4);--calcite-link-red-underline:rgba(254, 88, 62, 0.4)}:host a,:host span{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;text-decoration:none;border-radius:0;border:none;line-height:inherit;font-size:inherit;font-family:inherit;-webkit-appearance:none;cursor:pointer;text-align:center;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host a:hover,:host span:hover{text-decoration:none}:host a,:host span{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host a:focus,:host span:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.calcite-link--icon{-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([disabled]) span,:host([disabled]) a{pointer-events:none;opacity:0.4}:host([icon-position=start]) .calcite-link--icon{margin-right:0.5rem}:host([icon-position=start][dir=rtl]) .calcite-link--icon{margin-right:0;margin-left:0.5rem}:host([icon-position=end]) .calcite-link--icon{margin-left:0.5rem}:host([icon-position=end][dir=rtl]) .calcite-link--icon{margin-left:0;margin-right:0.5rem}:host([icon-position=start]) .calcite-link--icon{margin-right:0.375rem}:host([icon-position=start][dir=rtl]) .calcite-link--icon{margin-left:0.375rem;margin-right:0}:host([icon-position=end]) .calcite-link--icon{margin-left:0.375rem}:host([icon-position=end][dir=rtl]) .calcite-link--icon{margin-left:0;margin-right:0.375rem}:host([color=blue]) span,:host([color=blue]) a{display:inline;padding:0;border:none;color:var(--calcite-blue-accessible);line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(var(--calcite-link-blue-underline)), to(var(--calcite-link-blue-underline)));background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-link-blue-underline), var(--calcite-link-blue-underline));background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=blue]) span:hover,:host([color=blue]) span:focus,:host([color=blue]) a:hover,:host([color=blue]) a:focus{color:var(--calcite-ui-blue-1);background-size:100% 1px, 100% 1px}:host([color=blue]) span:hover .calcite-link--icon,:host([color=blue]) span:focus .calcite-link--icon,:host([color=blue]) a:hover .calcite-link--icon,:host([color=blue]) a:focus .calcite-link--icon{fill:var(--calcite-ui-blue-1)}:host([color=blue]) span:active,:host([color=blue]) a:active{color:var(--calcite-blue-accessible);background-size:100% 2px, 100% 2px}:host([color=red]) span,:host([color=red]) a{display:inline;padding:0;border:none;color:var(--calcite-red-accessible);line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(var(--calcite-link-red-underline)), to(var(--calcite-link-red-underline)));background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-link-red-underline), var(--calcite-link-red-underline));background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=red]) span:hover,:host([color=red]) span:focus,:host([color=red]) a:hover,:host([color=red]) a:focus{color:var(--calcite-ui-red-1);background-size:100% 1px, 100% 1px}:host([color=red]) span:hover .calcite-link--icon,:host([color=red]) span:focus .calcite-link--icon,:host([color=red]) a:hover .calcite-link--icon,:host([color=red]) a:focus .calcite-link--icon{fill:var(--calcite-ui-red-1)}:host([color=red]) span:active,:host([color=red]) a:active{color:var(--calcite-red-accessible);background-size:100% 2px, 100% 2px}:host([color=light]) span,:host([color=light]) a{display:inline;padding:0;border:none;color:#f3f3f3;line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(#aaaaaa), to(#aaaaaa));background-image:linear-gradient(currentColor, currentColor), linear-gradient(#aaaaaa, #aaaaaa);background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=light]) span:hover,:host([color=light]) span:focus,:host([color=light]) a:hover,:host([color=light]) a:focus{color:#ffffff;background-size:100% 1px, 100% 1px}:host([color=light]) span:hover .calcite-link--icon,:host([color=light]) span:focus .calcite-link--icon,:host([color=light]) a:hover .calcite-link--icon,:host([color=light]) a:focus .calcite-link--icon{fill:#ffffff}:host([color=light]) span:active,:host([color=light]) a:active{color:#f3f3f3;background-size:100% 2px, 100% 2px}:host([color=dark]) span,:host([color=dark]) a{display:inline;padding:0;border:none;color:#2b2b2b;line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(#808080), to(#808080));background-image:linear-gradient(currentColor, currentColor), linear-gradient(#808080, #808080);background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=dark]) span:hover,:host([color=dark]) span:focus,:host([color=dark]) a:hover,:host([color=dark]) a:focus{color:#404040;background-size:100% 1px, 100% 1px}:host([color=dark]) span:hover .calcite-link--icon,:host([color=dark]) span:focus .calcite-link--icon,:host([color=dark]) a:hover .calcite-link--icon,:host([color=dark]) a:focus .calcite-link--icon{fill:#404040}:host([color=dark]) span:active,:host([color=dark]) a:active{color:#2b2b2b;background-size:100% 2px, 100% 2px}:host([dir=rtl]) span,:host([dir=rtl]) a{background-position:100% 100%, 100% 100%}";

const CalciteLink = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** specify the color of the link, defaults to blue */
        this.color = "blue";
        /** optionally used with icon, select where to position the icon */
        this.iconPosition = "start";
        /** the node type of the rendered child element */
        this.childElType = "span";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
        let iconPosition = ["start", "end"];
        if (this.icon !== null && !iconPosition.includes(this.iconPosition))
            this.iconPosition = "start";
        this.childElType = this.href ? "a" : "span";
    }
    render() {
        const dir = getElementDir(this.el);
        const attributes = this.getAttributes();
        const Tag = this.childElType;
        const role = this.childElType === "span" ? "link" : null;
        const tabIndex = this.childElType === "span" ? 0 : null;
        const iconEl = (h("calcite-icon", { class: "calcite-link--icon", icon: this.icon, scale: "s" }));
        return (h(Host, { dir: dir }, h(Tag, Object.assign({}, attributes, { role: role, tabindex: tabIndex, ref: (el) => (this.childEl = el) }), this.icon && this.iconPosition === "start" ? iconEl : null, h("slot", null), this.icon && this.iconPosition === "end" ? iconEl : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    async setFocus() {
        this.childEl.focus();
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = ["color", "dir", "icon", "iconPosition", "id", "theme"];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    get el() { return getElement(this); }
};
CalciteLink.style = calciteLinkCss;

export { CalciteLink as calcite_link };
