import { h, Host } from "@stencil/core";
import { lightbulb24F, exclamationMarkTriangle24F, checkCircle24F, x32 } from "@esri/calcite-ui-icons";
import { getElementDir } from "../../utils/dom";
import AlertInterface from "../../interfaces/AlertInterface";
/** Alerts are not meant to be used inline with content, or be present in view on page load.
 * As such, calcite-alert relies on calcite-alerts for positioning - displaying an alert on its own
 * will lead to unexpected and potentially undesireable results
 */
/**
 * @slot alert-title - Title of the alert (optional)
 * @slot alert-message - Main text of the alert
 * @slot alert-link - Optional action to take from the alert (undo, try again, link to page, etc.)
 */
export class CalciteAlert {
    constructor() {
        /** Is the alert currently active or not */
        this.active = false;
        /** Close the alert automatically (recommended for passive, non-blocking alerts) */
        this.dismiss = false;
        /** Length before autodismissal (only used with `dismiss`) */
        this.duration = this.dismiss
            ? "medium"
            : null;
        /** Color for the alert (will apply to top border and icon) */
        this.color = "blue";
        /** Select theme (light or dark) */
        this.theme = "light";
        /** If false, no icon will be shown in the alert */
        this.icon = false;
        /** Unique ID for this alert */
        /** @internal */
        this.alertId = this.el.id;
        /** @internal */
        this.currentAlert = "";
        /** @internal */
        this.queueLength = 0;
        this.durationDefaults = {
            slow: 14000,
            medium: 10000,
            fast: 6000
        };
        this.iconDefaults = {
            green: checkCircle24F,
            yellow: exclamationMarkTriangle24F,
            red: exclamationMarkTriangle24F,
            blue: lightbulb24F
        };
    }
    /** watch for changes to currentAlert passed from <calcite-alerts> */
    watchCurrentAlert() {
        if (!this.active && this.currentAlert === this.alertId) {
            if (this.dismiss)
                setTimeout(() => this.closeCalciteAlert(), this.durationDefaults[this.duration]);
            setTimeout(() => (this.active = true), 300);
        }
        else {
            this.active = false;
        }
    }
    /** emit the `calciteAlertClose` event - <calcite-alerts> listens for this */
    async closeCalciteAlert() {
        this.calciteAlertClose.emit({ requestedAlert: this.alertId });
    }
    /**  emit the `calciteAlertOpen` event - <calcite-alerts> listens for this  */
    async openCalciteAlert() {
        this.calciteAlertOpen.emit({ requestedAlert: this.alertId });
    }
    connectedCallback() {
        // prop validations
        let colors = ["blue", "red", "green", "yellow"];
        if (!colors.includes(this.color))
            this.color = "blue";
        let durations = ["slow", "medium", "fast"];
        if (this.duration !== null && !durations.includes(this.duration))
            this.duration = "medium";
        let themes = ["dark", "light"];
        if (!themes.includes(this.theme))
            this.theme = "light";
    }
    setIcon() {
        var path = this.iconDefaults[this.color];
        return (h("div", { class: "alert-icon" },
            h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 24 24" },
                h("path", { d: path }))));
    }
    render() {
        const dir = getElementDir(this.el);
        const closeButton = (h("button", { class: "alert-close", "aria-label": "close", onClick: () => this.closeCalciteAlert() },
            h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "32", width: "32", viewBox: "0 0 32 32" },
                h("path", { d: x32 }))));
        const close = !this.dismiss ? closeButton : "";
        const icon = this.icon ? this.setIcon() : "";
        const count = (h("div", { class: `${this.queueLength > 0 ? "active " : ""}alert-count` },
            "+",
            this.queueLength > 0 ? this.queueLength : 1));
        const progress = this.active && this.dismiss ? h("div", { class: "alert-dismiss" }) : "";
        return (h(Host, { active: this.active, dir: dir },
            icon,
            h("div", { class: "alert-content" },
                h("slot", { name: "alert-title" }),
                h("slot", { name: "alert-message" }),
                h("slot", { name: "alert-link" })),
            count,
            close,
            progress));
    }
    static get is() { return "calcite-alert"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-alert.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-alert.css"]
    }; }
    static get properties() { return {
        "dismiss": {
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
                "text": "Close the alert automatically (recommended for passive, non-blocking alerts)"
            },
            "attribute": "dismiss",
            "reflect": false,
            "defaultValue": "false"
        },
        "duration": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"fast\" | \"medium\" | \"slow\"",
                "resolved": "\"fast\" | \"medium\" | \"slow\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Length before autodismissal (only used with `dismiss`)"
            },
            "attribute": "duration",
            "reflect": true,
            "defaultValue": "this.dismiss\n    ? \"medium\"\n    : null"
        },
        "color": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"blue\" | \"green\" | \"red\" | \"yellow\"",
                "resolved": "\"blue\" | \"green\" | \"red\" | \"yellow\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Color for the alert (will apply to top border and icon)"
            },
            "attribute": "color",
            "reflect": true,
            "defaultValue": "\"blue\""
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"light\" | \"dark\"",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Select theme (light or dark)"
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
        },
        "icon": {
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
                "text": "If false, no icon will be shown in the alert"
            },
            "attribute": "icon",
            "reflect": false,
            "defaultValue": "false"
        },
        "alertId": {
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
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "alert-id",
            "reflect": false,
            "defaultValue": "this.el.id"
        },
        "currentAlert": {
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
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "current-alert",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "queueLength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "queue-length",
            "reflect": false,
            "defaultValue": "0"
        }
    }; }
    static get states() { return {
        "active": {}
    }; }
    static get events() { return [{
            "method": "calciteAlertClose",
            "name": "calciteAlertClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fired when an alert is closed"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteAlertOpen",
            "name": "calciteAlertOpen",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fired when an alert is opened"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "closeCalciteAlert": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "emit the `calciteAlertClose` event - <calcite-alerts> listens for this",
                "tags": []
            }
        },
        "openCalciteAlert": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "emit the `calciteAlertOpen` event - <calcite-alerts> listens for this",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "currentAlert",
            "methodName": "watchCurrentAlert"
        }]; }
}
AlertInterface.injectProps(CalciteAlert, ["currentAlert", "queueLength"]);
