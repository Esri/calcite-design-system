export const CSS = {
  loader: "loader",
  loaderParts: "loader__svgs",
  loaderPart: (partId?: number) => (partId ? `loader__svg--${partId}` : "loader__svg") as const,
  loaderText: "loader__text",
  loaderPercentage: "loader__percentage",
};
