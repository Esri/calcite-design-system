import { h, Host } from "@stencil/core";
import AlertInterface from "../../interfaces/AlertInterface";
export class CalciteAlerts {
    constructor() {
        /**
         * Unique ID for this instance of calcite-alerts
         */
        this.id = "1";
        this.currentAlert = "";
        this.active = false;
        this.alertQueue = [];
    }
    /**
     * Adds the requested alert to the alert queue, if not present
     */
    updateQueueOnOpen(event) {
        let requestedAlert = event.target.id;
        if (!this.alertQueue.includes(requestedAlert)) {
            this.active = true;
            this.currentAlert = requestedAlert;
            this.alertQueue.push(requestedAlert);
            this.calciteAlertsOpen.emit({
                id: this.id,
                currentAlert: this.currentAlert,
                alertQueue: this.alertQueue
            });
        }
    }
    /**
     * Closes the requested alert and removes from the queue
     */
    updateQueueOnClose(event) {
        let requestedAlert = event.target.id;
        if (this.alertQueue.includes(requestedAlert))
            this.alertQueue = this.alertQueue.filter(e => e !== requestedAlert);
        if (this.alertQueue.length < 1)
            setTimeout(() => {
                this.active = false;
            }, 300);
        this.calciteAlertsClose.emit({
            id: this.id,
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
        return (h(Host, { active: !!this.active },
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
    static get properties() { return {
        "id": {
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
                "text": "Unique ID for this instance of calcite-alerts"
            },
            "attribute": "id",
            "reflect": false,
            "defaultValue": "\"1\""
        }
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
                "tags": [{
                        "text": "document what gets passed to the handler for these events",
                        "name": "todo"
                    }],
                "text": ""
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
                "text": ""
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
