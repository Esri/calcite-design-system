import { h, Host } from "@stencil/core";
import AlertInterface from "../../interfaces/AlertInterface";
export class CalciteAlerts {
    constructor() {
        this.currentAlert = "";
        this.active = false;
        this.alertQueue = [];
    }
    /** Adds the requested alert to the alert queue, if not present */
    updateQueueOnOpen(event) {
        if (!this.alertQueue.includes(event.detail.requestedAlert)) {
            this.active = true;
            this.currentAlert = event.detail.requestedAlert;
            this.alertQueue.push(event.detail.requestedAlert);
            this.calciteAlertsOpen.emit({
                currentAlert: this.currentAlert,
                alertQueue: this.alertQueue
            });
        }
    }
    /** Closes the requested alert and removes from the queue, or removes from queue if not active */
    updateQueueOnClose(event) {
        if (this.alertQueue.includes(event.detail.requestedAlert))
            this.alertQueue = this.alertQueue.filter(e => e !== event.detail.requestedAlert);
        if (this.alertQueue.length < 1)
            setTimeout(() => {
                this.active = false;
            }, 400);
        this.calciteAlertsClose.emit({
            currentAlert: this.currentAlert,
            alertQueue: this.alertQueue
        });
    }
    componentWillUpdate() {
        this.currentAlert = this.alertQueue.length > 0 ? this.alertQueue[0] : "";
    }
    render() {
        const alertState = {
            currentAlert: this.currentAlert,
            queueLength: this.alertQueue.length >= 2 ? this.alertQueue.length - 1 : 0
        };
        return (h(Host, { active: this.active },
            h(AlertInterface.Provider, { state: alertState },
                h("slot", null))));
    }
    static get is() { return "calcite-alerts"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-alerts.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-alerts.css"]
    }; }
    static get states() { return {
        "currentAlert": {},
        "active": {},
        "alertQueue": {}
    }; }
    static get events() { return [{
            "method": "calciteAlertsClose",
            "name": "calciteAlertsClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "emits the ID of the alert to be closed, and the current alertQueue and currentAlert"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteAlertsOpen",
            "name": "calciteAlertsOpen",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "emits the ID of the alert to be opened, and the current alertQueue and currentAlert"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "calciteAlertOpen",
            "method": "updateQueueOnOpen",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteAlertClose",
            "method": "updateQueueOnClose",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
