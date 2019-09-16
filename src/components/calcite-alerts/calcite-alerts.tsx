import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  State
} from "@stencil/core";
import AlertInterface from "../../interfaces/AlertInterface";

@Component({
  tag: "calcite-alerts",
  styleUrl: "calcite-alerts.scss",
  shadow: true
})
export class CalciteAlerts {
  @Element() el: HTMLElement;

  @State() currentAlert: string = "";
  @State() active: boolean = false;
  @State() alertQueue: string[] = [];

  /** emits the ID of the alert to be closed, and the current alertQueue and currentAlert */
  @Event() calciteAlertsClose: EventEmitter;

  /** emits the ID of the alert to be opened, and the current alertQueue and currentAlert */
  @Event() calciteAlertsOpen: EventEmitter;

  /** Adds the requested alert to the alert queue, if not present */
  @Listen("calciteAlertOpen") updateQueueOnOpen(event: CustomEvent) {
    if (!this.alertQueue.includes(event.detail.requestedAlert)) {
      this.active = true;
      this.currentAlert = event.detail.requestedAlert;
      this.alertQueue.push(event.detail.requestedAlert);
      this.calciteAlertsOpen.emit({
        currentAlert: this.currentAlert,
        alertQueue: this.alertQueue
      });
    }
  }

  /** Closes the requested alert and removes from the queue, or removes from queue if not active */
  @Listen("calciteAlertClose") updateQueueOnClose(event: CustomEvent) {
    if (this.alertQueue.includes(event.detail.requestedAlert))
      this.alertQueue = this.alertQueue.filter(
        e => e !== event.detail.requestedAlert
      );
    if (this.alertQueue.length < 1)
      setTimeout(() => {
        this.active = false;
      }, 400);
    this.calciteAlertsClose.emit({
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

    return (
      <Host active={this.active}>
        <AlertInterface.Provider state={alertState}>
          <slot />
        </AlertInterface.Provider>
      </Host>
    );
  }
}
