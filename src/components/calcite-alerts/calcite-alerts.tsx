import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
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

  /** Unique ID for this instance of calcite-alerts */
  @Prop() id: string = "1";

  @State() currentAlert: string = "";
  @State() active: boolean = false;
  @State() alertQueue: string[] = [];

  /** emits the id of the alert ot be closed, and the current alertQueue and currentAlert */
  @Event() calciteAlertsClose: EventEmitter;

  /** emits the id of the alert to be opened, and the current alertQueue and currentAlert */
  @Event() calciteAlertsOpen: EventEmitter;

  /** Adds the requested alert to the alert queue, if not present */
  @Listen("calciteAlertOpen") updateQueueOnOpen(event: CustomEvent) {
    let requestedAlert = (event.target as HTMLElement).id;
    if (!this.alertQueue.includes(requestedAlert)) {
      this.active = true;
      this.currentAlert = requestedAlert;
      this.alertQueue.push(requestedAlert);
      this.calciteAlertsOpen.emit({
        id: this.id,
        currentAlert: this.currentAlert,
        alertQueue: this.alertQueue
      });
    }
  }

  /** Closes the requested alert and removes from the queue */
  @Listen("calciteAlertClose") updateQueueOnClose(event: CustomEvent) {
    let requestedAlert = (event.target as HTMLElement).id;
    if (this.alertQueue.includes(requestedAlert))
      this.alertQueue = this.alertQueue.filter(e => e !== requestedAlert);
    if (this.alertQueue.length < 1)
      setTimeout(() => {
        this.active = false;
      }, 300);
    this.calciteAlertsClose.emit({
      id: this.id,
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
      <Host active={!!this.active}>
        <AlertInterface.Provider state={alertState}>
          <slot />
        </AlertInterface.Provider>
      </Host>
    );
  }
}
