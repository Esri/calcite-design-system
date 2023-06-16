export type AlertDuration = "fast" | "medium" | "slow";

export interface Sync {
  queue: HTMLCalciteAlertElement[];
}

export interface Unregister {
  alert: HTMLCalciteAlertElement;
}
