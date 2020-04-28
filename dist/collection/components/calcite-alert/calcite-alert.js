import { Component, Element, Event, h, Host, Method, Listen, Prop, } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { guid } from "../../utils/guid";
/** Alerts are meant to provide a way to communicate urgent or important information to users, frequently as a result of an action they took in your app. Alerts are positioned
 * at the bottom of the page. Multiple opened alerts will be added to a queue, allowing users to dismiss them in the order they are provided. You can keep alerts in your DOM or create/open, close/destroy
 * as needed.
 */
/**
 * @slot alert-title - Title of the alert (optional)
 * @slot alert-message - Main text of the alert
 * @slot alert-link - Optional action to take from the alert (undo, try again, link to page, etc.)
 */
export class CalciteAlert {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //---------------------------------------------------------------------------
        /** Is the alert currently active or not */
        this.active = false;
        /** Close the alert automatically (recommended for passive, non-blocking alerts) */
        this.autoDismiss = false;
        /** Duration of autoDismiss (only used with `autoDismiss`) */
        this.autoDismissDuration = this.autoDismiss ? "medium" : null;
        /** Color for the alert (will apply to top border and icon) */
        this.color = "blue";
        /** specify the scale of the button, defaults to m */
        this.scale = "m";
        /** specify if the alert should display an icon */
        this.icon = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** a managed list of alerts */
        this.alertQueue = [];
        /** Unique ID for this alert */
        this.alertId = this.el.id || `calcite-alert-${guid()}`;
        /** map dismissal durations */
        this.autoDismissDurations = {
            slow: 14000,
            medium: 10000,
            fast: 6000,
        };
        this.iconDefaults = {
            green: "checkCircle",
            yellow: "exclamationMarkTriangle",
            red: "exclamationMarkTriangle",
            blue: "lightbulb",
        };
    }
    // listen for emitted open event from other calcite alerts and determine active state
    alertOpen(event) {
        this.calciteAlertSync.emit({ alertQueue: this.alertQueue });
        if (!this.alertQueue.includes(event.detail.requestedAlert)) {
            this.alertQueue.push(event.detail.requestedAlert);
        }
        this.determineActiveAlert();
    }
    // listen for emitted close event from other calcite alerts and determine active state
    alertClose(event) {
        if (this.alertQueue.includes(event.detail.requestedAlert)) {
            this.alertQueue = this.alertQueue.filter((e) => e !== event.detail.requestedAlert);
        }
        if (this.alertId === event.detail.requestedAlert)
            this.active = false;
        this.determineActiveAlert();
    }
    // when an alert is opened / added to dom, update the queue to match any previously present queues
    alertRegister(event) {
        if (this.alertQueue !== event.detail.alertQueue) {
            this.alertQueue = event.detail.alertQueue;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let colors = ["blue", "red", "green", "yellow"];
        if (!colors.includes(this.color))
            this.color = "blue";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let durations = ["slow", "medium", "fast"];
        if (this.autoDismissDuration !== null &&
            !durations.includes(this.autoDismissDuration)) {
            this.autoDismissDuration = "medium";
        }
    }
    componentDidLoad() {
        this.alertLinkEl = this.el.querySelectorAll("calcite-link")[0];
    }
    render() {
        const dir = getElementDir(this.el);
        const closeButton = (h("button", { class: "alert-close", "aria-label": "close", onClick: () => this.close(), ref: (el) => (this.closeButton = el) },
            h("calcite-icon", { icon: "x", scale: "m" })));
        const count = (h("div", { class: `${this.alertQueue.length > 1 ? "active " : ""}alert-count` },
            "+",
            this.alertQueue.length > 2 ? this.alertQueue.length - 1 : 1));
        const progress = h("div", { class: "alert-dismiss-progress" });
        const role = !this.active
            ? null
            : this.autoDismiss
                ? "alert"
                : "alertdialog";
        return (h(Host, { active: this.active, role: role, dir: dir },
            this.icon ? this.setIcon() : null,
            h("div", { class: "alert-content" },
                h("slot", { name: "alert-title" }),
                h("slot", { name: "alert-message" }),
                h("slot", { name: "alert-link" })),
            count,
            !this.autoDismiss ? closeButton : null,
            this.active && this.autoDismiss ? progress : null));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** open alert and emit the opened alert  */
    async open() {
        this.calciteAlertOpen.emit({
            requestedAlert: this.alertId,
            alertQueue: this.alertQueue,
        });
    }
    /** close alert and emit the closed alert */
    async close() {
        this.calciteAlertClose.emit({
            requestedAlert: this.alertId,
            alertQueue: this.alertQueue,
        });
    }
    /** focus the close button, if present and requested */
    async setFocus() {
        if (!this.closeButton && !this.alertLinkEl) {
            return;
        }
        if (this.alertLinkEl)
            this.alertLinkEl.setFocus();
        else if (this.closeButton) {
            this.closeButton.focus();
        }
    }
    /** based on the current alert determine which alert is active */
    determineActiveAlert() {
        this.alertQueueLength = this.alertQueue.length;
        this.currentAlert = this.alertQueue.length > 0 ? this.alertQueue[0] : null;
        if (!this.active && this.currentAlert === this.alertId) {
            setTimeout(() => (this.active = true), 300);
            if (this.autoDismiss) {
                setTimeout(() => this.close(), this.autoDismissDurations[this.autoDismissDuration]);
            }
        }
    }
    setIcon() {
        var path = this.iconDefaults[this.color];
        return (h("div", { class: "alert-icon" },
            h("calcite-icon", { icon: path, scale: "m" })));
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
        "active": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Is the alert currently active or not"
            },
            "attribute": "active",
            "reflect": true,
            "defaultValue": "false"
        },
        "autoDismiss": {
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
            "attribute": "auto-dismiss",
            "reflect": false,
            "defaultValue": "false"
        },
        "autoDismissDuration": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"fast\"\n    | \"medium\"\n    | \"slow\"",
                "resolved": "\"fast\" | \"medium\" | \"slow\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Duration of autoDismiss (only used with `autoDismiss`)"
            },
            "attribute": "auto-dismiss-duration",
            "reflect": true,
            "defaultValue": "this.autoDismiss ? \"medium\" : null"
        },
        "color": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"blue\"\n    | \"green\"\n    | \"red\"\n    | \"yellow\"",
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
            "mutable": true,
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
            "reflect": true
        },
        "scale": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"s\" | \"m\" | \"l\"",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the scale of the button, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
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
                "text": "specify if the alert should display an icon"
            },
            "attribute": "icon",
            "reflect": false,
            "defaultValue": "false"
        },
        "alertQueue": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "a managed list of alerts"
            },
            "defaultValue": "[]"
        },
        "alertQueueLength": {
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
                "tags": [],
                "text": "a managed list of alerts"
            },
            "attribute": "alert-queue-length",
            "reflect": false
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
                "tags": [],
                "text": "the determined current alert"
            },
            "attribute": "current-alert",
            "reflect": false
        }
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
        }, {
            "method": "calciteAlertSync",
            "name": "calciteAlertSync",
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
        "open": {
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
                "text": "open alert and emit the opened alert",
                "tags": []
            }
        },
        "close": {
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
                "text": "close alert and emit the closed alert",
                "tags": []
            }
        },
        "setFocus": {
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
                "text": "focus the close button, if present and requested",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "calciteAlertOpen",
            "method": "alertOpen",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "calciteAlertClose",
            "method": "alertClose",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "calciteAlertSync",
            "method": "alertRegister",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
