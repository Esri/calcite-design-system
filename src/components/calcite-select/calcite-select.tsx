import { Component, h, Element, Host, Prop, State } from '@stencil/core';

@Component({
    tag: 'calcite-select',
    shadow: true,
    styleUrl: './calcite-select.scss'
})
export class CalciteSelect {
    @Element() el: HTMLElement;

    @Prop() enhanced:boolean = false;
    @Prop({attribute: 'name' }) name:string;

    @State() selected:string = "Select something...";

    options = null;
    optionsArray = null;
    hostAttributes = {};

    connectedCallback() {
        this.options = this.el.querySelectorAll("option");
        this.optionsArray = Array.prototype.slice.call(this.options);
        if(this.el.hasAttributes()) {
            Array.from(this.el.attributes).forEach(attr => {
                this.hostAttributes[attr.name] = attr.value; 
            });
        }
    }
    
    componentDidLoad() {
        if(!this.enhanced) {
            const select = this.el.shadowRoot.querySelector("select");
            this.options.forEach(option => {
                select.appendChild(option);
            });
        } else {
            this.el.shadowRoot.querySelector(".dropdown-menu").addEventListener('click', (event) => {
                // @ts-ignore 
                if (event.target.matches('.dropdown-link')) {
                    // @ts-ignore
                    this.selected = event.target.dataset['selectValue'];
                }
            });
        }
    }

    render() {
        if(!this.enhanced) {
            return (
                <Host>
                    <select {...this.hostAttributes}>
                        { /*Can't use slot because it breaks the necessary direct parent child relationship between select and option. :/ */ }
                    </select>
                </Host>
            )
        } else {
            return (
                <div class="dropdown">
                    <input type="hidden" name={this.name} value={this.selected} />
                    <span class="dropdown-title">{this.selected}</span>
                    <ul class="dropdown-menu">
                        {
                            this.optionsArray.map(option => {
                                return <li class="dropdown-link" data-select-value={option.value}>{option.value}</li>;
                            })
                        }
                    </ul>
                </div>
            )
        }
    }
}