export const CSS = {
  svg: "svg",
  graphPath: "graph-path",
  graphPathHighlight: "graph-path--highlight",
};

export const IDS = {
  graphId: (id: string) => `calcite-graph-${id}`,
  linearGradientId: (id: string) => `linear-gradient-${id}`,
  maskId: (id: string, maskId: number) => `${id}${maskId}`,
} as const;
