export const getWidth = (width: string, widthScale: string): string => {
  return width ? `width-${width}` : widthScale ? `width-${widthScale}` : "";
};

export const getHeight = (height: string, heightScale: string): string => {
  return height ? `height-${height}` : heightScale ? `width-${heightScale}` : "";
};
