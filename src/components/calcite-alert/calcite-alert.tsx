import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import { lightbulb24F, exclamationMarkTriangle24F, checkCircle24F, x32 } from '@esri/calcite-ui-icons';
import AlertInterface from '../../interfaces/AlertInterface';

@Component({
  tag: 'calcite-alert',
  styleUrl: 'calcite-alert.scss',
  shadow: true
})

export class CalciteAlert {
  @Element() el: HTMLElement;

  @Prop() currentAlert: string = ''
  @Prop() dismiss: boolean = false;
  @Prop() icon: boolean = false;
  @Prop() id: string = '1';
  @Prop() queueLength: number = 0
  @Prop({ reflectToAttr: true }) color: string = 'blue'
  @Prop({ reflectToAttr: true }) theme: string = null;
  @Prop({ reflectToAttr: true }) duration: string = this.dismiss ? 'medium' : null;

  @State() isActive: boolean = this.id === this.currentAlert;

  @Event() alertClose: EventEmitter;
  @Event() alertOpen: EventEmitter;

  @Method() async close() {
    if (this.isActive) {
      this.isActive = false;
      this.alertClose.emit(this.id);
    }
  }

  componentWillUpdate() {
    this.isActive = this.currentAlert === this.id;
    if (this.isActive) this.alertOpen.emit(this.id);
    if (this.isActive && this.dismiss) setTimeout(() => { this.close(); }, this.duration === 'fast' ? 6000 : this.duration === 'slow' ? 14000 : 10000);
  }

  setIcon() {
    var path = this.color === 'green' ? checkCircle24F : (this.color === 'red' || this.color === 'yellow') ? exclamationMarkTriangle24F : lightbulb24F;
    return (
      <div class="alert-icon">
        <svg xmlns='http://www.w3.org/2000/svg' height='24' width='24' viewBox='0 0 24 24'><path d={path} /></svg>
      </div>
    )
  }

  render() {
    const closeButton = (
      <button class="alert-close" aria-label="close" onClick={() => this.close()}>
        <svg xmlns='http://www.w3.org/2000/svg' height='32' width='32' viewBox='0 0 32 32'><path d={x32} /></svg>
      </button>
    )

    const close = !this.dismiss ? closeButton : '';
    const icon = this.icon ? this.setIcon() : '';
    const count = <div class={`${this.queueLength > 0 ? 'is-active ' : ''}alert-count`}>+{this.queueLength > 0 ? this.queueLength : 1}</div>
    const progress = this.isActive && this.dismiss ? <div class="alert-dismiss"></div> : '';
    return (
      <Host theme={this.theme} is-active={!!this.isActive} duration={this.duration}>
        {icon}
        <div class="alert-content">
          <slot name="alert-title"></slot>
          <slot name="alert-message"></slot>
          <slot name="alert-link"></slot>
        </div>
        {count}
        {close}
        {progress}
      </Host>
    );
  }
}

AlertInterface.injectProps(CalciteAlert, ['currentAlert', 'queueLength']);
