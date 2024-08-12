export const alertQueueTimeoutMs = 300;

export default class AlertManager {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private registeredElements: HTMLCalciteAlertElement[] = [];

  private queueTimeoutId: number = null;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  registerElement(alert: HTMLCalciteAlertElement): void {
    const { registeredElements } = this;

    if (!registeredElements.includes(alert)) {
      if (alert.urgent) {
        registeredElements.unshift(alert);
      } else {
        registeredElements.push(alert);
      }

      this.updateAlerts();
    }
  }

  unregisterElement(alert: HTMLCalciteAlertElement): void {
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
    this.registeredElements.forEach((alert, index) => {
      alert.activeAlertCount = this.registeredElements.length;

      if (index === 0) {
        window.clearTimeout(this.queueTimeoutId);
        this.queueTimeoutId = null;
        this.queueTimeoutId = window.setTimeout(() => (alert.active = true), alertQueueTimeoutMs);
        return;
      }

      alert.active = false;
    });
  }
}
