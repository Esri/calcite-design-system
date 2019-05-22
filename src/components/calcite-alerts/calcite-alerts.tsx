import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State } from '@stencil/core';
import AlertInterface from '../../interfaces/AlertInterface';

@Component({
  tag: 'calcite-alerts',
  styleUrl: 'calcite-alerts.scss',
  shadow: true
})

export class CalciteAlerts {
  @Element() el: HTMLElement;

  @Prop() id: string = '1';

  @State() currentAlert: string = '';
  @State() isActive: boolean = false;
  @State() queue: string[] = [];

  @Event() alertsClose: EventEmitter;
  @Event() alertsOpen: EventEmitter;

  @Method() async open(requestedAlert) {
    if (!this.queue.includes(requestedAlert)) {
      this.isActive = true;
      this.currentAlert = requestedAlert;
      this.queue.push(requestedAlert);
      this.alertsOpen.emit({ id: this.id, currentAlert: this.currentAlert, queue: this.queue });
    }
  }

  @Listen('alertClose') updateQueue(event: CustomEvent) {
    if (this.queue.includes(event.detail)) this.queue = this.queue.filter(e => e !== event.detail);
    if (this.queue.length < 1) setTimeout(() => { this.isActive = false }, 300);
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

    return (
      <Host is-active={!!this.isActive}>
        <AlertInterface.Provider state={alertState}>
          <slot />
        </AlertInterface.Provider>
      </Host>
    );
  }
}
