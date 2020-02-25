import { d as getAssetPath, r as registerInstance, h, H as Host, g as getElement } from './core-30c05663.js';
import { g as getElementDir } from './dom-0361c8d2.js';

const CSS = {
    icon: "icon",
    mirrored: "mirrored"
};

/**
 * Icon data cache.
 * Exported for testing purposes.
 * @private
 */
const iconCache = {};
/**
 * Icon request cache.
 * Exported for testing purposes.
 * @private
 */
const requestCache = {};
const scaleToPx = {
    s: 16,
    m: 24,
    l: 32
};
async function fetchIcon({ icon, scale, filled }) {
    const size = scaleToPx[scale];
    const id = `${normalizeIconName(icon)}${size}${filled ? "F" : ""}`;
    if (iconCache[id]) {
        return iconCache[id];
    }
    const request = requestCache[id] ||
        (requestCache[id] = import(getAssetPath(`./assets/${id}.js`)));
    const module = await request;
    const pathData = module[id];
    iconCache[id] = pathData;
    return pathData;
}
/**
 * Normalize the icon name to match the path data module exports.
 * Exported for testing purposes.
 * @private
 */
function normalizeIconName(name) {
    const numberLeadingName = !isNaN(Number(name.charAt(0)));
    const parts = name.split("-");
    if (parts.length === 1) {
        return numberLeadingName ? `i${name}` : name;
    }
    return parts
        .map((part, index) => {
        if (index === 0) {
            return numberLeadingName ? `i${part.toUpperCase()}` : part;
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
    })
        .join("");
}

const CalciteIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * When true, the icon will be filled.
         */
        this.filled = false;
        /**
         * The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/.
         */
        this.icon = null;
        /**
         * When true, the icon will be mirrored when the element direction is 'rtl'.
         */
        this.mirrored = false;
        /**
         * Icon scale. Can be "s" | "m" | "l".
         */
        this.scale = "m";
        /**
         * Icon theme. Can be "light" or "dark".
         */
        this.theme = "light";
        this.visible = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.waitUntilVisible(() => {
            this.visible = true;
            this.loadIconPathData();
        });
    }
    disconnectedCallback() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
        }
    }
    async componentWillLoad() {
        this.loadIconPathData();
    }
    render() {
        const { el, mirrored, pathData, scale, textLabel } = this;
        const dir = getElementDir(el);
        const size = scaleToPx[scale];
        const semantic = !!textLabel;
        return (h(Host, { "aria-label": semantic ? textLabel : null, role: semantic ? "img" : null }, h("svg", { class: {
                [CSS.mirrored]: dir === "rtl" && mirrored
            }, xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", height: size, width: size, viewBox: `0 0 ${size} ${size}` }, h("path", { d: pathData }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    async loadIconPathData() {
        const { filled, icon, scale, visible } = this;
        if ( !icon || !visible) {
            return;
        }
        this.pathData = await fetchIcon({ icon, scale, filled });
    }
    waitUntilVisible(callback) {
        if (
            typeof window === "undefined" ||
            !window.IntersectionObserver) {
            callback();
            return;
        }
        this.intersectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.intersectionObserver.disconnect();
                    this.intersectionObserver = null;
                    callback();
                }
            });
        }, { rootMargin: "50px" });
        this.intersectionObserver.observe(this.el);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "icon": ["loadIconPathData"],
        "filled": ["loadIconPathData"],
        "size": ["loadIconPathData"]
    }; }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{display:-ms-inline-flexbox;display:inline-flex}.mirror{-webkit-transform:scaleX(-1);transform:scaleX(-1)}"; }
};

export { CalciteIcon as calcite_icon };
