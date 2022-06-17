import { Build } from "@stencil/core";

export function getDepth(element: HTMLElement): number {
  if (!Build.isBrowser) {
    return 0;
  }

  const result = document.evaluate(
    "ancestor::calcite-list-item | ancestor::calcite-list-item-group",
    element,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  return result.snapshotLength;
}
