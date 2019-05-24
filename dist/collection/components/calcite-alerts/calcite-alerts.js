import { h, Host } from '@stencil/core';
import AlertInterface from '../../interfaces/AlertInterface';
export class CalciteAlerts {
    constructor() {
        this.id = '1';
        this.currentAlert = '';
        this.isActive = false;
        this.queue = [];
    }
    async open(requestedAlert) {
        if (!this.queue.includes(requestedAlert)) {
            this.isActive = true;
            this.currentAlert = requestedAlert;
            this.queue.push(requestedAlert);
            this.alertsOpen.emit({ id: this.id, currentAlert: this.currentAlert, queue: this.queue });
        }
    }
    updateQueue(event) {
        if (this.queue.includes(event.detail))
            this.queue = this.queue.filter(e => e !== event.detail);
        if (this.queue.length < 1)
            setTimeout(() => { this.isActive = false; }, 300);
        this.alertsClose.emit({ id: this.id, currentAlert: this.currentAlert, queue: this.queue });
    }
    componentWillUpdate() {
        this.currentAlert = this.queue.length > 0 ? this.queue[0] : '';
    }
    render() {
        const alertState = {
            currentAlert: this.currentAlert,
            queueLength: this.queue.length >= 2 ? this.queue.length - 1 : 0
        };
        return (h(Host, { "is-active": !!this.isActive },
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
                "text": ""
            },
            "attribute": "id",
            "reflect": false,
            "defaultValue": "'1'"
        }
    }; }
    static get states() { return {
        "currentAlert": {},
        "isActive": {},
        "queue": {}
    }; }
    static get events() { return [{
            "method": "alertsClose",
            "name": "alertsClose",
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
        }, {
            "method": "alertsOpen",
            "name": "alertsOpen",
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
    static get methods() { return {
        "open": {
            "complexType": {
                "signature": "(requestedAlert: any) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "alertClose",
            "method": "updateQueue",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
