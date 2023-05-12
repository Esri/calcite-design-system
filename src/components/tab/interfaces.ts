export interface TabChangeEventDetail {
  /**
   * The tab that just became selected
   */
  tab: number | string;
  tabElId?: string;
}
export interface TabCloseEventDetail {
  /**
   * The tab that just became closed
   */
  tab: number | string;
}
