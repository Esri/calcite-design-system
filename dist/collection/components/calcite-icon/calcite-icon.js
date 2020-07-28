import { Build, Component, Element, h, Host, Prop, State, Watch, } from "@stencil/core";
import { CSS } from "./resources";
import { getElementDir } from "../../utils/dom";
import { fetchIcon, scaleToPx } from "./utils";
export class CalciteIcon {
    constructor() {
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
        return (h(Host, { "aria-label": semantic ? textLabel : null, role: semantic ? "img" : null },
            h("svg", { class: {
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
        if (!Build.isBrowser || !icon || !visible) {
            return;
        }
        this.pathData = await fetchIcon({ icon, scale });
    }
    waitUntilVisible(callback) {
        if (!Build.isBrowser ||
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
    static get is() { return "calcite-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-icon.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-icon.css"]
    }; }
    static get assetsDirs() { return ["assets"]; }
    static get properties() { return {
        "icon": {
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
                "text": "The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/."
            },
            "attribute": "icon",
            "reflect": true,
            "defaultValue": "null"
        },
        "mirrored": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "When true, the icon will be mirrored when the element direction is 'rtl'."
            },
            "attribute": "mirrored",
            "reflect": true,
            "defaultValue": "false"
        },
        "scale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "IconScale",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {
                    "IconScale": {
                        "location": "import",
                        "path": "../../interfaces/Icon"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Icon scale. Can be \"s\" | \"m\" | \"l\"."
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "textLabel": {
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
                "text": "The icon label.\n\nIt is recommended to set this value if your icon is semantic."
            },
            "attribute": "text-label",
            "reflect": false
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Theme",
                "resolved": "\"dark\" | \"light\"",
                "references": {
                    "Theme": {
                        "location": "import",
                        "path": "../../interfaces/common"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Icon theme. Can be \"light\" or \"dark\"."
            },
            "attribute": "theme",
            "reflect": true
        }
    }; }
    static get states() { return {
        "pathData": {},
        "visible": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "icon",
            "methodName": "loadIconPathData"
        }, {
            "propName": "scale",
            "methodName": "loadIconPathData"
        }]; }
}
