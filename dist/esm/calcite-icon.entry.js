import { d as getAssetPath, r as registerInstance, h, H as Host, g as getElement } from './index-d518aa55.js';
import { g as getElementDir } from './dom-5f44ff8d.js';

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
    l: 32,
};
async function fetchIcon({ icon, scale, }) {
    const size = scaleToPx[scale];
    const name = normalizeIconName(icon);
    const filled = name.charAt(name.length - 1) === "F";
    const iconName = filled ? name.substring(0, name.length - 1) : name;
    const id = `${iconName}${size}${filled ? "F" : ""}`;
    if (iconCache[id]) {
        return iconCache[id];
    }
    if (!requestCache[id]) {
        requestCache[id] = fetch(getAssetPath(`./assets/${id}.json`))
            .then((resp) => resp.json())
            .catch(() => {
            console.error(`"${id}" is not a valid calcite-ui-icon name`);
            return "";
        });
    }
    const path = await requestCache[id];
    iconCache[id] = path;
    return path;
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

const calciteIconCss = ":host([hidden]){display:none}:host{display:-ms-inline-flexbox;display:inline-flex}.mirrored{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.svg{display:block}";

const CalciteIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
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
        const paths = [].concat(pathData || "");
        return (h(Host, { "aria-label": semantic ? textLabel : null, role: semantic ? "img" : null }, h("svg", { class: {
                [CSS.mirrored]: dir === "rtl" && mirrored,
                svg: true,
            }, xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", height: size, width: size, viewBox: `0 0 ${size} ${size}` }, paths.map((path) => typeof path === "string" ? (h("path", { d: path })) : (h("path", { d: path.d, opacity: "opacity" in path ? path.opacity : 1 }))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    async loadIconPathData() {
        const { icon, scale, visible } = this;
        if ( !icon || !visible) {
            return;
        }
        this.pathData = await fetchIcon({ icon, scale });
    }
    waitUntilVisible(callback) {
        if (
            typeof window === "undefined" ||
            !window.IntersectionObserver) {
            callback();
            return;
        }
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
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
        "scale": ["loadIconPathData"]
    }; }
};
CalciteIcon.style = calciteIconCss;

export { CalciteIcon as calcite_icon };
