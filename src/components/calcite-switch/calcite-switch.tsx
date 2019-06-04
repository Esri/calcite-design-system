import { Component, h, Prop, State, Event, Element, Host } from "@stencil/core";
import { EventEmitter } from "@stencil/state-tunnel/dist/types/stencil.core";
// import { ENTER } from "../../utils/keys";

@Component({
  tag: "calcite-switch",
  styleUrl: "calcite-switch.scss",
  shadow: true
})
export class CalciteSwitch {
  @Element() el: HTMLElement;

  @Prop() checked = false;

  @Prop() color: "red" | "green" = "green";

  @State() switched = this.checked;

  @Event() switchChange: EventEmitter;
  @Prop() disabled: boolean = false;
  @Prop() name: string;
  @Prop() value: string | number | string[];
  childInput: any;
  childOnchange: any;
  @Prop() focus: any;

  componentWillLoad(){
    this.childInput = this.el.children[0] || (<input type="checkbox" checked={this.switched} disabled={this.disabled} name={this.name} value={this.value}/>);
    this.childInput.class = this.childInput.class + "toggle-switch__input";
    this.el.innerHTML = ""
    this.childOnchange = this.childInput.onChange;
    this.childInput.onChange = this.setInputSlot.bind(this);
  }

  render() {
    return (
      <Host class={`toggle-switch toggle-switch--${this.color}`} onClick={this.setInputSlot.bind(this)} checked={this.checked} disabled={this.disabled} focus={this.focus} >
        { 
          this.childInput && <slot></slot>
        }
        <span class={`toggle-switch__track`} />
      </Host>
    );
  }
  setInputSlot(event): void {
    this.childOnchange && this.childOnchange(event);
    this.switchChange && this.switchChange.emit(this.switched);
  }
}
