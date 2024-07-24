export const CSS = {
  loader: "loader",
  loaderParts: "loader__svgs",
  loaderPart: "loader__svg",
  loaderPartId: (partId: number) => `${CSS.loaderPart}--${partId}` as const,
  loaderText: "loader__text",
  loaderPercentage: "loader__percentage",
};
