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
  /**
   * Close the alert automatically (recommended for passive, non-blocking alerts)
   */
  @Prop() dismiss: boolean = false;
  /**
   * Length before autodismissal (only used with `dismiss`)
   */
  @Prop({ reflectToAttr: true }) duration: 'fast' | 'medium' | 'slow' = 'medium';
  /**
   * Color for the alert (will apply to top border and icon)
   */
  @Prop({ reflectToAttr: true }) color: 'blue' | 'green' | 'red' | 'yellow' = 'blue';
  /**
   * Select theme (light or dark)
   */
  @Prop({ reflectToAttr: true }) theme: 'light' | 'dark' = 'light';
  /**
   * If false, no icon will be shown in the alert
   */
  @Prop() icon: boolean = false;
  /**
   * Unique ID for this alert
   */
  @Prop() id: string = '1';
  /** 
   * @internal 
   */
  @Prop() currentAlert: string = '';
  /** 
   * @internal 
   */
  @Prop() queueLength: number = 0;

  /**
   * @todo document what gets passed to the handler for these events
   */
  @Event() alertClose: EventEmitter;
  @Event() alertOpen: EventEmitter;

  /**
  * Close the alert and emit the `alertClose` event
  */
  @Method() async close() {
    if (this.isActive) {
      this.isActive = false;
      this.alertClose.emit(this.id);
    }
  }

  @State() isActive: boolean = this.id === this.currentAlert;

  private _durationDefaults = {
    slow: 14000,
    medium: 10000,
    fast: 6000
  }

  private _iconDefaults = {
    green: checkCircle24F,
    yellow: exclamationMarkTriangle24F,
    red: exclamationMarkTriangle24F,
    blue: lightbulb24F
  }

  componentWillUpdate() {
    this.isActive = this.currentAlert === this.id;
    if (this.isActive) this.alertOpen.emit(this.id);
    if (this.isActive && this.dismiss) {
      setTimeout(() => this.close(), this._durationDefaults[this.duration]);
    }
  }

  setIcon() {
    var path = this._iconDefaults[this.color];
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
