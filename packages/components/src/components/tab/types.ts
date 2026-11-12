/** @internal */
export interface TabChangeEventDetail {
  /**
   * The tab ID that just became selected
   * @internal
   */
  tab: number | string;
  /** @internal */
  userTriggered?: boolean;
}

/** @internal */
export interface TabCloseEventDetail {
  /**
   * The tab ID that just became closed
   * @internal
   */
  tab: number | string;
}
