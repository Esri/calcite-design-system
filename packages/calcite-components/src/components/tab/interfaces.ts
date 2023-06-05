export interface TabChangeEventDetail {
  /**
   * The tab ID that just became selected
   */
  tab: number | string;
}

export interface TabCloseEventDetail {
  /**
   * The tab ID that just became closed
   */
  tab: number | string;
}
