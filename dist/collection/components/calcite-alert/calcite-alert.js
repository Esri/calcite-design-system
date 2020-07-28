import { Component, Element, Event, h, Host, Method, Listen, Prop, State, Watch } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { TEXT } from "./calcite-alert.resources";
/** Alerts are meant to provide a way to communicate urgent or important information to users, frequently as a result of an action they took in your app. Alerts are positioned
 * at the bottom of the page. Multiple opened alerts will be added to a queue, allowing users to dismiss them in the order they are provided.
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
        this.autoDismissDuration = this
            .autoDismiss
            ? "medium"
            : null;
        /** Color for the alert (will apply to top border and icon) */
        this.color = "blue";
        /** specify the scale of the button, defaults to m */
        this.scale = "m";
        /** specify if the alert should display an icon */
        this.icon = false;
        /** string to override English close text */
        this.intlClose = TEXT.intlClose;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** the list of queued alerts */
        this.queue = [];
        /** the count of queued alerts */
        this.queueLength = 0;
        /** is the alert queued */
        this.queued = false;
        /** map dismissal durations */
        this.autoDismissDurations = {
            slow: 14000,
            medium: 10000,
            fast: 6000
        };
        /** map icon strings */
        this.iconDefaults = {
            green: "checkCircle",
            yellow: "exclamationMarkTriangle",
            red: "exclamationMarkTriangle",
            blue: "lightbulb"
        };
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
        if (this.autoDismissDuration !== null && !durations.includes(this.autoDismissDuration)) {
            this.autoDismissDuration = "medium";
        }
        if (this.active && !this.queued)
            this.calciteAlertRegister.emit();
    }
    componentDidLoad() {
        this.alertLinkEl = this.el.querySelectorAll("calcite-link")[0];
    }
    watchActive() {
        if (this.active && !this.queued)
            this.calciteAlertRegister.emit();
        if (!this.active) {
            this.queue = this.queue.filter((e) => e !== this.el);
            this.calciteAlertSync.emit({ queue: this.queue });
        }
    }
    render() {
        const dir = getElementDir(this.el);
        const closeButton = (h("button", { class: "alert-close", type: "button", "aria-label": this.intlClose, onClick: () => this.closeAlert(), ref: (el) => (this.closeButton = el) },
            h("calcite-icon", { icon: "x", scale: "m" })));
        const queueCount = (h("div", { class: `${this.queueLength > 1 ? "active " : ""}alert-queue-count` },
            "+",
            this.queueLength > 2 ? this.queueLength - 1 : 1));
        const progress = h("div", { class: "alert-dismiss-progress" });
        const role = this.autoDismiss ? "alert" : "alertdialog";
        const hidden = this.active ? "false" : "true";
        return (h(Host, { active: this.active, queued: this.queued, role: role, dir: dir, "aria-hidden": hidden },
            this.icon ? this.setIcon() : null,
            h("div", { class: "alert-content" },
                h("slot", { name: "alert-title" }),
                h("slot", { name: "alert-message" }),
                h("slot", { name: "alert-link" })),
            queueCount,
            !this.autoDismiss ? closeButton : null,
            this.active && !this.queued && this.autoDismiss ? progress : null));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** focus either the slotted alert-link or the close button */
    async setFocus() {
        if (!this.closeButton && !this.alertLinkEl)
            return;
        else if (this.alertLinkEl)
            this.alertLinkEl.setFocus();
        else if (this.closeButton)
            this.closeButton.focus();
    }
    // when an alert is opened or closed, update queue and determine active alert
    alertSync(event) {
        if (this.queue !== event.detail.queue) {
            this.queue = event.detail.queue;
        }
        this.queueLength = this.queue.length;
        this.determineActiveAlert();
    }
    // when an alert is first registered, trigger a queue sync to get queue
    alertRegister() {
        if (this.active && !this.queue.includes(this.el)) {
            this.queued = true;
            this.queue.push(this.el);
        }
        this.calciteAlertSync.emit({ queue: this.queue });
        this.determineActiveAlert();
    }
    /** emit the opened alert and the queue */
    openAlert() {
        setTimeout(() => (this.queued = false), 300);
        this.calciteAlertOpen.emit({
            el: this.el,
            queue: this.queue
        });
    }
    /** close and emit the closed alert and the queue */
    closeAlert() {
        this.queued = false;
        this.active = false;
        this.queue = this.queue.filter((e) => e !== this.el);
        this.determineActiveAlert();
        this.calciteAlertSync.emit({ queue: this.queue });
        this.calciteAlertClose.emit({
            el: this.el,
            queue: this.queue
        });
    }
    /** determine which alert is active */
    determineActiveAlert() {
        var _a;
        if (((_a = this.queue) === null || _a === void 0 ? void 0 : _a[0]) === this.el) {
            this.openAlert();
            if (this.autoDismiss) {
                setTimeout(() => this.closeAlert(), this.autoDismissDurations[this.autoDismissDuration]);
            }
        }
        else
            return;
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
                "original": "\"fast\" | \"medium\" | \"slow\"",
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
            "defaultValue": "this\n    .autoDismiss\n    ? \"medium\"\n    : null"
        },
        "color": {
            "type": "string",
            "mutable": true,
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
        "intlClose": {
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
                "text": "string to override English close text"
            },
            "attribute": "intl-close",
            "reflect": false,
            "defaultValue": "TEXT.intlClose"
        }
    }; }
    static get states() { return {
        "queue": {},
        "queueLength": {},
        "queued": {}
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
                "text": "Fired to sync queue when opened or closed"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteAlertRegister",
            "name": "calciteAlertRegister",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fired when an alert is added to dom - used to receive initial queue"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
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
                "text": "focus either the slotted alert-link or the close button",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "active",
            "methodName": "watchActive"
        }]; }
    static get listeners() { return [{
            "name": "calciteAlertSync",
            "method": "alertSync",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "calciteAlertRegister",
            "method": "alertRegister",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
