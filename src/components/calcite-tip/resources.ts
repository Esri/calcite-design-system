import { HEADING_LEVEL as PARENT_HEADING_LEVEL } from "../calcite-tip-manager/resources";
import { HeadingLevel } from "../functional/CalciteHeading";

export const CSS = {
  container: "container",
  header: "header",
  heading: "heading",
  close: "close",
  imageFrame: "image-frame",
  content: "content",
  info: "info"
};

export const ICONS = {
  close: "x"
};

export const SLOTS = {
  thumbnail: "thumbnail"
};

export const TEXT = {
  close: "Close"
};

export const HEADING_LEVEL = (PARENT_HEADING_LEVEL + 1) as HeadingLevel;
