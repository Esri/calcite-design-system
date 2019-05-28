import { h, Host } from '@stencil/core';
import { lightbulb24F, exclamationMarkTriangle24F, checkCircle24F, x32 } from '@esri/calcite-ui-icons';
import AlertInterface from '../../interfaces/AlertInterface';
export class CalciteAlert {
    constructor() {
        this.currentAlert = '';
        this.dismiss = false;
        this.icon = false;
        this.id = '1';
        this.queueLength = 0;
        this.color = 'blue';
        this.theme = null;
        this.duration = this.dismiss ? 'medium' : null;
        this.isActive = this.id === this.currentAlert;
    }
    async close() {
        if (this.isActive) {
            this.isActive = false;
            this.alertClose.emit(this.id);
        }
    }
    componentWillUpdate() {
        this.isActive = this.currentAlert === this.id;
        if (this.isActive)
            this.alertOpen.emit(this.id);
        if (this.isActive && this.dismiss)
            setTimeout(() => { this.close(); }, this.duration === 'fast' ? 6000 : this.duration === 'slow' ? 14000 : 10000);
    }
    setIcon() {
        var path = this.color === 'green' ? checkCircle24F : (this.color === 'red' || this.color === 'yellow') ? exclamationMarkTriangle24F : lightbulb24F;
        return (h("div", { class: "alert-icon" },
            h("svg", { xmlns: 'http://www.w3.org/2000/svg', height: '24', width: '24', viewBox: '0 0 24 24' },
                h("path", { d: path }))));
    }
    render() {
        const closeButton = (h("button", { class: "alert-close", "aria-label": "close", onClick: () => this.close() },
            h("svg", { xmlns: 'http://www.w3.org/2000/svg', height: '32', width: '32', viewBox: '0 0 32 32' },
                h("path", { d: x32 }))));
        const close = !this.dismiss ? closeButton : '';
        const icon = this.icon ? this.setIcon() : '';
        const count = h("div", { class: `${this.queueLength > 0 ? 'is-active ' : ''}alert-count` },
            "+",
            this.queueLength > 0 ? this.queueLength : 1);
        const progress = this.isActive && this.dismiss ? h("div", { class: "alert-dismiss" }) : '';
        return (h(Host, { theme: this.theme, "is-active": !!this.isActive, duration: this.duration },
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
                "text": ""
            },
            "attribute": "current-alert",
            "reflect": false,
            "defaultValue": "''"
        },
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
                "text": ""
            },
            "attribute": "dismiss",
            "reflect": false,
            "defaultValue": "false"
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
                "text": ""
            },
            "attribute": "icon",
            "reflect": false,
            "defaultValue": "false"
        },
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
                "tags": [],
                "text": ""
            },
            "attribute": "queue-length",
            "reflect": false,
            "defaultValue": "0"
        },
        "color": {
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
            "attribute": "color",
            "reflect": true,
            "defaultValue": "'blue'"
        },
        "theme": {
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
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "null"
        },
        "duration": {
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
            "attribute": "duration",
            "reflect": true,
            "defaultValue": "this.dismiss ? 'medium' : null"
        }
    }; }
    static get states() { return {
        "isActive": {}
    }; }
    static get events() { return [{
            "method": "alertClose",
            "name": "alertClose",
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
            "method": "alertOpen",
            "name": "alertOpen",
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
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
}
AlertInterface.injectProps(CalciteAlert, ['currentAlert', 'queueLength']);
