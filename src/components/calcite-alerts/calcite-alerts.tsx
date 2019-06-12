import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State } from '@stencil/core';
import AlertInterface from '../../interfaces/AlertInterface';

@Component({
  tag: 'calcite-alerts',
  styleUrl: 'calcite-alerts.scss',
  shadow: true
})

export class CalciteAlerts {
  @Element() el: HTMLElement;
  /**
   * Unique ID for this instance of calcite-alerts
   */
  @Prop() id: string = '1';

  @State() currentAlert: string = '';
  @State() active: boolean = false;
  @State() alertQueue: string[] = [];

  /**
   * @todo document what gets passed to the handler for these events
   */
  @Event() calciteAlertsClose: EventEmitter;
  @Event() calciteAlertsOpen: EventEmitter;

  /**
   * Open a specific alert by id
  * @param requestedAlert {string} id of the alert you wish to open
  */
  @Method() async open(requestedAlert) {
    if (!this.alertQueue.includes(requestedAlert)) {
      this.active = true;
      this.currentAlert = requestedAlert;
      this.alertQueue.push(requestedAlert);
      this.calciteAlertsOpen.emit({ id: this.id, currentAlert: this.currentAlert, alertQueue: this.alertQueue });
    }
  }

  @Listen('calciteAlertClose') updateQueue(event: CustomEvent) {
    if (this.alertQueue.includes(event.detail)) this.alertQueue = this.alertQueue.filter(e => e !== event.detail);
    if (this.alertQueue.length < 1) setTimeout(() => { this.active = false }, 300);
    this.calciteAlertsClose.emit({ id: this.id, currentAlert: this.currentAlert, alertQueue: this.alertQueue });
  }

  componentWillUpdate() {
    this.currentAlert = this.alertQueue.length > 0 ? this.alertQueue[0] : '';
  }

  render() {
    const alertState = {
      currentAlert: this.currentAlert,
      queueLength: this.alertQueue.length >= 2 ? this.alertQueue.length - 1 : 0
    };

    return (
      <Host active={!!this.active}>
        <AlertInterface.Provider state={alertState}>
          <slot />
        </AlertInterface.Provider>
      </Host>
    );
  }
}
