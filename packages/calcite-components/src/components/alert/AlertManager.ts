// @ts-strict-ignore
import type { Alert } from "./alert";

export const alertQueueTimeoutMs = 300;

export default class AlertManager {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private registeredElements: Alert["el"][] = [];

  private queueTimeoutId: number = null;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  registerElement(alert: Alert["el"]): void {
    const { registeredElements } = this;

    if (!registeredElements.includes(alert)) {
      switch (alert.queue) {
        case "immediate":
          registeredElements.unshift(alert);
          break;
        case "next":
          registeredElements.splice(1, 0, alert);
          break;
        case "last":
          registeredElements.push(alert);
          break;
      }

      this.updateAlerts();
    }
  }

  unregisterElement(alert: Alert["el"]): void {
    const { registeredElements } = this;

    const index = registeredElements.indexOf(alert);

    if (index !== -1) {
      registeredElements.splice(index, 1);
    }

    alert.active = false;
    this.updateAlerts();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private updateAlerts(): void {
    window.clearTimeout(this.queueTimeoutId);
    this.queueTimeoutId = null;

    this.registeredElements.forEach((alert, index) => {
      alert.openAlertCount = this.registeredElements.length;

      if (index === 0) {
        this.queueTimeoutId = window.setTimeout(() => (alert.active = true), alertQueueTimeoutMs);
      } else {
        alert.active = false;
      }
    });
  }
}
