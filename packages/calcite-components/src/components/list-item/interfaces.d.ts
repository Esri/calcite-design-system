export type ItemData = {
  label: string;
  description: string;
  metadata: Record<string, unknown>;
  value: string;
}[];

export interface ListItemSelectDetail {
  selectMultiple: boolean;
}
