import { Component, h, Element, Host } from '@stencil/core';

let shadow = null;

@Component({
    tag: 'calcite-select',
    shadow: true,
    styleUrl: './calcite-select.scss'
})
export class CalciteSelect {
    @Element() el: HTMLElement;

    componentDidLoad() {
        shadow = this.el.shadowRoot;
        const select = shadow.querySelector("select");
        this.el.querySelectorAll("option").forEach(option => {
            select.appendChild(option)
        });
    }

    render() {
        return (
            <Host>
                <select></select>
                <slot></slot>
            </Host>
        )
    }
}