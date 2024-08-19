export type AlertDuration = "fast" | "medium" | "slow";
export type AlertQueue = "immediate" | "next" | "last";

export interface Sync {
  queueList: HTMLCalciteAlertElement[];
}

export interface Unregister {
  alert: HTMLCalciteAlertElement;
}
